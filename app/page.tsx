"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { AnbefalingKort, AnbefalingModal } from "@/components/AnbefalingKort";
import { anbefalinger, filterKategorier, Anbefaling } from "@/lib/anbefalinger";

const serif = { fontFamily: "var(--font-playfair)" };

export default function Home() {
  const [aktiv, setAktiv] = useState("Alle");
  const [valgt, setValgt] = useState<Anbefaling | null>(null);
  const [søk, setSøk] = useState("");

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
      <main className="max-w-5xl mx-auto px-6 pt-0 pb-16 md:pt-2">
        <div className="mt-0 pt-4 md:mt-4 md:pt-6">
          <h2
            className="text-[28px] md:text-[36px] text-petroleum leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}
          >
            Anbefalinger fra noen kvitrete naboer
          </h2>

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
    </div>
  );
}
