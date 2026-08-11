import { NextRequest, NextResponse } from "next/server";
import { redis } from "../../../../lib/redis";
import { Resend } from "resend";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error:
