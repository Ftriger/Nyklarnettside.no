"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_LEADS = "kns_leads_v1";
const STORAGE_TEMPLATE = "kns_template_v1";

const DEFAULT_TEMPLATE = {
  emne: "Nettside til {{navn}} — fast pris, ingen bindingstid",
  tekst:
    "Hei {{navn}},\n\n" +
    "Jeg så at dere nylig startet opp, og vil tipse om en enkel og rimelig løsning for nettside.\n\n" +
    "Jeg bygger en enkel, profesjonell nettside til fast pris (5000 kr), og du betaler ikke før du er fornøyd. " +
    "Du sender meg bare tekst og bilder, så ordner jeg resten — ingen teknisk kunnskap kreves.\n\n" +
    "Si gjerne fra om dette er interessant, så tar vi en uforpliktende prat.\n\n" +
    "Mvh\nKlarnettside.no\npost@klarnettside.no",
};

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function mergeTemplate(text, navn) {
  return text.replaceAll("{{navn}}", navn || "der");
}

function parseCsv(raw) {
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const delimiter = lines[0].includes(";") ? ";" : ",";
  const header = lines[0].split(delimiter).map((h) => h.trim().toLowerCase());

  const idxNavn = header.findIndex((h) => ["navn", "name", "firma", "bedrift"].includes(h));
  const idxEpost = header.findIndex((h) => ["epost", "e-post", "email", "mail"].includes(h));
  const idxSted = header.findIndex((h) => ["poststed", "sted", "by"].includes(h));
  const idxOrgnr = header.findIndex((h) => ["orgnr", "org.nr", "organisasjonsnummer"].includes(h));

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(delimiter).map((c) => c.trim().replace(/^"|"$/g, ""));
    if (cols.length === 1 && cols[0] === "") continue;
    rows.push({
      id: uid(),
      navn: idxNavn >= 0 ? cols[idxNavn] : cols[0] || "Ukjent",
      epost: idxEpost >= 0 ? cols[idxEpost] : "",
      poststed: idxSted >= 0 ? cols[idxSted] : "",
      orgnr: idxOrgnr >= 0 ? cols[idxOrgnr] : "",
      kilde: "csv",
      status: "Ikke sendt",
      sendtDato: null,
    });
  }
  return rows;
}

export default function UtsendingClient() {
  const [leads, setLeads] = useState([]);
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [loaded, setLoaded] = useState(false);

  const [fraDato, setFraDato] = useState(todayISO(-180));
  const [tilDato, setTilDato] = useState(todayISO(0));
  const [brregLoading, setBrregLoading] = useState(false);
  const [brregError, setBrregError] = useState("");

  const [csvText, setCsvText] = useState("");

  const [selected, setSelected] = useState(new Set());
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({ emne: "", tekst: "" });
  const [sendingId, setSendingId] = useState(null);
  const [sendError, setSendError] = useState({});
  const [bulkProgress, setBulkProgress] = useState(null);

  // Last inn fra localStorage
  useEffect(() => {
    try {
      const savedLeads = localStorage.getItem(STORAGE_LEADS);
      const savedTemplate = localStorage.getItem(STORAGE_TEMPLATE);
      if (savedLeads) setLeads(JSON.parse(savedLeads));
      if (savedTemplate) setTemplate(JSON.parse(savedTemplate));
    } catch (e) {
      // ignorer korrupt lagring
    }
    setLoaded(true);
  }, []);

  // Lagre til localStorage
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_LEADS, JSON.stringify(leads));
  }, [leads, loaded]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_TEMPLATE, JSON.stringify(template));
  }, [template, loaded]);

  const stats = useMemo(() => {
    const total = leads.length;
    const sendt = leads.filter((l) => l.status === "Sendt").length;
    const medEpost = leads.filter((l) => l.epost).length;
    return { total, sendt, medEpost };
  }, [leads]);

  function addLeads(newRows) {
    setLeads((prev) => {
      const existingKeys = new Set(
        prev.map((l) => (l.orgnr || l.epost || l.navn).toLowerCase())
      );
      const toAdd = newRows.filter((r) => {
        const key = (r.orgnr || r.epost || r.navn).toLowerCase();
        if (existingKeys.has(key)) return false;
        existingKeys.add(key);
        return true;
      });
      return [...prev, ...toAdd];
    });
  }

  async function hentFraBrreg() {
    setBrregLoading(true);
    setBrregError("");
    try {
      const res = await fetch(
        `/api/leads/brreg?fra=${fraDato}&til=${tilDato}&size=50`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ukjent feil");
      const rows = (data.enheter || []).map((e) => ({
        id: uid(),
        navn: e.navn,
        epost: e.epostadresse || "",
        poststed: e.poststed || "",
        orgnr: e.organisasjonsnummer,
        kilde: "brreg",
        status: "Ikke sendt",
        sendtDato: null,
      }));
      addLeads(rows);
    } catch (e) {
      setBrregError(e.message || "Klarte ikke hente fra Brønnøysundregisteret");
    } finally {
      setBrregLoading(false);
    }
  }

  function importerCsv() {
    if (!csvText.trim()) return;
    const rows = parseCsv(csvText);
    addLeads(rows);
    setCsvText("");
  }

  function toggleSelected(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    const selectable = leads.filter((l) => l.epost && l.status !== "Sendt");
    if (selected.size === selectable.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(selectable.map((l) => l.id)));
    }
  }

  function openEdit(lead) {
    setEditingId(lead.id);
    setEditDraft({
      emne: mergeTemplate(template.emne, lead.navn),
      tekst: mergeTemplate(template.tekst, lead.navn),
    });
  }

  async function sendSingle(lead, emne, tekst) {
    setSendingId(lead.id);
    setSendError((prev) => ({ ...prev, [lead.id]: "" }));
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: lead.epost, subject: emne, text: tekst }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sending feilet");
      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id
            ? { ...l, status: "Sendt", sendtDato: new Date().toLocaleString("no-NO") }
            : l
        )
      );
      setEditingId(null);
    } catch (e) {
      setSendError((prev) => ({ ...prev, [lead.id]: e.message }));
    } finally {
      setSendingId(null);
    }
  }

  async function sendBulk() {
    const targets = leads.filter((l) => selected.has(l.id) && l.epost && l.status !== "Sendt");
    if (targets.length === 0) return;
    setBulkProgress({ done: 0, total: targets.length });
    for (let i = 0; i < targets.length; i++) {
      const lead = targets[i];
      try {
        const res = await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: lead.epost,
            subject: mergeTemplate(template.emne, lead.navn),
            text: mergeTemplate(template.tekst, lead.navn),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Feilet");
        setLeads((prev) =>
          prev.map((l) =>
            l.id === lead.id
              ? { ...l, status: "Sendt", sendtDato: new Date().toLocaleString("no-NO") }
              : l
          )
        );
      } catch (e) {
        setSendError((prev) => ({ ...prev, [lead.id]: e.message }));
      }
      setBulkProgress({ done: i + 1, total: targets.length });
      await new Promise((r) => setTimeout(r, 400));
    }
    setSelected(new Set());
    setTimeout(() => setBulkProgress(null), 1500);
  }

  function slettLead(id) {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  return (
    <div style={s.page}>
      <style>{css}</style>
      <header style={s.header}>
        <div style={s.headerInner}>
          <div style={s.logo}>klarnettside — utsending</div>
          <form method="POST" action="/api/admin/logout">
            <button type="submit" style={s.logoutBtn}>
              Logg ut
            </button>
          </form>
        </div>
      </header>

      <main style={s.main}>
        {/* STATS */}
        <div style={s.statsRow}>
          <div style={s.statBox}>
            <div style={s.statNum}>{stats.total}</div>
            <div style={s.statLabel}>Leads totalt</div>
          </div>
          <div style={s.statBox}>
            <div style={s.statNum}>{stats.medEpost}</div>
            <div style={s.statLabel}>Med e-post</div>
          </div>
          <div style={s.statBox}>
            <div style={s.statNum}>{stats.sendt}</div>
            <div style={s.statLabel}>Sendt</div>
          </div>
        </div>

        {/* BRREG */}
        <section style={s.card}>
          <h2 style={s.h2}>Hent fra Brønnøysundregisteret</h2>
          <p style={s.pMuted}>Nyregistrerte enheter i valgt periode, hele Norge.</p>
          <div style={s.row}>
            <label style={s.label}>
              Fra
              <input
                type="date"
                value={fraDato}
                onChange={(e) => setFraDato(e.target.value)}
                style={s.input}
              />
            </label>
            <label style={s.label}>
              Til
              <input
                type="date"
                value={tilDato}
                onChange={(e) => setTilDato(e.target.value)}
                style={s.input}
              />
            </label>
            <button onClick={hentFraBrreg} disabled={brregLoading} style={s.btnPrimary}>
              {brregLoading ? "Henter…" : "Hent nye enheter"}
            </button>
          </div>
          {brregError && <div style={s.error}>{brregError}</div>}
        </section>

        {/* CSV */}
        <section style={s.card}>
          <h2 style={s.h2}>Lim inn egen liste (CSV)</h2>
          <p style={s.pMuted}>
            Første linje er overskrifter. Støtter kolonnene: navn, epost, poststed, orgnr — i
            hvilken som helst rekkefølge.
          </p>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder={"navn,epost,poststed\nEksempel AS,post@eksempel.no,Oslo"}
            style={s.textarea}
            rows={5}
          />
          <button onClick={importerCsv} style={s.btnSecondary}>
            Legg til fra CSV
          </button>
        </section>

        {/* TEMPLATE */}
        <section style={s.card}>
          <h2 style={s.h2}>Standardtekst</h2>
          <p style={s.pMuted}>
            Brukes ved masseutsending og som utgangspunkt når du redigerer én og én. {"{{navn}}"}{" "}
            byttes ut med bedriftens navn.
          </p>
          <label style={s.labelBlock}>
            Emne
            <input
              type="text"
              value={template.emne}
              onChange={(e) => setTemplate((t) => ({ ...t, emne: e.target.value }))}
              style={s.input}
            />
          </label>
          <label style={s.labelBlock}>
            Tekst
            <textarea
              value={template.tekst}
              onChange={(e) => setTemplate((t) => ({ ...t, tekst: e.target.value }))}
              style={s.textarea}
              rows={7}
            />
          </label>
        </section>

        {/* LEADS TABLE */}
        <section style={s.card}>
          <div style={s.tableHead}>
            <h2 style={s.h2}>Leadliste ({leads.length})</h2>
            <div style={s.tableActions}>
              <button onClick={toggleAll} style={s.btnSecondary}>
                Velg / fjern alle sendbare
              </button>
              <button
                onClick={sendBulk}
                disabled={selected.size === 0 || bulkProgress}
                style={s.btnPrimary}
              >
                Send til valgte ({selected.size})
              </button>
            </div>
          </div>
          {bulkProgress && (
            <div style={s.pMuted}>
              Sender… {bulkProgress.done} / {bulkProgress.total}
            </div>
          )}

          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th></th>
                  <th style={s.th}>Navn</th>
                  <th style={s.th}>E-post</th>
                  <th style={s.th}>Sted</th>
                  <th style={s.th}>Kilde</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}></th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <>
                    <tr key={lead.id} style={s.tr}>
                      <td style={s.td}>
                        <input
                          type="checkbox"
                          checked={selected.has(lead.id)}
                          disabled={!lead.epost || lead.status === "Sendt"}
                          onChange={() => toggleSelected(lead.id)}
                        />
                      </td>
                      <td style={s.td}>{lead.navn}</td>
                      <td style={s.td}>
                        {lead.epost || <span style={s.noEmail}>mangler e-post</span>}
                      </td>
                      <td style={s.td}>{lead.poststed}</td>
                      <td style={s.tdMono}>{lead.kilde}</td>
                      <td style={s.tdMono}>
                        {lead.status}
                        {lead.sendtDato && (
                          <div style={s.sentDate}>{lead.sendtDato}</div>
                        )}
                      </td>
                      <td style={s.td}>
                        <div style={s.rowActions}>
                          {lead.epost && lead.status !== "Sendt" && (
                            <button onClick={() => openEdit(lead)} style={s.btnTiny}>
                              Send…
                            </button>
                          )}
                          <button onClick={() => slettLead(lead.id)} style={s.btnTinyGhost}>
                            Slett
                          </button>
                        </div>
                        {sendError[lead.id] && (
                          <div style={s.error}>{sendError[lead.id]}</div>
                        )}
                      </td>
                    </tr>
                    {editingId === lead.id && (
                      <tr>
                        <td colSpan={7} style={s.editRow}>
                          <div style={s.editBox}>
                            <label style={s.labelBlock}>
                              Emne
                              <input
                                type="text"
                                value={editDraft.emne}
                                onChange={(e) =>
                                  setEditDraft((d) => ({ ...d, emne: e.target.value }))
                                }
                                style={s.input}
                              />
                            </label>
                            <label style={s.labelBlock}>
                              Tekst
                              <textarea
                                value={editDraft.tekst}
                                onChange={(e) =>
                                  setEditDraft((d) => ({ ...d, tekst: e.target.value }))
                                }
                                style={s.textarea}
                                rows={8}
                              />
                            </label>
                            <div style={s.row}>
                              <button
                                onClick={() => sendSingle(lead, editDraft.emne, editDraft.tekst)}
                                disabled={sendingId === lead.id}
                                style={s.btnPrimary}
                              >
                                {sendingId === lead.id ? "Sender…" : "Send e-post"}
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                style={s.btnSecondary}
                              >
                                Avbryt
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={7} style={s.emptyRow}>
                      Ingen leads ennå. Hent fra Brønnøysundregisteret eller lim inn en CSV over.
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
  logo: { fontFamily: "'Space Mono', monospace", fontWeight: 700 },
  logoutBtn: { fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", border: "1px solid #182524", background: "transparent", padding: "8px 14px", borderRadius: "2px", cursor: "pointer" },
  main: { maxWidth: "1040px", margin: "0 auto", padding: "32px 24px 80px", display: "flex", flexDirection: "column", gap: "24px" },
  statsRow: { display: "flex", gap: "16px" },
  statBox: { background: "#FBFCFB", padding: "18px 22px", flex: 1, textAlign: "center", border: "1px solid #B9C4C0" },
  statNum: { fontFamily: "'Space Mono', monospace", fontSize: "1.6rem", fontWeight: 700 },
  statLabel: { fontSize: "0.78rem", color: "#4A5957", marginTop: "4px" },
  card: { background: "#FBFCFB", padding: "26px 28px", border: "1px solid #B9C4C0" },
  h2: { fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", marginBottom: "6px" },
  pMuted: { fontSize: "0.85rem", color: "#4A5957", marginBottom: "14px" },
  row: { display: "flex", gap: "12px", alignItems: "flex-end", flexWrap: "wrap" },
  label: { display: "flex", flexDirection: "column", fontSize: "0.78rem", color: "#4A5957", gap: "4px" },
  labelBlock: { display: "flex", flexDirection: "column", fontSize: "0.78rem", color: "#4A5957", gap: "4px", marginBottom: "12px" },
  input: { padding: "10px 12px", border: "1px solid #B9C4C0", borderRadius: "2px", fontSize: "0.95rem", fontFamily: "inherit" },
  textarea: { padding: "10px 12px", border: "1px solid #B9C4C0", borderRadius: "2px", fontSize: "0.9rem", fontFamily: "'Space Mono', monospace", width: "100%", resize: "vertical" },
  btnPrimary: { fontFamily: "'Space Mono', monospace", fontWeight: 700, background: "#182524", color: "#FBFCFB", padding: "11px 20px", border: "none", borderRadius: "2px", cursor: "pointer", fontSize: "0.85rem" },
  btnSecondary: { fontFamily: "'Space Mono', monospace", background: "transparent", color: "#182524", padding: "10px 18px", border: "1px solid #182524", borderRadius: "2px", cursor: "pointer", fontSize: "0.85rem" },
  btnTiny: { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", background: "#182524", color: "#FBFCFB", border: "none", padding: "6px 10px", borderRadius: "2px", cursor: "pointer" },
  btnTinyGhost: { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", background: "transparent", color: "#9A332C", border: "1px solid #9A332C", padding: "6px 10px", borderRadius: "2px", cursor: "pointer" },
  error: { color: "#C1443C", fontSize: "0.78rem", marginTop: "8px", fontFamily: "'Space Mono', monospace" },
  tableHead: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "12px" },
  tableActions: { display: "flex", gap: "10px" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" },
  th: { textAlign: "left", borderBottom: "1px solid #B9C4C0", padding: "8px 10px", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#4A5957" },
  tr: { borderBottom: "1px solid #E4E9E6" },
  td: { padding: "10px", verticalAlign: "top" },
  tdMono: { padding: "10px", fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", verticalAlign: "top" },
  noEmail: { color: "#9A332C", fontSize: "0.78rem", fontStyle: "italic" },
  sentDate: { color: "#4A5957", fontSize: "0.7rem", marginTop: "2px" },
  rowActions: { display: "flex", gap: "6px" },
  editRow: { padding: "0" },
  editBox: { background: "#E4E9E6", padding: "18px", display: "flex", flexDirection: "column", gap: "6px" },
  emptyRow: { padding: "24px", textAlign: "center", color: "#4A5957", fontSize: "0.9rem" },
};

const css = `
  * { box-sizing: border-box; }
`;
