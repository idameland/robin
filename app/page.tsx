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

  const filtrert = (
    aktiv === "Alle"
      ? anbefalinger
      : anbefalinger.filter((a) => a.kategori === aktiv)
  ).slice().reverse();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <main className="max-w-5xl mx-auto px-6 pt-0 pb-16 md:pt-6">

        {/* Siste anbefalinger */}
        <div className="mt-0 pt-4 md:mt-6 md:pt-10 border-t border-black/8">
          <h2
            className="text-[32px] md:text-[38px] font-normal text-petroleum mb-6"
            style={serif}
          >
            «En liten fugl fortalte meg om…»
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
        </div>
      </main>

      {valgt && <AnbefalingModal a={valgt} onClose={() => setValgt(null)} />}
    </div>
  );
}
