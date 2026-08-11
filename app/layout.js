import Tracker from "./components/Tracker";

export const metadata = {
  title: "Klarnettside — Enkel nettside for din nye bedrift | Fast pris",
  description:
    "Få en enkel, profesjonell nettside til din nye bedrift for fast pris. Du sender tekst og bilder, jeg ordner resten.",
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
