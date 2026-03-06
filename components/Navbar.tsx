"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const BIRD_SIZE   = 28;
const FLY_HEIGHT  = 14;  // max Y offset during flight
const FLY_WAVES   = 3;   // wing-beat cycles per trip
const FLY_DURATION = 1800; // ms per one-way trip


function BirdSVG({ wingRef }: { wingRef: React.RefObject<SVGGElement | null> }) {
  return (
    <svg width={BIRD_SIZE} height={BIRD_SIZE} viewBox="0 0 38 38" fill="none">
      <ellipse cx="17" cy="24" rx="12" ry="10" fill="#4A3828"/>
      <circle cx="19" cy="12" r="10" fill="#4A3828"/>
      <path d="M9 17 Q6 22 9 27 Q13 32 19 31 Q26 30 29 24 Q32 19 27 15 Q23 11 18 12 Q12 12 9 17Z" fill="#C8400E"/>
      <path d="M13 18 Q11 22 13 26 Q16 29 21 28 Q25 27 26 23 Q21 16 17 15 Q14 14 13 18Z" fill="#D8501A" opacity=".4"/>
      <ellipse cx="20" cy="28" rx="5" ry="4" fill="#E8D8C0"/>
      {/* Wing – animated separately */}
      <g
        ref={wingRef}
        style={{ transformBox: "fill-box", transformOrigin: "100% 100%" }}
      >
        <path d="M7 23 Q1 27 3 34 Q10 30 19 32" fill="#3A2818"/>
      </g>
      <circle cx="25" cy="9" r="3" fill="#1A1208"/>
      <circle cx="25.8" cy="8.2" r="1" fill="white"/>
      <path d="M28 10 L35 8 L28 14 Z" fill="#3A3020"/>
      <line x1="16" y1="33" x2="12" y2="36" stroke="#3A2818" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="21" y1="33" x2="25" y2="36" stroke="#3A2818" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Navbar() {
  const pathname    = usePathname();
  const navRef      = useRef<HTMLElement>(null);
  const logoRef     = useRef<HTMLAnchorElement>(null);
  const logoBirdRef = useRef<SVGGElement>(null);
  const btnRef      = useRef<HTMLDivElement>(null);
  const birdRef     = useRef<HTMLDivElement>(null);
  const wingRef     = useRef<SVGGElement>(null);


  useEffect(() => {
    const nav  = navRef.current;
    const logo = logoRef.current;
    const btn  = btnRef.current;
    const bird = birdRef.current;
    if (!nav || !logo || !btn || !bird) return;
    if (pathname !== "/") return;
    // Non-null aliases for use inside nested async functions
    const navEl = nav as HTMLElement;
    const logoEl = logo as HTMLAnchorElement;
    const btnEl = btn as HTMLDivElement;
    const birdEl = bird as HTMLDivElement;

    async function anim(
      el: HTMLElement | SVGElement,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions
    ) {
      const a = (el as HTMLElement).animate(keyframes, { ...options, fill: "forwards" });
      await a.finished;
      a.commitStyles();
      a.cancel();
    }

    function delay(ms: number) {
      return new Promise<void>((r) => setTimeout(r, ms));
    }

    // Build sine-wave flight keyframes
    function flyKeyframes(fromX: number, toX: number, flipX: boolean): Keyframe[] {
      const steps = FLY_WAVES * 2 + 1;
      return Array.from({ length: steps }, (_, i) => {
        const t = i / (steps - 1);
        const x = fromX + (toX - fromX) * t;
        const y = -Math.abs(Math.sin(t * Math.PI * FLY_WAVES)) * FLY_HEIGHT;
        const tilt = flipX ? "rotate(12deg) scaleX(-1)" : "rotate(-12deg)";
        return { transform: `translateX(${x}px) translateY(${y}px) ${tilt}`, offset: t };
      });
    }

    function startWingFlap(): Animation | undefined {
      return wingRef.current?.animate(
        [{ transform: "rotate(-28deg)" }, { transform: "rotate(18deg)" }],
        { duration: 210, iterations: Infinity, direction: "alternate", easing: "ease-in-out" }
      );
    }


    async function bump(atX: number) {
      birdEl.animate(
        [
          { transform: `translateX(${atX}px) rotate(0deg)`            },
          { transform: `translateX(${atX - 8}px) rotate(8deg)`,  offset: 0.30 },
          { transform: `translateX(${atX + 10}px) rotate(-6deg)`, offset: 0.52 },
          { transform: `translateX(${atX + 3}px) rotate(3deg)`,  offset: 0.68 },
          { transform: `translateX(${atX}px) rotate(0deg)`            },
        ],
        { duration: 800, easing: "ease-in-out", fill: "forwards" }
      );
      btnEl.animate(
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
      await delay(900);
    }

    async function runAnimation() {
      const navRect  = navEl.getBoundingClientRect();
      const logoRect = logoEl.getBoundingClientRect();
      const btnRect  = btnEl.getBoundingClientRect();

      const startX = logoRect.left - navRect.left + logoRect.width / 2 - BIRD_SIZE / 2;
      const endX   = btnRect.left  - navRect.left - BIRD_SIZE - 4;

      // Appear at logo, fade out logo bird
      birdEl.style.transform = `translateX(${startX}px)`;
      birdEl.style.opacity   = "1";
      logoBirdRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
      await delay(400);

      // Fly to button
      const wingAnim = startWingFlap();
      await anim(birdEl, flyKeyframes(startX, endX, false), { duration: FLY_DURATION, easing: "linear" });
      wingAnim?.cancel();

      // Bump twice
      await bump(endX);
      await delay(400);
      await bump(endX);
      await delay(350);

      // Flip around to face left
      await anim(birdEl, [
        { transform: `translateX(${endX}px) scaleX(1)`  },
        { transform: `translateX(${endX}px) scaleX(-1)` },
      ], { duration: 150, easing: "ease-in-out" });

      // Fly back to logo
      const wingAnim2 = startWingFlap();
      await anim(birdEl, flyKeyframes(endX, startX, true), { duration: FLY_DURATION, easing: "linear" });
      wingAnim2?.cancel();

      // Land – fade logo bird back in, fade out animated bird
      logoBirdRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: "forwards" });
      await anim(birdEl, [{ opacity: 1 }, { opacity: 0 }], { duration: 250 });
    }

    const startTimer = setTimeout(() => runAnimation(), 5000);
    return () => clearTimeout(startTimer);
  }, []);

  return (
    <nav ref={navRef} className="sticky top-0 z-50 bg-white border-b border-black/8" style={{ position: "sticky" }}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        <a ref={logoRef} href="/" className="flex items-center gap-2">
          <svg width="32" height="40" viewBox="0 0 80 101" fill="none" aria-hidden="true">
            {/* Grein – alltid synlig */}
            <path d="M4 98 Q40 93 76 98" stroke="#9A8060" strokeWidth="5" strokeLinecap="round" fill="none"/>
            <path d="M4 97 Q40 92 76 97" stroke="#B89870" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
            <path d="M16 96 Q28 94 38 96" stroke="#C8A880" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6"/>
            <path d="M46 95 Q58 93 68 96" stroke="#C8A880" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6"/>
            {/* Fuglen – fades ut når den letter */}
            <g ref={logoBirdRef}>
              <ellipse cx="40" cy="62" rx="22" ry="19" fill="#4A3828"/>
              <line x1="40" y1="82" x2="34" y2="95" stroke="#3A2818" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="46" y1="82" x2="52" y2="95" stroke="#3A2818" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M31 95 L28 101 M34 95 L34 101 M37 95 L40 101" stroke="#3A2818" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M49 95 L46 101 M52 95 L52 101 M55 95 L58 101" stroke="#3A2818" strokeWidth="1.5" strokeLinecap="round"/>
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

        {/* Animert fugl */}
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
          <BirdSVG wingRef={wingRef} />
        </div>

        <div ref={btnRef}>
          <Link
            href="/send-anbefaling"
            className="bg-card-yellow text-petroleum text-sm font-medium px-3 py-2 rounded hover:brightness-95 transition-all tracking-wide"
          >
            <span className="sm:hidden">Send inn anbefaling</span>
            <span className="hidden sm:inline">Send inn din anbefaling</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
