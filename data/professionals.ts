export interface Professional {
  id: number;
  navn: string;
  fag: string;
  bydel: string;
  anbefalinger: number;
  initialer: string;
}

export const professionals: Professional[] = [
  {
    id: 1,
    navn: "Nordre Aker Rør",
    fag: "Rørlegger",
    bydel: "Kjelsås",
    anbefalinger: 24,
    initialer: "NR",
  },
  {
    id: 2,
    navn: "Lys & Strøm AS",
    fag: "Elektriker",
    bydel: "Nydalen",
    anbefalinger: 18,
    initialer: "LS",
  },
  {
    id: 3,
    navn: "Flotte Farger",
    fag: "Maler",
    bydel: "Grefsen",
    anbefalinger: 31,
    initialer: "FF",
  },
  {
    id: 4,
    navn: "Hamran Snekkerverksted",
    fag: "Snekker",
    bydel: "Storo",
    anbefalinger: 15,
    initialer: "HS",
  },
  {
    id: 5,
    navn: "Flis & Bad Tåsen",
    fag: "Flislegger",
    bydel: "Tåsen",
    anbefalinger: 22,
    initialer: "FB",
  },
  {
    id: 6,
    navn: "Kjelsås Elektro",
    fag: "Elektriker",
    bydel: "Kjelsås",
    anbefalinger: 9,
    initialer: "KE",
  },
  {
    id: 7,
    navn: "Grefsen Rørservice",
    fag: "Rørlegger",
    bydel: "Grefsen",
    anbefalinger: 27,
    initialer: "GR",
  },
  {
    id: 8,
    navn: "Pensel & Kost",
    fag: "Maler",
    bydel: "Nydalen",
    anbefalinger: 12,
    initialer: "PK",
  },
  {
    id: 9,
    navn: "Tåsen Trearbeid",
    fag: "Snekker",
    bydel: "Tåsen",
    anbefalinger: 19,
    initialer: "TT",
  },
  {
    id: 10,
    navn: "Storo Flis",
    fag: "Flislegger",
    bydel: "Storo",
    anbefalinger: 14,
    initialer: "SF",
  },
];

export const categories = [
  "Alle",
  "Rørlegger",
  "Elektriker",
  "Maler",
  "Snekker",
  "Flislegger",
];
