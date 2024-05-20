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
        model: "dall-e-3",
        quality: "hd",
        style: "natural",
        n: 1,
        response_format: "b64_json",
        prompt: `Design a realistic logo for a company with the name of ${body.data.name}, the company is about ${body.data.description} using the colors ${body.data.colors.join(", ")}. The generation should have only one grpahic in the center. The logo should not have any letters on it. Center the logo. Make it a simple vectorial graphics. Make sure it is only one graphic per generation, only one logo on image.`,
    });

    return NextResponse.json(response.data[0]);
}