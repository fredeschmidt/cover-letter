"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { pair } from "@/lib/motion";

type Props = HTMLMotionProps<"section"> & {
  eyebrow?: string;
  title?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  variant?: "section" | "chapter";
  chapterNumber?: number;
  isLastChapter?: boolean;
};

export function Section({
  eyebrow,
  title,
  intro,
  children,
  className,
  variant = "section",
  chapterNumber,
  isLastChapter = false,
  ...props
}: Props) {
  if (variant === "chapter") {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={pair}
        className={cn(
          "scroll-mt-24",
          isLastChapter ? "pb-2" : "pb-12 md:pb-16",
          className,
        )}
        {...props}
      >
        {eyebrow ? (
          <div className="mb-1.5 flex items-baseline gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-lilla)]">
            {chapterNumber != null ? (
              <span className="display text-base font-bold leading-none tracking-normal text-[var(--color-lilla)]">
                {chapterNumber}
              </span>
            ) : null}
            <span>{eyebrow}</span>
          </div>
        ) : null}
        {title ? (
          <h3 className="display mb-3 text-balance text-xl leading-[1.2] md:text-2xl">
            {title}
          </h3>
        ) : null}
        {intro ? (
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-foreground)] md:text-[0.95rem]">
            {intro}
          </p>
        ) : null}
        {children}
      </motion.section>
    );
  }

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
        <div className="mb-3 text-xs font-medium text-[var(--color-lilla)]">
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
