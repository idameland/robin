"use client";

import { useState, useRef, useEffect } from "react";
import { Anbefaling } from "@/lib/anbefalinger";

const serif = { fontFamily: "var(--font-playfair)" };

export function initialer(navn: string) {
  return navn.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function kortSitat(tekst: string) {
  return tekst.length <= 140 ? tekst : tekst.slice(0, 140).trimEnd() + "…";
}

export function KategoriTag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-mint text-petroleum text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
      {label}
    </span>
  );
}

export function AnbefalingKort({ a, onClick }: { a: Anbefaling; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-card-purple p-6 flex flex-col gap-4 cursor-pointer hover:brightness-95 transition-all h-full"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-[22px] leading-tight text-petroleum" style={serif}>
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

export function AnbefalingKortStablet({ anbefalinger, onClick }: { anbefalinger: Anbefaling[]; onClick: (gruppe: Anbefaling[], idx: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const a = anbefalinger[idx];
  const total = anbefalinger.length;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setIdx((prev) => diff > 0 ? (prev + 1) % total : (prev - 1 + total) % total);
      setShowHint(false);
    }
    touchStartX.current = null;
  }

  return (
    <div className="stack-wrap relative h-full" style={{ zIndex: 2 }}>
      {/* Badge */}
      <div style={{
        position: "absolute", top: -10, right: 6, zIndex: 10,
        background: "#1A1612", color: "white", borderRadius: "100px",
        fontSize: "9px", fontWeight: 700, padding: "3px 8px", whiteSpace: "nowrap",
      }}>
        {idx + 1} / {total}
      </div>

      {/* Kort */}
      <div
        onClick={() => onClick(anbefalinger, idx)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="bg-card-purple p-6 flex flex-col gap-4 cursor-pointer hover:brightness-95 transition-all h-full"
        style={{ position: "relative", zIndex: 2, overflow: "hidden" }}
      >
        {/* Gradient høyre kant — antyder mer innhold */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "40px",
          background: "linear-gradient(to right, transparent, rgba(210,198,228,0.5))",
          pointerEvents: "none", zIndex: 4,
        }} />
        {/* Swipe-hint */}
        <div style={{
          position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)",
          zIndex: 5, pointerEvents: "none",
          opacity: showHint ? 1 : 0, transition: "opacity 0.6s",
          display: "flex", alignItems: "center", gap: "5px",
          background: "rgba(26,22,18,0.65)", color: "white",
          borderRadius: "100px", padding: "3px 10px", fontSize: "10px", whiteSpace: "nowrap",
        }}>
          ↔ sveip
        </div>
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[22px] leading-tight text-petroleum" style={serif}>
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
          {/* Navigasjon */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }} onClick={(e) => e.stopPropagation()}>
            {/* Prikker */}
            <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
              {anbefalinger.map((_, i) => (
                <div key={i} style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: i === idx ? "#1A1612" : "#E2DDD7",
                  animation: i === idx ? "dotPulse 0.6s ease-in-out 0.3s 3" : "none",
                }} />
              ))}
            </div>
            {/* Piler */}
            <button
              onClick={() => setIdx((idx - 1 + total) % total)}
              style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #E2DDD7", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "20px", lineHeight: "32px", paddingBottom: "1px" }}
            >‹</button>
            <button
              onClick={() => setIdx((idx + 1) % total)}
              style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #E2DDD7", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "20px", lineHeight: "32px", paddingBottom: "1px" }}
            >›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnbefalingModal({ gruppe, startIdx, onClose }: { gruppe: Anbefaling[]; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  const a = gruppe[idx];
  const total = gruppe.length;
  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) setIdx((prev) => diff > 0 ? (prev + 1) % total : (prev - 1 + total) % total);
    touchStartX.current = null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[560px] max-h-[90vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-petroleum-muted hover:text-petroleum text-xl leading-none transition-colors"
        >
          ✕
        </button>
        <div className="flex items-center justify-between mb-3">
          <KategoriTag label={a.kategori} />
          {total > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ display: "flex", gap: "3px" }}>
                {gruppe.map((_, i) => (
                  <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i === idx ? "#1A1612" : "#E2DDD7" }} />
                ))}
              </div>
              <button
                onClick={() => setIdx((idx - 1 + total) % total)}
                style={{ width: 24, height: 24, borderRadius: "50%", border: "1.5px solid #E2DDD7", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "13px", lineHeight: 1 }}
              >‹</button>
              <button
                onClick={() => setIdx((idx + 1) % total)}
                style={{ width: 24, height: 24, borderRadius: "50%", border: "1.5px solid #E2DDD7", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "13px", lineHeight: 1 }}
              >›</button>
            </div>
          )}
        </div>
        <h2 className="text-[32px] leading-tight text-petroleum mt-0 mb-1" style={serif}>
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
          <p className="text-[18px] leading-[1.6] text-petroleum" style={serif}>
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
