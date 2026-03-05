"use client";

import { useState, useEffect } from "react";

const MELDING = "En liten fugl fortalte meg om…";
const TYPING_DELAY = 1400;
const CHAR_SPEED = 52;

export default function Hero({ onSøk }: { onSøk: (q: string) => void }) {
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

  return (
    <section className="px-6 pt-14 pb-2 md:pb-10">
      <div className="max-w-5xl mx-auto">
        <h1
          className="text-4xl md:text-5xl text-petroleum leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}
        >
          Finn fagfolk du kan stole på
        </h1>

        {/* iMessage-boble */}
        <div className="flex items-end gap-2.5 mb-6 max-w-sm">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-petroleum flex items-center justify-center text-white text-[11px] font-bold shrink-0 mb-1">
            NN
          </div>

          <div>
            <p className="text-[11px] text-petroleum-muted mb-1 ml-1">Nora Nabo</p>

            {/* Boble */}
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

        {/* Søkefelt */}
        <div className="relative w-full max-w-lg">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-mint-dark"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Søk etter fag eller navn..."
            onChange={(e) => onSøk(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-black/20 bg-white text-petroleum placeholder-petroleum/40 focus:outline-none focus:border-black transition-colors"
          />
        </div>
      </div>

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
    </section>
  );
}
