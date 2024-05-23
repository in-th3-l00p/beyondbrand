import {z} from "zod";
import openai from "@/utils/openai";
import {NextResponse} from "next/server";
import isAuthenticated from "@/app/api/utils/isAuthenticated";

const bodySchema = z.object({
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

    const { error} = await isAuthenticated();
    if (error) return error;

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
                content: body.data.prompt
            }
        ]
    });

    return NextResponse.json(
        JSON.parse(response.choices[0].message.content!)
    );
}
