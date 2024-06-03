import Amqp from "streaming";
import logger from "./logger";
import {EventType} from "streaming/src/event";
import User from "../models/user";

export default async function initializeAmqp() {
    await Amqp.initializeFromEnv(logger);

    Amqp.getInstance().addConsumer(
        EventType.USER_CREATED,
        async (event) => {
            event.data._id = event.data.id;
            const user = await User.create(event.data);
            logger.info(`User created: ${user._id}.`);
        });

    Amqp.getInstance().addConsumer(
        EventType.USER_UPDATED,
        async (event) => {
            const user = await User.findByIdAndUpdate(event.data.id, event.data, {new: true});
            if (!user) {
                logger.error(`User not found when update event was published: ${event}.`);
                return;
            }
            logger.info(`User updated: ${user._id}.`);
        });
}