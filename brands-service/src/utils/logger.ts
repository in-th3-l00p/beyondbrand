import winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: `logs/${new Date().getUTCDate()}.log`
        }),
    ]
});

export default logger;