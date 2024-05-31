import {Router} from "express";
import {body, matchedData} from "express-validator";
import validate from "../middleware/validate";
import openai from "../utils/openai";
import logger from "../utils/logger";

const router = Router();

router.post(
    "/",
    body("name").isString().isLength({min: 1, max: 255}),
    body("description").optional().isString().isLength({max: 500}),
    validate,
    async (req, res) => {
        const {name, description} = matchedData(req);
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-0125",
                response_format: {type: "json_object"},
                temperature: 1.0,
                max_tokens: 100,
                messages: [
                    {
                        role: "system",
                        content:
                            "Generate or improve the description for a brand, " +
                            "based on the given name and description (if there is one)." +
                            "Generate the response as JSON, the description value having the \"brandDescription\" key."
                    },
                    {
                        role: "user",
                        content: "Name: " + name + "\nDescription: " + (description || "(generate one)") + "\n"
                    }
                ]
            });

            logger.info(`Description generation with ${response.usage?.total_tokens}`);
            res.json(JSON.parse(response.choices[0].message.content!));
        } catch (e) {
            res.status(500).end();
        }
    });

router.post(
    "/prompted",
    body("name").optional().isString().isLength({max: 255}),
    body("prompt").isString().isLength({min: 10, max: 500}),
    validate,
    async (req, res) => {
        const {name, prompt} = matchedData(req);
        try {

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-0125",
                response_format: { type: "json_object" },
                temperature: 1.0,
                max_tokens: 100,
                messages: [
                    {
                        role: "system",
                        content:
                            "Generate a description for a brand, based on the given prompt. " +
                            "Also, there is an optional \"Name\" field, that represents the brand's name. " +
                            "Generate the response as JSON, the description value having the \"brandDescription\" key."
                    },
                    {
                        role: "user",
                        content: "Prompt: " + prompt + (name ? "\nName: " + name : "")
                    }
                ]
            });

            logger.info(`Description generation with ${response.usage?.total_tokens}`);
            res.json(JSON.parse(response.choices[0].message.content!));
        } catch (e) {
            res.status(500).end();
        }
    });

export default router;