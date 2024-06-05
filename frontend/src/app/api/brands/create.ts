import {z} from "zod";
import {NextResponse} from "next/server";
import Brand from "@/database/schema/brand";
import s3 from "@/utils/s3";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import mime from "mime-types";
import Amqp from "streaming";
import {EventType} from "streaming/src/event";
import logger from "@/utils/logger";
import {getSession} from "@auth0/nextjs-auth0";

const bodySchema = z.object({
    name: z.string().max(255).min(1),
    description: z.string().max(500).min(1),
    colors: z.array(z.string().length(7)).max(6),
    logo: z.string()
});

export async function POST(req: Request) {
    let body;
    try {
        body = bodySchema.safeParse(await req.json());
    } catch (e) {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 });
    }
    if (!body.success)
        return NextResponse.json(
            { error: body.error },
            { status: 400 }
        );

    const session = await getSession();
    if (!session)
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );

    let logoHeader, logoData;
    try {
        [ logoHeader, logoData ] = body.data.logo.split(";");

        await s3.send(new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: "brands/" + session.user.sub + "/" + `${body.data.name}.${mime.extension(logoHeader.split(":")[1])}`,
            Body: Buffer.from(logoData.split(",")[1], "base64"),
        }));
    } catch (e) {
        return NextResponse.json(
            { error: "Failed to upload logo" },
            { status: 500 }
        );
    }

    const brand = await Brand.create({
        name: body.data.name,
        description: body.data.description,
        colors: body.data.colors,
        logo: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/brands/${session.user.sub}/${body.data.name}.${mime.extension(logoHeader.split(":")[1])}`,
        owner: session.user.sub
    });

    if (!Amqp.isInitialized())
        await Amqp.initializeFromEnv(logger);
    Amqp.getInstance().publish({
        type: EventType.BRAND_CREATED,
        data: brand
    });

    return NextResponse.json(brand);
}