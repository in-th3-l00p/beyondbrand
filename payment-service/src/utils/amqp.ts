import Amqp from "streaming";
import logger from "./logger";

export default async function initializeAmqp() {
    await Amqp.initializeFromEnv(logger);
}