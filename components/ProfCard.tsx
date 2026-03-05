import { Professional } from "@/data/professionals";

export default function ProfCard({ prof }: { prof: Professional }) {
  const bg = "bg-card-purple";

  return (
    <div className={`${bg} p-6 flex flex-col gap-4`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-petroleum flex items-center justify-center text-white text-xs font-bold shrink-0">
          {prof.initialer}
        </div>
        <div>
          <p className="font-bold text-petroleum leading-tight">{prof.navn}</p>
          <p className="text-sm text-petroleum-muted">{prof.fag}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 font-medium text-sm text-petroleum">
        <span className="text-mint-dark" style={{ fontSize: "2em", lineHeight: 1, display: "block", height: "1em" }}>★</span>
        <span>{prof.anbefalinger} anbefalinger</span>
      </div>
    </div>
  );
}
