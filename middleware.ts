import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "randywow.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  // Force a single canonical host to avoid duplicate URL versions.
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
