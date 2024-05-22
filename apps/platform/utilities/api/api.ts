"use server";

import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE, API_BASE } from "..";
import { mutate, query, type HTTPMethod, type Result } from "../https";
import type { APIRoute } from "./routes";

export const APIQuery = async <T>(
  route: APIRoute,
  queryString?: string,
  headers: Record<string, string> = {},
  nextConfig: NextFetchRequestConfig = {}
): Promise<Result<T>> => {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE)?.value;
  return await query<T>(
    `${API_BASE}${route}`,
    queryString,
    {
      ...headers,
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
    },
    nextConfig
  );
};

export const APIMutate = async <T, K>(
  route: APIRoute,
  method: HTTPMethod,
  data: T,
  qs?: string,
  headers: Record<string, string> = {},
  nextConfig: NextFetchRequestConfig = {}
): Promise<Result<K>> => {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE)?.value;
  const res = await mutate<T, K>(
    `${API_BASE}${route}`,
    method,
    data,
    qs,
    {
      ...headers,
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
    },
    nextConfig
  );
  console.log(res);
  return res;
};
