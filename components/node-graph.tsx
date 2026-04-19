"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { pair } from "@/lib/motion";

export type NodeTone = "violet" | "lime" | "neutral";

export type Node = {
  id: string;
  label: string;
  desc: string;
  x: number;
  y: number;
  tone: NodeTone;
  multi?: boolean;
};

export type Edge = {
  from: string;
  to: string;
  tone: "violet" | "lime";
  delay: number;
  curve?: (a: Node, b: Node) => string;
};

export const toneConfig: Record<
  NodeTone,
  {
    color: string;
    raw: string;
    bg: string;
    border: string;
    glow: string;
  }
> = {
  violet: {
    color: "var(--color-violet)",
    raw: "#8a72ff",
    bg: "var(--color-violet-soft)",
    border: "color-mix(in oklab, var(--color-violet) 35%, transparent)",
    glow: "0 0 22px rgba(138, 114, 255, 0.5)",
  },
  lime: {
    color: "var(--color-lime)",
    raw: "#5ad897",
    bg: "var(--color-lime-soft)",
    border: "color-mix(in oklab, var(--color-lime) 35%, transparent)",
    glow: "0 0 22px rgba(90, 216, 151, 0.45)",
  },
  neutral: {
    color: "var(--color-foreground)",
    raw: "#eef0f6",
    bg: "color-mix(in oklab, var(--color-foreground) 6%, transparent)",
    border: "color-mix(in oklab, var(--color-foreground) 18%, transparent)",
    glow: "0 0 20px rgba(238, 240, 246, 0.25)",
  },
};

function MultiDots({ color }: { color: string }) {
  return (
    <span className="mr-2 inline-flex items-center">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: color, opacity: 0.5 }}
      />
      <span
        className="-ml-0.5 inline-block h-2 w-2 rounded-full"
        style={{ background: color, opacity: 0.75 }}
      />
      <span
        className="-ml-0.5 inline-block h-2.5 w-2.5 rounded-full"
        style={{ background: color }}
      />
    </span>
  );
}

function defaultCurve(a: Node, b: Node) {
  return `M ${a.x} ${a.y / 2} L ${b.x} ${b.y / 2}`;
}

export function NodeGraph({
  nodes,
  edges,
  idPrefix,
}: {
  nodes: readonly Node[];
  edges: readonly Edge[];
  idPrefix: string;
}) {
  const [hover, setHover] = useState<string | null>(null);

  const nodeMap = new Map(nodes.map((n) => [n.id, n] as const));
  const resolvedEdges = edges.map((edge) => {
    const a = nodeMap.get(edge.from)!;
    const b = nodeMap.get(edge.to)!;
    const path = (edge.curve ?? defaultCurve)(a, b);
    return { edge, path };
  });

  const current = hover ? nodeMap.get(hover) ?? null : null;

  return (
    <>
      <div className="relative mt-8 aspect-[2/1] w-full md:mt-12">
        <svg
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <marker
              id={`${idPrefix}-arrow-violet`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={toneConfig.violet.raw} />
            </marker>
            <marker
              id={`${idPrefix}-arrow-lime`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={toneConfig.lime.raw} />
            </marker>
          </defs>

          {resolvedEdges.map(({ edge, path }, i) => {
            const active = !!hover && (hover === edge.from || hover === edge.to);
            const color = toneConfig[edge.tone].raw;
            return (
              <motion.path
                key={`${edge.from}-${edge.to}`}
                d={path}
                stroke={color}
                strokeOpacity={active ? 0.9 : 0.35}
                strokeWidth={active ? 0.35 : 0.22}
                fill="none"
                strokeLinecap="round"
                markerEnd={`url(#${idPrefix}-arrow-${edge.tone})`}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: i * 0.08, ease: "easeInOut" }}
              />
            );
          })}

          {resolvedEdges.map(({ edge, path }) => {
            const color = toneConfig[edge.tone].raw;
            return (
              <circle
                key={`pulse-${edge.from}-${edge.to}`}
                r="0.7"
                fill={color}
                opacity="0.9"
                style={{ filter: `drop-shadow(0 0 2px ${color})` }}
              >
                <animateMotion
                  dur="3.2s"
                  begin={`${edge.delay}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                  path={path}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0"
                  keyTimes="0;0.1;0.9;1"
                  dur="3.2s"
                  begin={`${edge.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </svg>

        {nodes.map((n, i) => {
          const cfg = toneConfig[n.tone];
          const isActive = hover === n.id;
          return (
            <motion.button
              key={n.id}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...pair, delay: 0.2 + i * 0.08 }}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(n.id)}
              onBlur={() => setHover(null)}
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                background: isActive
                  ? `color-mix(in oklab, ${cfg.color} 30%, transparent)`
                  : cfg.bg,
                borderColor: isActive ? cfg.color : cfg.border,
                boxShadow: isActive ? cfg.glow : "none",
                color: isActive ? cfg.color : "var(--color-foreground)",
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-help rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-violet)] md:px-4 md:py-2 md:text-sm"
            >
              <span className="inline-flex items-center">
                {n.multi ? <MultiDots color={cfg.color} /> : null}
                {n.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 min-h-[2.5rem] text-center text-sm leading-relaxed">
        {current ? (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="font-medium"
              style={{ color: toneConfig[current.tone].color }}
            >
              {current.label}
            </span>
            <span className="text-[var(--color-muted-foreground)]">
              {" · "}
              {current.desc}
            </span>
          </motion.div>
        ) : (
          <div className="text-[var(--color-muted-foreground)]">
            Hold musen over en node for at læse hvad den gør.
          </div>
        )}
      </div>
    </>
  );
}
