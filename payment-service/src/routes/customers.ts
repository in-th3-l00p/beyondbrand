import {Router} from "express";
import {body, matchedData} from "express-validator";
import {AuthenticatedRequest, checkJwt, getUser, User} from "../middleware/authenticate";
import validate from "../middleware/validate";
import stripe from "../utils/stripe";
import logger from "../utils/logger";

const router = Router();

async function getCustomer(user: User) {
    const customers = await stripe.customers.list({
        email: user?.email,
    });
    if (customers.data.length === 0)
        throw {status: 404};
    if (customers.has_more) {
        logger.warn("More than 1 customers found for email: " + user?.email);
        throw {status: 500};
    }

    if (customers.data[0].metadata.userId !== user?.sub)
        throw {status: 403};
    return customers.data[0];
}

router.get(
    "/",
    checkJwt,
    getUser,
    async (req: AuthenticatedRequest, res) => {
        try {
            res.send(await getCustomer(req.user!));
        } catch (e: any) {
            if (typeof e.status == "number")
                return res.status(e.status).end();
            logger.error("Error fetching customers: " + e);
            res.status(500).end();
        }
    });

const createAddressChain = (prefix: string = "") => [
    body(`${prefix}address.city`).isString().isLength({min: 1, max: 255}),
    body(`${prefix}address.country`).isString().isLength({min: 2, max: 2}),
    body(`${prefix}address.line1`).isString().isLength({min: 1, max: 255}),
    body(`${prefix}address.line2`).isString().isLength({min: 0, max: 255}),
    body(`${prefix}address.postal_code`).isString().isLength({min: 1, max: 255}),
    body(`${prefix}address.state`).isString().isLength({min: 1, max: 255}),
]

const createChain = [
    body("phone").isString().isLength({min: 1, max: 255}),
    ...createAddressChain(),
    body("shipping.name").isString().isLength({min: 1, max: 255}),
    body("shipping.phone").isString().isLength({min: 1, max: 255}),
    ...createAddressChain("shipping."),
]

router.post(
    "/",
    checkJwt,
    getUser,
    ...createChain,
    validate,
    async (req: AuthenticatedRequest, res) => {
        const { phone, address, shipping } = matchedData(req);

        try {
            const customer = await stripe.customers.create({
                name: req.user?.name,
                email: req.user?.email,
                phone,
                address,
                shipping,
                metadata: {
                    userId: req.user?.sub!,
                },
            });

            res.send(customer);
        } catch (e) {
            logger.error("Error creating customer: " + e);
            res.status(500).end();
        }
    });

router.put(
    "/",
    checkJwt,
    getUser,
    ...createChain,
    validate,
    async (req: AuthenticatedRequest, res) => {
        const { phone, address, shipping } = matchedData(req);

        try {
            let customer = await getCustomer(req.user!);
            customer = await stripe.customers.update(customer.id, {
                phone,
                address,
                shipping,
            });
            res.send(customer);
        } catch (e: any) {
            if (typeof e.status == "number")
                return res.status(e.status).end();
            logger.error("Error updating customer: " + e);
            res.status(500).end();
        }
    });

router.delete(
    "/",
    checkJwt,
    getUser,
    async (req: AuthenticatedRequest, res) => {
        try {
            let customer = await getCustomer(req.user!);
            await stripe.customers.del(customer.id);
            res.status(204).end();
        } catch (e: any) {
            if (typeof e.status == "number")
                return res.status(e.status).end();
            logger.error("Error deleting customer: " + e);
            res.status(500).end();
        }
    }
)

export default router;