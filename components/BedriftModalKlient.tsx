"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BedriftModalKlient({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
      {/* Backdrop */}
      <div
        onClick={() => router.back()}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(3px)",
        }}
      />

      {/* Panel */}
      <div style={{
        position: "absolute",
        top: "4vh", left: 0, right: 0, bottom: 0,
        background: "white",
        borderRadius: "16px 16px 0 0",
        overflowY: "auto",
        animation: "slideUp 0.32s ease-out",
      }}>
        {/* Sticky lukk-knapp */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          display: "flex", justifyContent: "flex-end",
          padding: "14px 16px 0",
          background: "white",
        }}>
          <button
            onClick={() => router.back()}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(0,0,0,0.08)", border: "none",
              cursor: "pointer", fontSize: "15px",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#1A1612",
            }}
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
