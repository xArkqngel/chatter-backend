import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { FileUploadOptions } from './file-upload-options.interface';

@Injectable()
export class S3Service {
  private readonly client: S3Client;

  constructor(configService: ConfigService) {
    const accessKeyId = configService.get<string>('AWS_ACCESS_KEY');
    const secretAccessKey = configService.get<string>('AWS_SECRET_ACCESS_KEY');
    // Ensure you specify your bucket's region here
    const region = configService.get<string>('AWS_REGION', 'us-east-1');

    const clientConfig: S3ClientConfig = {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    };

    this.client = new S3Client(clientConfig);
  }

  async upload({ bucket, key, file }: FileUploadOptions) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file,
      }),
    );
  }

  getObjectUrl(bucket: string, key: string) {
    return `https://${bucket}.s3.amazonaws.com/${key}`;
  }
}
