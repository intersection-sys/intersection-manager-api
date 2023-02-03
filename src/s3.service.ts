import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { DeleteObjectsRequest } from 'aws-sdk/clients/s3';
import { randomBytes } from 'crypto';

@Injectable()
export class S3Service {
  private APP_BASE_PATH = 'IntersectionManager/';

  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async deleteFileFromStorage(key: string) {
    const deletedFile = await this.s3_delete({
      fileKey: key,
      bucket: process.env.AWS_S3_BUCKET,
    });

    return deletedFile;
  }

  async deleteMultipleFilesFromStorage(key: string) {
    const deletedFile = await this.s3_delete({
      fileKey: key,
      bucket: process.env.AWS_S3_BUCKET,
    });

    return deletedFile;
  }

  async uploadFile(
    file: Express.Multer.File,
    path: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const { originalname, buffer, mimetype } = file;

    const uploadedFile = await this.s3_upload({
      file: buffer,
      bucket: process.env.AWS_S3_BUCKET,
      name: originalname,
      mimetype,
      path: this.APP_BASE_PATH + path,
    });

    return uploadedFile;
  }

  private async s3_deleteMultiple(data: {
    Objects: AWS.S3.ObjectIdentifierList;
    bucket: string;
  }) {
    const { bucket, Objects } = data;

    const params: DeleteObjectsRequest = {
      Bucket: bucket,
      Delete: {
        Objects,
      },
    };

    try {
      const s3Response = await this.s3.deleteObjects(params).promise();

      return s3Response;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async s3_delete(data: { fileKey: string; bucket: string }) {
    const { bucket, fileKey } = data;

    const params = {
      Bucket: bucket,
      Key: fileKey,
    };

    try {
      const s3Response = await this.s3.deleteObject(params).promise();

      return s3Response;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async s3_upload(data: {
    file: Buffer;
    bucket: string;
    name: string;
    mimetype: string;
    path: string;
  }) {
    const { file, bucket, name, mimetype, path } = data;

    const params = {
      Bucket: bucket,
      Key: `${path}${String(randomBytes(16).toString('hex'))}-${String(name)}`,
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_S3_DEFAULT_REGION,
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();

      return s3Response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
