import {z} from "zod";
// @ts-ignore
import openai from "@/utils/openai";
import {NextResponse} from "next/server";

const BodySchema = z.object({
    prompt: z.string().max(500),
    colors: z.array(z.string()).max(6),
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

    const body = BodySchema.safeParse(jsonBody);
    if (!body.success) {
        // @ts-ignore
        return new Response(
            JSON.stringify({errors: body.error}),
            {status: 400}
        );
    }

    const response = await openai.images.generate({
        model: "dall-e-3",
        quality: "hd",
        style: "natural",
        n: 1,
        response_format: "b64_json",
        prompt: `Generate a logo using the following prompt: "${body.data.prompt}", and using the colors ${body.data.colors.join(", ")}. No letters, and only one iteration.`,
    });

    return NextResponse.json(response.data[0]);
}