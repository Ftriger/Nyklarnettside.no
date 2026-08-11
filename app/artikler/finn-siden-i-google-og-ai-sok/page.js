import Link from "next/link";
import { artikkelCss } from "../artikkelCss";

export const metadata = {
  title: "5 enkle grep for å bli funnet i Google og AI-søk — Klarnettside",
  description:
    "Konkrete, ikke-tekniske grep som gjør det lettere for både Google og KI-modeller som ChatGPT å finne og forstå bedriften din.",
  alternates: {
    canonical: "https://klarnettside.no/artikler/finn-siden-i-google-og-ai-sok",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "5 enkle grep for å bli funnet i Google og AI-søk",
  description:
    "Konkrete, ikke-tekniske grep som gjør det lettere for både Google og KI-modeller som ChatGPT å finne og forstå bedriften din.",
  author: { "@type": "Organization", name: "Klarnettside" },
  publisher: { "@type": "Organization", name: "Klarnettside" },
  mainEntityOfPage: "https://klarnettside.no/artikler/finn-siden-i-google-og-ai-sok",
};

export default function Artikkel() {
  return (
    <>
      <style>{artikkelCss}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header>
        <div className="inner">
          <Link href="/" className="logo">
            klar<span>nettside</span>
          </Link>
          <Link href="/artikler" className="back-link">
            ← Alle artikler
          </Link>
        </div>
      </header>
      <article>
        <div className="wrap">
          <div className="eyebrow">Synlighet</div>
          <h1>5 enkle grep for å bli funnet i Google og AI-søk</h1>
          <p className="lede">
            Det holder ikke lenger å bare eksistere på nett. Her er fem konkrete ting som
            faktisk påvirker om Google — og i økende grad KI-modeller som ChatGPT og Gemini —
            finner og anbefaler bedriften din.
          </p>

          <h2>1. Riktig og fullstendig kontaktinformasjon</h2>
          <p>
            Firmanavn, adresse og telefonnummer bør stå likt overalt: på nettsiden, i
            Google-bedriftsprofilen, og andre steder bedriften er nevnt. Uoverensstemmelser gjør
            det vanskeligere for søkemotorer å stole på informasjonen.
          </p>

          <h2>2. Opprett og hold Google-bedriftsprofilen oppdatert</h2>
          <p>
            En bekreftet bedriftsprofil på Google gir deg synlighet i Google Maps og lokale
            søkeresultater, og lar deg se hvordan folk faktisk finner deg — via søk, kart,
            anrop eller klikk til nettsiden. Ifølge Googles egen support-dokumentasjon er denne
            typen resultatdata bare tilgjengelig for bekreftede profiler, så bekreftelse er
            første steg, ikke noe man kan hoppe over.
          </p>

          <h2>3. Skriv innhold som faktisk svarer på spørsmål</h2>
          <p>
            En vanlig spørsmål-og-svar-seksjon (som den du finner nederst på forsiden vår) gjør
            to ting samtidig: den hjelper besøkende raskt, og den gir Google og KI-modeller
            tydelige, sitérbare svar å hente fra når noen spør om nettopp det du tilbyr.
          </p>

          <h2>4. Strukturert data i bunn av koden</h2>
          <p>
            Dette er usynlig for besøkende, men gir søkemotorer og KI-modeller maskinlesbar
            informasjon om hvem du er, hva du tilbyr og hva ting koster. Det er teknisk, men
            noe utvikleren din bør sette opp uten at du trenger å tenke på det selv.
          </p>

          <h2>5. Vær tålmodig — og oppdater siden jevnlig</h2>
          <p>
            En splitter ny side har ingen historikk, ingen lenker fra andre sider, og ingen
            "tillit" bygget opp ennå hos Google. Det er normalt, og det retter seg over tid —
            spesielt om du legger til innhold jevnlig i stedet for å la siden stå urørt.
          </p>

          <div className="cta-box">
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "4px" }}>
                Vil du ha disse grepene på plass fra start?
              </div>
              <div style={{ opacity: 0.85, fontSize: "0.92rem" }}>
                Jeg setter opp det tekniske — du slipper å tenke på det.
              </div>
            </div>
            <a href="mailto:post@klarnettside.no">Ta kontakt →</a>
          </div>

          <div className="source-note">
            Kilde: Google-bedriftsprofil Hjelp,{" "}
            <a
              href="https://support.google.com/business/answer/9918094?hl=no"
              target="_blank"
              rel="noopener noreferrer"
            >
              support.google.com
            </a>
            .
          </div>
        </div>
      </article>
      <footer>
        <div className="wrap">klarnettside.no</div>
      </footer>
    </>
  );
}
