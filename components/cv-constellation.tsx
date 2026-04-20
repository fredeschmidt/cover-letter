"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { DomainIcon } from "@/components/illustrations";
import { roles, education, type RoleNode } from "@/lib/profile";
import { pair } from "@/lib/motion";

const domainLabel: Record<string, string> = {
  frontend: "Frontend",
  ai: "AI",
  leadership: "Ledelse",
  product: "Produkt",
};

const domainColor: Record<string, string> = {
  frontend: "#8a7eef",
  ai: "#7fb81b",
  leadership: "#e88535",
  product: "#d66ce8",
};

function isCurrent(r: RoleNode) {
  return r.period.toLowerCase().includes("nu") || r.period === "2026";
}

function RoleItem({ role, index }: { role: RoleNode; index: number }) {
  const primary = role.domains[0];
  const color = domainColor[primary];
  const current = isCurrent(role);

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...pair, delay: index * 0.05 }}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <span
        className="absolute left-[10px] top-[10px] z-10 h-3 w-3 -translate-x-1/2 rounded-full"
        style={{
          background: color,
          boxShadow: current ? `0 0 12px ${color}` : "none",
        }}
      />

      <div
        className="rounded-lg border bg-[var(--color-card)] p-3"
        style={{
          borderColor: `color-mix(in oklab, ${color} 35%, transparent)`,
          borderLeftWidth: "2px",
          borderLeftColor: current ? color : `color-mix(in oklab, ${color} 45%, transparent)`,
        }}
      >
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ color: current ? color : "var(--color-muted-foreground)" }}
            >
              {role.period}
            </span>
            {current ? (
              <span
                className="inline-block h-1 w-1 rounded-full"
                style={{
                  background: color,
                  boxShadow: `0 0 6px ${color}`,
                }}
              />
            ) : null}
          </div>
          <div className="flex flex-wrap gap-1">
            {role.domains.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-medium"
                style={{
                  borderColor: `color-mix(in oklab, ${domainColor[d]} 55%, transparent)`,
                  background: `color-mix(in oklab, ${domainColor[d]} 35%, transparent)`,
                  color: "var(--color-foreground)",
                }}
              >
                <DomainIcon domain={d} className="h-2.5 w-2.5" />
                {domainLabel[d]}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-semibold">{role.title}</span>
          <span className="text-xs text-[var(--color-muted-foreground)]">
            · {role.company}
          </span>
        </div>
        <div className="mt-1 space-y-2 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
          {role.highlight.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </motion.li>
  );
}

export function CvConstellation() {
  const nowRoles = roles.filter(isCurrent);
  const pastRoles = roles.filter((r) => !isCurrent(r));

  return (
    <Section
      id="cv"
      eyebrow="CV"
      title="Min vej hertil."
      intro="Snart 10 år som frontend-udvikler. Undervejs blevet teknisk projektleder for et frontend-team, og sidste år dykket dybt ned i AI og agent-workflows."
    >
      {/* Now section */}
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-lime)]">
          <span className="dot-pulse inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-lime)]" />
          Nu
        </div>
        <ol className="relative space-y-2 before:absolute before:left-[10px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-[var(--color-lime)]/40 before:to-[var(--color-lilla)]/20">
          {nowRoles.map((r, i) => (
            <RoleItem key={r.id} role={r} index={i} />
          ))}
        </ol>
      </div>

      {/* Past section */}
      <div>
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
          Tidligere
        </div>
        <ol className="relative space-y-2 before:absolute before:left-[10px] before:top-2 before:bottom-2 before:w-px before:bg-[var(--color-border)]">
          {pastRoles.map((r, i) => (
            <RoleItem key={r.id} role={r} index={i} />
          ))}
        </ol>
      </div>

      {/* Education */}
      <div className="mt-10">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
          Uddannelse
        </div>
        <ol className="relative space-y-2 before:absolute before:left-[10px] before:top-2 before:bottom-2 before:w-px before:bg-[var(--color-border)]">
          {education.map((e, i) => {
            const color = domainColor.frontend;
            return (
              <motion.li
                key={e.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...pair, delay: i * 0.05 }}
                className="relative pl-10"
              >
                <span
                  className="absolute left-[10px] top-[10px] z-10 h-3 w-3 -translate-x-1/2 rounded-full"
                  style={{
                    background: color,
                  }}
                />

                <div
                  className="rounded-lg border bg-[var(--color-card)] p-3"
                  style={{
                    borderColor: `color-mix(in oklab, ${color} 35%, transparent)`,
                    borderLeftWidth: "2px",
                    borderLeftColor: `color-mix(in oklab, ${color} 45%, transparent)`,
                  }}
                >
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                      {e.period}
                    </span>
                  </div>
                  <div className="font-semibold">{e.title}</div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
