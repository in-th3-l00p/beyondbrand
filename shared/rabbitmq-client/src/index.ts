import amqplib from "amqplib";
import {Message, MessageType} from "./types";

// rabbitmq connection and channel
export let rabbitConn, rabbitChannel;
let consumerMap: Map<MessageType, (data: string) => void>= new Map();
const EXCHANGE_NAME = "beyondbrand"; // shall be universal throughout the app

export namespace rabbitmq {
    export async function connect(
        url: string = process.env.RABBITMQ_URI || "",
        queue: string = process.env.RABBITMQ_QUEUE || ""
    ) {
        rabbitConn = await amqplib.connect(url);
        rabbitChannel = await rabbitConn.createChannel();
        await rabbitChannel.assertExchange(EXCHANGE_NAME, "fanout", { durable: true });
        await rabbitChannel.assertQueue(queue, { durable: true });
        await rabbitChannel.bindQueue(queue, EXCHANGE_NAME, "");

        await rabbitChannel.consume(queue, (msg) => {
            const message: Message = JSON.parse(msg?.content.toString());
            let callback = consumerMap.get(message.type);
            if (callback)
                callback(message.data);

        })
    }

    export async function send(type: MessageType, data: any) {
        await rabbitChannel.publish(
            EXCHANGE_NAME,
            Buffer.from(JSON.stringify({ type, data }))
        )
    }

    export async function listen(
        type: MessageType,
        callback: (data: string) => void
    ) {
        consumerMap.set(type, callback);
    }
}
