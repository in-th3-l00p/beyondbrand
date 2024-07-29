require("dotenv").config();

import express, {json} from "express";
import logger from "./utils/logger";
import morgan from "morgan";
import cors from "cors";

import initializeAmqp from "./utils/amqp";
import initializeMongoose from "./utils/mongoose";
import {initializeStripeJs} from "./utils/stripe";

import CustomersRouter from "./routes/customers";
import CheckoutRouter from "./routes/checkout";
import WebhookRouter from "./routes/webhook";

const app = express();

app.use(cors({
    origin: process.env.AUTH0_BASE_URL,
    credentials: true
}));
app.use(morgan("combined", {
    "stream": {
        write: (message) => {
            logger.info(message);
        }
    }
}));
app.use(json());
app.use("/api/payment/webhook", WebhookRouter);
app.use("/api/payment/customers", CustomersRouter);
app.use("/api/payment/checkout", CheckoutRouter);

(async () => {
    await initializeMongoose();
    await initializeAmqp();
    await initializeStripeJs();

    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
        logger.info("Server started on port " + PORT + ".");
    })
})();
