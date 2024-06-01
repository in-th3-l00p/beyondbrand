import isAuthenticated from "@/app/api/utils/isAuthenticated";
import getUser from "@/app/api/utils/getUser";
import Brand from "@/database/schema/brand";
import {NextResponse} from "next/server";
import Amqp from "streaming";
import logger from "@/utils/logger";
import {EventType} from "streaming/src/event";

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("_id");

    const {error, session} = await isAuthenticated();
    if (error)
        return error;
    const user = await getUser(session);
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

    await brand.deleteOne();
    if (!Amqp.isInitialized())
        await Amqp.initializeFromEnv(logger);
    Amqp.getInstance().publish({
        type: EventType.BRAND_DELETED,
        data: brand
    });
    return NextResponse.json({});
}