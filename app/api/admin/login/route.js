import { NextResponse } from "next/server";
import crypto from "crypto";

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function POST(request) {
  const formData = await request.formData();
  const password = formData.get("password") || "";
  const expected = process.env.ADMIN_PASSWORD || "";

  const url = new URL(request.url);

  if (!expected) {
    // Ingen passord satt i miljøvariabler ennå
    url.pathname = "/admin/login";
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url);
  }

  if (password !== expected) {
    url.pathname = "/admin/login";
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url);
  }

  url.pathname = "/admin/utsending";
  url.searchParams.delete("error");
  const response = NextResponse.redirect(url);
  response.cookies.set("admin_auth", hash(expected), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dager
  });
  return response;
}
