import Brand from "@/database/schema/brand";
import {NextResponse} from "next/server";
import Amqp from "streaming";
import logger from "@/utils/logger";
import {EventType} from "streaming/src/event";
import {getSession} from "@auth0/nextjs-auth0";

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("_id");

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

    await brand.deleteOne();
    if (!Amqp.isInitialized())
        await Amqp.initializeFromEnv(logger);
    Amqp.getInstance().publish({
        type: EventType.BRAND_DELETED,
        data: brand
    });
    return NextResponse.json({});
}