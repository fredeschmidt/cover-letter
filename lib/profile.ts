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
    tagline: "AI-drevet personlig økonomi-rådgivning.",
    year: "2026",
    status: "aktiv",
    stack: ["Next.js", "Drizzle ORM", "AI-integration", "Tailwind", "TypeScript"],
    problem:
      "Jeg ville give andre den ro omkring økonomi, jeg selv får af et detaljeret budget — men i en form langt lettere at forstå og bruge end et Excel-ark.",
    process: [
      "Skitserede brugerflow ud fra mit eget budget-workflow.",
      "Byggede budget-overblik, optimerings-score og lånesammenligning.",
      "Tilføjede AI-lag der genererer konkrete besparelsesforslag.",
      "Lagde gamification (achievements) ovenpå for at holde folk engageret.",
      "Byggede et agent-testpanel: personas → projektleder-agent → UX + product designer — tester og forbedrer produktet løbende.",
    ],
  },
  {
    slug: "jobsoegningsapp",
    title: "Jobsøgningsapp",
    tagline: "Personligt værktøj til at matche, vurdere og skrive ansøgninger.",
    year: "2026",
    status: "i drift",
    stack: ["Next.js 16", "React 19", "Tailwind v4", "shadcn/ui", "localStorage"],
    problem:
      "Jobsøgning kræver overblik, research og personlige ansøgninger. Jeg ville have ét sted der samler jobopslag, vurderer match og skriver skræddersyede ansøgninger i min stemme.",
    process: [
      "Modellerede profil, drømmearbejdsplads, skrivestil og tidligere ansøgninger som markdown + TypeScript-typer.",
      "Implementerede Job Match Rating på fire dimensioner.",
      "Byggede like/skjul-system til at holde overblik.",
      "Integrerede AI til ansøgningsgenerering baseret på profil + skrivestil.",
    ],
  },
  {
    slug: "tv2reg-designsystem",
    title: "tv2reg-designsystem",
    tagline: "Designsystem til TV2 Regionerne med Figma + MCP.",
    year: "2025",
    status: "i drift",
    stack: ["Figma", "MCP", "TypeScript", "Designsystem"],
    problem:
      "TV2 Regionerne manglede et samlet designsystem der kunne tilgås både af designere og udviklere — og nu også af agents.",
    process: [
      "Byggede MCP-integration mod Figma-designsystemet.",
      "Sørgede for at agents kan hente tokens og komponenter direkte.",
      "Brugte det internt hos TV2 Østjylland til at holde forsideidentitet konsistent.",
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
    company: "Claude Code, MCP, agents",
    period: "Nu",
    domains: ["ai"],
    highlight:
      "Bygger custom Claude Code skills, MCP-servere (Linear, Figma), agent-workflows og prompt engineering.",
  },
  {
    id: "monimo-product",
    title: "Skaber af Monimo",
    company: "Eget projekt",
    period: "2026",
    domains: ["ai", "product", "frontend"],
    highlight: "AI-drevet økonomi-app designet og bygget selvstændigt.",
  },
  {
    id: "tv2oj-pm",
    title: "Teknisk projektleder for frontend",
    company: "TV2 Østjylland",
    period: "feb 2025 – nu",
    domains: ["frontend", "leadership"],
    highlight:
      "Leder et frontend-team, bindeled mellem journalister og udviklere. Førte huset trygt gennem KV25.",
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
    title: "Frontender",
    company: "TV2 Østjylland",
    period: "jun 2019 – okt 2024",
    domains: ["frontend"],
    highlight: "CMS, hjemmeside, webdoks, brugeroplevelse.",
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
    highlight: "Frontend for Koda, Studieskolen, Forenede Service.",
  },
  {
    id: "rowdy",
    title: "Eventkoordinator",
    company: "Rowdy",
    period: "nov 2013 – aug 2018",
    domains: ["leadership"],
    highlight: "Koordinerede op til 60 frivillige til Northside, Tinderbox, Haven, DMA, Eurovision.",
  },
];

export const education = [
  { period: "2015 – 2017", title: "BA i Web Development" },
  { period: "jan – jun 2016", title: "Hawaii Pacific University (udveksling)" },
  { period: "2013 – 2015", title: "Multimediedesign, KEA" },
];
