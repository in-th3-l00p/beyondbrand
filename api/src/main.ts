import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express()

app.get("/", (req, res) => {
    res.send("hello world!");
});

app.listen(process.env.PORT || 3001, () => {
    console.log("nodejs api started on port:", process.env.PORT || 3001);
});
