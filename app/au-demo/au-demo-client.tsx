"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  demoToday,
  draftApplications,
  journeyPhases,
  phaseActivities,
  phaseSteps,
  savedPrograms,
  type DraftApplication,
  type JourneyPhaseId,
  type PhaseActivity,
  type PhaseStep,
  type SavedProgram,
} from "./data";

function daysUntil(targetISO: string, fromISO: string): number {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const from = new Date(fromISO + "T00:00:00").getTime();
  const target = new Date(targetISO + "T00:00:00").getTime();
  return Math.round((target - from) / MS_PER_DAY);
}

// Scoped palette: neutral light surface + blue brand. Inlined so it covers the
// portfolio's aurora and overrides shared CSS variables only for this page.
const auDemoTheme = {
  "--color-background": "#f5f7fb",
  "--color-foreground": "#0b1220",
  "--color-card": "#ffffff",
  "--color-card-foreground": "#0b1220",
  "--color-muted": "#eef1f6",
  "--color-muted-foreground": "#5b6573",
  "--color-border": "rgba(15, 23, 42, 0.08)",
  "--color-lilla": "#2563eb",
  "--color-lilla-dim": "#1d4ed8",
  "--color-lilla-soft": "rgba(37, 99, 235, 0.10)",
  "--color-done-dim": "#475569",
  "--color-done-soft": "rgba(100, 116, 139, 0.14)",
} as CSSProperties;

export function AuDemoClient() {
  const [activePhase, setActivePhase] = useState<JourneyPhaseId>("interested");

  const activeIndex = journeyPhases.findIndex((p) => p.id === activePhase);
  const steps = phaseSteps.filter((s) => s.phaseId === activePhase);
  const programs = savedPrograms.filter((p) => p.phaseId === activePhase);
  const activities = phaseActivities.filter((a) => a.phaseId === activePhase);
  const drafts = draftApplications.filter((d) => d.phaseId === activePhase);

  return (
    <div style={auDemoTheme}>
      {/* Solid surface that hides the portfolio aurora behind this page.
          Inline position wins specificity over the global body-child rule. */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--color-background)",
        }}
      />
      <main className="relative mx-auto w-full max-w-5xl px-5 pb-24 pt-10 md:px-6 md:pt-14">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Tilbage til portfolio
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] lg:gap-16">
          <div>
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] md:p-5">
              <PhaseSideNav
                active={activePhase}
                activeIndex={activeIndex}
                onChange={setActivePhase}
                steps={steps}
              />
            </div>
          </div>

          <div>
            <header className="mb-6 md:mb-8">
              <h1 className="display text-balance text-2xl leading-[1.1] md:text-3xl">
                Velkommen tilbage, Astrid
              </h1>
            </header>

            {/* space-y styrer luft *mellem* sektioner, mens header.mb styrer
                gabet til første sektion — så toppen ikke bliver tom uden hero. */}
            <div className="space-y-10 md:space-y-14">
              {programs.length > 0 ? <SavedProgramsList programs={programs} /> : null}
              {drafts.length > 0 ? <DraftApplicationsList drafts={drafts} /> : null}
              {activities.length > 0 ? <ActivitiesList activities={activities} /> : null}
            </div>
          </div>
        </div>

        <footer className="mt-16 border-t border-[var(--color-border)] pt-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            Om demoen
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            En afgrænset UX-/frontend-case. Ikke et redesign, men et eksempel på
            hvordan en samlet studieportal kan binde rejsen fra interesse til
            studieliv sammen.
          </p>
        </footer>
      </main>
    </div>
  );
}

/* -------------------- Phase side-nav -------------------- */

function PhaseSideNav({
  active,
  activeIndex,
  onChange,
  steps,
}: {
  active: JourneyPhaseId;
  activeIndex: number;
  onChange: (id: JourneyPhaseId) => void;
  steps: PhaseStep[];
}) {
  return (
    <nav aria-label="Fase i AU-rejsen">
      <ol className="flex flex-col gap-1">
        {journeyPhases.map((phase, i) => {
          const isActive = phase.id === active;
          const isPast = i < activeIndex;
          const hasStepsPanel = isActive && steps.length > 0;
          const panelId = `au-demo-phase-${phase.id}-steps`;
          return (
            <li key={phase.id}>
              <div
                className={cn(
                  "rounded-xl",
                  // Én bg-container for både fase-knap og substeps, så de to elementer
                  // ikke producerer en synlig sub-pixel-grænse mellem ens translucent baggrunde.
                  hasStepsPanel ? "bg-[var(--color-lilla-soft)]" : "",
                )}
              >
                <button
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  aria-expanded={isActive}
                  aria-controls={hasStepsPanel ? panelId : undefined}
                  onClick={() => onChange(phase.id)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]",
                    isActive && !hasStepsPanel ? "bg-[var(--color-lilla-soft)]" : "",
                    !isActive ? "hover:bg-[var(--color-muted)]" : "",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums transition-colors",
                      isActive
                        ? "border-[var(--color-lilla)] bg-[var(--color-lilla)] text-white"
                        : isPast
                        ? "border-[var(--color-lilla)] bg-[var(--color-muted)] text-[var(--color-lilla-dim)]"
                        : "border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-muted-foreground)] group-hover:border-[var(--color-lilla)]/60",
                    )}
                  >
                    {isPast ? (
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors md:text-[15px]",
                      isActive
                        ? "text-[var(--color-foreground)]"
                        : "text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]",
                    )}
                  >
                    {phase.shortLabel}
                  </span>
                </button>

                {hasStepsPanel ? (
                  <div id={panelId} className="pb-3">
                    <StepsList steps={steps} />
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StepsList({ steps }: { steps: PhaseStep[] }) {
  return (
    <ul className="mt-1 space-y-0.5">
      {steps.map((step) => {
        const isCurrent = step.status === "current";
        const isDone = step.status === "done";
        return (
          <li key={step.title}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-current={isCurrent ? "page" : undefined}
              className="group flex items-start gap-2.5 rounded-lg px-3 py-1.5 transition-colors hover:bg-[var(--color-card)]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
            >
              <span
                className="mt-[3px] inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center"
                aria-hidden
              >
                {isDone ? (
                  <Check
                    className="h-3.5 w-3.5 text-[var(--color-lilla)]/70"
                    strokeWidth={3}
                  />
                ) : isCurrent ? (
                  <span className="h-2 w-2 rounded-full bg-[var(--color-lilla)] ring-2 ring-[var(--color-lilla)]/25" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-muted-foreground)]/40 transition-colors group-hover:bg-[var(--color-lilla)]" />
                )}
              </span>
              <span
                className={cn(
                  "text-sm leading-snug transition-colors",
                  isCurrent && "font-medium text-[var(--color-foreground)]",
                  isDone && "text-[var(--color-muted-foreground)]/60 line-through decoration-[var(--color-muted-foreground)]/30",
                  !isCurrent &&
                    !isDone &&
                    "text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]",
                )}
              >
                {step.title}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/* -------------------- Gemte uddannelser -------------------- */

function SavedProgramsList({ programs }: { programs: SavedProgram[] }) {
  return (
    <section>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
        Dine gemte uddannelser
      </h3>
      <ul className="grid gap-2">
        {programs.map((program) => (
          <li key={program.title}>
            <SavedProgramRow program={program} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function SavedProgramRow({ program }: { program: SavedProgram }) {
  // Urgent rækker viser countdown ("23 dage · 15. marts") som primært signal,
  // så urgensen bæres af information frem for farve. Falder tilbage til den
  // rå deadline-streng for ikke-urgente eller når deadlineDate mangler.
  const countdownDays =
    program.isUrgent && program.deadlineDate
      ? daysUntil(program.deadlineDate, demoToday)
      : undefined;
  const deadlineDisplay =
    countdownDays !== undefined && countdownDays >= 0
      ? `${countdownDays === 0 ? "I dag" : `${countdownDays} dage`} · ${program.deadline.replace(/^Frist\s+/i, "")}`
      : program.deadline;
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={
        program.isUrgent
          ? `${program.title} — ${deadlineDisplay}, frist nærmer sig`
          : `${program.title} — ${deadlineDisplay}`
      }
      className={cn(
        "group flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 transition-colors hover:border-[var(--color-lilla)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]",
        program.isUrgent && "border-l-2 border-l-[var(--color-lilla)]",
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {program.isUrgent ? (
            <span
              aria-hidden
              className="relative inline-flex h-1.5 w-1.5 shrink-0"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-lilla)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-lilla)]" />
            </span>
          ) : null}
          <span className="min-w-0 truncate text-sm font-medium text-[var(--color-foreground)]">
            {program.title}
          </span>
        </div>
        <div
          className={cn(
            "truncate text-xs tabular-nums",
            program.isUrgent
              ? "font-medium text-[var(--color-lilla-dim)]"
              : "text-[var(--color-muted-foreground)]",
          )}
        >
          {deadlineDisplay}
        </div>
      </div>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
    </a>
  );
}

/* -------------------- Forberedte ansøgninger -------------------- */

function DraftApplicationsList({ drafts }: { drafts: DraftApplication[] }) {
  return (
    <section>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
        Forberedte ansøgninger
      </h3>
      <ul className="grid gap-2">
        {drafts.map((draft) => (
          <li key={draft.programTitle}>
            <DraftApplicationRow draft={draft} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function DraftApplicationRow({ draft }: { draft: DraftApplication }) {
  // Cirkulær progress-ring: r=12 i 28x28 viewBox. Den fulde omkreds bruges som
  // strokeDasharray, og dashoffset trækkes proportionalt med progress så ringen
  // fyldes med uret. -rotate-90 flytter startpunktet fra 3 til 12.
  const ringCircumference = 2 * Math.PI * 12;
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={`Fortsæt motiveret ansøgning til ${draft.programTitle} (${draft.progress}% udfyldt)`}
      className="group flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 pr-4 transition-colors hover:border-[var(--color-lilla)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
    >
      <span
        className="relative flex h-9 w-9 shrink-0 items-center justify-center"
        aria-hidden
      >
        <svg viewBox="0 0 28 28" className="h-7 w-7 -rotate-90">
          <circle
            cx="14"
            cy="14"
            r="12"
            fill="none"
            stroke="var(--color-muted)"
            strokeWidth="2.5"
          />
          <circle
            cx="14"
            cy="14"
            r="12"
            fill="none"
            stroke="var(--color-lilla)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={ringCircumference}
            strokeDashoffset={ringCircumference * (1 - draft.progress / 100)}
            className="transition-[stroke-dashoffset]"
          />
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-[var(--color-foreground)]">
          {draft.programTitle}
        </div>
        <div className="truncate text-xs text-[var(--color-muted-foreground)]">
          {draft.description}
        </div>
      </div>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
    </a>
  );
}

/* -------------------- Tilmeldinger & muligheder -------------------- */

function ActivitiesList({ activities }: { activities: PhaseActivity[] }) {
  return (
    <section>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
        Tilmeldinger og muligheder
      </h3>
      <ul className="grid gap-2 sm:grid-cols-2">
        {activities.map((activity) => (
          <li key={activity.title}>
            <ActivityRow activity={activity} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ActivityRow({ activity }: { activity: PhaseActivity }) {
  const isDone = activity.status === "done";
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="group flex h-full items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 pr-4 transition-colors hover:border-[var(--color-lilla)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
      aria-label={isDone ? `${activity.title} (tilmeldt)` : activity.title}
    >
      <span
        className={cn(
          "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
          isDone
            ? "bg-[var(--color-done-soft)] text-[var(--color-done-dim)]"
            : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)] group-hover:bg-[var(--color-lilla-soft)] group-hover:text-[var(--color-lilla-dim)]",
        )}
      >
        {isDone ? (
          <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
        ) : (
          <Compass className="h-4 w-4" aria-hidden />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-[var(--color-foreground)]">
          {activity.title}
        </div>
        {activity.meta ? (
          <div
            className={cn(
              "truncate text-xs",
              isDone
                ? "font-medium text-[var(--color-done-dim)]"
                : "text-[var(--color-muted-foreground)]",
            )}
          >
            {activity.meta}
          </div>
        ) : null}
      </div>
      {!isDone ? (
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      ) : null}
    </a>
  );
}
