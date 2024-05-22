export * from "./query";
export * from "./mutate";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
}

export interface Result<T> {
  success: boolean;
  reply?: T;
  error?: string;
  detail?: Record<string, string[]>;
  status: number;
}

export interface HttpError {
  error: string;
  detail: Record<string, string[]>;
}
