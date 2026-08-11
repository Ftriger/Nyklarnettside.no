import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

function checkAuth(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  return pw === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const urls = (await redis.smembers("konkurrenter:list")) as string[];
  const data = await Promise.all(
    urls.map(async (url) => {
      const snapshot = await redis.get<{ hash: string; checkedAt: string; changedAt: string }>(
        `konkurrenter:snapshot:${url}`
      );
      return { url, ...snapshot };
    })
  );
  return NextResponse.json({ competitors: data });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "url mangler" }, { status: 400 });
  await redis.sadd("konkurrenter:list", url);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { url } = await req.json();
  await redis.srem("konkurrenter:list", url);
  await redis.del(`konkurrenter:snapshot:${url}`);
  return NextResponse.json({ ok: true });
}
