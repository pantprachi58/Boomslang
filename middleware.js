import { NextResponse } from "next/server";
import { AUTH_ROLE_COOKIE } from "@/lib/authStorage";

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const role = request.cookies.get(AUTH_ROLE_COOKIE)?.value;

  if (pathname.startsWith("/admin")) {
    if (!role) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }

    if (role !== "admin") {
      const unauthorizedUrl = new URL("/unauthorized", request.url);
      unauthorizedUrl.searchParams.set("from", `${pathname}${search}`);
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  if (
    ["/profile", "/address", "/orders", "/change-password"].some((path) =>
      pathname.startsWith(path)
    )
  ) {
    if (!role) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/address/:path*",
    "/orders/:path*",
    "/change-password/:path*",
  ],
};
