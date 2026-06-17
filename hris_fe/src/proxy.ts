import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface TokenPayload {
  role?: "admin" | "user";
  id_pegawai?: number;
}

function decodeToken(token: string): TokenPayload | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const decoded = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const payload = token ? decodeToken(token) : null;

  if (pathname === "/login") {
    if (payload?.role) {
      return NextResponse.redirect(
        new URL(`/${payload.role}/dashboard`, request.url),
      );
    }
    return NextResponse.next();
  }

  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${payload.role}/dashboard`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/admin/:path*", "/user/:path*"],
};
