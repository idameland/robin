import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { anbefalinger, firmaer } from "@/lib/anbefalinger";

const serif = { fontFamily: "var(--font-playfair)" };

function initialer(navn: string) {
  return navn.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

export function generateStaticParams() {
  return Object.values(firmaer)
    .filter((f) => f.slug)
    .map((f) => ({ slug: f.slug }));
}

export default async function BedriftPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const firmaEntry = Object.entries(firmaer).find(([, f]) => f.slug === slug);
  if (!firmaEntry) notFound();

  const [firmanavn, info] = firmaEntry;
  const firmaAnbefalinger = anbefalinger.filter((a) => a.firma === firmanavn).reverse();
  if (firmaAnbefalinger.length === 0) notFound();

  const kategori = firmaAnbefalinger[0].kategori;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Header */}
      <div style={{ background: "#004E64" }}>
        <div className="max-w-3xl mx-auto px-6 py-10 md:py-14">

          {/* Avatar */}
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", fontWeight: 700, color: "white",
            marginBottom: "20px",
          }}>
            {initialer(firmanavn)}
          </div>

          {/* Firmanavn */}
          <h1
            className="text-[32px] md:text-[42px] leading-tight font-normal mb-3"
            style={{ ...serif, color: "white" }}
          >
            {firmanavn}
          </h1>

          {/* Kategori + org.nr */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
            <span style={{
              background: "rgba(159,255,203,0.15)", color: "#9FFFCB",
              borderRadius: "100px", fontSize: "11px", fontWeight: 700,
              padding: "4px 12px",
            }}>
              {kategori}
            </span>
            {info.orgnr && (
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "12px", color: "#C5E4EA" }}>
                  Org.nr. {info.orgnr}
                </span>
                <span style={{
                  background: "rgba(159,255,203,0.15)", color: "#9FFFCB",
                  borderRadius: "100px", fontSize: "10px", fontWeight: 700,
                  padding: "2px 8px",
                }}>
                  ✓ Verifisert
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Innhold */}
      <main className="max-w-3xl mx-auto px-6 py-10 w-full flex-1">

        {/* Kontakt */}
        {(info.telefon || info.epost || info.instagram || info.nettside) && (
          <section className="mb-10">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-petroleum-muted mb-4">
              Ta kontakt
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {info.telefon && (
                <a
                  href={`tel:${info.telefon.replace(/\s/g, "")}`}
                  style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
                >
                  <span style={{ width: 32, height: 32, borderRadius: "50%", background: "#E0F9F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>📞</span>
                  <span style={{ fontSize: "15px", color: "#004E64", fontWeight: 500 }}>{info.telefon}</span>
                </a>
              )}
              {info.epost && (
                <a
                  href={`mailto:${info.epost}`}
                  style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
                >
                  <span style={{ width: 32, height: 32, borderRadius: "50%", background: "#E0F9F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>✉️</span>
                  <span style={{ fontSize: "15px", color: "#004E64", fontWeight: 500 }}>{info.epost}</span>
                </a>
              )}
              {info.instagram && (
                <a
                  href={`https://instagram.com/${info.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
                >
                  <span style={{ width: 32, height: 32, borderRadius: "50%", background: "#E0F9F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003D50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="#003D50" stroke="none"/>
                    </svg>
                  </span>
                  <span style={{ fontSize: "15px", color: "#004E64", fontWeight: 500 }}>@{info.instagram}</span>
                </a>
              )}
              {info.nettside && (
                <a
                  href={info.nettside}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
                >
                  <span style={{ width: 32, height: 32, borderRadius: "50%", background: "#E0F9F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>🌐</span>
                  <span style={{ fontSize: "15px", color: "#004E64", fontWeight: 500 }}>{info.nettside}</span>
                </a>
              )}
            </div>
          </section>
        )}

        {/* Bildegalleri */}
        {info.bilder && info.bilder.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-petroleum-muted mb-4">
              Bilder
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {info.bilder.map((src, i) => (
                <img key={i} src={src} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: "4px" }} />
              ))}
            </div>
          </section>
        )}

        {/* Anbefalinger */}
        <section>
          <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-petroleum-muted mb-6">
            Anbefalinger ({firmaAnbefalinger.length})
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {firmaAnbefalinger.map((a, i) => (
              <div
                key={i}
                style={{ borderTop: i === 0 ? "1px solid #F0EDE8" : undefined, borderBottom: "1px solid #F0EDE8", padding: "24px 0" }}
              >
                {/* Jobbtype */}
                <span style={{
                  display: "inline-block",
                  background: "#E0F9F0", color: "#003D50",
                  borderRadius: "4px", fontSize: "10px", fontWeight: 700,
                  padding: "2px 8px", marginBottom: "12px",
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}>
                  {a.jobb}
                </span>

                {/* Sitat */}
                <p
                  className="text-[17px] leading-[1.7] text-petroleum mb-4"
                  style={{ ...serif, borderLeft: "3px solid #9FFFCB", paddingLeft: "16px" }}
                >
                  «{a.sitat}»
                </p>

                {/* Anbefaler + dato */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "#004E64", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: "9px", fontWeight: 700, color: "white", flexShrink: 0,
                    }}>
                      {initialer(a.anbefaler)}
                    </div>
                    <span style={{ fontSize: "13px", color: "#6B6058" }}>{a.anbefaler}</span>
                  </div>
                  <span style={{ fontSize: "12px", color: "#9A9088" }}>{a.dato}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tilbake */}
        <div className="mt-12">
          <Link href="/" style={{ fontSize: "13px", color: "#6B6058", textDecoration: "none" }}>
            ← Tilbake til forsiden
          </Link>
        </div>
      </main>

      <footer className="border-t border-black/8 px-6 py-5">
        <span className="text-petroleum-muted text-[15px]" style={serif}>
          Robin
        </span>
      </footer>
    </div>
  );
}
