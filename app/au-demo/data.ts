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
  status?: string;
};

export type SelfServiceAction = {
  phaseIds: JourneyPhaseId[];
  title: string;
  area: string;
};

export type CommunicationMessage = {
  phaseId: JourneyPhaseId;
  title: string;
  channel: string;
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
    ctaLabel: "Udforsk uddannelser",
  },
  {
    phaseId: "applied",
    title: "Hold øje med din ansøgningsstatus",
    ctaLabel: "Se ansøgningsstatus",
  },
  {
    phaseId: "accepted",
    title: "Kom godt i gang før studiestart",
    ctaLabel: "Se dine opstartsopgaver",
  },
  {
    phaseId: "student",
    title: "Få overblik over din studiedag",
    ctaLabel: "Se dagens overblik",
  },
];

export const overviewCards: OverviewCard[] = [
  // Interesseret
  { phaseId: "interested", title: "Sammenlign uddannelser", system: "Studieportalen", status: "Ofte brugt" },
  { phaseId: "interested", title: "Tjek adgangskrav", system: "Studieportalen", status: "Vigtig" },
  { phaseId: "interested", title: "Få besked om åbent hus", system: "AU-mail", status: "Valgfri" },
  { phaseId: "interested", title: "Se ansøgningsfrister", system: "Studieportalen", status: "Vigtig" },

  // Har søgt
  { phaseId: "applied", title: "Se status på din ansøgning", system: "MitStudie", status: "Kræver login" },
  { phaseId: "applied", title: "Upload manglende dokumentation", system: "MitStudie", status: "Vigtig" },
  { phaseId: "applied", title: "Forstå hvad der sker nu", system: "Studieportalen", status: "Ny" },
  { phaseId: "applied", title: "Kontakt optagelse", system: "AU Studievejledning", status: "Valgfri" },

  // Er optaget
  { phaseId: "accepted", title: "Accepter studieplads", system: "MitStudie", status: "Vigtig" },
  { phaseId: "accepted", title: "Aktivér AU-login", system: "AU IT", status: "Kræver login" },
  { phaseId: "accepted", title: "Bestil studiekort", system: "MitStudie", status: "Ny" },
  { phaseId: "accepted", title: "Find introprogram", system: "Studieportalen", status: "Ofte brugt" },
  { phaseId: "accepted", title: "Tjek AU-mail", system: "AU-mail", status: "Kræver login" },

  // Er studerende
  { phaseId: "student", title: "Se dagens skema", system: "MitStudie", status: "Ofte brugt" },
  { phaseId: "student", title: "Læs beskeder fra underviser", system: "Brightspace", status: "Ny" },
  { phaseId: "student", title: "Tjek officielle beskeder", system: "AU-mail", status: "Kræver login" },
  { phaseId: "student", title: "Tilmeld kurser", system: "STADS", status: "Vigtig" },
  { phaseId: "student", title: "Find litteratur", system: "AU Library", status: "Ofte brugt" },
];

export const selfServiceActions: SelfServiceAction[] = [
  { phaseIds: ["interested"], title: "Find uddannelse", area: "Studieportalen" },
  { phaseIds: ["interested"], title: "Se adgangskrav", area: "Studieportalen" },
  { phaseIds: ["applied"], title: "Se ansøgningsstatus", area: "MitStudie" },
  { phaseIds: ["applied"], title: "Upload dokumentation", area: "MitStudie" },
  { phaseIds: ["accepted"], title: "Accepter studieplads", area: "MitStudie" },
  { phaseIds: ["accepted"], title: "Aktivér AU-login", area: "AU IT" },
  { phaseIds: ["accepted", "student"], title: "Bestil studiekort", area: "MitStudie" },
  { phaseIds: ["student"], title: "Se skema", area: "MitStudie" },
  { phaseIds: ["student"], title: "Tilmeld kursus", area: "STADS" },
  { phaseIds: ["student"], title: "Se karakterer", area: "STADS" },
  { phaseIds: ["student"], title: "Find karakterudskrift", area: "MitStudie" },
  { phaseIds: ["interested", "applied", "accepted", "student"], title: "Kontakt support", area: "AU Support" },
];

export const communicationMessages: CommunicationMessage[] = [
  { phaseId: "interested", title: "Ansøgningsfristen nærmer sig", channel: "Studieportalen", relevance: "Vigtig" },
  { phaseId: "interested", title: "Kom til åbent hus", channel: "AU-mail", relevance: "Denne uge" },
  { phaseId: "interested", title: "Tjek adgangskrav før du søger", channel: "Studieportalen", relevance: "Nu" },

  { phaseId: "applied", title: "Din ansøgning er modtaget", channel: "MitStudie", relevance: "Nu" },
  { phaseId: "applied", title: "Du kan blive bedt om supplerende dokumentation", channel: "AU-mail", relevance: "Vigtig" },
  { phaseId: "applied", title: "Hold øje med svarfrister", channel: "MitStudie", relevance: "Denne uge" },

  { phaseId: "accepted", title: "Velkommen til AU", channel: "AU-mail", relevance: "Nu" },
  { phaseId: "accepted", title: "Husk at acceptere studiepladsen", channel: "MitStudie", relevance: "Vigtig" },
  { phaseId: "accepted", title: "Introprogrammet er klar", channel: "Studieportalen", relevance: "Før studiestart" },

  { phaseId: "student", title: "Ny besked i Brightspace", channel: "Brightspace", relevance: "Nu" },
  { phaseId: "student", title: "Kursustilmelding åbner snart", channel: "STADS", relevance: "Denne uge" },
  { phaseId: "student", title: "Ny frist i dit studieoverblik", channel: "MitStudie", relevance: "Vigtig" },
];
