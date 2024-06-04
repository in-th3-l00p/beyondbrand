require("dotenv").config();

import express, {json} from "express";
import logger from "./utils/logger";
import morgan from "morgan";
import cors from "cors";
import initializeAmqp from "./utils/amqp";
import initializeMongoose from "./utils/mongoose";

import NameRouter from "./routes/name";
import DescriptionRouter from "./routes/description";
import ColorsRouter from "./routes/colors";
import LogoRouter from "./routes/logo";
import BusinessPlanRouter from "./routes/businessPlan";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(morgan("combined", {
    "stream": {
        write: (message) => {
            logger.info(message);
        }
    }
}));
app.use(json());
app.use("/api/generation/name", NameRouter);
app.use("/api/generation/description", DescriptionRouter);
app.use("/api/generation/colors", ColorsRouter);
app.use("/api/generation/logo", LogoRouter);
app.use("/api/generation/business-plan", BusinessPlanRouter);

(async () => {
    await initializeMongoose();
    await initializeAmqp();

    // executing the express app
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        logger.info("Server started on port " + PORT + ".");
    });
})();
