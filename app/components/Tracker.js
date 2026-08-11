"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
        keepalive: true,
      }).catch(() => {});
    } catch (e) {
      // aldri la sporing knekke siden
    }
  }, [pathname]);

  return null;
}
