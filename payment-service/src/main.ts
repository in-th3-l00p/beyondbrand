require("dotenv").config();

import express, {json} from "express";
import logger from "./utils/logger";
import morgan from "morgan";
import cors from "cors";
import initializeAmqp from "./utils/amqp";
import initializeMongoose from "./utils/mongoose";

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(morgan("combined", {
    "stream": {
        write: (message) => {
            logger.info(message);
        }
    }
}));
app.use(json());

(async () => {
    await initializeMongoose();
    await initializeAmqp();

    const PORT = process.env.PORT || 3002;
    app.listen(() => {
        logger.info("Server started on port " + PORT + ".");
    })
})();
