"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryPills from "@/components/CategoryPills";
import ProfCard from "@/components/ProfCard";
import { professionals } from "@/data/professionals";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Alle");

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
      </main>
    </div>
  );
}
