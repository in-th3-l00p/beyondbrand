import {z} from "zod";
import openai from "@/utils/openai";
import {NextResponse} from "next/server";

const bodySchema = z.object({
    description: z.string().max(500).min(10)
})

export async function POST(req: Request) {
    let body;
    try {
        const jsonBody = await req.json();
        body = bodySchema.safeParse(jsonBody);
        if (!body.success) {
            return NextResponse.json(
                {errors: body.error},
                {status: 400}
            );
        }
    } catch (e) {
        return NextResponse.json(
            {errors: "Invalid JSON body."},
            {status: 400}
        );
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
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
                content: body.data.description
            }
        ]
    });

    return NextResponse.json(
        JSON.parse(response.choices[0].message.content!)
    );
}