"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { pair } from "@/lib/motion";

type Step = {
  role: "me" | "claude";
  label: string;
  avatar: React.ReactNode;
  body: React.ReactNode;
  align: "start" | "end";
};

function SparkAvatar() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4.9 1 .9 1.6V17h5.2v-1.5c0-.6.3-1.2.9-1.6A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

function MeAvatar() {
  return (
    <span className="text-[11px] font-bold leading-none">FS</span>
  );
}

function ClaudeAvatar() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
      <path
        d="M12 3 L14.2 9.8 L21 12 L14.2 14.2 L12 21 L9.8 14.2 L3 12 L9.8 9.8 Z"
        fill="currentColor"
      />
    </svg>
  );
}

const idea = {
  label: "Min idé",
  body: (
    <>
      Jeg har flere gange måttet hjælpe venner og familie med at få et
      overblik over deres økonomi — det burde der findes nogle mere
      intuitive værktøjer til.
    </>
  ),
};

const chatSteps: Step[] = [
  {
    role: "me",
    label: "Mig",
    avatar: <MeAvatar />,
    body: (
      <>
        Hjælp med at udtænke en plan for at bygge et projekt, der skal gøre
        det nemt at opsætte budgetter. Jeg vil gerne bygge en platform,
        Monimo, som skal hjælpe unge voksne med at få overblik over deres
        økonomi. Hele konceptet er at det skal være SUPER nemt at starte sit
        budget og holde overblikket, som skal resultere i at brugerne kan få
        ro i maven over deres økonomi…
      </>
    ),
    align: "end",
  },
  {
    role: "claude",
    label: "Claude",
    avatar: <ClaudeAvatar />,
    body: (
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-violet)]">
          Første bud på en plan
        </div>
        <ul className="space-y-1.5 text-sm text-white/80">
          <li className="flex gap-2.5">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[var(--color-violet)]" />
            <span>
              <strong className="font-semibold text-white">
                Overskud på ét blik
              </strong>{" "}
              — bruger indtaster sin løn og ser månedens overskud straks,
              så gevinsten mærkes før arbejdet begynder
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[var(--color-violet)]" />
            <span>
              <strong className="font-semibold text-white">
                Forslag frem for tomt regneark
              </strong>{" "}
              — hver kategori foreslår typiske udgifter brugeren kan tilføje
              eller skippe, så ingen starter fra nul
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[var(--color-violet)]" />
            <span>
              <strong className="font-semibold text-white">
                Læringskort i bidder
              </strong>{" "}
              — korte moduler om skat, opsparing og automatisering, alene
              eller sammen, uden panik og uden jargon
            </span>
          </li>
        </ul>
      </div>
    ),
    align: "start",
  },
];

const roleStyles: Record<
  Step["role"],
  { dot: string; label: string; bubble: string; avatar: string }
> = {
  me: {
    dot: "bg-[var(--color-lime)]",
    label: "text-[var(--color-lime)]",
    bubble:
      "bg-[color-mix(in_oklab,var(--color-lime)_8%,var(--color-card))] border border-[color-mix(in_oklab,var(--color-lime)_25%,transparent)]",
    avatar:
      "bg-[color-mix(in_oklab,var(--color-lime)_20%,transparent)] text-[var(--color-lime)]",
  },
  claude: {
    dot: "bg-[var(--color-violet)]",
    label: "text-[var(--color-violet)]",
    bubble:
      "bg-[color-mix(in_oklab,var(--color-violet)_8%,var(--color-card))] border border-[color-mix(in_oklab,var(--color-violet)_25%,transparent)]",
    avatar:
      "bg-[color-mix(in_oklab,var(--color-violet)_22%,transparent)] text-[var(--color-violet)]",
  },
};

function TypingDots({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1 w-1 rounded-full"
          style={{ background: color }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            duration: 1.2,
            delay: i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

export function HowIThink() {
  return (
    <Section
      id="tænker"
      eyebrow="01 · Sådan tænker jeg"
      title="Det er kun fantasien der sætter grænser nu."
      intro={
        <>
          Jeg skal ikke bruge en færdig idé for at komme i gang. Bare en
          retning — en frustration, en tanke, en drøm. Så giver jeg AI&rsquo;en
          al den <strong className="font-semibold text-white">kontekst</strong>{" "}
          jeg har, og på få minutter har jeg det første udgangspunkt at
          arbejde ud fra.
        </>
      }
    >
      {/* Idea — inner thought, no bubble frame. Visually distinct from chat. */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={pair}
        className="relative mx-auto max-w-xl px-2 md:px-0"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,184,58,0.18), transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        <div className="flex items-start gap-4 md:gap-5">
          <div
            className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-amber)_18%,transparent)] text-[var(--color-amber)]"
            style={{
              boxShadow:
                "0 0 28px rgba(255,184,58,0.35), inset 0 0 0 1px rgba(255,184,58,0.22)",
            }}
          >
            <div className="h-6 w-6">
              <SparkAvatar />
            </div>
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-amber)]">
              {idea.label}
            </div>
            <p className="text-lg italic leading-snug text-white/90 md:text-xl">
              {idea.body}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Thought trail — descending amber circles signal inner thought becoming conversation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ...pair, delay: 0.2 }}
        className="my-8 flex flex-col items-center gap-1.5"
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-[color-mix(in_oklab,var(--color-amber)_55%,transparent)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[color-mix(in_oklab,var(--color-amber)_35%,transparent)]" />
        <span className="h-1 w-1 rounded-full bg-[color-mix(in_oklab,var(--color-amber)_20%,transparent)]" />
      </motion.div>

      {/* Chat — Mig ↔ Claude, a real exchange between two parties */}
      <div className="space-y-2">
        {chatSteps.map((step, i) => {
          const styles = roleStyles[step.role];
          const isEnd = step.align === "end";
          const isLast = i === chatSteps.length - 1;
          return (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...pair, delay: i * 0.22 }}
                className={`flex items-end gap-2.5 ${isEnd ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${styles.avatar}`}
                  aria-hidden
                >
                  <div className="grid h-4 w-4 place-items-center">
                    {step.avatar}
                  </div>
                </div>

                <div
                  className={`relative max-w-[82%] rounded-2xl px-4 py-3 md:max-w-[70%] ${styles.bubble}`}
                  style={{
                    borderTopLeftRadius: isEnd ? "1rem" : "0.35rem",
                    borderTopRightRadius: isEnd ? "0.35rem" : "1rem",
                  }}
                >
                  <div
                    className={`mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${styles.label}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                    {step.label}
                  </div>
                  <div className="text-sm leading-relaxed">{step.body}</div>
                </div>
              </motion.div>

              {!isLast ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...pair, delay: i * 0.22 + 0.15 }}
                  className={`mt-1 flex ${isEnd ? "justify-end pr-[22px]" : "justify-start pl-[22px]"}`}
                >
                  <div className="flex h-6 w-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--color-violet)_12%,transparent)]">
                    <TypingDots color="var(--color-violet)" />
                  </div>
                </motion.div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Journey visualization — shows where "udgangspunkt" sits on the path */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ ...pair, delay: 0.7 }}
        className="mt-16 px-2 md:px-4"
      >
        <div className="relative">
          {/* Path line */}
          <div className="absolute left-[12px] top-[14px] right-[12px] h-[1px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="h-full bg-gradient-to-r from-[color-mix(in_oklab,var(--color-lime)_50%,transparent)] via-[var(--color-violet)] to-[color-mix(in_oklab,var(--color-foreground)_15%,transparent)]"
            />
          </div>

          {/* Dashes after the marker */}
          <div
            className="absolute top-[13px] h-[2px]"
            style={{
              left: "calc(50% + 14px)",
              right: "12px",
              backgroundImage:
                "repeating-linear-gradient(to right, color-mix(in oklab, var(--color-foreground) 25%, transparent) 0 3px, transparent 3px 7px)",
            }}
          />

          {/* Three markers */}
          <div className="relative grid grid-cols-3 gap-2">
            {/* Idé (done) */}
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...pair, delay: 0.5 }}
              className="flex flex-col items-start"
            >
              <div className="mb-4 flex h-6 w-6 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--color-lime)_50%,transparent)] bg-[color-mix(in_oklab,var(--color-lime)_15%,transparent)]">
                <svg
                  viewBox="0 0 12 12"
                  className="h-3 w-3"
                  fill="none"
                  stroke="var(--color-lime)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 6 L5 9 L10 3" />
                </svg>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-lime)]">
                Idé
              </div>
              <div className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                Abstrakt, rå, uspoleret.
              </div>
            </motion.div>

            {/* Udgangspunkt — current */}
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...pair, delay: 0.75 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-4">
                <motion.span
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full bg-[var(--color-violet)]"
                />
                <span
                  className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-violet)]"
                  style={{
                    boxShadow: "0 0 20px rgba(138, 114, 255, 0.6)",
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-violet)]">
                Nu er vi her
              </div>
              <div className="mt-1 text-sm font-semibold text-[var(--color-foreground)]">
                Udgangspunkt
              </div>
              <div className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
                Et første bud vi kan skærpe, skrotte eller skære fra.
              </div>
            </motion.div>

            {/* Produkt (future) */}
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...pair, delay: 1 }}
              className="flex flex-col items-end text-right"
            >
              <div className="mb-4 flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-[color-mix(in_oklab,var(--color-foreground)_25%,transparent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color-mix(in_oklab,var(--color-foreground)_30%,transparent)]" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                Produkt
              </div>
              <div className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                Derfra bygger vi videre sammen.
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
