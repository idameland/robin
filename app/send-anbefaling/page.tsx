import Navbar from "@/components/Navbar";
import Link from "next/link";

const serif = { fontFamily: "var(--font-playfair)" };

const TALLY_URL = "https://tally.so/r/WOAyaR";

const steg = [
  {
    tittel: "Fyll ut skjemaet",
    beskrivelse:
      "Fortell oss hvem du anbefaler, hva de hjalp deg med, og skriv en kort tekst vi kan publisere. Det tar under 3 minutter.",
  },
  {
    tittel: "Robin ser over",
    beskrivelse:
      "Vi leser gjennom alle anbefalinger før de publiseres. Bare ekte erfaringer kommer på.",
  },
  {
    tittel: "Anbefalingen ligger ute",
    beskrivelse:
      "Fagpersonen du anbefalte får sin egen side på Robin — synlig for alle naboer som leter.",
  },
];

export default function SendAnbefalingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[620px] mx-auto w-full px-6 pt-16 pb-28 md:pt-20">

        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-[40px] md:text-[52px] leading-[1.05] tracking-[-1px] font-normal text-petroleum mb-5"
            style={serif}
          >
            Sharing is caring!
          </h1>
          <p className="text-[15px] text-petroleum-muted leading-[1.8] max-w-[480px]">
            Har du brukt en håndverker eller annen fagperson du er fornøyd med?
            En liten anbefaling fra deg kan bety mye for noen som leter etter akkurat den rette.
          </p>
        </div>

        <hr className="border-black/8 mb-10" />

        {/* Slik fungerer det */}
        <p
          className="text-[22px] font-normal text-petroleum mb-7"
          style={serif}
        >
          Slik fungerer det
        </p>

        <div className="flex flex-col gap-6 mb-14">
          {steg.map((s, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="w-8 h-8 rounded-full bg-mint flex items-center justify-center text-[12px] font-bold text-petroleum shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="text-[13px] font-bold text-petroleum mb-1">{s.tittel}</p>
                <p className="text-[12px] text-petroleum-muted leading-[1.7]">{s.beskrivelse}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={TALLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-9 py-4 bg-petroleum text-white text-[14px] font-bold hover:bg-black transition-colors"
        >
          Gå til skjemaet →
        </a>
        <p className="text-[11px] text-petroleum-muted mt-4">
          Tar under 3 minutter · Godkjennes manuelt av Robin
        </p>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/8 px-6 py-5">
        <span className="text-petroleum-muted text-[15px]" style={serif}>
          Robin
        </span>
      </footer>
    </div>
  );
}
