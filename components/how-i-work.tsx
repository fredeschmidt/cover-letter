"use client";

import { Section } from "@/components/section";
import { NodeGraph, type Node, type Edge } from "@/components/node-graph";

const nodes: readonly Node[] = [
  {
    id: "personas",
    label: "Personas",
    desc: "Flere simulerede brugere der tester produktet som rigtige mennesker — hver med deres egen baggrund, behov og frustrationer.",
    x: 6,
    y: 50,
    tone: "neutral",
    multi: true,
  },
  {
    id: "pm",
    label: "Projektleder-agent",
    desc: "Modtager feedback fra personaerne, prioriterer mod produktets vision og uddelegerer til specialister.",
    x: 32,
    y: 50,
    tone: "violet",
  },
  {
    id: "ux",
    label: "UX-agent",
    desc: "Tænker brugerrejser, ombygger flows og simplificerer.",
    x: 62,
    y: 15,
    tone: "lime",
  },
  {
    id: "design",
    label: "Product designer-agent",
    desc: "Udfører visuelle og interaktive ændringer med blik for brand og æstetik.",
    x: 62,
    y: 50,
    tone: "lime",
  },
  {
    id: "copy",
    label: "Copywriter-agent",
    desc: "Skriver og forfiner al tekst — så produktet taler i en tone der matcher mig.",
    x: 62,
    y: 85,
    tone: "lime",
  },
  {
    id: "build",
    label: "Implementering",
    desc: "Mig + Claude Code bygger løsningen. Produktet går live, og personaerne tester igen.",
    x: 94,
    y: 50,
    tone: "violet",
  },
];

const edges: readonly Edge[] = [
  { from: "personas", to: "pm", tone: "violet", delay: 0 },
  { from: "pm", to: "ux", tone: "lime", delay: 0.4 },
  { from: "pm", to: "design", tone: "lime", delay: 0.8 },
  { from: "pm", to: "copy", tone: "lime", delay: 1.2 },
  { from: "ux", to: "build", tone: "violet", delay: 1.6 },
  { from: "design", to: "build", tone: "violet", delay: 2.0 },
  { from: "copy", to: "build", tone: "violet", delay: 2.4 },
  {
    from: "build",
    to: "personas",
    tone: "violet",
    delay: 2.8,
    curve: (a, b) =>
      `M ${a.x} ${a.y / 2} C ${a.x + 5} ${-15}, ${b.x - 5} ${-15}, ${b.x} ${b.y / 2}`,
  },
];

export function HowIWork() {
  return (
    <Section
      id="arbejder"
      eyebrow="02 · Sådan arbejder jeg"
      title="Jeg bygger ikke bare med AI — jeg bygger agent-teams."
      intro="Da jeg byggede Monimo, satte jeg et agent-team op til at teste og forbedre produktet. Flere personas tester, en projektleder-agent prioriterer, og et lille hold af specialister eksekverer."
    >
      <NodeGraph nodes={nodes} edges={edges} idPrefix="work" />
    </Section>
  );
}
