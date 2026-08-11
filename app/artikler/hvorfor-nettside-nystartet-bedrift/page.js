import Link from "next/link";
import { artikkelCss } from "../artikkelCss";

export const metadata = {
  title: "Hvorfor en nystartet bedrift trenger egen nettside — Klarnettside",
  description:
    "Sosiale medier er ikke nok alene. Se hva undersøkelser faktisk sier om hvor mye en nettside betyr for om folk blir kunder.",
  alternates: {
    canonical: "https://klarnettside.no/artikler/hvorfor-nettside-nystartet-bedrift",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hvorfor en nystartet bedrift trenger egen nettside",
  description:
    "Sosiale medier er ikke nok alene. Se hva undersøkelser faktisk sier om hvor mye en nettside betyr for om folk blir kunder.",
  author: { "@type": "Organization", name: "Klarnettside" },
  publisher: { "@type": "Organization", name: "Klarnettside" },
  mainEntityOfPage: "https://klarnettside.no/artikler/hvorfor-nettside-nystartet-bedrift",
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
          <h1>Hvorfor en nystartet bedrift trenger egen nettside</h1>
          <p className="lede">
            Mange nystartede bedrifter i Norge nøyer seg med en Facebook-side eller en
            Instagram-profil de første årene. Det er forståelig — det er raskt og gratis. Men det
            er ikke det samme som å ha en egen nettside, og forskjellen betyr mer enn man skulle
            tro.
          </p>

          <h2>Nettsiden er ofte det første inntrykket</h2>
          <p>
            Når noen hører om bedriften din — fra en venn, et Google-søk eller en annonse — er
            det som regel nettsiden de sjekker først, ikke telefonen. En undersøkelse gjort på
            oppdrag fra Verisign fant at et stort flertall av forbrukere oppfatter en profesjonell
            nettside som avgjørende for tilliten til en liten bedrift, og for om de faktisk blir
            kunder. Har du ingen nettside, eller en som ser utdatert ut, mister du en del av de
            kundene før du i det hele tatt får snakket med dem.
          </p>

          <h2>Mange norske småbedrifter ligger fortsatt etter</h2>
          <p>
            Du er ikke alene om å ha utsatt dette. En undersøkelse Telenor har gjennomført blant
            norske håndverker- og servicebedrifter viser at rundt halvparten av de mindre
            bedriftene fortsatt jobber uten ordentlige digitale verktøy på plass. Det betyr også
            at en enkel, ordentlig nettside kan være en reell fordel overfor konkurrenter som
            ikke har prioritert det ennå — ikke bare noe alle uansett har.
          </p>

          <h2>Sosiale medier eier du ikke selv</h2>
          <p>
            En Facebook- eller Instagram-side er nyttig som kanal, men algoritmen, designet og
            reglene bestemmes av plattformen — ikke av deg. Nettsiden din er den ene digitale
            eiendelen du faktisk eier og kontrollerer fullt ut: du bestemmer hva som vises,
            hvordan den ser ut, og den forsvinner ikke om en plattform endrer regler eller
            prioriteringer.
          </p>

          <h2>Det trenger ikke være dyrt eller tidkrevende</h2>
          <p>
            Den vanligste grunnen til at gründere utsetter dette er ikke at de ikke skjønner
            verdien — det er at det virker som et stort, teknisk prosjekt. Sånn må det ikke være.
            En enkel, profesjonell nettside kan være oppe på dager, ikke uker, uten at du selv
            trenger å røre kode eller design.
          </p>

          <div className="cta-box">
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "4px" }}>
                Klar for din egen nettside?
              </div>
              <div style={{ opacity: 0.85, fontSize: "0.92rem" }}>
                Fast pris, ingen teknisk kunnskap nødvendig.
              </div>
            </div>
            <a href="mailto:post@klarnettside.no">Ta kontakt →</a>
          </div>

          <div className="source-note">
            Kilder: undersøkelse for Verisign, referert av{" "}
            <a href="https://www.digitec.no/hvorfor-profesjonell-nettside-er-kritisk-for-din-bedrift" target="_blank" rel="noopener noreferrer">
              Digitec.no
            </a>
            . Undersøkelse blant norske håndverker- og servicebedrifter fra{" "}
            <a href="https://telenor-no.mynewsdesk.com/pressreleases/fem-av-ti-smaa-og-mellomstore-bedrifter-fortsatt-paa-papir-2245328" target="_blank" rel="noopener noreferrer">
              Telenor Norge
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
