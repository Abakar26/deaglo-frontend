import { DEFAULT_ERROR_MESSAGE } from "./constants";
import { type Data } from "./data";

export enum HTTPMethod {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  PATCH = "PATCH",
  HEAD = "HEAD",
  DELETE = "DELETE",
}

export interface Result<T> {
  success: boolean;
  reply?: T;
  error?: string;
  status?: string;
  statusText?: string;
}

export const query = async <T>(
  url: string,
  headers: Data = {},
  qs?: string
): Promise<Result<T>> => {
  const options = {
    method: HTTPMethod.GET,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  try {
    let endpoint = url;
    if (qs) endpoint = `${endpoint}${qs}`;

    const response = await fetch(endpoint, options);

    if (response.status === 401) {
      throw new Error("Your session has expired, please reauthenticate.");
    }

    let reply: T | undefined;
    try {
      reply = (await response.json()) as T;
    } catch (error) {
      throw new Error(DEFAULT_ERROR_MESSAGE);
    }

    return {
      success: true,
      reply,
    };
  } catch (error) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};

export const mutate = async <T>(
  url: string,
  payload: Data = {},
  headers: Data = {},
  method: HTTPMethod = HTTPMethod.POST,
  qs?: string
): Promise<Result<T>> => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
  };

  try {
    let endpoint = url;
    if (qs) endpoint = `${endpoint}${qs}`;
    const response = await fetch(endpoint, options);

    if (response.status === 204) {
      return {
        success: true,
        reply: undefined,
      };
    }

    if (response.status === 401) {
      throw new Error("Your session has expired, please reauthenticate.");
    }

    let reply: T | undefined;
    let error: string | undefined;
    try {
      reply = (await response.json()) as T;
    } catch (e) {
      error = e as string;
    }

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(error ?? DEFAULT_ERROR_MESSAGE);
    }

    return {
      success: true,
      reply,
      error,
    };
  } catch (err) {
    return {
      success: false,
      error: DEFAULT_ERROR_MESSAGE,
    };
  }
};
