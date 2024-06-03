import Amqp from "streaming";
import logger from "./logger";
import {EventType} from "streaming/src/event";
import Brand from "../models/brand";

export default async function initializeAmqp() {
    await Amqp.initializeFromEnv(logger);
    Amqp.getInstance().addConsumer(
        EventType.BRAND_CREATED,
        async (event) => {
            const brand = await Brand.create(event.data);
            logger.info(`Brand created: ${brand._id}`);
        });
    Amqp.getInstance().addConsumer(
        EventType.BRAND_UPDATED,
        async (event) => {
            const brand = await Brand.findByIdAndUpdate(event.data._id, event.data, {new: true});
            logger.info(`Brand updated: ${brand._id}`);
        });
    Amqp.getInstance().addConsumer(
        EventType.BRAND_DELETED,
        async (event) => {
            await Brand.findByIdAndDelete(event.data._id);
            logger.info(`Brand deleted: ${event.data._id}`);
        });
}