export default function Home() {
  return (
    <>
      <style>{css}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />

      <div className="blob blob-a" aria-hidden="true"></div>
      <div className="blob blob-b" aria-hidden="true"></div>

      <header>
        <div className="wrap">
          <div className="logo">
            klar<span>nettside</span>
          </div>
          <a className="header-cta" href="mailto:post@klarnettside.no">
            Ta kontakt
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">For nystartede bedrifter i Norge</div>
            <h1>
              Nettsiden din,
              <br />
              <span className="gradient-text">klar på dager</span>
              <br />
              ikke uker.
            </h1>
            <p className="hero-sub">
              Du sender meg tekst og bilder. Jeg bygger en enkel, moderne
              nettside til fast pris — og du betaler ikke før du er fornøyd.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="mailto:post@klarnettside.no">
                Kom i gang →
              </a>
              <span className="from-price">
                Fra <b>5000 kr</b> · fast pris
              </span>
            </div>
          </div>

          <div className="price-card-wrap">
            <div className="price-card">
              <div className="price-card-top">
                <span className="dot dot-1"></span>
                <span className="dot dot-2"></span>
                <span className="dot dot-3"></span>
              </div>
              <div className="price-card-badge">✓ 0 kr skjult</div>
              <div className="price-row">
                <span>Nettside</span>
                <b>5 000 kr</b>
              </div>
              <div className="price-row">
                <span>Domene</span>
                <b>500 kr</b>
              </div>
              <div className="price-row">
                <span>Drift/mnd</span>
                <b>2 000 kr</b>
              </div>
              <div className="price-card-footer">Betales når du er fornøyd</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="section-label">Prosessen</div>
            <h2>Tre steg til din nye nettside</h2>
          </div>
          <div className="steps">
            <div className="step-card">
              <div className="step-num">1</div>
              <h3>Du sender innhold</h3>
              <p>Tekst og bilder du vil ha med. Ingenting mer skal til fra din side.</p>
            </div>
            <div className="step-card">
              <div className="step-num">2</div>
              <h3>Jeg bygger siden</h3>
              <p>Jeg setter opp en enkel og profesjonell nettside tilpasset din bedrift.</p>
            </div>
            <div className="step-card">
              <div className="step-num">3</div>
              <h3>Siden går live</h3>
              <p>Vi legger den ut på ditt eget domene når du er fornøyd med resultatet.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="section-label">Hvorfor klarnettside.no</div>
            <h2>Laget for de som skal starte, ikke kode</h2>
          </div>
          <div className="why-grid">
            <div className="why-item">
              <div className="why-mark">✓</div>
              <h3>Betal først når du er fornøyd</h3>
              <p>Ingen forskuddsbetaling for selve leveransen. Du ser resultatet før du betaler.</p>
            </div>
            <div className="why-item">
              <div className="why-mark">✓</div>
              <h3>Ingen teknisk kunnskap kreves</h3>
              <p>Du trenger ikke forstå koding, design eller domener. Det tar jeg meg av.</p>
            </div>
            <div className="why-item">
              <div className="why-mark">✓</div>
              <h3>Bygget for nystartede bedrifter</h3>
              <p>Rask, rimelig og tilpasset norske gründere som trenger en nettside — ikke et byråprosjekt.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="section-label">Spørsmål</div>
            <h2>Ofte stilte spørsmål</h2>
          </div>
          <div className="faq-list">
            <details className="faq-item" open>
              <summary>Hva koster en nettside?</summary>
              <p>
                Levering av en enkel, ferdig nettside koster 5000 kr som en
                fast engangspris. Domeneregistrering er valgfritt til 500 kr,
                og drift, hosting og løpende endringer koster 2000 kr per
                måned. Alt er oppgitt på forhånd uten skjulte kostnader.
              </p>
            </details>
            <details className="faq-item">
              <summary>Trenger jeg teknisk kunnskap?</summary>
              <p>
                Nei. Du sender meg tekst og bilder du vil ha med, så bygger
                jeg hele nettsiden for deg. Du trenger ikke kunne noe om
                koding, design eller domener.
              </p>
            </details>
            <details className="faq-item">
              <summary>Når betaler jeg?</summary>
              <p>
                Du betaler ikke for selve nettsiden før du har sett resultatet
                og er fornøyd. Ingen forskuddsbetaling for leveransen.
              </p>
            </details>
            <details className="faq-item">
              <summary>Hvor lang bindingstid er det?</summary>
              <p>
                Ingen skjult bindingstid. Drift og hosting løper månedlig, og
                endringer avtales fortløpende.
              </p>
            </details>
            <details className="faq-item">
              <summary>Hvem passer dette for?</summary>
              <p>
                Tjenesten er laget for nystartede og små bedrifter i Norge som
                trenger en enkel, profesjonell nettside raskt og rimelig.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap cta-band-inner">
          <h2>Klar for din egen nettside?</h2>
          <a className="btn-light" href="mailto:post@klarnettside.no">
            post@klarnettside.no →
          </a>
        </div>
      </section>

      <footer>
        <div className="wrap foot-bottom">
          <span>klarnettside.no</span>
          <span>Nettside til fast pris for nystartede bedrifter i Norge</span>
        </div>
      </footer>
    </>
  );
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hva koster en nettside?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Levering av en enkel, ferdig nettside koster 5000 kr som en fast engangspris. Domeneregistrering er valgfritt til 500 kr, og drift, hosting og løpende endringer koster 2000 kr per måned. Alt er oppgitt på forhånd uten skjulte kostnader.",
      },
    },
    {
      "@type": "Question",
      name: "Trenger jeg teknisk kunnskap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nei. Du sender meg tekst og bilder du vil ha med, så bygger jeg hele nettsiden for deg. Du trenger ikke kunne noe om koding, design eller domener.",
      },
    },
    {
      "@type": "Question",
      name: "Når betaler jeg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Du betaler ikke for selve nettsiden før du har sett resultatet og er fornøyd. Ingen forskuddsbetaling for leveransen.",
      },
    },
    {
      "@type": "Question",
      name: "Hvor lang bindingstid er det?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ingen skjult bindingstid. Drift og hosting løper månedlig, og endringer avtales fortløpende.",
      },
    },
    {
      "@type": "Question",
      name: "Hvem passer dette for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tjenesten er laget for nystartede og små bedrifter i Norge som trenger en enkel, profesjonell nettside raskt og rimelig.",
      },
    },
  ],
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Klarnettside",
  url: "https://klarnettside.no",
  email: "post@klarnettside.no",
  description:
    "Enkle, profesjonelle nettsider til fast pris for nystartede og små bedrifter i Norge.",
  areaServed: {
    "@type": "Country",
    name: "Norge",
  },
  priceRange: "5000 kr",
  makesOffer: {
    "@type": "Offer",
    name: "Nettside til fast pris",
    price: "5000",
    priceCurrency: "NOK",
  },
};

const css = `
:root{
  --bg:#FFFFFF;--bg-soft:#F5F8F6;--ink:#0F172A;--ink-soft:#5B6472;
  --accent:#0FB77D;--accent-2:#6D5EF0;--line:#E7EAE8;--white:#FFFFFF;
}
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;line-height:1.55;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
a{color:inherit;}
.wrap{max-width:1080px;margin:0 auto;padding:0 24px;position:relative;z-index:1;}

.blob{position:absolute;border-radius:50%;filter:blur(70px);opacity:0.35;z-index:0;pointer-events:none;}
.blob-a{width:520px;height:520px;background:radial-gradient(circle, var(--accent), transparent 70%);top:-140px;right:-120px;}
.blob-b{width:420px;height:420px;background:radial-gradient(circle, var(--accent-2), transparent 70%);top:220px;right:280px;opacity:0.25;}

header{padding:26px 0;position:relative;z-index:2;}
header .wrap{display:flex;align-items:center;justify-content:space-between;}
.logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.15rem;letter-spacing:-0.01em;}
.logo span{background:linear-gradient(90deg, var(--accent), var(--accent-2));-webkit-background-clip:text;background-clip:text;color:transparent;}
.header-cta{font-size:0.9rem;font-weight:600;border:1px solid var(--line);padding:10px 20px;border-radius:999px;text-decoration:none;transition:border-color .15s ease, transform .15s ease;background:var(--white);}
.header-cta:hover{border-color:var(--accent);transform:translateY(-1px);}

.hero{padding:64px 0 60px;position:relative;}
.hero-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:40px;align-items:center;}
.eyebrow{font-size:0.82rem;font-weight:600;color:var(--accent);text-transform:uppercase;letter-spacing:0.08em;display:inline-flex;align-items:center;gap:8px;margin-bottom:20px;padding:6px 14px;background:rgba(15,183,125,0.1);border-radius:999px;}
h1{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(2.4rem, 5vw, 3.6rem);line-height:1.08;letter-spacing:-0.02em;}
.gradient-text{background:linear-gradient(90deg, var(--accent), var(--accent-2));-webkit-background-clip:text;background-clip:text;color:transparent;}
.hero-sub{margin-top:22px;max-width:42ch;font-size:1.1rem;color:var(--ink-soft);}
.hero-actions{margin-top:34px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;}
.btn-primary{font-weight:700;background:var(--ink);color:var(--white);padding:15px 30px;border-radius:999px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:transform .15s ease, box-shadow .15s ease;box-shadow:0 8px 24px -8px rgba(15,183,125,0.4);}
.btn-primary:hover{transform:translateY(-2px);}
.from-price{font-size:0.92rem;color:var(--ink-soft);}
.from-price b{color:var(--ink);}

.price-card-wrap{display:flex;justify-content:center;}
.price-card{
  background:var(--white);
  border:1px solid var(--line);
  border-radius:24px;
  padding:28px 26px;
  width:280px;
  box-shadow:0 30px 60px -25px rgba(15,23,42,0.25);
  transform:rotate(2deg);
}
.price-card-top{display:flex;gap:6px;margin-bottom:18px;}
.dot{width:9px;height:9px;border-radius:50%;display:inline-block;}
.dot-1{background:#F87171;}
.dot-2{background:#FBBF24;}
.dot-3{background:#34D399;}
.price-card-badge{display:inline-block;font-size:0.75rem;font-weight:700;color:var(--accent);background:rgba(15,183,125,0.12);padding:5px 12px;border-radius:999px;margin-bottom:18px;}
.price-row{display:flex;justify-content:space-between;font-size:0.95rem;padding:10px 0;border-bottom:1px solid var(--line);}
.price-row:last-of-type{border-bottom:none;}
.price-card-footer{margin-top:16px;font-size:0.78rem;color:var(--ink-soft);text-align:center;}

section{padding:64px 0;position:relative;z-index:1;}
.section-head{margin-bottom:40px;}
.section-label{font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--accent);margin-bottom:10px;}
h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.1rem);letter-spacing:-0.01em;}

.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.step-card{background:var(--bg-soft);border-radius:20px;padding:30px 26px;transition:transform .15s ease;}
.step-card:hover{transform:translateY(-4px);}
.step-num{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg, var(--accent), var(--accent-2));color:var(--white);font-weight:700;font-family:'Space Grotesk',sans-serif;display:flex;align-items:center;justify-content:center;margin-bottom:18px;font-size:0.95rem;}
.step-card h3{font-family:'Space Grotesk',sans-serif;font-size:1.05rem;margin-bottom:8px;}
.step-card p{color:var(--ink-soft);font-size:0.95rem;}

.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;}
.why-mark{width:30px;height:30px;border-radius:50%;background:rgba(15,183,125,0.12);color:var(--accent);font-weight:700;display:flex;align-items:center;justify-content:center;margin-bottom:14px;font-size:0.9rem;}
.why-item h3{font-size:1.02rem;margin-bottom:8px;font-family:'Space Grotesk',sans-serif;}
.why-item p{color:var(--ink-soft);font-size:0.92rem;}

.faq-list{display:flex;flex-direction:column;gap:8px;}
.faq-item{border-radius:16px;padding:18px 22px;background:var(--bg-soft);transition:background .15s ease;}
.faq-item summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-weight:600;font-size:1rem;}
.faq-item summary::-webkit-details-marker{display:none;}
.faq-item summary::after{content:"+";color:var(--accent);font-size:1.3rem;flex-shrink:0;margin-left:16px;transition:transform .15s ease;font-weight:700;}
.faq-item[open] summary::after{transform:rotate(45deg);}
.faq-item[open]{background:var(--white);box-shadow:0 8px 24px -12px rgba(15,23,42,0.15);}
.faq-item p{margin-top:14px;color:var(--ink-soft);font-size:0.95rem;max-width:60ch;}

.cta-band{background:linear-gradient(120deg, var(--ink), #1F2A44);border-radius:32px;margin:0 24px;padding:0;color:var(--white);}
.cta-band-inner{padding:64px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;}
.cta-band h2{color:var(--white);}
.btn-light{font-weight:700;background:var(--white);color:var(--ink);padding:15px 30px;border-radius:999px;text-decoration:none;white-space:nowrap;transition:transform .15s ease;}
.btn-light:hover{transform:translateY(-2px);}

footer{padding:36px 0 40px;}
.foot-bottom{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:0.82rem;color:var(--ink-soft);}

@media (max-width:820px){
  .hero-grid{grid-template-columns:1fr;}
  .price-card-wrap{margin-top:20px;}
  .steps{grid-template-columns:1fr;}
  .why-grid{grid-template-columns:1fr;}
  .cta-band-inner{flex-direction:column;align-items:flex-start;}
}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto;}*{transition:none !important;}}
`;
