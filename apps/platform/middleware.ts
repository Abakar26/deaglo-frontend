import { refresh as RefreshInteractor } from "@/app/interactors/auth";
import {
  ACCESS_TOKEN_COOKIE,
  DEBUG,
  REFRESH_TOKEN_COOKIE,
  VERIFIED_COOKIE,
} from "@/utilities/constants";
import { isValid } from "@/utilities/jwt";
import { NextResponse, type NextRequest } from "next/server";

const blacklist = ["/management", "/premium", "/payment-portal", "/network", "/tutorial"];

export async function middleware(request: NextRequest) {
  if (!DEBUG && blacklist.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(
      request.headers.get("referer") ?? new URL("/dashboard", request.url)
    );
  }
  return verifyAuthentication(request);
}

export const config = {
  matcher: [
    "/analysis/:path*",
    "/dashboard/:path*",
    "/management/:path*",
    "/market/:path*",
    "/network/:path*",
    "/payment-portal/:path*",
    "/premium/:path*",
    "/tutorial/:path*",
  ],
};

async function verifyAuthentication(request: NextRequest) {
  const access = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  const accessValid = access && isValid(access);
  const refreshValid = refresh && isValid(refresh);

  if (!accessValid && refreshValid) {
    const [reply] = await RefreshInteractor(refresh);
    if (reply) {
      const { access: accessToken } = reply;
      const response = NextResponse.next();
      response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken);
      return response;
    }
  }

  if (!accessValid) {
    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    response.cookies.delete(ACCESS_TOKEN_COOKIE);
    response.cookies.delete(REFRESH_TOKEN_COOKIE);
    response.cookies.delete(VERIFIED_COOKIE);
    return response;
  }
  return NextResponse.next();
}
