"use server";
import type { JWTPayload } from "@/app/interface";
import { ACCESS_TOKEN_COOKIE, DEFAULT_ERROR_MESSAGE, RESULTS_BUCKET } from "@/utilities";
import { getAndUnzipObject } from "@/utilities/aws";
import { decode } from "@/utilities/jwt";
import { cookies } from "next/headers";
import { type APIResponse } from "..";
import { getObject } from "@/utilities/aws/s3";

export interface SimulationError {
  error: string;
}

export const getUser = (): JWTPayload | undefined => {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE)?.value;
  return jwt ? decode(jwt) : undefined;
};

export const getResults = async <T extends object>(
  simulationId: string,
  resultId: string
): Promise<APIResponse<T>> => {
  const user = getUser();
  if (user) {
    const filename = `${user.user_id}/${simulationId}/${resultId}.gz`;
    const [results, error] = await getAndUnzipObject<T | SimulationError>(RESULTS_BUCKET, filename);
    if (results) {
      if (isSimulationError(results)) {
        return [undefined, results.error];
      }
      return [results];
    } else {
      return [undefined, error?.toString()];
    }
  }
  return [undefined, DEFAULT_ERROR_MESSAGE];
};

export const getHedgeHarvestData = async <T extends object>(
  simulationId: string,
  resultId: string
): Promise<APIResponse<T>> => {
  const user = getUser();
  if (user) {
    const filename = `${user.user_id}/${simulationId}/${resultId}-input.csv`;
    const [results, error] = await getObject(RESULTS_BUCKET, filename);
    if (results) {
      if (isSimulationError(results)) {
        return [undefined, results.error];
      }
      return [results];
    } else {
      return [undefined, error?.toString()];
    }
  }
  return [undefined, DEFAULT_ERROR_MESSAGE];
};

function isSimulationError(data: unknown): data is SimulationError {
  return typeof data === "object" && data !== null && "error" in data;
}
