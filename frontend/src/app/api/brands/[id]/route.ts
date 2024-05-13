import {NextResponse} from "next/server";
import Brand from "@/database/schema/brand";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const brand = await Brand.findById(params.id);

    return NextResponse.json(brand);
}