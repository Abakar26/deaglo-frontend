export const BASE_URL = (import.meta.env.VITE_BASE_API as string | undefined) ?? "SOME_API_BASE";
export const DEFAULT_ERROR_MESSAGE = "An Error Occured...";
export const TOKEN_KEY = `${BASE_URL}:jwt`;
export const REFRESH_KEY = `${BASE_URL}:refresh`;

// TODO: Sync with back end JWT settings
export const TOKEN_TTL = 60 * 60 * 24; // TOKEN VALID FOR 1DAY
export const REFRESH_TTL = 60 * 60 * 24 * 7; // TOKEN VALID FOR 7DAYS
