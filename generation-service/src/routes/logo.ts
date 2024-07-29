import Router from "express";
import {body, matchedData} from "express-validator";
import openai from "../utils/openai";
import validate from "../middleware/validate";
import auth0 from "../middleware/auth0";

const router = Router();

router.post(
    "/",
    auth0,
    body("name").isString().isLength({max: 255}),
    body("description").isString().isLength({max: 500}),
    body("colors").isArray({ min: 1, max: 6 }),
    validate,
    async (req, res) => {
        const { name, description, colors } = matchedData(req);
        const response = await openai.images.generate({
            model: "dall-e-3",
            quality: "hd",
            style: "natural",
            n: 1,
            response_format: "b64_json",
            prompt: `Generate a logo for ${name}, the company is about ${description} using the colors ${colors.join(", ")}. No letters, and only one iteration.`,
        });

        res.json(response.data[0]);
    });

router.post(
    "/prompted",
    body("prompt").isString().isLength({max: 500}),
    body("colors").isArray({ min: 1, max: 6 }),
    validate,
    async (req, res) => {
        const { prompt, colors } = matchedData(req);
        const response = await openai.images.generate({
            model: "dall-e-3",
            quality: "hd",
            style: "natural",
            n: 1,
            response_format: "b64_json",
            prompt: `Generate a logo using the following prompt: "${prompt}", and using the colors ${colors.join(", ")}. No letters, and only one iteration.`,
        });

        res.json(response.data[0]);
    });

export default router;