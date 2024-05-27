import express from "express";
import winston from "winston";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/api/generation", (req, res) => {
    res.send({ generation: "generation" });
})

app.listen(PORT, () => {
    winston.info("Server started on port " + PORT);
});
