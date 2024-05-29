import express, {json} from "express";
import logger from "./utils/logger";
import morgan from "morgan";
require("dotenv").config();

import NameRouter from "./routes/name";

const app = express();

app.use(morgan("combined", {
    "stream": {
        write: (message) => {
            logger.info(message);
        }
    }
}));
app.use(json());
app.use("/api/generation/name", NameRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info("Server started on port " + PORT);
});
