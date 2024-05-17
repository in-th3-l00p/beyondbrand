import {NextResponse} from "next/server";
import InstagramPost from "@/database/schema/instagramPost";
import {Params} from "@/app/api/brands/[id]/instagram/[postId]/route";

export default async function GET(req: Request, { params }: Params) {
    const { postId } = params;
    return NextResponse.json(await InstagramPost.findById(postId));
}