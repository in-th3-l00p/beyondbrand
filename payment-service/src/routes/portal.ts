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

        if (!customer || !customer.customerId)
            return res.status(404).send("Customer not found.");

        if (!customer.subscriptionId)
            return res.send({});

        const subscription = await stripe.subscriptions.retrieve(customer.subscriptionId);
        if (!subscription)
            return res.status(404).send("Subscription not found.");

        res.send(await stripe.billingPortal.sessions.create({
            customer: customer.customerId!,
            return_url: `https://beyondbrand.pro/profile`
        }));
    });

export default router;