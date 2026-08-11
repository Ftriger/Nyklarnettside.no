import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import BesokendeClient from "./BesokendeClient";

export const dynamic = "force-dynamic";

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export default function BesokendePage() {
  const expected = process.env.ADMIN_PASSWORD || "";
  const cookieStore = cookies();
  const authCookie = cookieStore.get("admin_auth")?.value;

  if (!expected || authCookie !== hash(expected)) {
    redirect("/admin/login");
  }

  return <BesokendeClient />;
}
