"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { pair } from "@/lib/motion";

type Tone = "lime" | "lilla" | "muted";
type IconKind = "spark" | "doc" | "star" | "card" | "dot";

type Stage = {
  id: string;
  label: string;
  sub: string;
  tone: Tone;
  icon: IconKind;
  active?: boolean;
};

const stages: readonly Stage[] = [
  { id: "idea", label: "Idé", sub: "en tanke, en drøm", tone: "lime", icon: "spark" },
  { id: "context", label: "Kontekst", sub: "alt jeg ved", tone: "lime", icon: "doc" },
  { id: "ai", label: "AI", sub: "former det", tone: "lilla", icon: "star" },
  {
    id: "start",
    label: "Udgangs\u00ADpunkt",
    sub: "første udkast",
    tone: "lilla",
    icon: "card",
    active: true,
  },
  { id: "product", label: "Produkt", sub: "bygger videre", tone: "muted", icon: "dot" },
];

const toneColor: Record<Tone, string> = {
  lime: "var(--color-lime)",
  lilla: "var(--color-lilla)",
  muted: "color-mix(in oklab, var(--color-foreground) 35%, transparent)",
};

const toneBg: Record<Tone, string> = {
  lime: "color-mix(in oklab, var(--color-lime) 18%, var(--color-background))",
  lilla: "color-mix(in oklab, var(--color-lilla) 18%, var(--color-background))",
  muted: "var(--color-background)",
};

const toneBorder: Record<Tone, string> = {
  lime: "color-mix(in oklab, var(--color-lime) 45%, transparent)",
  lilla: "color-mix(in oklab, var(--color-lilla) 45%, transparent)",
  muted: "color-mix(in oklab, var(--color-foreground) 25%, transparent)",
};

function StageIcon({ kind }: { kind: IconKind }) {
  if (kind === "spark") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4.9 1 .9 1.6V17h5.2v-1.5c0-.6.3-1.2.9-1.6A6 6 0 0 0 12 3Z" />
      </svg>
    );
  }
  if (kind === "doc") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 4h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
        <path d="M14 4v4h4" />
        <path d="M9 13h6" />
        <path d="M9 16.5h6" />
      </svg>
    );
  }
  if (kind === "star") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
        <path d="M12 3 L14.2 9.8 L21 12 L14.2 14.2 L12 21 L9.8 14.2 L3 12 L9.8 9.8 Z" />
      </svg>
    );
  }
  if (kind === "card") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 10h8" />
        <path d="M8 13.5h6" />
        <path d="M8 17h4" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeDasharray="2 3"
    >
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

export function HowIThink() {
  return (
    <Section
      id="tænker"
      variant="chapter"
      chapterNumber={1}
      eyebrow="Sådan tænker jeg"
      title="Det er kun fantasien der sætter grænser nu."
      intro={
        <>
          Jeg skal ikke bruge en færdig idé for at komme i gang. Bare en
          retning — en frustration, en tanke, en drøm. Så giver jeg AI&rsquo;en
          al den <strong className="font-semibold text-[var(--color-foreground)]">kontekst</strong>{" "}
          jeg har, og på få minutter har jeg det første udgangspunkt at
          arbejde ud fra.
        </>
      }
    >
      <div className="relative mt-10 md:mt-14">
        {/* Path line — lime fading into lilla, stops at Udgangspunkt center */}
        <div
          aria-hidden
          className="absolute h-[1.5px]"
          style={{ top: "22px", left: "10%", right: "30%" }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.15, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="h-full bg-gradient-to-r from-[color-mix(in_oklab,var(--color-lime)_60%,transparent)] to-[var(--color-lilla)]"
          />
        </div>

        {/* Dashed continuation: Udgangspunkt → Produkt (future) */}
        <div
          aria-hidden
          className="absolute h-[2px]"
          style={{
            top: "21px",
            left: "70%",
            right: "10%",
            backgroundImage:
              "repeating-linear-gradient(to right, color-mix(in oklab, var(--color-foreground) 25%, transparent) 0 3px, transparent 3px 7px)",
          }}
        />

        <div className="relative grid grid-cols-5 gap-1 md:gap-2">
          {stages.map((stage, i) => {
            const color = toneColor[stage.tone];
            const bg = toneBg[stage.tone];
            const border = toneBorder[stage.tone];
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: -4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...pair, delay: 0.3 + i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-3">
                  {stage.active ? (
                    <motion.span
                      aria-hidden
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: color }}
                    />
                  ) : null}
                  <div
                    className="relative grid h-11 w-11 place-items-center rounded-full border"
                    style={{
                      background: stage.active ? color : bg,
                      borderColor: stage.active ? color : border,
                      color: stage.active ? "var(--color-background)" : color,
                      boxShadow: stage.active
                        ? "0 0 20px rgba(138, 126, 239, 0.55)"
                        : "none",
                    }}
                  >
                    <div className="h-5 w-5">
                      <StageIcon kind={stage.icon} />
                    </div>
                  </div>
                </div>
                <div
                  className="break-words text-[9px] font-bold uppercase leading-tight tracking-[0.06em] md:text-[11px] md:tracking-[0.16em]"
                  style={{
                    color:
                      stage.tone === "muted"
                        ? "var(--color-muted-foreground)"
                        : color,
                  }}
                >
                  {stage.label}
                </div>
                <div className="mt-1 text-[10px] leading-tight text-[var(--color-muted-foreground)] md:text-xs">
                  {stage.sub}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
