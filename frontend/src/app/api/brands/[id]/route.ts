import {NextResponse} from "next/server";
import Brand from "@/database/schema/brand";
import isAuthenticated from "@/app/api/utils/isAuthenticated";
import getUser from "@/app/api/utils/getUser";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const brand = await Brand.findById(params.id);

    const { error, session } = await isAuthenticated();
    if (error) return error;
    const user = await getUser(session);
    if (!brand.owner.equals(user._id))
        return NextResponse.json(
            {error: "Unauthorized"},
            {status: 403}
        );

    return NextResponse.json(brand);
}