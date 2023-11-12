import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import path from "path"
import { configs } from "../configs";
import { UploadedFile } from "express-fileupload";

class S3Service {
    constructor(private s3Client = new S3Client({
        region: configs.AWS_S3_REGION,
        credentials: {
            accessKeyId: configs.AWS_ACCESS_KEY,
            secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
        }
    })
    ) {}

    public async uploadFile(
        file: UploadedFile,
        itemType: "advertisement",
        itemId: string
    ): Promise<string> {
        const filePath = this.buildPath(itemType, itemId, file.name);
        await this.s3Client.send(
            new PutObjectCommand({
                Key: filePath,
                ACL: "public-read",
                Bucket: configs.AWS_S3_BUCKET,
                Body: file.data,
                ContentType: file.mimetype
        }));
        return filePath;
    }
    private buildPath(itemType: string, itemId: string, filename: string) {
        return `${itemType}/${itemId}/${crypto.randomUUID()}${path.extname(filename)}`
    }

}

export const s3Service = new S3Service();