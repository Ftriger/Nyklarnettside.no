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
    const enheter = (data._embedded?.enheter || []).map((e) => ({
      navn: e.navn,
      organisasjonsnummer: e.organisasjonsnummer,
      epostadresse: e.epostadresse || "",
      poststed: e.forretningsadresse?.poststed || e.postadresse?.poststed || "",
    }));
    return NextResponse.json({ enheter, totalElements: data.page?.totalElements || 0 });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Nettverksfeil" }, { status: 500 });
  }
}
