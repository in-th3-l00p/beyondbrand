import {Router} from "express";
import {body} from "express-validator";
import auth0 from "../middleware/auth0";

const router = Router();

const createAddressChain = (prefix: string = "") => [
    body(`${prefix}address.city`).isString().isLength({min: 1, max: 255}),
    body(`${prefix}address.country`).isString().isLength({min: 2, max: 2}),
    body(`${prefix}address.line1`).isString().isLength({min: 1, max: 255}),
    body(`${prefix}address.line2`).isString().isLength({min: 0, max: 255}),
    body(`${prefix}address.postal_code`).isString().isLength({min: 1, max: 255}),
    body(`${prefix}address.state`).isString().isLength({min: 1, max: 255}),
]

const createChain = [
    body("name").isString().isLength({min: 1, max: 255}),
    body("email").isEmail(),
    body("phone").isString().isLength({min: 1, max: 255}),
    ...createAddressChain(),
    body("shipping.name").isString().isLength({min: 1, max: 255}),
    body("shipping.phone").isString().isLength({min: 1, max: 255}),
    ...createAddressChain("shipping."),
]

router.post(
    "/",
    ...createChain,
    auth0,
    (req, res) => {
        console.log(req.auth);
    });

export default router;