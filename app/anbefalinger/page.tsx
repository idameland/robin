"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { anbefalinger, filterKategorier, Anbefaling } from "@/data/anbefalinger";

const serif = { fontFamily: "var(--font-playfair)" };

function initialer(navn: string) {
  return navn
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function kortSitat(tekst: string) {
  return tekst.length <= 140 ? tekst : tekst.slice(0, 140).trimEnd() + "…";
}

function KategoriTag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-mint text-petroleum text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
      {label}
    </span>
  );
}

function AnbefalingKort({
  a,
  onClick,
}: {
  a: Anbefaling;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-card-purple p-6 flex flex-col gap-4 cursor-pointer hover:brightness-95 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <h2
          className="text-[22px] leading-tight text-petroleum"
          style={serif}
        >
          {a.firma}
        </h2>
        <KategoriTag label={a.kategori} />
      </div>

      <p className="text-[13px] text-petroleum-muted">{a.jobb}</p>

      <p className="text-[14px] text-petroleum leading-[1.6] flex-1">
        {kortSitat(a.sitat)}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-black/8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-petroleum flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            {initialer(a.anbefaler)}
          </div>
          <span className="text-[12px] text-petroleum-muted">{a.anbefaler}</span>
        </div>
        <span className="text-[12px] text-petroleum-muted">{a.dato}</span>
      </div>
    </div>
  );
}

function Modal({ a, onClose }: { a: Anbefaling; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[560px] max-h-[90vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-petroleum-muted hover:text-petroleum text-xl leading-none transition-colors"
        >
          ✕
        </button>

        <KategoriTag label={a.kategori} />

        <h2
          className="text-[32px] leading-tight text-petroleum mt-3 mb-1"
          style={serif}
        >
          {a.firma}
        </h2>
        <p className="text-[14px] text-petroleum-muted mb-6">{a.kontakt}</p>

        <div className="border-t border-[#E2DDD7] pt-5 mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-petroleum-muted mb-1">
            Hva som ble gjort
          </p>
          <p className="text-[14px] text-petroleum">{a.jobb}</p>
        </div>

        <div className="border-t border-[#E2DDD7] pt-5 mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-petroleum-muted mb-3">
            Anbefaling
          </p>
          <p
            className="text-[18px] leading-[1.6] text-petroleum"
            style={serif}
          >
            «{a.sitat}»
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-petroleum flex items-center justify-center text-white text-[11px] font-bold shrink-0">
              {initialer(a.anbefaler)}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-petroleum">{a.anbefaler}</p>
              <p className="text-[12px] text-petroleum-muted">Anbefaler</p>
            </div>
          </div>
          <span className="text-[12px] text-petroleum-muted">{a.dato}</span>
        </div>
      </div>
    </div>
  );
}

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

        {/* Filter pills */}
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

        {/* Grid */}
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

      {valgt && <Modal a={valgt} onClose={() => setValgt(null)} />}
    </div>
  );
}
