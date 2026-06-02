export type JourneyPhaseId = "interested" | "applied" | "accepted";

export type JourneyPhase = {
  id: JourneyPhaseId;
  shortLabel: string;
};

export type SavedProgram = {
  id: string;
  phaseId: JourneyPhaseId;
  title: string;
  /** Hovedtekst for deadline-pille, fx "Frist 15. marts" eller "Svar 26. juli" */
  deadline: string;
  /** ISO-dato bruges til countdown ("23 dage") relativt til demoToday */
  deadlineDate?: string;
  isUrgent?: boolean;
  /** Fase 2 (sendte ansøgninger): vises i den grønne "Ansøgt X"-badge */
  submittedDate?: string;
};

// Demoens "i dag" — sat så fase 1's marts-frist ligger 7 dage ude og føles akut.
// Reel dato kunne hentes fra Date.now(), men en fast demoToday gør prototypen stabil.
export const demoToday = "2026-03-08" as const;

export type PhaseActivity = {
  phaseId: JourneyPhaseId;
  title: string;
  meta?: string;
  status: "done" | "open";
};

export type DraftApplication = {
  phaseId: JourneyPhaseId;
  /** Stabil reference til SavedProgram.id (i stedet for at matche på title) */
  programId: string;
  /** Antal udfyldte sektioner — primary fact */
  filled: number;
  /** Samlet antal sektioner i kladden */
  total: number;
};

export type UploadedDocument = {
  phaseId: JourneyPhaseId;
  title: string;
  meta: string;
  status: "verified" | "missing";
};

export type SUItem = {
  phaseId: JourneyPhaseId;
  title: string;
  meta?: string;
  status: "done" | "open";
  isUrgent?: boolean;
};

export type PhaseConfig = {
  /** Sektionstitel for SavedProgramsList — listen skifter betydning på tværs af faser */
  programsTitle: string;
  /** Visuel tone på saved-program-rækker for denne fase */
  programsTone: "default" | "submitted" | "accepted";
  /** h1-hilsen øverst på siden, skifter pr. fase */
  greeting: string;
  /** Fase 2: slå SU + aktiviteter sammen i "Mens du venter" i stedet for at vise dem hver for sig */
  mergeWaitingSections?: boolean;
};

export const journeyPhases: JourneyPhase[] = [
  { id: "interested", shortLabel: "Interesse" },
  { id: "applied", shortLabel: "Ansøgning" },
  { id: "accepted", shortLabel: "Optagelse" },
];

export const phaseConfigs: Record<JourneyPhaseId, PhaseConfig> = {
  interested: {
    programsTitle: "Dine ansøgninger",
    programsTone: "default",
    greeting: "Velkommen Astrid",
  },
  applied: {
    programsTitle: "Sendte ansøgninger",
    programsTone: "submitted",
    greeting: "Velkommen tilbage, Astrid",
    mergeWaitingSections: true,
  },
  accepted: {
    programsTitle: "Optaget på",
    programsTone: "accepted",
    greeting: "Tillykke Astrid",
  },
};

export const savedPrograms: SavedProgram[] = [
  {
    id: "datavidenskab",
    phaseId: "interested",
    title: "Datavidenskab",
    deadline: "Frist 15. marts",
    deadlineDate: "2026-03-15",
    isUrgent: true,
  },
  {
    id: "cognitive-science",
    phaseId: "interested",
    title: "Cognitive Science",
    deadline: "Frist 15. marts",
    deadlineDate: "2026-03-15",
    isUrgent: true,
  },
  {
    id: "informationsvidenskab",
    phaseId: "interested",
    title: "Informationsvidenskab",
    deadline: "Frist 5. juli",
  },

  {
    id: "datavidenskab-1",
    phaseId: "applied",
    title: "Datavidenskab — 1. prioritet",
    deadline: "Svar 26. juli",
    submittedDate: "12. marts",
  },
  {
    id: "cognitive-science-2",
    phaseId: "applied",
    title: "Cognitive Science — 2. prioritet",
    deadline: "Svar 26. juli",
    submittedDate: "14. marts",
  },

  {
    id: "datavidenskab-bachelor",
    phaseId: "accepted",
    title: "Datavidenskab — bachelor",
    deadline: "Studiestart 1. september",
  },
];

export const draftApplications: DraftApplication[] = [
  {
    phaseId: "interested",
    programId: "datavidenskab",
    filled: 3,
    total: 5,
  },
  {
    phaseId: "interested",
    programId: "cognitive-science",
    filled: 1,
    total: 5,
  },
  {
    phaseId: "interested",
    programId: "informationsvidenskab",
    filled: 0,
    total: 5,
  },
];

export const phaseActivities: PhaseActivity[] = [
  {
    phaseId: "interested",
    title: "Åbent hus 22. maj på Aarhus BSS",
    meta: "Du er tilmeldt",
    status: "done",
  },
  { phaseId: "interested", title: "Åbent hus 12. juni på Arts", status: "open" },
  { phaseId: "interested", title: "Besøg en forelæsning", status: "open" },
  { phaseId: "interested", title: "Få hjælp til at vælge studie", status: "open" },
  { phaseId: "interested", title: "Sammenlign uddannelser", status: "open" },

  { phaseId: "applied", title: "Søg studiebolig", status: "open" },
  { phaseId: "applied", title: "Kontakt optagelsen", status: "open" },
];

export const uploadedDocuments: UploadedDocument[] = [
  {
    phaseId: "applied",
    title: "Eksamensbevis",
    meta: "Uploadet 12. marts",
    status: "verified",
  },
  {
    phaseId: "applied",
    title: "Karakterudskrift gymnasium",
    meta: "Mangler",
    status: "missing",
  },
];

export const suItems: SUItem[] = [
  {
    phaseId: "applied",
    title: "Søg om SU",
    meta: "Frist 1. august",
    status: "open",
    isUrgent: true,
  },
  { phaseId: "applied", title: "Find SU-vejledning", status: "open" },
  { phaseId: "applied", title: "Beregn SU-sats", status: "open" },
];
