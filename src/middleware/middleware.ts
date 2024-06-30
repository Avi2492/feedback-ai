import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  const isPublicPath =
    url.pathname.startsWith("/sign-in") ||
    url.pathname.startsWith("/sign-up") ||
    url.pathname.startsWith("/verify") ||
    url.pathname === "/";

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request?.url));
  } else if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/sign-in", request?.url));
  }
  return NextResponse.next();
}
