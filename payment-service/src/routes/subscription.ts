import {Router} from "express";
import auth0 from "../middleware/auth0";
import Customer from "../models/customer";
import stripe from "../utils/stripe";

const router = Router();

router.get(
    "/",
    auth0,
    async (req, res) => {
        const customer = await Customer.findOne({
            auth0Id: req.auth!.payload.sub
        });

        if (!customer)
            return res.status(404).send("Customer not found.");

        if (!customer.subscriptionId)
            return res.send({});

        const subscription = await stripe.subscriptions.retrieve(customer.subscriptionId);
        if (!subscription)
            return res.status(404).send("Subscription not found.");
        return res.send(subscription);
    });

export default router;