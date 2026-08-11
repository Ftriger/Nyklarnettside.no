import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fra = searchParams.get("fra");
  const til = searchParams.get("til");
  const size = searchParams.get("size") || "50";
  const page = searchParams.get("page") || "0";

  const params = new URLSearchParams({
    size,
    page,
    sort: "registreringsdatoEnhetsregisteret,DESC",
  });
  if (fra) params.set("fraRegistreringsdatoEnhetsregisteret", fra);
  if (til) params.set("tilRegistreringsdatoEnhetsregisteret", til);

  try {
    const res = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter?${params.toString()}`,
      { headers: { Accept: "application/json" } }
    );
    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: `Brønnøysundregisteret svarte ${res.status}: ${body.slice(0, 200)}` },
        { status: 502 }
      );
    }
    const data = await res.json();

    const PERSONLIGE_DOMENER = new Set([
      "gmail.com",
      "hotmail.com",
      "hotmail.no",
      "outlook.com",
      "live.com",
      "live.no",
      "yahoo.com",
      "yahoo.no",
      "icloud.com",
      "me.com",
      "msn.com",
      "online.no",
      "getmail.no",
      "start.no",
    ]);

    function erFirmaEpost(epost) {
      if (!epost || !epost.includes("@")) return false;
      const domene = epost.split("@")[1].toLowerCase().trim();
      return !PERSONLIGE_DOMENER.has(domene);
    }

    const enheter = (data._embedded?.enheter || [])
      .map((e) => ({
        navn: e.navn,
        organisasjonsnummer: e.organisasjonsnummer,
        epostadresse: e.epostadresse || "",
        poststed: e.forretningsadresse?.poststed || e.postadresse?.poststed || "",
      }))
      .filter((e) => erFirmaEpost(e.epostadresse));

    return NextResponse.json({ enheter, totalElements: data.page?.totalElements || 0 });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Nettverksfeil" }, { status: 500 });
  }
}
