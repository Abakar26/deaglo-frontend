"use server";

import { HTTPMethod, type HttpError, type Result } from ".";
import { DEFAULT_ERROR_MESSAGE } from "..";
import { logError, logInfo } from "../logger";

export const query = async <T>(
  url: string,
  qs = "",
  headers: Record<string, string> = {},
  nextConfig: NextFetchRequestConfig = {}
): Promise<Result<T>> => {
  const options = {
    method: HTTPMethod.GET,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    next: nextConfig,
  };

  try {
    let endpoint = url;
    if (qs) endpoint = `${endpoint}${qs}`;
    const response = await fetch(endpoint, options);
    const responseJson = (await response.json()) as HttpError;

    if (response.ok) {
      logInfo(`${HTTPMethod.GET} ${endpoint}`, {
        status: response.status,
        statusText: response.statusText,
      });
    } else {
      logError(`${HTTPMethod.GET} ${endpoint}`, {
        ...responseJson,
        status: response.status,
        statusText: response.statusText,
      });
    }

    return {
      success: response.ok,
      reply: response.ok ? (responseJson as T) : undefined,
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
