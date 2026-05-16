export type JourneyPhaseId = "interested" | "applied" | "accepted" | "student";

export type JourneyPhase = {
  id: JourneyPhaseId;
  label: string;
  shortLabel: string;
};

export type NextStep = {
  phaseId: JourneyPhaseId;
  title: string;
  ctaLabel: string;
};

export type OverviewCard = {
  phaseId: JourneyPhaseId;
  title: string;
  system: string;
  isPriority?: boolean;
};

export type SelfServiceAction = {
  phaseIds: JourneyPhaseId[];
  title: string;
  area: string;
};

export type CommunicationMessage = {
  phaseId: JourneyPhaseId;
  title: string;
  relevance: string;
};

export const journeyPhases: JourneyPhase[] = [
  { id: "interested", label: "Interesseret", shortLabel: "Interesse" },
  { id: "applied", label: "Har søgt", shortLabel: "Ansøgning" },
  { id: "accepted", label: "Er optaget", shortLabel: "Optagelse" },
  { id: "student", label: "Er studerende", shortLabel: "Studieliv" },
];

export const nextSteps: NextStep[] = [
  {
    phaseId: "interested",
    title: "Find den uddannelse, der passer til dig",
    ctaLabel: "Start uddannelsesguide",
  },
  {
    phaseId: "applied",
    title: "Hold øje med din ansøgning",
    ctaLabel: "Se ansøgningsstatus",
  },
  {
    phaseId: "accepted",
    title: "Accepter pladsen og kom godt i gang",
    ctaLabel: "Accepter studieplads",
  },
  {
    phaseId: "student",
    title: "Få overblik over din studiedag",
    ctaLabel: "Se dagens overblik",
  },
];

export const overviewCards: OverviewCard[] = [
  // Interesseret — fra at udforske til at være klar til at søge
  { phaseId: "interested", title: "Gem og følg uddannelser", system: "Studieportalen", isPriority: true },
  { phaseId: "interested", title: "Tjek adgangskrav", system: "Studieportalen", isPriority: true },
  { phaseId: "interested", title: "Sammenlign uddannelser", system: "Studieportalen" },
  { phaseId: "interested", title: "Tilmeld dig åbent hus", system: "Studieportalen" },

  // Har søgt — afvent svar, hold ansøgning opdateret, forbered livet ved siden af
  { phaseId: "applied", title: "Se status på din ansøgning", system: "MitStudie", isPriority: true },
  { phaseId: "applied", title: "Upload manglende dokumentation", system: "MitStudie", isPriority: true },
  { phaseId: "applied", title: "Ret prioritering af uddannelser", system: "MitStudie" },
  { phaseId: "applied", title: "Søg studiebolig", system: "Studieportalen" },

  // Er optaget — formaliteter og forberedelse inden studiestart
  { phaseId: "accepted", title: "Accepter studieplads", system: "MitStudie", isPriority: true },
  { phaseId: "accepted", title: "Aktivér AU-login", system: "AU IT", isPriority: true },
  { phaseId: "accepted", title: "Tilmeld dig introforløb", system: "Studieportalen" },
  { phaseId: "accepted", title: "Bestil studiekort", system: "MitStudie" },
  { phaseId: "accepted", title: "Find pensum til 1. semester", system: "AU Library" },

  // Er studerende — dagligdag, kurser og eksamen
  { phaseId: "student", title: "Se dagens skema", system: "MitStudie" },
  { phaseId: "student", title: "Læs beskeder fra underviser", system: "Brightspace" },
  { phaseId: "student", title: "Tilmeld dig eksamen", system: "STADS", isPriority: true },
  { phaseId: "student", title: "Find pensum og litteratur", system: "AU Library" },
  { phaseId: "student", title: "Se karakterer", system: "STADS" },
];

export const selfServiceActions: SelfServiceAction[] = [
  { phaseIds: ["interested"], title: "Få hjælp til at vælge studie", area: "AU Studievejledning" },
  { phaseIds: ["interested"], title: "Besøg en forelæsning", area: "Studieportalen" },
  { phaseIds: ["applied"], title: "Find SU-vejledning", area: "AU Studievejledning" },
  { phaseIds: ["applied"], title: "Kontakt optagelsen", area: "AU Studievejledning" },
  { phaseIds: ["accepted"], title: "Tjek AU-mail", area: "AU-mail" },
  { phaseIds: ["accepted", "student"], title: "Book grupperum", area: "AU Library" },
  { phaseIds: ["student"], title: "Tilmeld kurser næste semester", area: "STADS" },
  { phaseIds: ["interested", "applied", "accepted", "student"], title: "Kontakt support", area: "AU Support" },
];

export const communicationMessages: CommunicationMessage[] = [
  { phaseId: "interested", title: "Ansøgningsfrist for kvote 2 nærmer sig", relevance: "Vigtig" },
  { phaseId: "interested", title: "Åbent hus 22. maj på Aarhus BSS", relevance: "Denne uge" },
  { phaseId: "interested", title: "Tjek om du opfylder adgangskravene", relevance: "Nu" },

  { phaseId: "applied", title: "Din ansøgning er modtaget", relevance: "Nu" },
  { phaseId: "applied", title: "Frist for motiveret ansøgning på fredag", relevance: "Vigtig" },
  { phaseId: "applied", title: "Svar på din ansøgning den 26. juli", relevance: "Vigtig dato" },

  { phaseId: "accepted", title: "Velkommen til AU", relevance: "Nu" },
  { phaseId: "accepted", title: "Frist: accepter studieplads inden 5. august", relevance: "Vigtig" },
  { phaseId: "accepted", title: "Introprogrammet er klar", relevance: "Før studiestart" },

  { phaseId: "student", title: "Ny besked i Brightspace", relevance: "Nu" },
  { phaseId: "student", title: "Kursustilmelding åbner 1. juni", relevance: "Vigtig dato" },
  { phaseId: "student", title: "Eksamensplan er offentliggjort", relevance: "Denne uge" },
];
