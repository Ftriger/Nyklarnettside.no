"use client";
import { useState } from "react";

export default function KonkurrenterPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [newUrl, setNewUrl] = useState("");

  async function load(pw: string) {
    const res = await fetch("/api/konkurrenter", { headers: { "x-admin-password": pw } });
    if (res.ok) {
      const data = await res.json();
      setCompetitors(data.competitors);
      setAuthed(true);
    } else {
      alert("Feil passord");
    }
  }

  async function addCompetitor() {
    if (!newUrl) return;
    await fetch("/api/konkurrenter", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ url: newUrl }),
    });
    setNewUrl("");
    load(password);
  }

  async function removeCompetitor(url: string) {
    await fetch("/api/konkurrenter", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ url }),
    });
    load(password);
  }

  if (!authed) {
    return (
      <div style={{ padding: 40, maxWidth: 400 }}>
        <h1>Konkurrenter — logg inn</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passord"
          style={{ padding: 8, width: "100%", marginBottom: 8 }}
        />
        <button onClick={() => load(password)} style={{ padding: 8, width: "100%" }}>
          Logg inn
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, maxWidth: 800 }}>
      <h1>Konkurrentovervåking</h1>
      <div style={{ marginBottom: 20, display: "flex", gap: 8 }}>
        <input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://konkurrent.no"
          style={{ padding: 8, flex: 1 }}
        />
        <button onClick={addCompetitor} style={{ padding: 8 }}>
          Legg til
        </button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
            <th>URL</th>
            <th>Sist sjekket</th>
            <th>Sist endret</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((c) => (
            <tr key={c.url} style={{ borderBottom: "1px solid #eee" }}>
              <td>
                <a href={c.url} target="_blank">
                  {c.url}
                </a>
              </td>
              <td>{c.checkedAt ? new Date(c.checkedAt).toLocaleString("no-NO") : "—"}</td>
              <td>{c.changedAt ? new Date(c.changedAt).toLocaleString("no-NO") : "—"}</td>
              <td>
                <button onClick={() => removeCompetitor(c.url)}>Fjern</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

