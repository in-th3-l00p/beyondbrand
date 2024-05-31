import amqplib from "amqplib";
import {Event, EventType} from "./event";

interface Logger {
    debug: (message: string) => void;
    error: (message: string) => void;
}

const EXCHANGE_NAME = "beyondbrand";

export default class Amqp {
    private conn: amqplib.Connection | null = null;
    private channel: amqplib.Channel | null = null;
    private appName: string = "";
    private consumerMap: Map<EventType, (event: Event) => void> = new Map();

    private logger: Logger | null = null;

    private static instance: Amqp | null = null;

    private constructor() { }

    private async consume() {
        if (!this.channel || !this.appName)
            throw new Error("AMQP not initialized.");
        await this
            .channel
            .consume(this.appName, (msg) => {
                if (!msg)
                    return;
                const event: Event = JSON.parse(msg.content.toString());
                this.logger!.debug("Received event: " + JSON.stringify(event));
                const callback = this.consumerMap.get(event.type);
                if (callback)
                    callback(event);
            }, {noAck: true});
    }

    public addConsumer(type: EventType, callback: (event: Event) => void) {
        this.consumerMap.set(type, callback);
    }

    public publish(event: Event) {
        if (!this.channel || !this.appName)
            throw new Error("AMQP not initialized.");
        this.logger!.debug("Publishing event: " + JSON.stringify(event));
        this
            .channel
            .publish(EXCHANGE_NAME, "", Buffer.from(JSON.stringify(event)));
    }

    public static async initialize(
        url: string,
        appName: string,
        logger?: Logger
    ) {
        this.instance = new Amqp();
        if (logger)
            this.instance.logger = logger;
        else
            this.instance.logger = {
                debug: (_: string) => {},
                error: (_: string) => {}
            };

        this.instance.appName = appName;
        try {
            this.instance.conn = await amqplib.connect(url);
            this.instance.channel = await this.instance.conn!.createChannel();

        } catch (err: any) {
            this.instance.logger.error("Failed to connect to AMQP: " + err);
            process.exit(1);
        }

        try {
            await this
                .instance
                .channel!
                .assertExchange(EXCHANGE_NAME, "fanout", {durable: true});
            await this
                .instance
                .channel!
                .assertQueue(appName, {durable: true});
            await this
                .instance
                .channel!
                .bindQueue(appName, EXCHANGE_NAME, "");
        } catch (err: any) {
            this.instance.logger.error("Failed to assert queue/exchange: " + err);
            process.exit(1);
        }

        this.instance.logger.debug("Connected to AMQP.");
        this.instance.consume().then(() => {});
    }

    /*
    * This method initializes the AMQP connection using the URL and APP_NAME
    * environment variables. It also sets up the consumer for the APP_NAME queue.
    * If the environment variables are not set, an error is thrown.
    *
    * Needed environment variables:
    * - RABBITMQ_URI: The URL of the RabbitMQ server.
    * - APP_NAME: The name of the application.
    * */
    public static initializeFromEnv(logger?: Logger) {
        const url = process.env.RABBITMQ_URI;
        const appName = process.env.APP_NAME;
        if (!url || !appName)
            throw new Error("AMQP_URL and APP_NAME must be set.");
        return this.initialize(url, appName, logger);
    }

    public static getInstance() {
        if (!this.instance)
            throw new Error("AMQP not initialized.");
        return this.instance;
    }
    public static isInitialized() {
        return !!this.instance;
    }
    public static getConn(): amqplib.Connection {
        if (!this.instance)
            throw new Error("AMQP not initialized.");
        if (!this.instance.conn)
            throw new Error("AMQP connection not initialized.");
        return this.instance.conn;
    }
    public static getChannel(): amqplib.Channel {
        if (!this.instance)
            throw new Error("AMQP not initialized.");
        if (!this.instance.channel)
            throw new Error("AMQP channel not initialized.");
        return this.instance.channel;
    }

    public static async close() {
        if (!this.instance)
            throw new Error("AMQP not initialized.");
        if (this.instance.conn)
            await this.instance.conn.close();
    }
}

process.on("SIGINT", async () => {
    if (Amqp.isInitialized())
        await Amqp.close();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    if (Amqp.isInitialized())
        await Amqp.close();
    process.exit(0);
});