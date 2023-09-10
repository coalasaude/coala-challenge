import { S3 } from '@aws-sdk/client-s3';
import { Storage } from './storage.interface';

export class S3Storage implements Storage {
  private readonly s3Client: S3;
  private readonly bucketName: string;

  constructor(params: { bucketName?: string }) {
    this.s3Client = new S3({ region: process.env.AWS_REGION });
    this.bucketName = params?.bucketName || process.env.AWS_S3_BUCKET_NAME;
  }

  async upload(params: Storage.UploadParams): Promise<Storage.UploadResponse> {
    const { file, path, mimetype } = params;

    await this.s3Client.putObject({
      Bucket: this.bucketName,
      Key: path,
      Body: file,
      ContentType: mimetype,
    });

    const url = `https://${this.bucketName}.s3.amazonaws.com/${path}`;

    return { url };
  }
}
