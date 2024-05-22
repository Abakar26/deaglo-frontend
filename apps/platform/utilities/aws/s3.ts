"use server";

import type { APIResponse } from "@/app/interactors";
import { GetObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";
import type { Readable } from "node:stream";
import { pipeline } from "stream";
import { promisify } from "util";
import { createGunzip } from "zlib";
import { s3 } from ".";

const pipelineAsync = promisify(pipeline);

export async function getAndUnzipObject<T>(
  bucketName: string,
  key: string
): Promise<APIResponse<T>> {
  try {
    const getObjectParams = {
      Bucket: bucketName,
      Key: key,
    };
    const data = await s3.send(new GetObjectCommand(getObjectParams));

    if (data.Body && data.LastModified) {
      const gunzip = createGunzip();
      const chunks: Buffer[] = [];

      await pipelineAsync(data.Body as Readable, gunzip, async function* (source) {
        for await (const chunk of source) {
          chunks.push(chunk as Buffer);
        }
      });

      const decompressedData = Buffer.concat(chunks).toString("utf-8");
      const jsonData = JSON.parse(decompressedData) as T;

      return [jsonData];
    } else {
      return [undefined, "There was an issue retrieving results"];
    }
  } catch (error) {
    console.error(error);
    return [undefined, `Error in getting or parsing S3 file: ${error?.toString()}`];
  }
}

export const getObject = async (
  Bucket: string,
  Key: string
): Promise<APIResponse<{ data: string }>> => {
  const command = new GetObjectCommand({
    Bucket,
    Key,
  });

  try {
    const { Body, LastModified } = await s3.send(command);
    if (!Body || !LastModified) throw Error("There was an issue retrieving results");

    const bodyContents = await Body.transformToString();
    const updatedAt = LastModified;
    return [{ data: bodyContents }];
  } catch (e) {
    if (e instanceof S3ServiceException) {
      const response = e.$response;
      return [undefined, response?.body];
    }
    return [undefined, e?.toString()];
  }
};
