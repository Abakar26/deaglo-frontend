"use server";

import type { HTTPMethod, HttpError, Result } from ".";
import { DEFAULT_ERROR_MESSAGE } from "..";
import { logError, logInfo } from "../logger";

export const mutate = async <T, K>(
  url: string,
  method: HTTPMethod,
  payload: T,
  qs = "",
  headers: Record<string, string> = {},
  nextConfig: NextFetchRequestConfig = {}
): Promise<Result<K>> => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
    next: nextConfig,
  };
  try {
    let endpoint = url;
    if (qs) endpoint = `${endpoint}${qs}`;
    const response = await fetch(endpoint, options);
    const responseJson = (await response.json()) as HttpError;

    if (response.ok) {
      logInfo(`${method} ${endpoint}`, {
        status: response.status,
        statusText: response.statusText,
      });
    } else {
      logError(`${method} ${endpoint}`, {
        ...responseJson,
        status: response.status,
        statusText: response.statusText,
      });
    }

    return {
      success: response.ok,
      reply: response.ok ? (responseJson as K) : undefined,
      error: !response.ok ? responseJson.error : undefined,
      detail: !response.ok ? responseJson?.detail : undefined,
      status: response.status,
    };
  } catch (error) {
    logError(error as string);
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
      status: 500,
    };
  }
};
