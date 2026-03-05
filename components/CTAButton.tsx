"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const NOTES = [
  { char: "♪", size: 11, offsetX: 4,  delay1: 100, delay2: 0   },
  { char: "♫", size: 15, offsetX: 18, delay1: 180, delay2: 80  },
  { char: "♩", size: 10, offsetX: -4, delay1: 60,  delay2: 140 },
];

export default function CTAButton() {
  const birdRef    = useRef<HTMLDivElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const noteRefs   = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const birdEl = birdRef.current;
    const btnEl  = btnWrapRef.current;
    if (!birdEl || !btnEl) return;

    function bump(bumpIndex: number) {
      birdEl!.animate(
        [
          { transform: "translateX(-50%) rotate(0deg)"  },
          { transform: "translateX(-60%) rotate(8deg)",  offset: 0.30 },
          { transform: "translateX(-35%) rotate(-6deg)", offset: 0.52 },
          { transform: "translateX(-42%) rotate(3deg)",  offset: 0.68 },
          { transform: "translateX(-50%) rotate(0deg)"  },
        ],
        { duration: 800, easing: "ease-in-out" }
      );

      btnEl!.animate(
        [
          { transform: "translateX(0px)"  },
          { transform: "translateX(7px)",  offset: 0.08 },
          { transform: "translateX(-4px)", offset: 0.22 },
          { transform: "translateX(3px)",  offset: 0.36 },
          { transform: "translateX(-2px)", offset: 0.50 },
          { transform: "translateX(1px)",  offset: 0.65 },
          { transform: "translateX(0px)"  },
        ],
        { duration: 550, delay: 390, easing: "ease-out" }
      );

      noteRefs.current.forEach((el, i) => {
        if (!el) return;
        const delay = bumpIndex === 0 ? NOTES[i].delay1 : NOTES[i].delay2;
        el.animate(
          [
            { opacity: 0, transform: "translate(0px, 0px)"       },
            { opacity: 1, transform: "translate(10px, -8px)", offset: 0.25 },
            { opacity: 1, transform: "translate(22px, 4px)",  offset: 0.6  },
            { opacity: 0, transform: "translate(30px, 22px)"      },
          ],
          { duration: 900, delay, easing: "ease-in-out" }
        );
      });
    }

    const t1 = setTimeout(() => bump(0), 300);
    const t2 = setTimeout(() => bump(1), 1550);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 0 }}>

      {/* Fugl */}
      <div style={{ position: "relative", width: 28, height: 28, flexShrink: 0 }}>
        {/* Notar */}
        {NOTES.map((note, i) => (
          <span
            key={i}
            ref={(el) => { noteRefs.current[i] = el; }}
            style={{
              position: "absolute",
              top: 2,
              left: `calc(50% + ${note.offsetX}px)`,
              fontSize: note.size,
              color: "#C8400E",
              opacity: 0,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {note.char}
          </span>
        ))}

        {/* Robin-SVG */}
        <div
          ref={birdRef}
          style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)" }}
        >
          <svg width="28" height="28" viewBox="0 0 38 38" fill="none">
            <ellipse cx="17" cy="24" rx="12" ry="10" fill="#4A3828"/>
            <circle cx="19" cy="12" r="10" fill="#4A3828"/>
            <path d="M9 17 Q6 22 9 27 Q13 32 19 31 Q26 30 29 24 Q32 19 27 15 Q23 11 18 12 Q12 12 9 17Z" fill="#C8400E"/>
            <path d="M13 18 Q11 22 13 26 Q16 29 21 28 Q25 27 26 23 Q21 16 17 15 Q14 14 13 18Z" fill="#D8501A" opacity=".4"/>
            <ellipse cx="20" cy="28" rx="5" ry="4" fill="#E8D8C0"/>
            <path d="M7 23 Q1 27 3 34 Q10 30 19 32" fill="#3A2818"/>
            <circle cx="25" cy="9" r="3" fill="#1A1208"/>
            <circle cx="25.8" cy="8.2" r="1" fill="white"/>
            <path d="M28 10 L35 8 L28 14 Z" fill="#3A3020"/>
            <line x1="16" y1="33" x2="12" y2="36" stroke="#3A2818" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="21" y1="33" x2="25" y2="36" stroke="#3A2818" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Knapp */}
      <div ref={btnWrapRef}>
        <Link
          href="/send-anbefaling"
          className="bg-card-yellow text-petroleum text-sm font-medium px-5 py-2 rounded hover:brightness-95 transition-all tracking-wide"
        >
          Send inn anbefaling
        </Link>
      </div>
    </div>
  );
}
