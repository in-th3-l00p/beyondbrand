import {Router} from "express";
import Customer from "../models/customer";

const router = Router();

router.post(
    "/",
    async (req, res) => {
        const event = req.body;
        try {
            let customer = await Customer.findOne({
                customerId: event.data.object.customer
            });
            if (!customer)
                return res
                    .status(404)
                    .json({message: "Customer not found"});

            switch (event.type) {
                case "customer.subscription.created":
                case "customer.subscription.updated":
                    await Customer.updateOne({
                        customerId: event.data.object.customer
                    }, {
                        subscriptionId: event.data.object.id
                    });
                    break;
                case "customer.subscription.deleted":
                    Customer.updateOne({
                            customerId: event.data.object.customer
                    }, {
                        subscriptionId: null
                    });
                    break;
                case "checkout.session.completed": {
                    await Customer.updateOne({
                        customerId: event.data.object.customer
                    }, {
                        subscriptionId: event.data.object.subscription
                    });
                    break;
                }
            }
        } catch (err) {
            return res.status(400).json(err);
        }

        return res.json({});
    });

export default router;