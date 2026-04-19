"use client";

import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/profile";

export function Projects() {
  return (
    <Section
      id="projekter"
      eyebrow="Projekter"
      title="Ting jeg har bygget — og hvordan."
    >
      <div className="space-y-10 md:space-y-14">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
