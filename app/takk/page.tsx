import Link from "next/link";
import Navbar from "@/components/Navbar";

const serif = { fontFamily: "var(--font-playfair)" };

const RobinFugl = ({ size }: { size: number }) => (
  <svg width={size} height={Math.round(size * 0.95)} viewBox="0 0 38 36" fill="none">
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

export default function TakkPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-[520px] w-full">

          {/* Fugl i mintgrønn sirkel */}
          <div className="w-20 h-20 rounded-full bg-mint flex items-center justify-center mx-auto mb-8">
            <RobinFugl size={44} />
          </div>

          {/* Overskrift */}
          <h1
            className="text-[36px] md:text-[48px] leading-[1.05] tracking-[-1px] font-normal text-petroleum mb-2"
            style={serif}
          >
            Takk for<br /><em>anbefalingen!</em>
          </h1>

          {/* Undertekst */}
          <p
            className="text-[18px] md:text-[22px] text-petroleum-muted mb-6"
            style={{ ...serif, fontStyle: "italic" }}
          >
            Du er grei.
          </p>

          {/* Forklaringstekst */}
          <p className="text-[13px] text-petroleum-muted leading-[1.8] max-w-[400px] mx-auto mb-10">
            Robin har mottatt det du sendte inn og ser over det så snart vi kan. Godkjente anbefalinger dukker opp på forsiden.
          </p>

          <hr className="border-black/10 max-w-[80px] mx-auto mb-10" />

          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-petroleum text-white text-sm font-bold hover:bg-black transition-colors"
          >
            ← Tilbake til forsiden
          </Link>
        </div>
      </main>

      <footer className="border-t border-black/8 px-6 py-5">
        <span className="text-petroleum-muted text-[15px]" style={serif}>
          Robin
        </span>
      </footer>
    </div>
  );
}
