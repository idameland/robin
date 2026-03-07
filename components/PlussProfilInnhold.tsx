import { PlussProfilData } from "@/lib/pluss";

const serif = { fontFamily: "var(--font-playfair)" };
const mono = { fontFamily: "var(--font-dm-sans)" };

function initialer(navn: string) {
  return navn
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function Stjerner({ antall }: { antall: number }) {
  return <span>{"★".repeat(Math.min(antall, 5))}</span>;
}

export default function PlussProfilInnhold({ profil }: { profil: PlussProfilData }) {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <div style={{ background: "#F5F5C0" }}>
        <div className="max-w-2xl mx-auto px-6 py-10 md:py-14">
          {/* Badge */}
          <div style={{ marginBottom: "20px" }}>
            <span style={{
              display: "inline-block",
              background: "#1A1A0A", color: "#F5F5C0",
              fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "4px 12px", borderRadius: "100px",
              ...mono,
            }}>
              Pluss-profil
            </span>
          </div>

          {/* Avatar */}
          <div style={{
            width: 64, height: 64, borderRadius: "12px",
            background: "#1A1A0A",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", fontWeight: 700, color: "#F5F5C0",
            marginBottom: "18px",
          }}>
            {initialer(profil.firmanavn)}
          </div>

          {/* Firmanavn */}
          <h1
            className="text-[32px] md:text-[42px] leading-tight font-normal mb-2"
            style={{ ...serif, color: "#1A1A0A" }}
          >
            {profil.firmanavn}
          </h1>

          {/* Fag · Sted */}
          <p style={{ ...mono, fontSize: "14px", color: "#4A4A18", marginBottom: "16px" }}>
            {profil.fag} · {profil.sted}
          </p>

          {/* Chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <span style={{
              background: "rgba(26,26,10,0.08)", color: "#1A1A0A",
              borderRadius: "100px", fontSize: "12px", fontWeight: 600,
              padding: "5px 12px", ...mono,
            }}>
              <Stjerner antall={profil.stjerner} /> {profil.stjerner}.0
            </span>
            <span style={{
              background: "rgba(26,26,10,0.08)", color: "#1A1A0A",
              borderRadius: "100px", fontSize: "12px", fontWeight: 600,
              padding: "5px 12px", ...mono,
            }}>
              📍 {profil.sted}
            </span>
            <span style={{
              background: "rgba(26,26,10,0.08)", color: "#1A1A0A",
              borderRadius: "100px", fontSize: "12px", fontWeight: 600,
              padding: "5px 12px", ...mono,
            }}>
              {profil.anbefalinger.length} anbefalinger
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. MIDTSEKSJON ──────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 py-10 w-full">

        {/* Om */}
        {profil.om && (
          <section className="mb-10">
            <h2 style={{ ...mono, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6058", marginBottom: "12px" }}>
              Om
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#1A1814" }}>
              {profil.om}
            </p>
          </section>
        )}

        {/* Spesialiteter */}
        {profil.spesialiteter.length > 0 && (
          <section className="mb-10">
            <h2 style={{ ...mono, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6058", marginBottom: "12px" }}>
              Spesialiteter
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {profil.spesialiteter.map((s) => (
                <span key={s} style={{
                  background: "#FAFAE0", border: "1.5px solid #D4CC40",
                  borderRadius: "6px", fontSize: "13px", fontWeight: 600,
                  padding: "5px 12px", color: "#1A1A0A",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Anbefalinger */}
        {profil.anbefalinger.length > 0 && (
          <section className="mb-10">
            <h2 style={{ ...mono, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6058", marginBottom: "16px" }}>
              Anbefalinger ({profil.anbefalinger.length})
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {profil.anbefalinger.map((a, i) => (
                <div key={i} style={{
                  borderTop: i === 0 ? "1px solid #E8E4D8" : undefined,
                  borderBottom: "1px solid #E8E4D8",
                  padding: "20px 0 20px 20px",
                  borderLeft: "3px solid #D4CC40",
                }}>
                  <p style={{ ...serif, fontSize: "17px", lineHeight: "1.7", color: "#1A1814", marginBottom: "12px" }}>
                    «{a.sitat}»
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: "#1A1A0A",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "9px", fontWeight: 700, color: "#F5F5C0", flexShrink: 0,
                    }}>
                      {initialer(a.navn)}
                    </div>
                    <span style={{ ...mono, fontSize: "13px", color: "#6B6762" }}>{a.navn}</span>
                    <span style={{ ...mono, fontSize: "12px", color: "#9A9490", marginLeft: "auto" }}>{a.dato}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bilder */}
        {profil.bilder.length > 0 && (
          <section className="mb-10">
            <h2 style={{ ...mono, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6058", marginBottom: "12px" }}>
              Bilder fra prosjekter
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              {profil.bilder.slice(0, 6).map((b, i) => (
                <div key={i}>
                  <img
                    src={b.src}
                    alt={b.tekst}
                    style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: "6px", display: "block" }}
                  />
                  {b.tekst && (
                    <p style={{ ...mono, fontSize: "11px", color: "#6B6762", marginTop: "5px" }}>{b.tekst}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── 3. KONTAKT ──────────────────────────────────────────── */}
      {(profil.telefon || profil.epost || profil.instagram) && (
        <div style={{ background: "#F5F2EC" }}>
          <div className="max-w-2xl mx-auto px-6 py-10">
            <h2 style={{ ...mono, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6762", marginBottom: "16px" }}>
              Kontakt
            </h2>
            <div style={{
              background: "#FDFAF6", border: "1px solid #E4DFD7",
              borderRadius: "10px", overflow: "hidden",
            }}>
              {profil.telefon && (
                <a
                  href={`tel:${profil.telefon.replace(/\s/g, "")}`}
                  style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", textDecoration: "none", borderBottom: profil.epost || profil.instagram ? "1px solid #E4DFD7" : undefined }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1814" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span style={{ fontSize: "15px", color: "#1A1814", fontWeight: 500 }}>{profil.telefon}</span>
                </a>
              )}
              {profil.epost && (
                <a
                  href={`mailto:${profil.epost}`}
                  style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", textDecoration: "none", borderBottom: profil.instagram ? "1px solid #E4DFD7" : undefined }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1814" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <polyline points="2,4 12,13 22,4"/>
                  </svg>
                  <span style={{ fontSize: "15px", color: "#1A1814", fontWeight: 500 }}>{profil.epost}</span>
                </a>
              )}
              {profil.instagram && (
                <a
                  href={`https://instagram.com/${profil.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", textDecoration: "none" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1814" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="#1A1814" stroke="none"/>
                  </svg>
                  <span style={{ fontSize: "15px", color: "#1A1814", fontWeight: 500 }}>@{profil.instagram}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
