export const artikkelCss = `
:root{
  --bg:#FFFFFF;--bg-soft:#F5F8F6;--ink:#0F172A;--ink-soft:#5B6472;
  --accent:#0FB77D;--accent-2:#6D5EF0;--line:#E7EAE8;--white:#FFFFFF;
}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased;}
a{color:var(--accent);text-decoration:underline;text-underline-offset:2px;}
.wrap{max-width:720px;margin:0 auto;padding:0 24px;}
header{padding:26px 0;border-bottom:1px solid var(--line);}
header .inner{max-width:720px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;}
.logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.1rem;text-decoration:none;color:var(--ink);}
.logo span{background:linear-gradient(90deg, var(--accent), var(--accent-2));-webkit-background-clip:text;background-clip:text;color:transparent;}
.back-link{font-size:0.85rem;text-decoration:none;color:var(--ink-soft);}
article{padding:56px 0 80px;}
.eyebrow{font-size:0.8rem;font-weight:600;color:var(--accent);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px;}
h1{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(1.9rem,4vw,2.6rem);line-height:1.15;letter-spacing:-0.01em;margin-bottom:18px;}
.lede{font-size:1.15rem;color:var(--ink-soft);margin-bottom:36px;}
h2{font-family:'Space Grotesk',sans-serif;font-size:1.35rem;margin:36px 0 14px;}
p{margin-bottom:16px;font-size:1.02rem;}
ul{margin:0 0 16px 20px;}
li{margin-bottom:8px;font-size:1.02rem;}
.source-note{margin-top:48px;padding:18px 20px;background:var(--bg-soft);border-radius:12px;font-size:0.88rem;color:var(--ink-soft);}
.source-note a{color:var(--ink-soft);}
.cta-box{margin-top:48px;padding:28px;border-radius:20px;background:linear-gradient(120deg, var(--ink), #1F2A44);color:var(--white);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;}
.cta-box a{color:var(--white);background:var(--white);color:var(--ink);padding:13px 24px;border-radius:999px;text-decoration:none;font-weight:700;}
footer{border-top:1px solid var(--line);padding:32px 0;font-size:0.82rem;color:var(--ink-soft);}
`;
