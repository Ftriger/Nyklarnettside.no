"use client";

import { useEffect, useMemo, useState } from "react";

const PERIODER = [
  { label: "7 dager", dager: 7 },
  { label: "30 dager", dager: 30 },
  { label: "90 dager", dager: 90 },
];

export default function BesokendeClient() {
  const [besok, setBesok] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [periode, setPeriode] = useState(30);
  const [visIspOgRoboter, setVisIspOgRoboter] = useState(false);

  async function hentData() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/besokende");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ukjent feil");
      setBesok(data.besok || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    hentData();
  }, []);

  const filtrert = useMemo(() => {
    const grense = Date.now() - periode * 24 * 60 * 60 * 1000;
    return besok.filter((b) => {
      const tid = new Date(b.tid).getTime();
      if (tid < grense) return false;
      if (!visIspOgRoboter && b.erKonsumentEllerBot) return false;
      return true;
    });
  }, [besok, periode, visIspOgRoboter]);

  const stats = useMemo(() => {
    const bedrifter = new Set(filtrert.map((b) => b.org));
    return {
      besok: filtrert.length,
      bedrifter: bedrifter.size,
    };
  }, [filtrert]);

  function lastNedCsv() {
    const header = "Tidspunkt,Side,Organisasjon,By,Land,Henvisning\n";
    const rows = filtrert
      .map((b) =>
        [
          new Date(b.tid).toLocaleString("no-NO"),
          b.path,
          b.org,
          b.city,
          b.country,
          b.referrer,
        ]
          .map((v) => `"${(v || "").toString().replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "besokende.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.headerInner}>
          <div style={s.logo}>klarnettside — besøkende</div>
          <form method="POST" action="/api/admin/logout">
            <button type="submit" style={s.logoutBtn}>
              Logg ut
            </button>
          </form>
        </div>
      </header>

      <main style={s.main}>
        <p style={s.note}>
          Basert på gratis IP-oppslag (ip-api.com) — viser ofte internett-leverandøren for
          private besøkende, og bare et faktisk firmanavn når noen besøker fra et kontornettverk
          med egen IP-rekke.
        </p>

        <div style={s.controls}>
          <div style={s.periodeGroup}>
            {PERIODER.map((p) => (
              <button
                key={p.dager}
                onClick={() => setPeriode(p.dager)}
                style={periode === p.dager ? s.periodeBtnActive : s.periodeBtn}
              >
                {p.label}
              </button>
            ))}
          </div>
          <label style={s.checkboxLabel}>
            <input
              type="checkbox"
              checked={visIspOgRoboter}
              onChange={(e) => setVisIspOgRoboter(e.target.checked)}
            />
            Vis ISP og roboter
          </label>
          <button onClick={hentData} style={s.btnSecondary}>
            ↺ Oppdater
          </button>
          <button onClick={lastNedCsv} style={s.btnSecondary}>
            ⬇ CSV
          </button>
        </div>

        {error && <div style={s.error}>{error}</div>}

        <div style={s.statsRow}>
          <div style={s.statBox}>
            <div style={s.statNum}>{stats.besok}</div>
            <div style={s.statLabel}>Besøk</div>
          </div>
          <div style={s.statBox}>
            <div style={s.statNum}>{stats.bedrifter}</div>
            <div style={s.statLabel}>Bedrifter/ISP</div>
          </div>
        </div>

        <section style={s.card}>
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Tidspunkt</th>
                  <th style={s.th}>Side besøkt</th>
                  <th style={s.th}>Organisasjon/ISP</th>
                  <th style={s.th}>By</th>
                  <th style={s.th}>Land</th>
                  <th style={s.th}>Henvisning</th>
                </tr>
              </thead>
              <tbody>
                {filtrert.map((b, i) => (
                  <tr key={i} style={s.tr}>
                    <td style={s.tdMono}>{new Date(b.tid).toLocaleString("no-NO")}</td>
                    <td style={s.td}>{b.path}</td>
                    <td style={s.td}>{b.org}</td>
                    <td style={s.td}>{b.city}</td>
                    <td style={s.td}>{b.country}</td>
                    <td style={s.td}>{b.referrer || "—"}</td>
                  </tr>
                ))}
                {!loading && filtrert.length === 0 && (
                  <tr>
                    <td colSpan={6} style={s.emptyRow}>
                      Ingen besøk registrert i denne perioden ennå.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#EEF1EF", color: "#182524", fontFamily: "'Inter', sans-serif" },
  header: { borderBottom: "1px solid #B9C4C0", padding: "20px 0", background: "#FBFCFB" },
  headerInner: { maxWidth: "1040px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  logo: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 },
  logoutBtn: { fontSize: "0.8rem", border: "1px solid #182524", background: "transparent", padding: "8px 14px", borderRadius: "2px", cursor: "pointer" },
  main: { maxWidth: "1040px", margin: "0 auto", padding: "32px 24px 80px", display: "flex", flexDirection: "column", gap: "20px" },
  note: { fontSize: "0.82rem", color: "#4A5957", background: "#FBFCFB", padding: "12px 16px", border: "1px solid #B9C4C0" },
  controls: { display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" },
  periodeGroup: { display: "flex", gap: "6px" },
  periodeBtn: { fontSize: "0.82rem", background: "transparent", border: "1px solid #B9C4C0", padding: "8px 14px", borderRadius: "999px", cursor: "pointer" },
  periodeBtnActive: { fontSize: "0.82rem", background: "#182524", color: "#FBFCFB", border: "1px solid #182524", padding: "8px 14px", borderRadius: "999px", cursor: "pointer" },
  checkboxLabel: { display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" },
  btnSecondary: { fontSize: "0.82rem", background: "transparent", border: "1px solid #182524", padding: "8px 14px", borderRadius: "2px", cursor: "pointer" },
  error: { color: "#C1443C", fontSize: "0.85rem" },
  statsRow: { display: "flex", gap: "16px" },
  statBox: { background: "#FBFCFB", padding: "18px 22px", flex: 1, textAlign: "center", border: "1px solid #B9C4C0" },
  statNum: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.6rem", fontWeight: 700 },
  statLabel: { fontSize: "0.78rem", color: "#4A5957", marginTop: "4px" },
  card: { background: "#FBFCFB", padding: "20px", border: "1px solid #B9C4C0" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" },
  th: { textAlign: "left", borderBottom: "1px solid #B9C4C0", padding: "8px 10px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#4A5957" },
  tr: { borderBottom: "1px solid #E4E9E6" },
  td: { padding: "9px 10px", verticalAlign: "top" },
  tdMono: { padding: "9px 10px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", verticalAlign: "top", whiteSpace: "nowrap" },
  emptyRow: { padding: "24px", textAlign: "center", color: "#4A5957", fontSize: "0.9rem" },
};
