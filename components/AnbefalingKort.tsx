import { Anbefaling } from "@/lib/anbefalinger";

const serif = { fontFamily: "var(--font-playfair)" };

export function initialer(navn: string) {
  return navn.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function kortSitat(tekst: string) {
  return tekst.length <= 140 ? tekst : tekst.slice(0, 140).trimEnd() + "…";
}

export function KategoriTag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-mint text-petroleum text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
      {label}
    </span>
  );
}

export function AnbefalingKort({ a, onClick }: { a: Anbefaling; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-card-purple p-6 flex flex-col gap-4 cursor-pointer hover:brightness-95 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-[22px] leading-tight text-petroleum" style={serif}>
          {a.firma}
        </h2>
        <KategoriTag label={a.kategori} />
      </div>
      <p className="text-[13px] text-petroleum-muted">{a.jobb}</p>
      <p className="text-[14px] text-petroleum leading-[1.6] flex-1">
        {kortSitat(a.sitat)}
      </p>
      <div className="flex items-center justify-between pt-2 border-t border-black/8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-petroleum flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            {initialer(a.anbefaler)}
          </div>
          <span className="text-[12px] text-petroleum-muted">{a.anbefaler}</span>
        </div>
        <span className="text-[12px] text-petroleum-muted">{a.dato}</span>
      </div>
    </div>
  );
}

export function AnbefalingModal({ a, onClose }: { a: Anbefaling; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[560px] max-h-[90vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-petroleum-muted hover:text-petroleum text-xl leading-none transition-colors"
        >
          ✕
        </button>
        <KategoriTag label={a.kategori} />
        <h2 className="text-[32px] leading-tight text-petroleum mt-3 mb-1" style={serif}>
          {a.firma}
        </h2>
        <p className="text-[14px] text-petroleum-muted mb-6">{a.kontakt}</p>
        <div className="border-t border-[#E2DDD7] pt-5 mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-petroleum-muted mb-1">
            Hva som ble gjort
          </p>
          <p className="text-[14px] text-petroleum">{a.jobb}</p>
        </div>
        <div className="border-t border-[#E2DDD7] pt-5 mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-petroleum-muted mb-3">
            Anbefaling
          </p>
          <p className="text-[18px] leading-[1.6] text-petroleum" style={serif}>
            «{a.sitat}»
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-petroleum flex items-center justify-center text-white text-[11px] font-bold shrink-0">
              {initialer(a.anbefaler)}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-petroleum">{a.anbefaler}</p>
              <p className="text-[12px] text-petroleum-muted">Anbefaler</p>
            </div>
          </div>
          <span className="text-[12px] text-petroleum-muted">{a.dato}</span>
        </div>
      </div>
    </div>
  );
}
