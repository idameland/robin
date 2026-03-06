import { notFound } from "next/navigation";
import BedriftModalKlient from "@/components/BedriftModalKlient";
import BedriftProfilInnhold from "@/components/BedriftProfilInnhold";
import { anbefalinger, firmaer } from "@/lib/anbefalinger";

export default async function BedriftModalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const firmaEntry = Object.entries(firmaer).find(([, f]) => f.slug === slug);
  if (!firmaEntry) notFound();

  const [firmanavn, info] = firmaEntry;
  const firmaAnbefalinger = anbefalinger.filter((a) => a.firma === firmanavn).reverse();
  if (firmaAnbefalinger.length === 0) notFound();

  const kategori = firmaAnbefalinger[0].kategori;

  return (
    <BedriftModalKlient>
      <BedriftProfilInnhold
        firmanavn={firmanavn}
        info={info}
        firmaAnbefalinger={firmaAnbefalinger}
        kategori={kategori}
      />
    </BedriftModalKlient>
  );
}
