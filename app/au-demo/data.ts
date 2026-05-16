export type JourneyPhaseId = "interested" | "applied" | "accepted" | "student";

export type JourneyPhase = {
  id: JourneyPhaseId;
  shortLabel: string;
};

export type PhaseStep = {
  phaseId: JourneyPhaseId;
  title: string;
  status: "done" | "current" | "upcoming";
  // Vises på Næste skridt-kassen når status === "current"
  ctaLabel?: string;
};

export type SavedProgram = {
  phaseId: JourneyPhaseId;
  title: string;
  deadline: string;
  // ISO-dato bruges af UI'et til at vise countdown ("· 23 dage") relativt til demoToday
  deadlineDate?: string;
  isUrgent?: boolean;
};

// Demoens "i dag" — sat så fase 1's kvote 2-frist ligger 23 dage ude og føles akut.
// Reel dato kunne hentes fra Date.now(), men en fast demoToday gør prototypen stabil.
export const demoToday = "2026-02-20" as const;

export type PhaseActivity = {
  phaseId: JourneyPhaseId;
  title: string;
  meta?: string;
  status: "done" | "open";
};

export type DraftApplication = {
  phaseId: JourneyPhaseId;
  programTitle: string;
  description: string;
  progress: number;
};

export const journeyPhases: JourneyPhase[] = [
  { id: "interested", shortLabel: "Interesse" },
  { id: "applied", shortLabel: "Ansøgning" },
  { id: "accepted", shortLabel: "Optagelse" },
  { id: "student", shortLabel: "Studieliv" },
];

// Steps pr. fase. Den med status="current" bliver fremhævet både i sidenaven
// og som "Næste skridt" midt på siden.
export const phaseSteps: PhaseStep[] = [
  { phaseId: "interested", title: "Find den uddannelse, der passer til dig", status: "done" },
  {
    phaseId: "interested",
    title: "Forbered din ansøgning",
    status: "current",
    ctaLabel: "Fortsæt din ansøgning",
  },

  {
    phaseId: "applied",
    title: "Hold øje med din ansøgning",
    status: "current",
    ctaLabel: "Se ansøgningsstatus",
  },
  { phaseId: "applied", title: "Upload manglende dokumentation", status: "upcoming" },
  { phaseId: "applied", title: "Ret prioritering af uddannelser", status: "upcoming" },
  { phaseId: "applied", title: "Søg studiebolig og SU", status: "upcoming" },

  {
    phaseId: "accepted",
    title: "Accepter pladsen og kom godt i gang",
    status: "current",
    ctaLabel: "Accepter studieplads",
  },
  { phaseId: "accepted", title: "Aktivér AU-login", status: "upcoming" },
  { phaseId: "accepted", title: "Tilmeld dig introforløb", status: "upcoming" },
  { phaseId: "accepted", title: "Find pensum til 1. semester", status: "upcoming" },

  {
    phaseId: "student",
    title: "Få overblik over din studiedag",
    status: "current",
    ctaLabel: "Se dagens overblik",
  },
  { phaseId: "student", title: "Tilmeld dig eksamen", status: "upcoming" },
  { phaseId: "student", title: "Følg dine karakterer", status: "upcoming" },
  { phaseId: "student", title: "Tilmeld kurser næste semester", status: "upcoming" },
];

export const savedPrograms: SavedProgram[] = [
  {
    phaseId: "interested",
    title: "Datavidenskab",
    deadline: "Frist 15. marts (kvote 2)",
    deadlineDate: "2026-03-15",
    isUrgent: true,
  },
  {
    phaseId: "interested",
    title: "Cognitive Science",
    deadline: "Frist 15. marts (kvote 2)",
    deadlineDate: "2026-03-15",
    isUrgent: true,
  },
  {
    phaseId: "interested",
    title: "Informationsvidenskab",
    deadline: "Frist 5. juli (kvote 1)",
  },

  {
    phaseId: "applied",
    title: "Datavidenskab — 1. prioritet",
    deadline: "Svar 26. juli",
  },
  {
    phaseId: "applied",
    title: "Cognitive Science — 2. prioritet",
    deadline: "Svar 26. juli",
  },

  {
    phaseId: "accepted",
    title: "Datavidenskab — bachelor",
    deadline: "Studiestart 1. september",
  },

  {
    phaseId: "student",
    title: "Datavidenskab — 2. semester",
    deadline: "Eksamen 9.–20. juni",
  },
];

export const draftApplications: DraftApplication[] = [
  {
    phaseId: "interested",
    programTitle: "Datavidenskab",
    description: "Motiveret ansøgning · 3 af 5 trin udfyldt",
    progress: 60,
  },
  {
    phaseId: "interested",
    programTitle: "Cognitive Science",
    description: "Motiveret ansøgning · 1 af 5 trin udfyldt",
    progress: 20,
  },
];

export const phaseActivities: PhaseActivity[] = [
  {
    phaseId: "interested",
    title: "Åbent hus 22. maj på Aarhus BSS",
    meta: "Du er tilmeldt",
    status: "done",
  },
  { phaseId: "interested", title: "Besøg en forelæsning", status: "open" },
  { phaseId: "interested", title: "Få hjælp til at vælge studie", status: "open" },
  { phaseId: "interested", title: "Sammenlign uddannelser", status: "open" },

  {
    phaseId: "applied",
    title: "Ansøgning indsendt",
    meta: "Modtaget 14. marts",
    status: "done",
  },
  { phaseId: "applied", title: "Find SU-vejledning", status: "open" },
  { phaseId: "applied", title: "Søg studiebolig", status: "open" },
  { phaseId: "applied", title: "Kontakt optagelsen", status: "open" },

  {
    phaseId: "accepted",
    title: "Studieplads accepteret",
    meta: "5. august",
    status: "done",
  },
  {
    phaseId: "accepted",
    title: "AU-login aktiveret",
    meta: "Klar",
    status: "done",
  },
  { phaseId: "accepted", title: "Tilmeld introforløb", status: "open" },
  { phaseId: "accepted", title: "Bestil studiekort", status: "open" },

  {
    phaseId: "student",
    title: "Skema for 2. semester",
    meta: "Synkroniseret",
    status: "done",
  },
  { phaseId: "student", title: "Tilmeld eksamen", status: "open" },
  { phaseId: "student", title: "Book grupperum", status: "open" },
  { phaseId: "student", title: "Find pensum og litteratur", status: "open" },
];
