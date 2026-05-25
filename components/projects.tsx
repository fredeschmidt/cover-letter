"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/profile";
import { pair } from "@/lib/motion";

export function Projects() {
  return (
    <motion.section
      id="projekter"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={pair}
      className="scroll-mt-24 pt-10 pb-2 md:pt-14"
    >
      <h3 className="display mb-6 text-balance text-xl leading-[1.2] md:text-2xl">
        AI-projekter
      </h3>
      <div className="space-y-10 md:space-y-14">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
