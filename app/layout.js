import Tracker from "./components/Tracker";

const beskrivelse =
  "Få en enkel, profesjonell nettside til din nye bedrift for fast pris. Du sender tekst og bilder, jeg ordner resten. Ingen skjulte kostnader.";

export const metadata = {
  metadataBase: new URL("https://klarnettside.no"),
  title: "Klarnettside — Enkel nettside for din nye bedrift | Fast pris",
  description: beskrivelse,
  alternates: {
    canonical: "https://klarnettside.no",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Klarnettside — Enkel nettside for din nye bedrift",
    description: beskrivelse,
    url: "https://klarnettside.no",
    siteName: "Klarnettside",
    locale: "nb_NO",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klarnettside — Enkel nettside for din nye bedrift",
    description: beskrivelse,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Tracker />
        {children}
      </body>
    </html>
  );
}
