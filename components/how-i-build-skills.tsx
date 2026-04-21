"use client";

import { Section } from "@/components/section";
import { NodeGraph, type Node, type Edge } from "@/components/node-graph";

const nodes: readonly Node[] = [
  {
    id: "trigger",
    label: "Gentagende opgave",
    desc: "Når jeg opdager arbejde der skal gøres flere gange, er det signal til at bygge en skill.",
    x: 8,
    y: 50,
    tone: "orange",
  },
  {
    id: "first-solve",
    label: "AI løser ad hoc",
    desc: "Jeg beder først AI'en løse opgaven uden skill — for at finde den rette måde at gøre det på.",
    x: 34,
    y: 50,
    tone: "orange",
  },
  {
    id: "create",
    label: "Skab skill",
    desc: "Når jeg er tilfreds, beder jeg AI'en pakke løsningen som en skill der kan genbruges.",
    x: 58,
    y: 50,
    tone: "lime",
  },
  {
    id: "use",
    label: "Brug skill",
    desc: "Næste gang opgaven dukker op, aktiveres skillen via en prompt.",
    x: 84,
    y: 20,
    tone: "lime",
    multi: true,
    wide: true,
  },
  {
    id: "refine",
    label: "Opdatér\u00A0med\nkontekst",
    desc: "Hvis output ikke rammer plet, fodrer jeg AI'en med mere kontekst og opdaterer skillen — så den er skarpere næste gang.",
    x: 84,
    y: 80,
    tone: "pink",
    wide: true,
  },
];

const edges: readonly Edge[] = [
  { from: "trigger", to: "first-solve", tone: "orange", delay: 0 },
  { from: "first-solve", to: "create", tone: "orange", delay: 0.4 },
  { from: "create", to: "use", tone: "lime", delay: 0.8 },
  { from: "use", to: "refine", tone: "pink", delay: 1.2 },
  {
    from: "refine",
    to: "use",
    tone: "pink",
    delay: 1.6,
    curve: (a, b) =>
      `M ${a.x} ${a.y / 2} C ${a.x + 14} ${a.y / 2 - 4}, ${b.x + 14} ${b.y / 2 + 4}, ${b.x} ${b.y / 2}`,
  },
];

export function HowIBuildSkills() {
  return (
    <Section
      id="skills"
      variant="chapter"
      chapterNumber={3}
      isLastChapter
      eyebrow="Sådan træner jeg AI"
      title="Jeg bruger ikke bare skills — jeg bygger og forfiner mine egne."
      intro="Når noget arbejde skal gentages, beder jeg først AI'en løse én af opgaverne. Når jeg er tilfreds, pakker jeg løsningen som en skill. Næste gang jeg skal løse en lignende opgave, og jeg bruger denne skill og den ikke rammer plet, fodrer jeg den med mere kontekst — så den bliver skarpere for hver gang."
    >
      <NodeGraph
        nodes={nodes}
        edges={edges}
        idPrefix="skills"
        compact
        topSpacing="mt-6 md:mt-8"
      />
    </Section>
  );
}
