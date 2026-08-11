import Link from "next/link";
import { artikkelCss } from "./artikkelCss";

export const metadata = {
  title: "Artikler — Klarnettside",
  description: "Tips og fakta om nettside, synlighet og digitalisering for nystartede bedrifter i Norge.",
  alternates: { canonical: "https://klarnettside.no/artikler" },
};

const artikler = [
  {
    slug: "hvorfor-nettside-nystartet-bedrift",
    tittel: "Hvorfor en nystartet bedrift trenger egen nettside",
    ingress:
      "Sosiale medier er ikke nok alene. Se hva undersøkelser faktisk sier om hvor mye en nettside betyr for om folk blir kunder.",
  },
  {
    slug: "finn-siden-i-google-og-ai-sok",
    tittel: "5 enkle grep for å bli funnet i Google og AI-søk",
    ingress:
      "Konkrete, ikke-tekniske grep som gjør det lettere for både Google og KI-modeller som ChatGPT å finne og forstå bedriften din.",
  },
];

export default function ArtiklerIndex() {
  return (
    <>
      <style>{artikkelCss}</style>
      <header>
        <div className="inner">
          <Link href="/" className="logo">
            klar<span>nettside</span>
          </Link>
          <Link href="/" className="back-link">
            ← Til forsiden
          </Link>
        </div>
      </header>
      <article>
        <div className="wrap">
          <div className="eyebrow">Artikler</div>
          <h1>Tips for nystartede bedrifter</h1>
          <p className="lede">
            Kort og konkret lesestoff om nettside, synlighet og digitalisering — skrevet for
            gründere, ikke utviklere.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {artikler.map((a) => (
              <Link
                key={a.slug}
                href={`/artikler/${a.slug}`}
                style={{
                  display: "block",
                  padding: "22px 24px",
                  border: "1px solid var(--line)",
                  borderRadius: "16px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <h2 style={{ margin: "0 0 8px" }}>{a.tittel}</h2>
                <p style={{ margin: 0, color: "var(--ink-soft)" }}>{a.ingress}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>
      <footer>
        <div className="wrap">klarnettside.no</div>
      </footer>
    </>
  );
}
