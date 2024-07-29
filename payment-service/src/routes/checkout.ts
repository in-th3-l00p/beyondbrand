import {Router} from "express";
import {body, matchedData} from "express-validator";
import validate from "../middleware/validate";
import auth0 from "../middleware/auth0";
import Customer from "../models/customer";
import stripe from "../utils/stripe";

const router = Router();

router.post(
    "/",
    auth0,
    body("product").isString(),
    validate,
    async (req, res) => {
        const data = matchedData(req);
        let customer = await Customer.findOne({
            auth0Id: req.auth!.payload.sub
        });
        if (!customer) {
            customer = await Customer.create({
                auth0Id: req.auth!.payload.sub
            });
        }

        let stripeCustomer;
        if (!customer.customerId) {
            stripeCustomer = await stripe.customers.create({ });

            customer.customerId = stripeCustomer.id;
            await customer.save();
        } else
            stripeCustomer = await stripe.customers.retrieve(customer.customerId);

        const product = await stripe.products.retrieve(data.product);
        if (!product)
            return res.status(404).send("Product not found.");

        const checkoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
            payment_method_types: ["card"],
            line_items: [
                {
                    price: product.default_price as string,
                    quantity: 1
                }
            ],
            mode: "subscription",
            success_url: `https://beyondbrand.pro/profile`,
            cancel_url: `https://beyondbrand.pro/pricing`
        });
        if (!checkoutSession)
            return;

        res.send(checkoutSession);
    }
)

export default router;
