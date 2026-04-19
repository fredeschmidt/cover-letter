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
    tone: "neutral",
  },
  {
    id: "first-solve",
    label: "AI løser ad hoc",
    desc: "Jeg beder først AI'en løse opgaven uden skill — for at finde den rette måde at gøre det på.",
    x: 30,
    y: 50,
    tone: "violet",
  },
  {
    id: "create",
    label: "Skab skill",
    desc: "Når jeg er tilfreds, beder jeg AI'en kodificere løsningen som en skill der kan genbruges.",
    x: 52,
    y: 50,
    tone: "lime",
  },
  {
    id: "use",
    label: "Brug skill",
    desc: "Næste gang opgaven dukker op, aktiveres skillen via en prompt.",
    x: 78,
    y: 20,
    tone: "lime",
    multi: true,
  },
  {
    id: "refine",
    label: "Opdatér med kontekst",
    desc: "Hvis output ikke rammer plet, fodrer jeg AI'en med mere kontekst og opdaterer skillen — så den er skarpere næste gang.",
    x: 78,
    y: 80,
    tone: "violet",
  },
];

const edges: readonly Edge[] = [
  { from: "trigger", to: "first-solve", tone: "violet", delay: 0 },
  { from: "first-solve", to: "create", tone: "lime", delay: 0.4 },
  { from: "create", to: "use", tone: "lime", delay: 0.8 },
  { from: "use", to: "refine", tone: "violet", delay: 1.2 },
  {
    from: "refine",
    to: "use",
    tone: "lime",
    delay: 1.6,
    curve: (a, b) =>
      `M ${a.x} ${a.y / 2} C ${a.x + 14} ${a.y / 2 - 4}, ${b.x + 14} ${b.y / 2 + 4}, ${b.x} ${b.y / 2}`,
  },
];

export function HowIBuildSkills() {
  return (
    <Section
      id="skills"
      eyebrow="03 · Sådan bygger jeg skills"
      title="Jeg bruger ikke bare skills — jeg bygger og forfiner mine egne."
      intro="Når noget skal gentages, beder jeg først AI'en løse opgaven. Når jeg er tilfreds, kodificerer vi løsningen som en skill. Næste gang den ikke rammer plet, fodrer jeg den med mere kontekst — så den bliver skarpere for hver iteration."
    >
      <NodeGraph nodes={nodes} edges={edges} idPrefix="skills" />
    </Section>
  );
}
