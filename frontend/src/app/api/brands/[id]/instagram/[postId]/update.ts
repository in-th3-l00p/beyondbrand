import {Params} from "@/app/api/brands/[id]/instagram/[postId]/route";
import {NextResponse} from "next/server";
import {z} from "zod";
import InstagramPost from "@/database/schema/instagramPost";
import isAuthenticated from "@/app/api/utils/isAuthenticated";
import getUser from "@/app/api/utils/getUser";
import Brand from "@/database/schema/brand";

const bodySchema = z.object({
    name: z.string().max(255).min(1),
    shapes: z.array(z.object({
        name: z.string().max(255).min(1).optional(),
        shape: z.enum(["rectangle", "circle", "picture"]),
        data: z.object({
            x: z.number(),
            y: z.number(),
            width: z.number().optional(),
            height: z.number().optional(),
            radius: z.number().optional(),
            color: z.string().min(1).max(255),
            src: z.string().optional()
        })
    }))
});

export default async function PUT(req: Request, { params }: Params) {
    const { id, postId } = params;
    const { error, session } = await isAuthenticated();
    if (error) return error;
    const user = await getUser(session);

    let brand;
    try {
        brand = await Brand.findById(id);
    } catch (e) {
        return NextResponse.json(
            {error: "Brand not found"},
            {status: 404}
        );
    }

    if (!brand)
        return NextResponse.json(
            {error: "Brand not found"},
            {status: 404}
        );
    if (!brand.owner.equals(user._id))
        return NextResponse.json(
            {error: "Unauthorized"},
            {status: 403}
        );

    let body;
    try {
        body = bodySchema.safeParse(await req.json());
    } catch (e) {
        return NextResponse.json({ error: [{
            message: "Invalid request body",
        }] }, { status: 400 });
    }

    if (!body.success) {
        return NextResponse.json({ error: body.error }, { status: 400 });
    }

    return NextResponse.json(await InstagramPost.findByIdAndUpdate(
        postId, body.data, { new: true }
    ));
}