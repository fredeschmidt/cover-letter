export const profile = {
  name: "Frederikke Schmidt",
  role: "AI frontend-udvikler",
  location: "8250 Egå",
  email: "fredeschmidt92@gmail.com",
  phone: "26 20 63 32",
  linkedin: "https://linkedin.com/in/frederikkeschmidt/",
  intro:
    "Teknisk projektleder og frontend-udvikler med 7+ års erfaring. Jeg er dybt begravet i Claude Code, bygger agent-workflows i min fritid, og har fået fornyet lyst til at udvikle selv — nu hvor AI gør det muligt at bygge hurtigt, effektivt og kreativt.",
} as const;

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  status: "aktiv" | "afsluttet" | "i drift";
  stack: string[];
  problem: string;
  process: string[];
};

export const projects: Project[] = [
  {
    slug: "monimo",
    title: "Monimo",
    tagline: "Personligt overblik samt rådgivning af dit budget.",
    year: "2026",
    status: "aktiv",
    stack: ["Next.js", "Tailwind", "shadcn/ui", "Vercel", "localStorage"],
    problem:
      "Jeg vil give andre den ro omkring økonomi, jeg selv får af et detaljeret budget — gennem et overskueligt overblik og konkrete anbefalinger.",
    process: [
      "Skitserede brugerflowet ud fra mit eget budget-rituale og gav det videre til AI'en som kontekst via CLAUDE.md og custom skills (architecture, simple-budget-ui).",
      "AI'en byggede et budget-udkast i Next.js + shadcn/ui, som jeg løbende tilpassede via inline redigering.",
      "Budget gemmes pt. i browserens localStorage.",
      "Login oprettet via magic link (NextAuth + Resend) med Drizzle-adapter, så data på sigt kan følge brugeren på tværs af enheder.",
      "Agent-testpanel med personaer (par, single, familie) + eksperter (produktleder, UX, product designer, tekstforfatter, tilgængelighed) forbedrer produktet løbende.",
    ],
  },
  {
    slug: "jobsoegningsapp",
    title: "Jobsøgningsapp",
    tagline: "Personligt værktøj der finder relevante jobopslag, scorer matchet og skriver skræddersyede ansøgninger.",
    year: "2026",
    status: "i drift",
    stack: ["Next.js", "Tailwind", "shadcn/ui", "localStorage"],
    problem:
      "Jobsøgning kræver overblik, research og personlige ansøgninger. Jeg ville have ét sted der samler jobopslag, vurderer match og skriver skræddersyede ansøgninger i min stemme.",
    process: [
      "Modellerede mig selv som den kontekst AI'en bygger på: profil, drømmearbejdsplads, skrivestil og tidligere ansøgninger.",
      "Byggede en daglig jobscanner der henter opslag fra det danske marked med ekstra vægt på små og oversete startups.",
      "Match-score viser med ét blik hvor godt et jobopslag passer til min profil og drømmearbejdsplads.",
      "Like/skjul-system til at sortere støjen fra og holde fokus på de relevante opslag.",
      "Integrerede AI til ansøgningsgenerering baseret på min profil, skrivestil og konkrete eksempler på ansøgninger der har virket.",
      "Valgte en simpel stack (Next.js, localStorage, ingen backend) da dette blot var til eget brug.",
    ],
  },
  {
    slug: "tv2reg-designsystem",
    title: "Figma-integration og design tokens på tværs af regioner",
    tagline: "Jeg har bygget et setup, hvor repo-baserede komponenter blev omsat til Figma-atom-komponenter, så de kunne styres af design tokens.",
    year: "2026",
    status: "i drift",
    stack: ["Figma", "MCP", "TypeScript", "Designsystem"],
    problem:
      "Hver region havde sit eget frontend-udtryk, hvilket gjorde løsningen tung at vedligeholde. Derfor opstod behovet for et fælles designsystem med udgangspunkt i Figma, hvor hver regions visuelle identitet kunne styres gennem tokens, så vedligeholdelse på tværs af regioner og design blev enklere.",
    process: [
      "Hentede atom-komponenter fra de eksisterende repo-baserede komponenter ind i Figma.",
      "Omsatte dem til genbrugelige Figma-komponenter, der kunne styres via design tokens.",
      "Skabte et grundlag, hvor ændringer i design og kode lettere kan holdes synkroniseret fremadrettet.",
    ],
  },
];

export type RoleNode = {
  id: string;
  title: string;
  company: string;
  period: string;
  domains: Array<"frontend" | "ai" | "leadership" | "product">;
  highlight: string;
};

export const roles: RoleNode[] = [
  {
    id: "ai-practice",
    title: "AI-praktiker",
    company: "Claude Code, Codex, agents, skills, MCP",
    period: "Nu",
    domains: ["ai"],
    highlight:
      "Bygger og forfiner custom skills, MCP-integrationer (Figma, Linear) og agent-teams der tester og forbedrer mine egne produkter.",
  },
  {
    id: "monimo-product",
    title: "Skaber af Monimo",
    company: "Eget projekt",
    period: "2026",
    domains: ["ai", "product", "frontend"],
    highlight:
      "Webbaseret budget-værktøj til par i etableringsfasen, der skaber ro om økonomien gennem overskueligt overblik og konkrete anbefalinger. Bygget selvstændigt fra idé til færdigt produkt i et gennemgående samarbejde med AI: research, målgruppe, UX, visuelt design og kode er alt sammen blevet til i dialog med AI, mens jeg har stået for retning, beslutninger og kvalitetssikring.\n\nHar derudover opbygget et dedikeret team af specialiserede AI-agenter (produktleder, UX'er, designer, copywriter og målgruppe-personaer), der løbende tester og udfordrer produktet.",
  },
  {
    id: "tv2oj-pm",
    title: "Teknisk projektleder for frontend",
    company: "TV2 Østjylland",
    period: "feb 2025 – nu",
    domains: ["frontend", "leadership"],
    highlight:
      "Min største styrke er at være bindeleddet mellem de tekniske og ikke-tekniske kollegaer. Jeg oversætter behov til opgaver, prioriterer, fordeler til mit team og sikrer at hele huset altid ved hvad der arbejdes på. Jeg afholder også 1-1 med mine kollegaer for at sikre deres potentiale og motivation bliver brugt bedst muligt og dermed også deres trivsel.\n\nDa jeg kom tilbage til TV2ØJ, var vi midt i et større CMS-skifte med mange fejl, høj frustration og lav gennemsigtighed i fremdriften. Jeg fik vendt skuden ved at skabe overblik, prioritere benhårdt og indføre fast og tydelig statuskommunikation, så huset følte sig oplyst og trygt igen.\n\nSideløbende var jeg med til at idéudvikle en ny forside og visuel identitet og førte den fra afklaring til udvikling til lancering. Resultatet blev taget ekstremt godt imod og gjorde sitet mere nutidigt og sammenhængende.\n\nDa kommunalvalget nærmede sig, førte jeg os sikkert i mål gennem konkrete handlingsplaner, løbende forventningsafstemning og nødplaner. Vi stod med ro, overskud og et forløb der gik over forventning.",
  },
  {
    id: "illumi",
    title: "Umbraco-frontender",
    company: "Illumi",
    period: "nov 2024 – feb 2025",
    domains: ["frontend"],
    highlight: "Frontend i C#/Umbraco, brugervenlige interfaces.",
  },
  {
    id: "vertica",
    title: "Teknisk projektleder",
    company: "Vertica",
    period: "okt – nov 2024",
    domains: ["leadership"],
    highlight: "E-commerce support og videreudvikling.",
  },
  {
    id: "tv2oj-fe",
    title: "Kreativ frontender",
    company: "TV2 Østjylland",
    period: "jun 2019 – okt 2024",
    domains: ["frontend"],
    highlight:
      "På TV2 Østjylland arbejdede jeg som frontendudvikler på hjemmesiden, der hver dag leverer nyheder målrettet østjyderne.\n\nJeg har udviklet og implementeret sitet på nye CMS'er (af flere omgange), skræddersyet det til journalisternes behov og ført en ny visuel identitet ud på siden. Sideløbende har jeg undersøgt adfærden hos de 100.000 daglige besøgende og fået dyb indsigt i, hvordan læserne bruger indholdet — en viden jeg har brugt til at forme sitet med stærkt UX-fokus, så det blev mere intuitivt og engagerende. Derudover har jeg bygget en række webdoks: dybdegående, visuelle formater, der løfter graverjournalistik på en kreativ måde.\n\nI rollen har jeg selv haft overblikket over projekterne og samarbejdet tæt med de andre TV2-regioner.",
  },
  {
    id: "nodes",
    title: "Frontender",
    company: "Nodes",
    period: "mar – jun 2019",
    domains: ["frontend"],
    highlight: "Website-optimering for Kerzner.",
  },
  {
    id: "cabana",
    title: "Frontender",
    company: "Cabana",
    period: "aug 2016 – dec 2019",
    domains: ["frontend"],
    highlight:
      "Cabana er et digitalt webbureau. Her havde jeg ansvaret for frontenden hos kunder, som bl.a. Koda, Studieskolen og Forenede Service. Desuden arbejdede jeg med optimering af brugeroplevelse, samt kundekontakten med Koda.",
  },
  {
    id: "rowdy",
    title: "Eventkoordinator",
    company: "Rowdy",
    period: "nov 2013 – aug 2018",
    domains: ["leadership"],
    highlight:
      "Hos Rowdy arrangerede og afviklede vi større events, som artistområderne på festivalerne Northside, Tinderbox og Haven, efterfesten til Danish Music Awards, green room til Eurovision, overrækkelsen af Gaffa prisen og meget mere.\n\nI rollen som projektkoordinator var jeg bl.a. ansvarlig for planlægningen og eksekveringen af festivalsområder, med særligt fokus på at skabe et behageligt og kreativt miljø for festivalens artister. Derudover stod jeg for at motivere og engagere et hold med op mod 60 frivillige til at opbygge, afvikle og nedpakke dette område, samt at have overblikket over at alle opgaverne blev løst undervejs.",
  },
];

export const education = [
  { period: "2015 – 2017", title: "BA i Web Development" },
  { period: "jan – jun 2016", title: "Hawaii Pacific University (udveksling)" },
  { period: "2013 – 2015", title: "Multimediedesign, KEA" },
];
