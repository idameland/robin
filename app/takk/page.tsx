import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const serif = { fontFamily: "var(--font-playfair)" };

export default function TakkPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-[520px] w-full">

          {/* Fugl i mintgrønn sirkel */}
          <div className="w-20 h-20 rounded-full bg-mint flex items-center justify-center mx-auto mb-8">
            <Image src="/robin-ikon.svg" alt="" width={44} height={44} aria-hidden="true" />
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
