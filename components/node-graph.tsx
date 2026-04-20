"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { pair } from "@/lib/motion";

export type NodeTone = "lilla" | "lime" | "pink" | "orange";

export type Node = {
  id: string;
  label: string;
  desc: string;
  x: number;
  y: number;
  tone: NodeTone;
  multi?: boolean;
  wide?: boolean;
};

export type Edge = {
  from: string;
  to: string;
  tone: "lilla" | "lime" | "pink" | "orange";
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
  lilla: {
    color: "var(--color-lilla)",
    raw: "#8a7eef",
    bg: "var(--color-lilla-soft)",
    border: "color-mix(in oklab, var(--color-lilla) 60%, transparent)",
    glow: "0 0 22px rgba(138, 126, 239, 0.55)",
  },
  lime: {
    color: "var(--color-lime)",
    raw: "#7fb81b",
    bg: "var(--color-lime-soft)",
    border: "color-mix(in oklab, var(--color-lime) 60%, transparent)",
    glow: "0 0 22px rgba(127, 184, 27, 0.45)",
  },
  pink: {
    color: "var(--color-pink)",
    raw: "#d66ce8",
    bg: "var(--color-pink-soft)",
    border: "color-mix(in oklab, var(--color-pink) 60%, transparent)",
    glow: "0 0 22px rgba(214, 108, 232, 0.55)",
  },
  orange: {
    color: "var(--color-orange)",
    raw: "#e88535",
    bg: "var(--color-orange-soft)",
    border: "color-mix(in oklab, var(--color-orange) 60%, transparent)",
    glow: "0 0 22px rgba(232, 133, 53, 0.55)",
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
  compact = false,
  topSpacing,
}: {
  nodes: readonly Node[];
  edges: readonly Edge[];
  idPrefix: string;
  compact?: boolean;
  topSpacing?: string;
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
      <div
        className={
          compact
            ? `relative ${topSpacing ?? "mt-14 md:mt-20"} aspect-[2.2/1] w-full`
            : "relative mt-8 aspect-[2/1] w-full md:mt-12"
        }
      >
        <svg
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <marker
              id={`${idPrefix}-arrow-lilla`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={toneConfig.lilla.raw} />
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
            <marker
              id={`${idPrefix}-arrow-pink`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={toneConfig.pink.raw} />
            </marker>
            <marker
              id={`${idPrefix}-arrow-orange`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={toneConfig.orange.raw} />
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
                color: "var(--color-foreground)",
              }}
              className={
                compact
                  ? `absolute ${n.wide ? "max-w-[140px]" : "max-w-[82px]"} -translate-x-1/2 -translate-y-1/2 cursor-help whitespace-pre-line break-words rounded-[1.1rem] md:whitespace-nowrap border px-1.5 py-0.5 text-center text-[9px] font-medium leading-[1.15] backdrop-blur-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)] md:max-w-[480px]! md:rounded-full md:px-3 md:py-1.5 md:text-xs md:leading-none`
                  : `absolute ${n.wide ? "max-w-[130px]" : "max-w-[96px]"} -translate-x-1/2 -translate-y-1/2 cursor-help whitespace-pre-line break-words rounded-[1.1rem] md:whitespace-nowrap border px-2 py-0.5 text-center text-[10px] font-medium leading-[1.15] backdrop-blur-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)] md:max-w-[480px]! md:rounded-full md:px-4 md:py-2 md:text-sm md:leading-none`
              }
            >
              {n.multi ? <MultiDots color={cfg.color} /> : null}
              {n.label}
            </motion.button>
          );
        })}
      </div>

      <div
        className={
          compact
            ? "mt-4 min-h-[2rem] text-center text-xs leading-relaxed"
            : "mt-6 min-h-[2.5rem] text-center text-sm leading-relaxed"
        }
      >
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
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-lilla)_30%,transparent)] bg-[color-mix(in_oklab,var(--color-lilla)_6%,transparent)] px-3 py-1.5 text-[var(--color-foreground)]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-3.5 w-3.5 shrink-0 text-[var(--color-lilla)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4 L12 20 L14 13 L21 11 Z" />
            </svg>
            <span className="font-medium">
              <span className="md:hidden">Tryk på en node for at læse hvad den gør</span>
              <span className="hidden md:inline">Hold musen over en node for at læse hvad den gør</span>
            </span>
          </div>
        )}
      </div>
    </>
  );
}
