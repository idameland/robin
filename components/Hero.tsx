export default function Hero() {
  return (
    <section className="px-6 pt-14 pb-6 md:pb-10">
      <div className="max-w-5xl mx-auto">
        <h1
          className="text-4xl md:text-5xl text-petroleum leading-tight mb-4"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}
        >
          Finn fagfolk du kan stole på
        </h1>
        <p className="text-petroleum-muted text-base md:text-lg mb-8">
          Anbefalinger fra naboer i Nordre Aker, Oslo
        </p>
        <div className="relative w-full max-w-lg">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-mint-dark"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Søk etter fag eller navn..."
            className="w-full pl-11 pr-4 py-3 border border-black/20 bg-white text-petroleum placeholder-petroleum/40 focus:outline-none focus:border-black transition-colors"
          />
        </div>
      </div>
    </section>
  );
}
