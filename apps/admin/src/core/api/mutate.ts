import {
  BASE_URL,
  type Data,
  HTTPMethod,
  type Result,
  TOKEN_KEY,
  mutate,
} from "../../core/utilities";

import { type APIRoute } from ".";

export const mutateAPI = async <T>(
  route: APIRoute,
  payload: Data = {},
  headers: Data = {},
  method: HTTPMethod = HTTPMethod.POST,
  qs?: string
): Promise<Result<T>> => {
  const url = `${BASE_URL}${route}`;
  return await mutate(url, payload, headers, method, qs);
};

export const authenticatedMutation = async <T>(
  route: APIRoute,
  payload: Data = {},
  headers: Data = {},
  method: HTTPMethod = HTTPMethod.POST,
  qs?: string
): Promise<Result<T>> => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    return await mutateAPI<T>(
      route,
      payload,
      {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      method,
      qs
    );
  }
  return {
    success: false,
  };
};
