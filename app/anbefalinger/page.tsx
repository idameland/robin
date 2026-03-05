"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { AnbefalingKort, AnbefalingModal } from "@/components/AnbefalingKort";
import { anbefalinger, filterKategorier, Anbefaling } from "@/lib/anbefalinger";

const serif = { fontFamily: "var(--font-playfair)" };

export default function AnbefalingerPage() {
  const [aktiv, setAktiv] = useState("Alle");
  const [valgt, setValgt] = useState<Anbefaling | null>(null);

  const filtrert =
    aktiv === "Alle"
      ? anbefalinger
      : anbefalinger.filter((a) => a.kategori === aktiv);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        <h1
          className="text-[44px] md:text-[52px] leading-tight font-normal text-petroleum mb-3"
          style={serif}
        >
          Anbefalinger
        </h1>
        <p className="text-petroleum-muted text-lg mb-10">
          Ekte erfaringer fra naboer i Nordre Aker
        </p>

        <div className="flex gap-2 flex-wrap mb-10">
          {filterKategorier.map((kat) => (
            <button
              key={kat}
              onClick={() => setAktiv(kat)}
              className={`px-4 py-1.5 text-sm font-medium border transition-colors ${
                aktiv === kat
                  ? "bg-petroleum text-white border-petroleum"
                  : "bg-white text-petroleum border-black/20 hover:border-black"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtrert.map((a, i) => (
            <AnbefalingKort key={i} a={a} onClick={() => setValgt(a)} />
          ))}
        </div>

        {filtrert.length === 0 && (
          <p className="text-center text-petroleum-muted py-24">
            Ingen anbefalinger i denne kategorien ennå.
          </p>
        )}
      </main>

      {valgt && <AnbefalingModal a={valgt} onClose={() => setValgt(null)} />}
    </div>
  );
}
