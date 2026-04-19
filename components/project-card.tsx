"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MonimoPreview } from "@/components/monimo-preview";
import { JobsoegningPreview } from "@/components/jobsoegning-preview";
import { pair } from "@/lib/motion";
import type { Project } from "@/lib/profile";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...pair, delay: index * 0.08 }}
      className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)]"
    >
      <div className="flex items-center gap-4 p-5 md:gap-5 md:p-6">
        <div className="flex-1">
          <h3 className="text-lg font-medium md:text-xl">{project.title}</h3>
          <p className="mt-0.5 text-sm text-[var(--color-muted-foreground)]">
            {project.tagline}
          </p>
        </div>
      </div>

      <div className="space-y-6 border-t border-[var(--color-border)] px-4 pt-5 pb-5 md:px-5 md:pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.status}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Badge key={s} className="text-[10px]">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        {project.slug === "monimo" ? <MonimoPreview /> : null}
        {project.slug === "jobsoegningsapp" ? <JobsoegningPreview /> : null}

        <div>
          <div className="mb-1.5 text-xs text-[var(--color-violet)]">Problem</div>
          <p className="leading-relaxed">{project.problem}</p>
        </div>

        <div>
          <div className="mb-2 text-xs text-[var(--color-violet)]">
            Sådan byggede jeg det
          </div>
          <ol className="space-y-1.5 text-sm">
            {project.process.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...pair, delay: i * 0.05 }}
                className="flex gap-3 text-[var(--color-muted-foreground)]"
              >
                <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-[var(--color-violet)]" />
                <span className="leading-relaxed">{step}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </motion.article>
  );
}
