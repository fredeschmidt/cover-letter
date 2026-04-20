"use client";

import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/profile";

export function Projects() {
  return (
    <Section id="projekter">
      <h2 className="display mb-10 text-balance text-3xl leading-[1.1] md:text-5xl">
        Projekter
      </h2>
      <div className="space-y-10 md:space-y-14">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
