"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryPills from "@/components/CategoryPills";
import ProfCard from "@/components/ProfCard";
import { AnbefalingKort, AnbefalingModal } from "@/components/AnbefalingKort";
import { professionals } from "@/data/professionals";
import { anbefalinger, Anbefaling } from "@/lib/anbefalinger";

const serif = { fontFamily: "var(--font-playfair)" };

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [valgt, setValgt] = useState<Anbefaling | null>(null);

  const filtered =
    activeCategory === "Alle"
      ? professionals
      : professionals.filter((p) => p.fag === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CategoryPills onSelect={setActiveCategory} />
      <main className="max-w-5xl mx-auto px-6 py-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prof) => (
            <ProfCard key={prof.id} prof={prof} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-petroleum-muted py-24">
            Ingen fagfolk funnet i denne kategorien ennå.
          </p>
        )}

        {/* Siste anbefalinger */}
        <div className="mt-16 pt-12 border-t border-black/8">
          <h2
            className="text-[32px] md:text-[38px] font-normal text-petroleum mb-10"
            style={serif}
          >
            Siste anbefalinger
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {anbefalinger.map((a, i) => (
              <AnbefalingKort key={i} a={a} onClick={() => setValgt(a)} />
            ))}
          </div>
        </div>
      </main>

      {valgt && <AnbefalingModal a={valgt} onClose={() => setValgt(null)} />}
    </div>
  );
}
