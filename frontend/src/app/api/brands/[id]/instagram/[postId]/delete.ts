import {Params} from "@/app/api/brands/[id]/instagram/[postId]/route";
import InstagramPost from "@/database/schema/instagramPost";
import {NextResponse} from "next/server";

export default async function DELETE(req: Request, { params }: Params) {
    const { postId } = params;
    // const post = await InstagramPost.findById(postId);
    await InstagramPost.findByIdAndDelete(postId);
    return NextResponse.json({ success: true });
}