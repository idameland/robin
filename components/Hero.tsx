"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const MELDING = "En liten fugl fortalte meg om…";
const TYPING_DELAY = 1400;
const CHAR_SPEED = 52;

function MessengerBoble({ onSøk }: { onSøk: (q: string) => void }) {
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

  const avatarSrc = "/images/nabo-rannveig.jpg";

  return (
    <div style={{ marginLeft: "24px", marginBottom: "32px" }}>
      {/* Avsendernavn */}
      <p style={{
        fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
        fontSize: "13px",
        color: "#8E8E93",
        paddingLeft: "14px",
        marginBottom: "4px",
      }}>
        Nabo Rannveig
      </p>

      {/* Avatar + boble */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Avatar */}
        <div style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "#1A1612" }}>
          <Image
            src={avatarSrc}
            alt="Nabo Rannveig"
            width={38}
            height={38}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
            onError={(e) => {
              // Fallback til initialer hvis bildet ikke finnes
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Boble */}
        <div style={{
          background: "#EBEBEB",
          borderRadius: "20px",
          padding: "12px 18px",
          fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
          fontSize: "17px",
          color: "#000",
          lineHeight: "1.4",
          maxWidth: "300px",
        }}>
          {fase === "typing" && (
            <span style={{ display: "flex", gap: "5px", alignItems: "center", height: "24px" }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: "inline-block",
                  width: 8, height: 8,
                  borderRadius: "50%",
                  background: "#ADADAD",
                  animation: "msngrBounce 1.2s infinite",
                  animationDelay: `${i * 0.2}s`,
                }} />
              ))}
            </span>
          )}
          {fase !== "typing" && (
            <>
              {tekst}
              {fase === "skriver" && (
                <span style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1em",
                  background: "#000",
                  marginLeft: "1px",
                  verticalAlign: "text-bottom",
                  animation: "msngrBlink 0.6s step-end infinite",
                }} />
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes msngrBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes msngrBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function Hero({ onSøk }: { onSøk: (q: string) => void }) {
  return (
    <section className="px-6 pt-14 pb-2 md:pb-10">
      <div className="max-w-5xl mx-auto">
        <h1
          className="text-4xl md:text-5xl text-petroleum leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}
        >
          Finn fagfolk du kan stole på
        </h1>

        <MessengerBoble onSøk={onSøk} />

        {/* Søkefelt */}
        <div className="relative w-full max-w-lg">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-mint-dark"
            width="18" height="18"
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
    </section>
  );
}
