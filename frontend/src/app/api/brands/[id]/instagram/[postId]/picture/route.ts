import {z} from "zod";
import {NextResponse} from "next/server";
import InstagramPost, {IInstagramPost, Shape} from "@/database/schema/instagramPost";
import s3 from "@/utils/s3";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import mime from "mime-types";

const schema = z.object({
    index: z.number(),
    postId: z.string(),
    picture: z.string(),
});

export async function PUT(req: Request, res: Response) {
    let body;
    try {
        body = schema.safeParse(await req.json());
    } catch (e) {
        return NextResponse.json({ error: [{
                message: "Invalid request body",
            }] }, { status: 400 });
    }

    if (!body.success) {
        return NextResponse.json({ error: body.error }, { status: 400 });
    }

    const post = await InstagramPost.findById(body.data.postId);
    if (!post) {
        return NextResponse.json({ error: [{
                message: "Post not found",
            }] }, { status: 404 });
    }

    let pictureHeader, pictureData;
    try {
        [ pictureHeader, pictureData ] = body.data.picture.split(";");

        await s3.send(new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: "post/" + post._id + "/" + `${post.shapes[body.data.index]._id}.${mime.extension(pictureHeader.split(":")[1])}`,
            Body: Buffer.from(pictureData.split(",")[1], "base64"),
        }));
    } catch (e) {
        return NextResponse.json(
            { error: "Failed to upload logo" },
            { status: 500 }
        );
    }

    post.shapes[body.data.index].data.src = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/post/${post._id}/${post.shapes[body.data.index]._id}.${mime.extension(pictureHeader.split(":")[1])}`;
    await post.save();
    return NextResponse.json(post);
}