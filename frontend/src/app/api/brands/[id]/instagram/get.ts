import {Params} from "@/app/api/brands/[id]/instagram/types";
import {NextResponse} from "next/server";
import InstagramPost from "@/database/schema/instagramPost";

// todo security
export default async function GET(req: Request, { params }: Params) {
    const { id } = params;
    return NextResponse.json(await InstagramPost.find({ brandId: id }));
}