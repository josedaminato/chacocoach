import { NextRequest, NextResponse } from "next/server";

const STUDIO_SESSION = "studio_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

export async function POST(request: NextRequest) {
  const password = process.env.STUDIO_PASSWORD;
  if (!password) {
    return NextResponse.json(
      { error: "Studio no configurado. Definir STUDIO_PASSWORD en .env" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const submitted = body?.password ?? "";

  if (submitted !== password) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const from = (body?.from as string) || "/studio";
  const response = NextResponse.json({ ok: true, redirect: from });
  response.cookies.set(STUDIO_SESSION, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return response;
}
