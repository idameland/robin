import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import BedriftProfilInnhold from "@/components/BedriftProfilInnhold";
import { anbefalinger, firmaer } from "@/lib/anbefalinger";

const serif = { fontFamily: "var(--font-playfair)" };

export function generateStaticParams() {
  return Object.values(firmaer)
    .filter((f) => f.slug)
    .map((f) => ({ slug: f.slug }));
}

export default async function BedriftPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const firmaEntry = Object.entries(firmaer).find(([, f]) => f.slug === slug);
  if (!firmaEntry) notFound();

  const [firmanavn, info] = firmaEntry;
  const firmaAnbefalinger = anbefalinger.filter((a) => a.firma === firmanavn).reverse();
  if (firmaAnbefalinger.length === 0) notFound();

  const kategori = firmaAnbefalinger[0].kategori;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <BedriftProfilInnhold
          firmanavn={firmanavn}
          info={info}
          firmaAnbefalinger={firmaAnbefalinger}
          kategori={kategori}
        />
      </main>
      <footer className="border-t border-black/8 px-6 py-5">
        <span className="text-petroleum-muted text-[15px]" style={serif}>Robin</span>
      </footer>
    </div>
  );
}
