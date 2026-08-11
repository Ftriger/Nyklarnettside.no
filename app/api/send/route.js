import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

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

export async function POST(request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
  }

  const { to, subject, text } = await request.json();
  if (!to || !subject || !text) {
    return NextResponse.json({ error: "Mangler mottaker, emne eller tekst" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "post@klarnettside.no";
  if (!apiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY er ikke satt i Vercel-prosjektet" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Resend avviste sendingen" },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, id: data.id });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Nettverksfeil" }, { status: 500 });
  }
}
