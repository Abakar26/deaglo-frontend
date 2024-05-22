import { JWTPayload } from "@/app/interface";
import { jwtDecode } from "jwt-decode";

export const decode = (jwt: string): JWTPayload => {
  return jwtDecode(jwt) as JWTPayload;
};

export const isValid = (jwt: string): boolean => {
  const { exp } = jwtDecode(jwt) as JWTPayload;
  return exp * 1000 > Date.now();
};
