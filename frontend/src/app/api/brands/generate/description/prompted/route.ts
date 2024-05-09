import {z} from "zod";
import openai from "@/utils/openai";
import {NextResponse} from "next/server";

const bodySchema = z.object({
    name: z.string().max(255).optional(),
    prompt: z.string().max(500).min(10)
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
                    "Generate a description for a brand, based on the given prompt. " +
                    "Also, there is an optional \"Name\" field, that represents the brand's name. " +
                    "Generate the response as JSON, the description value having the \"brandDescription\" key."
            },
            {
                role: "user",
                content: "Name: " + body.data.prompt + (body.data.name ? "\nName: " + body.data.name : "")
            }
        ]
    });

    return NextResponse.json(
        JSON.parse(response.choices[0].message.content!)
    );
}
