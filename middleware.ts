import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STUDIO_SESSION = "studio_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir acceso a la página de login
  if (pathname === "/studio/login") {
    return NextResponse.next();
  }

  // Proteger todas las rutas bajo /studio
  if (pathname.startsWith("/studio")) {
    const session = request.cookies.get(STUDIO_SESSION)?.value;
    if (!session) {
      const loginUrl = new URL("/studio/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/studio/:path*",
};
