import { S3Client } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, DEBUG } from "..";

export const AWS_CONFIG = {
  region: AWS_REGION,
  ...(DEBUG
    ? {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      }
    : {}),
};
export const s3 = new S3Client(AWS_CONFIG);
export { getAndUnzipObject } from "./s3";
