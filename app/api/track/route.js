import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv({ automaticDeserialization: false });

const IP_CACHE_SEKUNDER = 60 * 30; // 30 min

const KONSUMENT_OG_BOT_NOKKELORD = [
  "telenor",
  "altibox",
  "telia",
  "get as",
  "ice fiber",
  "broadnet",
  "homenet",
  "viken fiber",
  "lyse",
  "phonero",
  "kvantel",
  "com4",
  "eidsiva",
  "nte",
  "google llc",
  "googlebot",
  "google cloud",
  "amazon",
  "microsoft corp",
  "cloudflare",
  "digitalocean",
  "hetzner",
  "ovh",
  "bot",
  "crawler",
];

function erKonsumentEllerBot(org) {
  const o = (org || "").toLowerCase();
  return KONSUMENT_OG_BOT_NOKKELORD.some((k) => o.includes(k));
}

export async function POST(request) {
  try {
    const { path, referrer } = await request.json();
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "ukjent";

    let info = null;
    if (ip !== "ukjent") {
      const cacheKey = `ipcache:${ip}`;
      try {
        const cached = await redis.get(cacheKey);
        info = cached ? JSON.parse(cached) : null;
      } catch (e) {
        info = null;
      }
      if (!info) {
        try {
          const res = await fetch(
            `http://ip-api.com/json/${ip}?fields=status,country,city,isp,org,as`
          );
          const data = await res.json();
          if (data.status === "success") {
            info = {
              org: data.org || data.isp || "Ukjent",
              isp: data.isp || "",
              city: data.city || "",
              country: data.country || "",
            };
            await redis.set(cacheKey, JSON.stringify(info), { ex: IP_CACHE_SEKUNDER });
          }
        } catch (e) {
          // gratis oppslag feiler av og til, ikke kritisk
        }
      }
    }

    const besok = {
      path: path || "/",
      referrer: referrer || "",
      org: info?.org || "Ukjent",
      isp: info?.isp || "",
      city: info?.city || "",
      country: info?.country || "",
      erKonsumentEllerBot: erKonsumentEllerBot(info?.org || info?.isp || ""),
      tid: new Date().toISOString(),
    };

    await redis.lpush("besok:logg", JSON.stringify(besok));
    await redis.ltrim("besok:logg", 0, 499);

    return NextResponse.json({ ok: true });
  } catch (e) {
    // sporing skal aldri knekke sidevisningen for den besøkende
    return NextResponse.json({ ok: false });
  }
}
