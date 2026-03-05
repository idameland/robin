"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface BrregEnhet {
  navn: string;
  organisasjonsnummer: string;
  organisasjonsform?: { beskrivelse: string };
  forretningsadresse?: { kommune: string };
}

interface SelectedBrreg {
  navn: string;
  orgnr: string;
  form: string;
  kommune: string;
}

const serif = { fontFamily: "var(--font-playfair)" };

const inputCls =
  "w-full px-[15px] py-3 border border-[#E2DDD7] rounded-lg text-[14px] text-petroleum bg-white outline-none transition-colors focus:border-petroleum placeholder:text-petroleum-muted";

const selectArrow = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B6058' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
} as React.CSSProperties;

const selectCls =
  "w-full px-[15px] py-3 pr-9 border border-[#E2DDD7] rounded-lg text-[14px] text-petroleum bg-white outline-none transition-colors focus:border-petroleum appearance-none cursor-pointer";

const starLabels = [
  "",
  "1 av 5",
  "2 av 5",
  "3 av 5",
  "4 av 5",
  "5 av 5 — Anbefales sterkt! 🌟",
];

function StepIndicator({ step }: { step: 1 | 2 }) {
  const steps = [
    { n: 1, label: "Bedriften" },
    { n: 2, label: "Om deg" },
    { n: 3, label: "Bekreftelse" },
  ];
  return (
    <div className="flex items-center mb-14 overflow-x-auto">
      {steps.map((s, i) => {
        const done = s.n < step;
        const active = s.n === step;
        return (
          <div key={s.n} className="contents">
            <div
              className={`flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.04em] whitespace-nowrap transition-colors ${
                active ? "text-petroleum" : done ? "text-mint-dark" : "text-petroleum-muted"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 border-[1.5px] transition-all ${
                  active
                    ? "bg-mint border-mint text-petroleum"
                    : done
                    ? "bg-petroleum border-petroleum text-white"
                    : "border-petroleum-muted text-petroleum-muted"
                }`}
              >
                {done ? "✓" : s.n}
              </span>
              {s.label}
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px bg-[#E2DDD7] mx-4" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[22px] font-semibold tracking-[-0.2px] mb-7 pb-4 border-b border-[#E2DDD7]"
      style={serif}
    >
      {children}
    </h2>
  );
}

function Field({
  label,
  required,
  hint,
  children,
  note,
}: {
  label?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="mb-6 last:mb-0">
      {label && (
        <label className="block text-[13px] font-semibold mb-2">
          {label}
          {required && <span className="text-[#C0392B] ml-0.5">*</span>}
          {hint && (
            <span className="text-[12px] text-petroleum-muted font-normal ml-1.5">
              {hint}
            </span>
          )}
        </label>
      )}
      {children}
      {note && <p className="text-[12px] text-petroleum-muted mt-2">{note}</p>}
    </div>
  );
}

const bydelOptions = [
  "Nordre Aker",
  "Sagene",
  "Grünerløkka",
  "Frogner",
  "St. Hanshaugen",
  "Annen bydel",
];

export default function AnbefalPage() {
  const [step, setStep] = useState<1 | 2 | "success">(1);

  // Step 1
  const [bedriftNavn, setBedriftNavn] = useState("");
  const [fag, setFag] = useState("");
  const [bydel, setBydel] = useState("");
  const [hvaBleDgjort, setHvaBleGjort] = useState("");
  const [anbefalingTekst, setAnbefalingTekst] = useState("");
  const [stars, setStars] = useState(4);
  const [tidsrom, setTidsrom] = useState("");

  // Step 2
  const [recommenderType, setRecommenderType] = useState<"privat" | "bedrift">("privat");
  const [fornavn, setFornavn] = useState("");
  const [etternavn, setEtternavn] = useState("");
  const [recommenderBydel, setRecommenderBydel] = useState("");
  const [rolle, setRolle] = useState("");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailNote, setEmailNote] = useState("🔒 E-posten din deles aldri med andre");
  const [emailNoteStatus, setEmailNoteStatus] = useState<"neutral" | "ok" | "error">("neutral");
  const [bekreftCheck, setBekreftCheck] = useState(false);

  // Brreg
  const [brregQuery, setBrregQuery] = useState("");
  const [brregResults, setBrregResults] = useState<BrregEnhet[]>([]);
  const [brregOpen, setBrregOpen] = useState(false);
  const [brregLoading, setBrregLoading] = useState(false);
  const [selectedBrreg, setSelectedBrreg] = useState<SelectedBrreg | null>(null);
  const brregTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const brregQueryRef = useRef(brregQuery);
  const brregWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (brregWrapperRef.current && !brregWrapperRef.current.contains(e.target as Node)) {
        setBrregOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const wordCount = anbefalingTekst.trim()
    ? anbefalingTekst.trim().split(/\s+/).length
    : 0;

  async function searchBrreg() {
    const q = brregQueryRef.current.trim();
    if (q.length < 2) return;
    setBrregLoading(true);
    try {
      const res = await fetch(
        `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(q)}&size=8`
      );
      const data = await res.json();
      setBrregResults(data._embedded?.enheter || []);
      setBrregOpen(true);
    } catch {
      setBrregResults([]);
      setBrregOpen(true);
    } finally {
      setBrregLoading(false);
    }
  }

  function onBrregInput(val: string) {
    setBrregQuery(val);
    brregQueryRef.current = val;
    if (brregTimerRef.current) clearTimeout(brregTimerRef.current);
    brregTimerRef.current = setTimeout(searchBrreg, 380);
  }

  function selectBrreg(e: BrregEnhet) {
    setSelectedBrreg({
      navn: e.navn,
      orgnr: e.organisasjonsnummer,
      form: e.organisasjonsform?.beskrivelse || "",
      kommune: e.forretningsadresse?.kommune || "",
    });
    setBrregQuery(e.navn);
    setBrregOpen(false);
  }

  function clearBrreg() {
    setSelectedBrreg(null);
    setBrregQuery("");
    setBrregOpen(false);
    setBrregResults([]);
  }

  function sendVerification() {
    if (!email || !email.includes("@")) {
      setEmailNote("⚠️ Skriv inn en gyldig e-postadresse");
      setEmailNoteStatus("error");
      return;
    }
    setEmailSent(true);
    setEmailNote(`✅ Bekreftelseslenke sendt til ${email}`);
    setEmailNoteStatus("ok");
  }

  function goToStep(n: 1 | 2) {
    setStep(n);
    window.scrollTo(0, 0);
  }

  function submitForm() {
    setStep("success");
    window.scrollTo(0, 0);
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-[480px] mx-auto px-6 py-24 text-center">
          <div className="w-[72px] h-[72px] rounded-full bg-mint flex items-center justify-center text-[32px] mx-auto mb-7">
            🐦
          </div>
          <h2
            className="text-[40px] font-bold leading-[1.1] tracking-[-0.5px] mb-4 text-petroleum"
            style={serif}
          >
            Takk for anbefalingen!
          </h2>
          <p className="text-petroleum-muted text-[15px] leading-[1.7] max-w-[360px] mx-auto mb-9">
            Vi har sendt en bekreftelseslenke til{" "}
            <strong className="text-petroleum">{email || "din@epost.no"}</strong>.
            Anbefalingen publiseres etter bekreftelse og manuell godkjenning fra Robin.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-petroleum text-white text-sm font-bold rounded hover:bg-black transition-colors"
          >
            ← Tilbake til forsiden
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-[580px] mx-auto px-6 pt-16 pb-28">

        {/* Page header */}
        <div className="mb-14">
          <h1
            className="text-[44px] md:text-[52px] leading-[1.05] tracking-[-1px] font-normal mb-4 text-petroleum"
            style={serif}
          >
            Anbefal flinke folk
          </h1>
          <p className="text-[#3D3530] text-[15px] leading-[1.7] max-w-[440px]">
            Vil du anbefale en håndverker eller annen fagperson du er fornøyd
            med? Del erfaringen din — det er gull verdt for andre som leter.
          </p>
        </div>

        {(step === 1 || step === 2) && <StepIndicator step={step} />}

        {/* ── STEG 1 ── */}
        {step === 1 && (
          <div>
            <section className="mb-12">
              <SectionHeading>Hvem anbefaler du?</SectionHeading>

              <Field label="Navn" required note="Finnes ikke bedriften i Robin fra før, legger vi den til etter godkjenning.">
                <input
                  type="text"
                  value={bedriftNavn}
                  onChange={(e) => setBedriftNavn(e.target.value)}
                  placeholder="Fullt navn på bedriften"
                  className={inputCls}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Fagområde">
                  <select
                    value={fag}
                    onChange={(e) => setFag(e.target.value)}
                    className={selectCls}
                    style={selectArrow}
                  >
                    <option value="">Velg fagområde...</option>
                    {["Snekker", "Elektriker", "Rørlegger", "Maler", "Flislegger", "Tømrer", "Låsesmed", "Annet"].map(
                      (f) => <option key={f}>{f}</option>
                    )}
                  </select>
                </Field>
                <Field label="Din bydel">
                  <select
                    value={bydel}
                    onChange={(e) => setBydel(e.target.value)}
                    className={selectCls}
                    style={selectArrow}
                  >
                    <option value="">Velg bydel...</option>
                    {bydelOptions.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </Field>
              </div>
            </section>

            <section className="mb-12">
              <SectionHeading>Din anbefaling</SectionHeading>

              <Field label="Hva fikk du hjelp med?">
                <input
                  type="text"
                  value={hvaBleDgjort}
                  onChange={(e) => setHvaBleGjort(e.target.value)}
                  placeholder="F.eks. flislagt bad, malt stue, lagt nytt gulv..."
                  className={inputCls}
                />
              </Field>

              <Field label="Hvorfor vil du anbefale denne bedriften til andre?" required>
                <textarea
                  value={anbefalingTekst}
                  onChange={(e) => setAnbefalingTekst(e.target.value)}
                  placeholder="Hva gjorde bedriften, og hvorfor anbefaler du dem til naboene?"
                  className={`${inputCls} min-h-[130px] resize-y leading-[1.7]`}
                />
                <p
                  className={`text-[12px] mt-2 ${
                    wordCount >= 20 ? "text-[#1A7A4A]" : "text-petroleum-muted"
                  }`}
                >
                  {wordCount >= 20 ? `${wordCount} ord ✓` : `${wordCount} av 20 ord`}
                </p>
              </Field>

              <Field label="Gi en karakter">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      onClick={() => setStars(i)}
                      className={`text-[32px] leading-none cursor-pointer select-none transition-transform hover:scale-110 ${
                        i <= stars ? "text-[#E8A020]" : "text-[#E2DDD7]"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[12px] text-petroleum-muted mt-2.5">
                  {starLabels[stars]}
                </p>
              </Field>

              <Field label="Omtrent når?" hint="Valgfritt">
                <select
                  value={tidsrom}
                  onChange={(e) => setTidsrom(e.target.value)}
                  className={selectCls}
                  style={selectArrow}
                >
                  <option value="">Velg tidsrom...</option>
                  {["Siste 3 måneder", "Siste 6 måneder", "I år", "For 1–2 år siden", "For mer enn 2 år siden"].map(
                    (t) => <option key={t}>{t}</option>
                  )}
                </select>
              </Field>
            </section>

            <button
              onClick={() => goToStep(2)}
              className="w-full py-4 bg-petroleum text-white text-[15px] font-bold rounded hover:bg-black transition-colors"
            >
              Neste →
            </button>
          </div>
        )}

        {/* ── STEG 2 ── */}
        {step === 2 && (
          <div>
            <section className="mb-12">
              <SectionHeading>Du anbefaler som</SectionHeading>

              <div className="inline-flex border border-[#E2DDD7] rounded overflow-hidden mb-7">
                {(["privat", "bedrift"] as const).map((t, i) => (
                  <button
                    key={t}
                    onClick={() => setRecommenderType(t)}
                    className={`px-6 py-2.5 text-[13px] font-bold transition-colors ${
                      i === 0 ? "border-r border-[#E2DDD7]" : ""
                    } ${
                      recommenderType === t
                        ? "bg-petroleum text-white"
                        : "bg-white text-petroleum-muted hover:text-petroleum"
                    }`}
                  >
                    {t === "privat" ? "Privatperson" : "Bedrift"}
                  </button>
                ))}
              </div>

              {recommenderType === "privat" ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Fornavn" required>
                      <input
                        type="text"
                        value={fornavn}
                        onChange={(e) => setFornavn(e.target.value)}
                        placeholder="Fornavn"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Etternavn" required>
                      <input
                        type="text"
                        value={etternavn}
                        onChange={(e) => setEtternavn(e.target.value)}
                        placeholder="Etternavn"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                  <Field label="Din bydel" hint="Valgfritt">
                    <select
                      value={recommenderBydel}
                      onChange={(e) => setRecommenderBydel(e.target.value)}
                      className={selectCls}
                      style={selectArrow}
                    >
                      <option value="">Velg bydel...</option>
                      {bydelOptions.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </Field>
                </div>
              ) : (
                <div>
                  <Field
                    label="Firmanavn"
                    required
                    note="Firmainfo hentes direkte fra Brønnøysundregistrene."
                  >
                    <div className="relative" ref={brregWrapperRef}>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={brregQuery}
                          onChange={(e) => onBrregInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              searchBrreg();
                            }
                          }}
                          placeholder="Skriv firmanavn eller org.nr..."
                          className={`${inputCls} flex-1`}
                        />
                        <button
                          onClick={searchBrreg}
                          disabled={brregLoading}
                          className="px-4 py-3 bg-petroleum text-white text-[13px] font-bold rounded hover:opacity-80 disabled:opacity-50 whitespace-nowrap transition-opacity"
                        >
                          {brregLoading ? "Søker…" : "Søk i Brreg"}
                        </button>
                      </div>

                      {brregOpen && (
                        <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white border border-[#E2DDD7] rounded overflow-hidden max-h-[240px] overflow-y-auto z-30 shadow-[0_12px_40px_rgba(0,0,0,0.10)]">
                          {brregResults.length === 0 ? (
                            <div className="px-4 py-3 text-[14px] text-petroleum-muted">
                              Ingen treff — prøv et annet søkeord
                            </div>
                          ) : (
                            brregResults.map((e) => (
                              <div
                                key={e.organisasjonsnummer}
                                onClick={() => selectBrreg(e)}
                                className="px-4 py-3 cursor-pointer border-b border-[#E2DDD7] last:border-0 hover:bg-[#F5F2EC] transition-colors"
                              >
                                <div className="text-[14px] font-semibold">
                                  {e.navn}
                                </div>
                                <div className="text-[12px] text-petroleum-muted mt-0.5">
                                  Org.nr. {e.organisasjonsnummer}
                                  {e.organisasjonsform?.beskrivelse
                                    ? ` · ${e.organisasjonsform.beskrivelse}`
                                    : ""}
                                  {e.forretningsadresse?.kommune
                                    ? ` · ${e.forretningsadresse.kommune}`
                                    : ""}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {selectedBrreg && (
                        <div className="mt-2.5 bg-[#E0F9F0] border border-mint rounded-lg p-3 flex items-center gap-3">
                          <div className="flex-1">
                            <strong className="block text-[14px] font-bold">
                              {selectedBrreg.navn}
                            </strong>
                            <span className="text-[12px] text-petroleum-muted">
                              Org.nr. {selectedBrreg.orgnr}
                              {selectedBrreg.form ? ` · ${selectedBrreg.form}` : ""}
                              {selectedBrreg.kommune ? ` · ${selectedBrreg.kommune}` : ""}
                            </span>
                          </div>
                          <button
                            onClick={clearBrreg}
                            className="text-petroleum-muted hover:text-[#C0392B] px-1.5 text-base transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </Field>

                  <Field label="Din rolle" hint="Valgfritt">
                    <input
                      type="text"
                      value={rolle}
                      onChange={(e) => setRolle(e.target.value)}
                      placeholder="F.eks. daglig leder, prosjektleder..."
                      className={inputCls}
                    />
                  </Field>
                </div>
              )}
            </section>

            <section className="mb-12">
              <SectionHeading>Verifiser e-posten din</SectionHeading>

              <div className="bg-[#F5F2EC] rounded-lg p-6 mb-6">
                <p className="text-[18px] font-semibold mb-2" style={serif}>
                  Bekreft din e-post
                </p>
                <p className="text-[13px] text-petroleum-muted leading-[1.6] mb-4">
                  Vi sender en bekreftelseslenke. Anbefalingen publiseres ikke
                  før du har bekreftet. E-posten din vises aldri offentlig.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="din@epost.no"
                    className={`${inputCls} flex-1`}
                  />
                  <button
                    onClick={sendVerification}
                    disabled={emailSent}
                    className={`px-4 py-3 text-[13px] font-bold rounded whitespace-nowrap transition-all ${
                      emailSent
                        ? "bg-[#1A7A4A] text-white opacity-80"
                        : "bg-petroleum text-white hover:opacity-80"
                    }`}
                  >
                    {emailSent ? "✓ Sendt!" : "Send lenke"}
                  </button>
                </div>
                <p
                  className={`text-[12px] mt-2.5 ${
                    emailNoteStatus === "ok"
                      ? "text-[#1A7A4A]"
                      : emailNoteStatus === "error"
                      ? "text-[#C0392B]"
                      : "text-petroleum-muted"
                  }`}
                >
                  {emailNote}
                </p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bekreftCheck}
                  onChange={(e) => setBekreftCheck(e.target.checked)}
                  className="w-[18px] h-[18px] mt-0.5 shrink-0 cursor-pointer accent-petroleum"
                />
                <span className="text-[13px] text-petroleum-muted leading-[1.6]">
                  Jeg bekrefter at anbefalingen er basert på egne, ekte
                  erfaringer med denne bedriften.
                </span>
              </label>
            </section>

            <div className="flex gap-2.5">
              <button
                onClick={() => goToStep(1)}
                className="px-6 py-4 bg-white text-petroleum text-[14px] font-semibold border border-[#E2DDD7] rounded hover:border-petroleum transition-colors shrink-0"
              >
                ← Tilbake
              </button>
              <button
                onClick={submitForm}
                className="flex-1 py-4 bg-petroleum text-white text-[15px] font-bold rounded hover:bg-black transition-colors"
              >
                Send anbefaling →
              </button>
            </div>
            <p className="text-center text-[12px] text-petroleum-muted mt-4 leading-[1.65]">
              Du mottar e-post for bekreftelse. Robin godkjenner manuelt før
              publisering.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
