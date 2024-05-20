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
        model: "dall-e-2",
        quality: "hd",
        style: "natural",
        n: 1,
        response_format: "b64_json",
        size: "256x256",
        prompt: `Design a realistic logo using the following prompt: ${body.data.prompt} using the colors ${body.data.colors.join(", ")}. The logo should not have any letters on it.`,
    });

    return NextResponse.json(response.data[0]);
}