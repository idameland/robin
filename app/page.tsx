"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { AnbefalingKort, AnbefalingKortStablet, AnbefalingModal } from "@/components/AnbefalingKort";
import BedriftModal from "@/components/BedriftModal";
import { anbefalinger, filterKategorier, firmaer, Anbefaling } from "@/lib/anbefalinger";

const serif = { fontFamily: "var(--font-playfair)" };
const INITIAL_COUNT = 9;

export default function Home() {
  const [aktiv, setAktiv] = useState("Alle");
  const [valgt, setValgt] = useState<{ gruppe: Anbefaling[]; idx: number } | null>(null);
  const [søk, setSøk] = useState("");
  const [showAll, setShowAll] = useState(false);

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

  // Grupper per firma, bevar rekkefølge på første forekomst
  const gruppert: Anbefaling[][] = [];
  const firmaMap = new Map<string, Anbefaling[]>();
  for (const a of filtrert) {
    if (!firmaMap.has(a.firma)) {
      const group: Anbefaling[] = [];
      firmaMap.set(a.firma, group);
      gruppert.push(group);
    }
    firmaMap.get(a.firma)!.push(a);
  }

  const visibleGroups = showAll ? gruppert : gruppert.slice(0, INITIAL_COUNT);
  const remaining = gruppert.length - INITIAL_COUNT;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <main className="max-w-5xl mx-auto px-6 pt-0 pb-16 md:pt-2">
        <div className="mt-8 pt-2 md:mt-2 md:pt-4">
          <h2
            className="text-[28px] md:text-[36px] text-petroleum leading-tight mb-5"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
          >
            Anbefalinger fra ditt nærområde
          </h2>

          {/* Søkefelt */}
          <div className="relative w-full max-w-lg mb-6">
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
              onChange={(e) => setSøk(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-black/20 bg-white text-petroleum placeholder-petroleum/40 focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="flex gap-2 flex-wrap mb-8">
            {filterKategorier.map((kat) => {
              const antall = kat === "Alle"
                ? new Set(anbefalinger.map((a) => a.firma)).size
                : new Set(anbefalinger.filter((a) => a.kategori === kat).map((a) => a.firma)).size;
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
            {visibleGroups.map((group) => {
              const slug = firmaer[group[0].firma]?.slug;
              const href = slug ? `/bedrift/${slug}` : undefined;
              return group.length === 1
                ? <AnbefalingKort key={group[0].firma} a={group[0]} href={href} onClick={href ? undefined : () => setValgt({ gruppe: group, idx: 0 })} />
                : <AnbefalingKortStablet key={group[0].firma} anbefalinger={group} href={href} onClick={href ? undefined : (gruppe, idx) => setValgt({ gruppe, idx })} />;
            })}
          </div>
          {filtrert.length === 0 && (
            <p className="text-petroleum-muted text-sm py-16 text-center">
              Ingen anbefalinger matcher søket ditt.
            </p>
          )}
          {remaining > 0 && !showAll && (
            <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #E2DDD7', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <p style={{ fontSize: '11px', color: '#9A9088', fontFamily: 'Roboto Mono' }}>
                Viser {INITIAL_COUNT} av {gruppert.length} firmaer
              </p>
              <button
                onClick={() => setShowAll(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '12px 28px', borderRadius: '100px',
                  border: '1.5px solid #E2DDD7', background: '#FFFFFF',
                  fontFamily: 'Roboto Mono', fontSize: '12px', fontWeight: '700',
                  color: '#1A1612', cursor: 'pointer'
                }}
              >
                Last inn flere
                <span style={{
                  background: '#9FFFCB', color: '#004E64',
                  padding: '2px 9px', borderRadius: '100px',
                  fontSize: '10px', fontWeight: '800'
                }}>
                  +{remaining}
                </span>
              </button>
            </div>
          )}
          {showAll && gruppert.length > INITIAL_COUNT && (
            <p style={{ textAlign: 'center', fontSize: '11px', color: '#9A9088', fontStyle: 'italic', marginTop: '20px' }}>
              ✓ Du har sett alle {gruppert.length} firmaene
            </p>
          )}
        </div>
      </main>

      {valgt && <AnbefalingModal gruppe={valgt.gruppe} startIdx={valgt.idx} onClose={() => setValgt(null)} />}
    </div>
  );
}
