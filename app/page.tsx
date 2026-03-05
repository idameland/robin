"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { AnbefalingKort, AnbefalingModal } from "@/components/AnbefalingKort";
import { anbefalinger, filterKategorier, Anbefaling } from "@/lib/anbefalinger";

const serif = { fontFamily: "var(--font-playfair)" };

const MELDING = "En liten fugl fortalte meg om…";
const TYPING_DELAY = 1400;
const CHAR_SPEED = 52;

export default function Home() {
  const [aktiv, setAktiv] = useState("Alle");
  const [valgt, setValgt] = useState<Anbefaling | null>(null);
  const [søk, setSøk] = useState("");

  const [fase, setFase] = useState<"typing" | "skriver" | "ferdig">("typing");
  const [tekst, setTekst] = useState("");

  useEffect(() => {
    const t1 = setTimeout(() => {
      setFase("skriver");
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTekst(MELDING.slice(0, i));
        if (i === MELDING.length) {
          clearInterval(interval);
          setFase("ferdig");
        }
      }, CHAR_SPEED);
      return () => clearInterval(interval);
    }, TYPING_DELAY);
    return () => clearTimeout(t1);
  }, []);

  const filtrert = anbefalinger
    .filter((a) => aktiv === "Alle" || a.kategori === aktiv)
    .filter((a) => {
      const q = søk.toLowerCase().trim();
      if (!q) return true;
      return (
        a.firma.toLowerCase().includes(q) ||
        a.jobb.toLowerCase().includes(q) ||
        a.kategori.toLowerCase().includes(q) ||
        a.anbefaler.toLowerCase().includes(q) ||
        a.sitat.toLowerCase().includes(q)
      );
    })
    .slice()
    .reverse();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero onSøk={setSøk} />
      <main className="max-w-5xl mx-auto px-6 pt-0 pb-16 md:pt-6">

        <div className="mt-0 pt-6 md:mt-6 md:pt-10 border-t border-black/8">

          <h3
            className="text-[24px] md:text-[30px] font-normal text-petroleum mb-6"
            style={serif}
          >
            Anbefalinger fra naboer i Nordre Aker, Oslo
          </h3>

          {/* iMessage-boble */}
          <div className="flex items-end gap-2.5 mb-8 max-w-sm">
            <div className="w-8 h-8 rounded-full bg-petroleum flex items-center justify-center text-white text-[11px] font-bold shrink-0 mb-1">
              NN
            </div>
            <div>
              <p className="text-[11px] text-petroleum-muted mb-1 ml-1">Nora Nabo</p>
              <div
                className="relative px-3.5 py-2.5 min-w-[52px]"
                style={{
                  background: "#E9E9EB",
                  borderRadius: "18px 18px 18px 4px",
                  fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
                  fontSize: "15px",
                  color: "#000",
                  lineHeight: "1.4",
                }}
              >
                {fase === "typing" && (
                  <span className="flex gap-1 items-center h-5 px-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#8E8E93] inline-block"
                        style={{
                          animation: "bounce 1.2s infinite",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </span>
                )}
                {fase !== "typing" && (
                  <>
                    {tekst}
                    {fase === "skriver" && (
                      <span style={{ animation: "blink 1s step-end infinite" }}>|</span>
                    )}
                  </>
                )}
              </div>
              {fase === "ferdig" && (
                <p className="text-[11px] text-petroleum-muted mt-1 ml-1">I dag</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-8">
            {filterKategorier.map((kat) => {
              const antall = kat === "Alle" ? anbefalinger.length : anbefalinger.filter((a) => a.kategori === kat).length;
              return (
                <button
                  key={kat}
                  onClick={() => setAktiv(kat)}
                  className={`px-4 py-1.5 text-sm font-medium border transition-colors ${
                    aktiv === kat
                      ? "bg-petroleum text-white border-petroleum"
                      : "bg-white text-petroleum border-black/20 hover:border-black"
                  }`}
                >
                  {kat} ({antall})
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtrert.map((a, i) => (
              <AnbefalingKort key={i} a={a} onClick={() => setValgt(a)} />
            ))}
          </div>
          {filtrert.length === 0 && (
            <p className="text-petroleum-muted text-sm py-16 text-center">
              Ingen anbefalinger matcher søket ditt.
            </p>
          )}
        </div>
      </main>

      {valgt && <AnbefalingModal a={valgt} onClose={() => setValgt(null)} />}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
