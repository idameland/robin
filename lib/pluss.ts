export interface PlussAnbefaling {
  navn: string;
  dato: string;
  sitat: string;
}

export interface PlussBilde {
  src: string;
  tekst: string;
}

export interface PlussProfilData {
  slug: string;
  fagSlug: string;
  firmanavn: string;
  kontaktperson: string;
  fag: string;
  sted: string;
  stjerner: number;
  om: string;
  spesialiteter: string[];
  anbefalinger: PlussAnbefaling[];
  bilder: PlussBilde[];
  telefon?: string;
  epost?: string;
  instagram?: string;
}

export const plussProfiler: PlussProfilData[] = [
  {
    slug: "haram-ålesund",
    fagSlug: "mobelsnekkeri",
    firmanavn: "Haram Møbelsnekkeri",
    kontaktperson: "Anders Haram",
    fag: "Møbelsnekker",
    sted: "Ålesund",
    stjerner: 5,
    om: "Anders Haram er en erfaren møbelsnekker med base i Ålesund. Han spesialiserer seg på plassbygde møbelløsninger tilpasset kundens rom og ønsker – fra garderobeskap og bokhyller til komplette kjøkkeninnredninger. Med øye for detaljer og god kommunikasjon gjennom hele prosessen leverer han resultater som overgår forventningene.",
    spesialiteter: [
      "Garderobeskap",
      "Kjøkkeninnredning",
      "Bokhyller",
      "Plassbygde møbler",
      "Benker og hyller",
    ],
    anbefalinger: [
      {
        navn: "Lene",
        dato: "27. feb 2026",
        sitat: "Anders Haram er en pålitelig, hyggelig og fleksibel møbelsnekker som tar de ekstra rundene for å imøtekomme kundens behov. Leverer plassbygde møbelløsninger av god kvalitet.",
      },
      {
        navn: "Morten Haug",
        dato: "20. feb 2026",
        sitat: "Fantastisk håndverk. Han laget et kjøkken vi aldri kunne funnet i butikk. Detaljorientert og nøyaktig.",
      },
      {
        navn: "Silje Bergström",
        dato: "15. feb 2026",
        sitat: "Drømmebokhyllen min! Brukte hver eneste centimeter av veggen på best mulig måte.",
      },
    ],
    bilder: [],
    telefon: "41 03 14 90",
    epost: "andersharam@gmail.com",
    instagram: "andersharam",
  },
];

export function finnPlussProfilBySlug(
  fagSlug: string,
  slug: string
): PlussProfilData | undefined {
  return plussProfiler.find((p) => p.fagSlug === fagSlug && p.slug === slug);
}
