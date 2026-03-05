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
  { firma: "Pay design", kontakt: "Anita Pay", jobb: "Hjelp med eksisterende nettside", kategori: "Webdesign", sitat: "Jeg fikk utmerket hjelp av Anita med min nettside. Hun arbeidet raskt og gjorde en god jobb. Anbefales!", anbefaler: "Tore Svendsen", dato: "28. feb 2026" },
  { firma: "Moen-Elektro AS", kontakt: "Erik Moen", jobb: "Elektrikerarbeid i leilighet", kategori: "Elektriker", sitat: "Trengte hjelp til elektrikerarbeid i leiligheten og Erik gjorde en svært god jobb! Anbefales!", anbefaler: "Tore Svendsen", dato: "28. feb 2026" },
  { firma: "To Snekkere AS", kontakt: "Øyvind Kristiansen", jobb: "Totaloppussing av leilighet", kategori: "Snekker", sitat: "Solid utført snekkerarbeid og veldig god kommunikasjon underveis i prosessen!", anbefaler: "Ida Skivenes", dato: "28. feb 2026" },
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
