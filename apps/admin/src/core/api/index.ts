export enum APIRoute {
  AUTH = "/auth/signin/",
  REFRESH = "/auth/refresh/",
  FORGOT_PASSWORD = "/auth/forgot-password/",
  ORGANIZATION = "/admin/organization/",
  USER = "/admin/user/",
}

export * from "./mutate";
export * from "./query";
