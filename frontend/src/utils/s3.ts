import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_IAM_ACCESS!,
        secretAccessKey: process.env.AWS_IAM_SECRET!
    }
});

export default s3;