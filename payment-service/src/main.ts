require("dotenv").config();

import express, {json} from "express";
import logger from "./utils/logger";
import morgan from "morgan";
import cors from "cors";

import initializeAmqp from "./utils/amqp";
import initializeMongoose from "./utils/mongoose";
import {initializeStripe} from "./utils/stripe";

import CustomersRouter from "./routes/customers";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
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
app.use("/api/payment/customers", CustomersRouter);

(async () => {
    await initializeMongoose();
    await initializeAmqp();
    await initializeStripe();

    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
        logger.info("Server started on port " + PORT + ".");
    })
})();
