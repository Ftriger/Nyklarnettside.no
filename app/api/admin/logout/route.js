import { NextResponse } from "next/server";

export async function POST(request) {
  const url = new URL(request.url);
  url.pathname = "/admin/login";
  const response = NextResponse.redirect(url);
  response.cookies.delete("admin_auth");
  return response;
}
