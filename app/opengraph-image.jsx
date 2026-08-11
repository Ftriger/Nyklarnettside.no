import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Klarnettside — Enkel nettside for din nye bedrift";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#FFFFFF",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(15,183,125,0.55), rgba(15,183,125,0))",
            filter: "blur(10px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 160,
            right: 320,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(109,94,240,0.45), rgba(109,94,240,0))",
            filter: "blur(10px)",
          }}
        />
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#0F172A",
            marginBottom: 24,
          }}
        >
          klar<span style={{ color: "#0FB77D" }}>nettside</span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#0F172A",
            lineHeight: 1.1,
            maxWidth: 820,
          }}
        >
          Nettsiden din, klar på dager — ikke uker.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#5B6472",
            marginTop: 28,
            maxWidth: 720,
          }}
        >
          Fast pris. Ingen skjulte kostnader. For nystartede bedrifter i Norge.
        </div>
      </div>
    ),
    { ...size }
  );
}
