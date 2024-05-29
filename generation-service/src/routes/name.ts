import {Router} from "express";
import {body, matchedData} from "express-validator";
import openai from "../utils/openai";
import logger from "../utils/logger";
import validate from "../middleware/validate";

const router = Router();

router.post(
    "/",
    body("description")
        .notEmpty()
        .isLength({ min: 10, max: 500 }),
    validate,
    async (req, res) => {
        const body = matchedData(req);

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
                            "Generate a name for a brand, based on the given brief." +
                            "Generate the response as JSON, the name value having the \"brandName\" key."
                    },
                    {
                        role: "user",
                        content: body.description
                    }
                ]
            });

            logger.info(`Name generation with ${response.usage?.total_tokens}`);
            res.json(JSON.parse(response.choices[0].message.content!));
        } catch (e) {
            res.status(500).end();
        }
    });

router.post(
    "/prompted",
    body("prompt")
        .notEmpty()
        .isLength({ min: 10, max: 500 }),
    validate,
    async (req, res) => {
        const { prompt } = matchedData(req);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            response_format: { type: "json_object" },
            temperature: 1.0,
            max_tokens: 100,
            messages: [
                {
                    role: "system",
                    content:
                        "Generate a name for a brand, based on the given instructions." +
                        "Generate the response as JSON, the description value having the \"name\" key."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        return res.json(
            JSON.parse(response.choices[0].message.content!)
        );
    })

export default router;