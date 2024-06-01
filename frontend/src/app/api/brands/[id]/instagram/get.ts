import {Params} from "@/app/api/brands/[id]/instagram/types";
import {NextResponse} from "next/server";
import InstagramPost from "@/database/schema/instagramPost";
import Brand from "@/database/schema/brand";
import isAuthenticated from "@/app/api/utils/isAuthenticated";
import getUser from "@/app/api/utils/getUser";

// todo security
export default async function GET(req: Request, { params }: Params) {
    const { error, session } = await isAuthenticated();
    if (error) return error;
    const user = await getUser(session);

    const { id } = params;
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

    return NextResponse.json(await InstagramPost.find({ brandId: id }));
}