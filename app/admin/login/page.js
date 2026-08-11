export const dynamic = "force-dynamic";

export default function LoginPage({ searchParams }) {
  const error = searchParams?.error;
  return (
    <div style={styles.wrap}>
      <style>{css}</style>
      <form method="POST" action="/api/admin/login" style={styles.card}>
        <h1 style={styles.h1}>klarnettside — admin</h1>
        <p style={styles.p}>Skriv inn passordet for å åpne utsendingsverktøyet.</p>
        {error && <div style={styles.error}>Feil passord. Prøv igjen.</div>}
        <input
          type="password"
          name="password"
          placeholder="Passord"
          autoFocus
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Logg inn →
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#EEF1EF",
  },
  card: {
    background: "#FBFCFB",
    padding: "40px 36px",
    width: "340px",
    boxShadow: "0 24px 50px -20px rgba(24,37,36,0.35)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  h1: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "1.1rem",
    color: "#182524",
  },
  p: { fontSize: "0.85rem", color: "#4A5957", marginBottom: "6px" },
  error: {
    fontSize: "0.8rem",
    color: "#C1443C",
    fontFamily: "'Space Mono', monospace",
  },
  input: {
    padding: "12px 14px",
    border: "1px solid #B9C4C0",
    borderRadius: "2px",
    fontSize: "1rem",
    fontFamily: "inherit",
  },
  button: {
    fontFamily: "'Space Mono', monospace",
    fontWeight: 700,
    background: "#182524",
    color: "#FBFCFB",
    padding: "14px",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

const css = `
  body{margin:0;}
  input:focus{outline:2px solid #C1443C;}
`;
