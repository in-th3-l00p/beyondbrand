import express from "express";
import logger from "./utils/logger";
import mongoose from "mongoose";
import {rabbitmq} from "./utils/rabbitmq";


const app = express();

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        logger.info("Connected to MongoDB");

        await rabbitmq.connect();
        logger.info("Connected to RabbitMQ");
    } catch (err) {
        logger.error(err);
    }

    const PORT = 3001 || process.env.PORT;
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
})();