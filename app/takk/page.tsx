import Link from "next/link";
import Navbar from "@/components/Navbar";

const serif = { fontFamily: "var(--font-playfair)" };

export default function TakkPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-[480px]">
          <div className="w-[72px] h-[72px] rounded-full bg-mint flex items-center justify-center text-[32px] mx-auto mb-8">
            🐦
          </div>
          <h1
            className="text-[40px] md:text-[48px] leading-[1.05] font-normal text-petroleum mb-5"
            style={serif}
          >
            Tusen takk!
          </h1>
          <p className="text-petroleum-muted text-[15px] leading-[1.8] mb-10">
            Anbefalingen din er mottatt. Robin leser gjennom og publiserer den etter godkjenning — som regel innen et par dager.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-petroleum text-white text-sm font-bold hover:bg-black transition-colors"
          >
            ← Tilbake til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}
