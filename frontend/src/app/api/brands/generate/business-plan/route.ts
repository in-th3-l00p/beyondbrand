import {z} from "zod";
import Brand from "@/database/schema/brand";
import openai from "@/utils/openai";
import {NextResponse} from "next/server";

const schema = z.object({
    _id: z.string(),
    prompt: z.string().max(500),
});

export async function POST(req: Request) {
    let jsonBody;
    try {
        jsonBody = await req.json();
    } catch (e) {
        return new Response(
            JSON.stringify({errors: "Invalid JSON jsonBody."}),
            {status: 400}
        );
    }

    const body = schema.safeParse(jsonBody);
    if (!body.success) {
        // @ts-ignore
        return new Response(
            JSON.stringify({errors: body.error}),
            {status: 400}
        );
    }

    const brand = await Brand.findById(body.data._id);
    if (!brand)
        return new Response(
            JSON.stringify({errors: "Brand not found."}),
            {status: 404}
        );

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
                    `Also make sure to use the additional prompt: ${body.data.prompt}`
            }
        ]
    });

    return NextResponse.json({
        businessPlan: response.choices[0].message.content!
    });
}