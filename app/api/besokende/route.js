import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv({ automaticDeserialization: false });

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function isAuthed() {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const cookieStore = cookies();
  const authCookie = cookieStore.get("admin_auth")?.value;
  return authCookie === hash(expected);
}

export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
  }
  try {
    const raw = await redis.lrange("besok:logg", 0, 499);
    const besok = raw
      .map((r) => {
        try {
          return JSON.parse(r);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
    return NextResponse.json({ besok });
  } catch (e) {
    return NextResponse.json(
      { error: "KV-database ikke koblet til ennå. Se LESMEG for oppsett." },
      { status: 500 }
    );
  }
}
