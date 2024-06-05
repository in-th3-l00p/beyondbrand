import {NextResponse} from "next/server";
import Brand from "@/database/schema/brand";
import {getSession} from "@auth0/nextjs-auth0";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const brand = await Brand.findById(params.id);

    const session = await getSession();
    if (!session)
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    if (brand.owner !== session.user.sub)
        return NextResponse.json(
            { error: "Forbidden" },
            { status: 403 }
        );

    return NextResponse.json(brand);
}