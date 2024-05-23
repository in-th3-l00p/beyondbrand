import {z} from "zod";
import openai from "@/utils/openai";
import {NextResponse} from "next/server";
import isAuthenticated from "@/app/api/utils/isAuthenticated";

const BodyScheme = z.object({
    name: z.string().min(1).max(255),
    description: z.string().max(500).optional(),
})

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

    const { error} = await isAuthenticated();
    if (error) return error;

    const body = BodyScheme.safeParse(jsonBody);
    if (!body.success) {
        return new Response(
            JSON.stringify({errors: body.error}),
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
                    "Generate or improve the description for a brand, " +
                    "based on the given name and description (if there is one)." +
                    "Generate the response as JSON, the description value having the \"brandDescription\" key."
            },
            {
                role: "user",
                content: "Name: " + body.data.name + "\nDescription: " + (body.data.description || "(generate one)") + "\n"
           }
        ]
    });

    return NextResponse.json(
        JSON.parse(response.choices[0].message.content!)
    );
}