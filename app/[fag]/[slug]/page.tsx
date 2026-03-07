import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PlussProfilInnhold from "@/components/PlussProfilInnhold";
import { finnPlussProfilBySlug, plussProfiler } from "@/lib/pluss";

const serif = { fontFamily: "var(--font-playfair)" };

export function generateStaticParams() {
  return plussProfiler.map((p) => ({ fag: p.fagSlug, slug: p.slug }));
}

export default async function PlussProfilPage({
  params,
}: {
  params: Promise<{ fag: string; slug: string }>;
}) {
  const { fag, slug } = await params;
  const profil = finnPlussProfilBySlug(fag, slug);
  if (!profil) notFound();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PlussProfilInnhold profil={profil} />
      </main>
      <footer className="border-t border-black/8 px-6 py-5">
        <span className="text-petroleum-muted text-[15px]" style={serif}>Robin</span>
      </footer>
    </div>
  );
}
