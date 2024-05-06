import {z} from "zod";
import {NextResponse} from "next/server";
import Brand from "@/database/schema/brand";
import getUser from "@/app/api/utils/getUser";
import isAuthenticated from "@/app/api/utils/isAuthenticated";
import s3 from "@/utils/s3";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import mime from "mime-types";

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

    const { error, session } = await isAuthenticated();
    if (error) return error;
    const user = await getUser(session);

    let logoHeader, logoData;
    try {
        [ logoHeader, logoData ] = body.data.logo.split(";");

        await s3.send(new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: "brands/" + user._id + "/" + `${body.data.name}.${mime.extension(logoHeader.split(":")[1])}`,
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
        logo: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/brands/${user._id}/${body.data.name}.${mime.extension(logoHeader.split(":")[1])}`,
        owner: user._id
    });

    return NextResponse.json(brand);
}