"use client";

import { useEffect, useCallback } from "react";
import BedriftProfilInnhold from "@/components/BedriftProfilInnhold";
import PlussProfilInnhold from "@/components/PlussProfilInnhold";
import { anbefalinger, firmaer, FirmaInfo, Anbefaling } from "@/lib/anbefalinger";
import { plussProfiler, PlussProfilData } from "@/lib/pluss";

export default function BedriftModal({ slug, onClose }: { slug: string; onClose: () => void }) {
  const pluss = plussProfiler.find((p) => p.slug === slug);
  if (pluss) {
    return <ModalWrapper slug={slug} onClose={onClose}><PlussProfilInnhold profil={pluss} /></ModalWrapper>;
  }

  const firmaEntry = Object.entries(firmaer).find(([, f]) => f.slug === slug);
  if (!firmaEntry) return null;

  const [firmanavn, info] = firmaEntry;
  const firmaAnbefalinger = anbefalinger.filter((a) => a.firma === firmanavn).reverse();
  if (firmaAnbefalinger.length === 0) return null;

  const kategori = firmaAnbefalinger[0].kategori;

  return (
    <ModalWrapper slug={slug} onClose={onClose}>
      <BedriftProfilInnhold
        firmanavn={firmanavn}
        info={info}
        firmaAnbefalinger={firmaAnbefalinger}
        kategori={kategori}
        isModal
      />
    </ModalWrapper>
  );
}

function ModalWrapper({ slug, onClose, children }: { slug: string; onClose: () => void; children: React.ReactNode }) {
  const handleClose = useCallback(() => {
    window.history.pushState(null, "", "/");
    onClose();
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.history.pushState(null, "", `/bedrift/${slug}`);

    const handlePop = () => onClose();
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };

    window.addEventListener("popstate", handlePop);
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("popstate", handlePop);
      window.removeEventListener("keydown", handleKey);
    };
  }, [slug, handleClose, onClose]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={handleClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
      <div
        className="sm:rounded-xl sm:max-h-[85vh] sm:w-[600px]"
        style={{
          position: "relative",
          width: "100%", height: "100%",
          background: "white",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          animation: "modalFadeIn 0.25s ease-out",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute", top: 14, right: 16, zIndex: 10,
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            border: "none", cursor: "pointer",
            fontSize: "16px", fontWeight: 700, color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          ✕
        </button>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
