import {NextResponse} from "next/server";
import InstagramPost from "@/database/schema/instagramPost";
import {Params} from "@/app/api/brands/[id]/instagram/[postId]/route";
import Brand from "@/database/schema/brand";
import {getSession} from "@auth0/nextjs-auth0";

export default async function GET(req: Request, { params }: Params) {
    const { id, postId } = params;
    const session = await getSession();
    if (!session)
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );

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
    if (brand.owner !== session.user.sub)
        return NextResponse.json(
            {error: "Unauthorized"},
            {status: 403}
        );

    return NextResponse.json(await InstagramPost.findById(postId));
}