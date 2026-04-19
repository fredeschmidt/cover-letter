"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { pair } from "@/lib/motion";

type Props = HTMLMotionProps<"section"> & {
  eyebrow?: string;
  title?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
};

export function Section({
  eyebrow,
  title,
  intro,
  children,
  className,
  ...props
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={pair}
      className={cn("mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-16 md:py-24", className)}
      {...props}
    >
      {eyebrow ? (
        <div className="mb-3 text-xs font-medium text-[var(--color-violet)]">
          {eyebrow}
        </div>
      ) : null}
      {title ? (
        <h2 className="display mb-4 text-balance text-2xl leading-[1.15] md:text-4xl">
          {title}
        </h2>
      ) : null}
      {intro ? (
        <p className="mb-10 max-w-2xl leading-relaxed text-[var(--color-muted-foreground)]">
          {intro}
        </p>
      ) : null}
      {children}
    </motion.section>
  );
}
