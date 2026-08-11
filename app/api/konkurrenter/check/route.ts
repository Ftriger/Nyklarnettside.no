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
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const urls = (await redis.smembers("konkurrenter:list")) as string[];
  const changes: string[] = [];

  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      const html = await res.text();
      const text = stripHtml(html);
      const hash = crypto.createHash("sha256").update(text).digest("hex");

      const prev = await redis.get<{ hash: string; changedAt: string }>(
        `konkurrenter:snapshot:${url}`
      );
      const now = new Date().toISOString();

      if (!prev) {
        await redis.set(`konkurrenter:snapshot:${url}`, { hash, checkedAt: now, changedAt: now });
      } else if (prev.hash !== hash) {
        await redis.set(`konkurrenter:snapshot:${url}`, { hash, checkedAt: now, changedAt: now });
        changes.push(url);
      } else {
        await redis.set(`konkurrenter:snapshot:${url}`, { ...prev, checkedAt: now });
      }
    } catch (e) {
      console.error(`Feil ved sjekk av ${url}`, e);
    }
  }

  if (changes.length > 0) {
    await resend.emails.send({
      from: "post@klarnettside.no",
      to: "post@klarnettside.no",
      subject: `Konkurrentendring oppdaget (${changes.length})`,
      text: `Disse sidene har endret innhold:\n\n${changes.join("\n")}`,
    });
  }

  return NextResponse.json({ checked: urls.length, changed: changes.length });
}
