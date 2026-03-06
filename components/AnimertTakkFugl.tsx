"use client";

import { useRef, useEffect } from "react";

export default function AnimertTakkFugl() {
  const birdRef = useRef<SVGGElement>(null);
  const vingeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const bird = birdRef.current;
    const vinge = vingeRef.current;
    if (!bird || !vinge) return;

    // Fugl letter oppover, og lander igjen
    bird.animate(
      [
        { transform: "translateY(0px)" },
        { transform: "translateY(-28px)", offset: 0.4 },
        { transform: "translateY(-26px)", offset: 0.55 },
        { transform: "translateY(-2px)", offset: 0.85 },
        { transform: "translateY(0px)" },
      ],
      { duration: 1400, delay: 500, easing: "ease-in-out", fill: "forwards" }
    );

    // Vingeklapp under flukten
    vinge.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(-35deg)", offset: 0.15 },
        { transform: "rotate(12deg)",  offset: 0.28 },
        { transform: "rotate(-30deg)", offset: 0.42 },
        { transform: "rotate(10deg)",  offset: 0.55 },
        { transform: "rotate(-20deg)", offset: 0.68 },
        { transform: "rotate(5deg)",   offset: 0.82 },
        { transform: "rotate(0deg)" },
      ],
      { duration: 1400, delay: 500, easing: "ease-in-out", fill: "forwards" }
    );
  }, []);

  return (
    <svg
      width="44"
      height="56"
      viewBox="0 0 80 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      {/* Grein — statisk */}
      <path d="M4 98 Q40 93 76 98" stroke="#9A8060" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M4 97 Q40 92 76 97" stroke="#B89870" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>

      {/* Fugl — animert oppover */}
      <g ref={birdRef}>
        {/* Kropp */}
        <ellipse cx="40" cy="62" rx="22" ry="19" fill="#4A3828"/>
        {/* Hode */}
        <circle cx="42" cy="36" r="16" fill="#4A3828"/>
        {/* Rød bryst */}
        <path d="M22 44 Q18 54 22 65 Q28 74 42 73 Q54 71 58 62 Q62 52 56 44 Q50 36 42 38 Q30 38 22 44Z" fill="#C8400E"/>
        <path d="M28 46 Q24 54 28 62 Q34 70 44 69 Q50 67 52 62 Q46 48 38 44 Q32 42 28 46Z" fill="#D8501A" opacity="0.5"/>

        {/* Vinge — animert separat */}
        <g
          ref={vingeRef}
          style={{ transformBox: "fill-box", transformOrigin: "75% 40%" }}
        >
          <path d="M20 58 Q12 64 14 76 Q24 70 40 72" fill="#3A2818"/>
          <path d="M20 60 Q14 66 16 74" stroke="#5A4030" strokeWidth="1" fill="none"/>
          <path d="M24 62 Q19 67 21 73" stroke="#5A4030" strokeWidth="0.9" fill="none"/>
          <path d="M28 63 Q24 68 26 73" stroke="#5A4030" strokeWidth="0.9" fill="none"/>
        </g>

        {/* Hale */}
        <path d="M18 74 Q10 80 12 90 Q20 84 32 82 Q26 78 22 74Z" fill="#3A2818"/>
        <path d="M14 80 Q12 86 13 90" stroke="#5A4030" strokeWidth="0.8" fill="none"/>
        <path d="M18 79 Q17 84 18 88" stroke="#5A4030" strokeWidth="0.8" fill="none"/>
        <path d="M22 78 Q22 83 24 86" stroke="#5A4030" strokeWidth="0.8" fill="none"/>

        {/* Mage */}
        <ellipse cx="44" cy="68" rx="8" ry="7" fill="#E8D8C0"/>

        {/* Øye */}
        <circle cx="50" cy="32" r="5" fill="#1A1208"/>
        <circle cx="50" cy="32" r="3.2" fill="#2A1A08"/>
        <circle cx="51.4" cy="30.6" r="1.4" fill="white"/>
        <circle cx="49" cy="33.5" r="0.6" fill="white" opacity="0.5"/>

        {/* Nebb */}
        <path d="M56 33 L68 30 L56 38 Z" fill="#3A3020"/>
        <line x1="56" y1="33" x2="68" y2="30" stroke="#2A2010" strokeWidth="0.6"/>

        {/* Ben */}
        <line x1="40" y1="82" x2="34" y2="95" stroke="#3A2818" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="46" y1="82" x2="52" y2="95" stroke="#3A2818" strokeWidth="1.8" strokeLinecap="round"/>

        {/* Føtter */}
        <path d="M31 95 L28 101 M34 95 L34 101 M37 95 L40 101" stroke="#3A2818" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M49 95 L46 101 M52 95 L52 101 M55 95 L58 101" stroke="#3A2818" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  );
}
