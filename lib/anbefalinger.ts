export interface FirmaInfo {
  slug?: string;
  telefon?: string;
  epost?: string;
  instagram?: string;
  nettside?: string | null;
  orgnr?: string;
  bilder?: string[];
}

export const firmaer: Record<string, FirmaInfo> = {
  "Haram Møbelsnekkeri": {
    slug: "haram-mobelsnekkeri",
    telefon: "41 03 14 90",
    epost: "andersharam@gmail.com",
    instagram: "andersharam",
    nettside: null,
    orgnr: "935 422 604",
  },
};

export interface Anbefaling {
  firma: string;
  kontakt: string;
  jobb: string;
  kategori: string;
  sitat: string;
  anbefaler: string;
  dato: string;
}

export const anbefalinger: Anbefaling[] = [
  { firma: "BK-Anlegg AS", kontakt: "Johnny Bratlie", jobb: "Drenering og betongskjæring", kategori: "Grunnentreprenør", sitat: "Utførte fagmessig bra håndverk til avtalt pris.", anbefaler: "Knut André", dato: "25. feb 2026" },
  { firma: "Visjonel", kontakt: "Stian Andersen", jobb: "Installere lyskilder (LED kjøkken)", kategori: "Elektriker", sitat: "Løsningsorienterte, seriøse og hyggelige.", anbefaler: "Gretelill Svendsen", dato: "25. feb 2026" },
  { firma: "Din Lokale Håndverker", kontakt: "Federico", jobb: "Maling av vegger, tak, lister m.m. i rekkehus (129 kvm)", kategori: "Maler", sitat: "Federico og co. malte vegger, tak og lister i rekkehuset vårt (129 kvm), med mange ulike farger valgt i samarbeid med fargedesigner. De hadde selv full kontroll på fargene underveis.", anbefaler: "Ida Meland", dato: "25. feb 2026" },
  { firma: "Eugene Malercompani AS", kontakt: "Gent Tahiri", jobb: "Maling og overflatebehandling", kategori: "Maler", sitat: "Gent og hans kollegaer er blant de mest nøyaktige og estetisk treffsikre du kan finne. God kommunikasjon, fleksibilitet og profesjonalitet er nøkkelord. Kan anbefales på det varmeste.", anbefaler: "Daniel Damvall", dato: "25. feb 2026" },
  { firma: "Jerics malerservice", kontakt: "Jeric Docog", jobb: "Innvendig/utvendig malerarbeid og tapetsering", kategori: "Maler", sitat: "Leverer svært god kvalitet, til riktig tid og avtalt pris. God på kommunikasjon.", anbefaler: "Evy-A. Røe", dato: "26. feb 2026" },
  { firma: "Jessheim rørleggerbedrift AS", kontakt: "Erik Niska", jobb: "Totalrenovering av to bad", kategori: "Rørlegger", sitat: "Fantastisk rørlegger, som benytter proff elektriker og flislegger. TEK17, full dokumentasjon, alt iht. avtalt tid og pris. Og nydelig utført arbeid!", anbefaler: "Helene Abusdal", dato: "26. feb 2026" },
  { firma: "Haram Møbelsnekkeri", kontakt: "Anders Haram", jobb: "Plassbygde garderobeskap, hyller og benk", kategori: "Møbelsnekker", sitat: "Anders Haram er en pålitelig, hyggelig og fleksibel møbelsnekker som tar de ekstra rundene for å imøtekomme kundens behov. Leverer plassbygde møbelløsninger av god kvalitet.", anbefaler: "Lene", dato: "27. feb 2026" },
  { firma: "Haram Møbelsnekkeri", kontakt: "", jobb: "Kjøkkeninnredning med skuffer og skap", kategori: "Møbelsnekker", sitat: "Fantastisk håndverk. Han laget et kjøkken vi aldri kunne funnet i butikk. Detaljorientert og nøyaktig.", anbefaler: "Morten Haug", dato: "20. feb 2026" },
  { firma: "Haram Møbelsnekkeri", kontakt: "", jobb: "Bokhylle fra gulv til tak", kategori: "Møbelsnekker", sitat: "Drømmebokhyllen min! Brukte hver eneste centimeter av veggen på best mulig måte.", anbefaler: "Silje Bergström", dato: "15. feb 2026" },
  { firma: "Pay design", kontakt: "Anita Pay", jobb: "Hjelp med eksisterende nettside", kategori: "Webdesign", sitat: "Jeg fikk utmerket hjelp av Anita med min nettside. Hun arbeidet raskt og gjorde en god jobb. Anbefales!", anbefaler: "Tore Svendsen", dato: "28. feb 2026" },
  { firma: "Moen-Elektro AS", kontakt: "Erik Moen", jobb: "Elektrikerarbeid i leilighet", kategori: "Elektriker", sitat: "Trengte hjelp til elektrikerarbeid i leiligheten og Erik gjorde en svært god jobb! Anbefales!", anbefaler: "Tore Svendsen", dato: "28. feb 2026" },
  { firma: "To Snekkere AS", kontakt: "Øyvind Kristiansen", jobb: "Totaloppussing av leilighet", kategori: "Snekker", sitat: "Solid utført snekkerarbeid og veldig god kommunikasjon underveis i prosessen!", anbefaler: "Ida Skivenes", dato: "28. feb 2026" },
  { firma: "To Snekkere AS", kontakt: "", jobb: "Bygging av terrasse og utvendig kledning", kategori: "Snekker", sitat: "Presis, ryddig og imponerende fagkunnskap. Terrassene ble akkurat slik vi hadde sett for oss.", anbefaler: "Hans Petter Vold", dato: "22. feb 2026" },
  { firma: "To Snekkere AS", kontakt: "", jobb: "Dør- og vinduskarmer, parkett", kategori: "Snekker", sitat: "Veldig fornøyd! De kom til avtalt tid, ryddet etter seg og leverte over forventning.", anbefaler: "Camilla Næss", dato: "18. feb 2026" },
  { firma: "Elektriker Gruppen AS", kontakt: "Eivind Ertzeid", jobb: "Flytte støpsel, bytte termostat på bad", kategori: "Elektriker", sitat: "Arbeidet utført effektivt og raskt. God informasjon. Hyggelig og høflig.", anbefaler: "Eva", dato: "1. mars 2026" },
];

export const filterKategorier = [
  "Alle",
  "Maler",
  "Elektriker",
  "Rørlegger",
  "Snekker",
  "Møbelsnekker",
  "Webdesign",
];
