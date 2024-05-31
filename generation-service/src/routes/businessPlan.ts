import Router from "express";
import {body, matchedData, param} from "express-validator";
import validate from "../middleware/validate";
import openai from "../utils/openai";
import Brand from "../models/brand";

const router = Router();

router.post(
    "/:id",
    param("id").isMongoId(),
    body("prompt")
        .isString()
        .isLength({max: 500})
        .optional(),
    validate,
    async (req, res) => {
        const { id, prompt } = matchedData(req);
        const brand = await Brand.findById(id);
        if (!brand)
            return res
                .status(404)
                .json({ errors: [
                    {
                        path: "id",
                        msg: "Brand not found."
                    }
                ]});

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            temperature: 1.0,
            messages: [
                {
                    role: "system",
                    content:
                        "Generate a business model for a brand, based on the given instructions. " +
                        "The business model should follow a lean canvas structure. " +
                        "Make sure to write the contents of each field in the canvas. " +
                        "Have the following fields: " +
                        "1. Problem: The problem the brand is solving. " +
                        "2. Solution: The solution the brand offers. " +
                        "3. Unique Value Proposition: The unique value proposition of the brand. " +
                        "4. Unfair Advantage: The unfair advantage of the brand. " +
                        "5. Revenue Streams: The revenue streams of the brand. " +
                        "6. Cost Structure: The cost structure of the brand. " +
                        "7. Key Metrics: The key metrics of the brand. " +
                        "8. Channels: The channels the brand uses. " +
                        "9. Customer Segments: The customer segments of the brand. " +
                        "10. Key Partners: The key partners of the brand. " +
                        "11. Key Activities: The key activities of the brand. " +
                        "12. Key Resources: The key resources of the brand. " +
                        "Output the business model as markdown"
                },
                {
                    role: "user",
                    content:
                        `The business name ${brand.name}, description: ${brand.description}. ` +
                        `Also make sure to use the additional prompt: ${prompt}`
                }
            ]
        });

        res.json({
            businessPlan: response.choices[0].message.content!
        });
    });

export default router;