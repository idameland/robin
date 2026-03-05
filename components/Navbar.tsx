"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

const BIRD_SIZE = 28;
const HOP_HEIGHT = 16;
const HOP_DURATION = 300;
const NUM_HOPS = 3;

const NOTES = [
  { char: "♪", size: 11, offsetX: 4,  delay: 100 },
  { char: "♫", size: 15, offsetX: 18, delay: 180 },
  { char: "♩", size: 10, offsetX: -4, delay: 60  },
];

function BirdSVG() {
  return (
    <svg width={BIRD_SIZE} height={BIRD_SIZE} viewBox="0 0 38 38" fill="none">
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
  );
}

export default function Navbar() {
  const navRef        = useRef<HTMLElement>(null);
  const logoRef       = useRef<HTMLAnchorElement>(null);
  const logoBirdRef   = useRef<SVGGElement>(null);
  const btnRef        = useRef<HTMLDivElement>(null);
  const birdRef       = useRef<HTMLDivElement>(null);
  const noteRefs      = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const nav  = navRef.current;
    const logo = logoRef.current;
    const btn  = btnRef.current;
    const bird = birdRef.current;
    if (!nav || !logo || !btn || !bird) return;

    // Helper: commit WAAPI result to inline style then cancel
    async function anim(
      el: HTMLElement,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions
    ) {
      const a = el.animate(keyframes, { ...options, fill: "forwards" });
      await a.finished;
      a.commitStyles();
      a.cancel();
    }

    function delay(ms: number) {
      return new Promise<void>((r) => setTimeout(r, ms));
    }

    function fireNotes() {
      noteRefs.current.forEach((el, i) => {
        if (!el) return;
        el.animate(
          [
            { opacity: 0, transform: "translate(0px, 0px)"     },
            { opacity: 1, transform: "translate(10px, -8px)", offset: 0.25 },
            { opacity: 1, transform: "translate(22px, 4px)",  offset: 0.60 },
            { opacity: 0, transform: "translate(30px, 22px)"   },
          ],
          { duration: 900, delay: NOTES[i].delay, easing: "ease-in-out" }
        );
      });
    }

    async function bump(atX: number) {
      bird.animate(
        [
          { transform: `translateX(${atX}px) rotate(0deg)`   },
          { transform: `translateX(${atX - 8}px) rotate(8deg)`,  offset: 0.30 },
          { transform: `translateX(${atX + 10}px) rotate(-6deg)`, offset: 0.52 },
          { transform: `translateX(${atX + 3}px) rotate(3deg)`,  offset: 0.68 },
          { transform: `translateX(${atX}px) rotate(0deg)`   },
        ],
        { duration: 800, easing: "ease-in-out", fill: "forwards" }
      );
      btn.animate(
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
      fireNotes();
      await delay(900);
    }

    async function runAnimation() {
      const navRect  = nav.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();
      const btnRect  = btn.getBoundingClientRect();

      const startX   = logoRect.left - navRect.left + logoRect.width / 2 - BIRD_SIZE / 2;
      const endX     = btnRect.left  - navRect.left - BIRD_SIZE - 4;
      const totalDist = endX - startX;
      const hopDist   = totalDist / NUM_HOPS;

      // Fugl letter fra greina – fade ut logo-fuglen
      bird.style.transform = `translateX(${startX}px)`;
      bird.style.opacity   = "1";
      if (logoBirdRef.current) {
        logoBirdRef.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
      }
      await delay(500);

      // Hop right to button
      for (let h = 0; h < NUM_HOPS; h++) {
        const x0 = startX + h * hopDist;
        const x1 = x0 + hopDist;
        await anim(bird, [
          { transform: `translateX(${x0}px) translateY(0px) rotate(-5deg)`                         },
          { transform: `translateX(${x0 + hopDist * 0.5}px) translateY(-${HOP_HEIGHT}px) rotate(-12deg)`, offset: 0.45 },
          { transform: `translateX(${x1}px) translateY(0px) rotate(-5deg)`                         },
        ], { duration: HOP_DURATION, easing: "ease-in-out" });
        await delay(35);
      }

      // Bump twice
      await bump(endX);
      await delay(500);
      await bump(endX);
      await delay(400);

      // Hop back left to logo
      for (let h = 0; h < NUM_HOPS; h++) {
        const x0 = endX - h * hopDist;
        const x1 = x0 - hopDist;
        await anim(bird, [
          { transform: `translateX(${x0}px) translateY(0px) rotate(5deg)`                          },
          { transform: `translateX(${x0 - hopDist * 0.5}px) translateY(-${HOP_HEIGHT}px) rotate(12deg)`, offset: 0.45 },
          { transform: `translateX(${x1}px) translateY(0px) rotate(5deg)`                          },
        ], { duration: HOP_DURATION, easing: "ease-in-out" });
        await delay(35);
      }

      // Fuglen lander – fade inn logo-fuglen igjen, fade ut animert fugl
      if (logoBirdRef.current) {
        logoBirdRef.current.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: "forwards" });
      }
      await anim(bird, [{ opacity: 1 }, { opacity: 0 }], { duration: 300 });
    }

    runAnimation();
  }, []);

  return (
    <nav ref={navRef} className="sticky top-0 z-50 bg-white border-b border-black/8" style={{ position: "relative" }}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        <a ref={logoRef} href="/" className="flex items-center gap-2">
          <svg width="32" height="40" viewBox="0 0 80 101" fill="none" aria-hidden="true">
            {/* Grein – alltid synlig */}
            <path d="M4 98 Q40 93 76 98" stroke="#9A8060" strokeWidth="5" strokeLinecap="round" fill="none"/>
            <path d="M4 97 Q40 92 76 97" stroke="#B89870" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
            <path d="M16 96 Q28 94 38 96" stroke="#C8A880" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6"/>
            <path d="M46 95 Q58 93 68 96" stroke="#C8A880" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6"/>
            {/* Bein + føtter – alltid synlig */}
            <line x1="40" y1="82" x2="34" y2="95" stroke="#3A2818" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="46" y1="82" x2="52" y2="95" stroke="#3A2818" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M31 95 L28 101 M34 95 L34 101 M37 95 L40 101" stroke="#3A2818" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M49 95 L46 101 M52 95 L52 101 M55 95 L58 101" stroke="#3A2818" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Fuglen – fades ut når den letter */}
            <g ref={logoBirdRef}>
              <ellipse cx="40" cy="62" rx="22" ry="19" fill="#4A3828"/>
              <circle cx="42" cy="36" r="16" fill="#4A3828"/>
              <path d="M22 44 Q18 54 22 65 Q28 74 42 73 Q54 71 58 62 Q62 52 56 44 Q50 36 42 38 Q30 38 22 44Z" fill="#C8400E"/>
              <path d="M28 46 Q24 54 28 62 Q34 70 44 69 Q50 67 52 62 Q46 48 38 44 Q32 42 28 46Z" fill="#D8501A" opacity="0.5"/>
              <path d="M20 58 Q12 64 14 76 Q24 70 40 72" fill="#3A2818"/>
              <path d="M18 74 Q10 80 12 90 Q20 84 32 82 Q26 78 22 74Z" fill="#3A2818"/>
              <ellipse cx="44" cy="68" rx="8" ry="7" fill="#E8D8C0"/>
              <circle cx="50" cy="32" r="5" fill="#1A1208"/>
              <circle cx="51.4" cy="30.6" r="1.4" fill="white"/>
              <path d="M56 33 L68 30 L56 38 Z" fill="#3A3020"/>
            </g>
          </svg>
          <span
            className="text-petroleum leading-none translate-y-1"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 400, fontSize: "32px" }}
          >
            Robin
          </span>
        </a>

        {/* Animert fugl (flytt fritt over navbaren) */}
        <div
          ref={birdRef}
          style={{
            position: "absolute",
            top: `${(56 - BIRD_SIZE) / 2}px`,
            left: 0,
            opacity: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <BirdSVG />
          {NOTES.map((note, i) => (
            <span
              key={i}
              ref={(el) => { noteRefs.current[i] = el; }}
              style={{
                position: "absolute",
                top: 0,
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
        </div>

        <div ref={btnRef}>
          <Link
            href="/send-anbefaling"
            className="bg-card-yellow text-petroleum text-sm font-medium px-5 py-2 rounded hover:brightness-95 transition-all tracking-wide"
          >
            Send inn anbefaling
          </Link>
        </div>
      </div>
    </nav>
  );
}
