import {z} from "zod";
import openai from "@/utils/openai";
import {NextResponse} from "next/server";

const BodySchema = z.object({
    name: z.string().max(255),
    description: z.string().max(500),
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
        prompt: `A logo for a brand named ${body.data.name} with the following description: ${body.data.description}, and the following colors: ${body.data.colors.join(", ")}.`,
    });

    return NextResponse.json(response.data[0]);
}