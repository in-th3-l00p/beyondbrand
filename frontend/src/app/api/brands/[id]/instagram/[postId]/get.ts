import {NextResponse} from "next/server";
import InstagramPost from "@/database/schema/instagramPost";

export default async function GET(req: Request, { params }: { params: { postId: string } }) {
    const { postId } = params;
    return NextResponse.json(await InstagramPost.findById(postId));
}