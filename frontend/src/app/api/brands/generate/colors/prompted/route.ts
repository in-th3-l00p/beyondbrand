import {z} from "zod";
import openai from "@/utils/openai";
import {NextResponse} from "next/server";
import isAuthenticated from "@/app/api/utils/isAuthenticated";

const BodyScheme = z.object({
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

    const { searchParams } = new URL(req.url);
    if (!searchParams.get("colors"))
        return new Response(
            JSON.stringify({errors: "Missing \"colors\" query parameter."}),
            {status: 400}
        );

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
        temperature: 1.0,
        max_tokens: 50,
        messages: [
            {
                role: "system",
                content:
                    "Generate a color scheme for a brand." +
                    `Make sure you generate ${searchParams.get("colors")} colors, and use the query if given. ` +
                    "Generate the response as JSON, the colors being an array of strings stored on the \"colors\" key ." +
                    "Make sure the colors are in hex format (ex: #FFFFFF). " +
                    "Make sure you don't mess up the array with any float values."
            },
            {
                role: "user",
                content:
                    (body.data.description ? "Query: " + body.data.description + "\n" : "")
            }
        ]
    });

    return NextResponse.json(
        JSON.parse(response.choices[0].message.content!)
    );
}
