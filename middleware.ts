import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const HIDDEN_ROUTES = ["/about", "/recruiting", "/error"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const shouldRedirect = HIDDEN_ROUTES.some(
    (base) => pathname === base || pathname.startsWith(base + "/"),
  );
  if (shouldRedirect) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/about",
    "/about/:path*",
    "/recruiting",
    "/recruiting/:path*",
    "/error",
    "/error/:path*",
  ],
};
