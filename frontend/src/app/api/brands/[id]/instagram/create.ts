import {z} from "zod";
import {NextResponse} from "next/server";
import InstagramPost from "@/database/schema/instagramPost";
import {Params} from "@/app/api/brands/[id]/instagram/types";
import {getSession} from "@auth0/nextjs-auth0";

const schema = z.object({
    name: z.string().max(255).min(1)
})

export default async function POST(req: Request, { params }: Params) {
    const session = await getSession();
    if (!session)
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success)
        return NextResponse.json({errors: parsed.error.errors}, {status: 400});

    // Create a new Instagram account for the brand
    const post = await InstagramPost.create({
        name: parsed.data.name,
        brandId: params.id
    });
    if (!post)
        return NextResponse
            .json({errors: ["Failed to create Instagram account"]}, {status: 500});
    return NextResponse.json(post);
}