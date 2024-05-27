import express from "express";
import winston from "winston";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    winston.info("Server started on port " + PORT);
});
