import mongoose from "mongoose";
import logger from "./logger";

export default async function initializeMongoose() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        logger.debug("Connected to MongoDB.");
    } catch (error) {
        logger.error("Error connecting to MongoDB: ", error)
    }
}
