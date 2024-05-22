// import { Config } from "sst/node/config";

export const API_BASE = process.env.API_BASE ?? "http://127.0.0.1:8000/api/v2";
export const DEFAULT_ERROR_MESSAGE =
  "An error occured, please try again or contact support@deaglo.com if this issue persists.";
export const ACCESS_TOKEN_COOKIE = "ACCESS_TOKEN";
export const REFRESH_TOKEN_COOKIE = "REFRESH_TOKEN";
export const VERIFIED_COOKIE = "VERIFIED";

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION ?? "us-east-2";

export const DEBUG = process.env.DEBUG?.toLowerCase() == "true";

export const RESULTS_BUCKET = process.env.RESULTS_BUCKET ?? "dev-core-service-results";
