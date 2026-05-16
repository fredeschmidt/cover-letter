"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  demoToday,
  draftApplications,
  journeyPhases,
  phaseActivities,
  phaseConfigs,
  savedPrograms,
  suItems,
  uploadedDocuments,
  type DraftApplication,
  type JourneyPhaseId,
  type PhaseActivity,
  type SUItem,
  type SavedProgram,
  type UploadedDocument,
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
  "--color-done-dim": "#047857",
  "--color-done-soft": "rgba(16, 185, 129, 0.14)",
} as CSSProperties;

export function AuDemoClient() {
  const [activePhase, setActivePhase] = useState<JourneyPhaseId>("interested");

  const activeIndex = journeyPhases.findIndex((p) => p.id === activePhase);
  const programs = savedPrograms.filter((p) => p.phaseId === activePhase);
  const activities = phaseActivities.filter((a) => a.phaseId === activePhase);
  const drafts = draftApplications.filter((d) => d.phaseId === activePhase);
  const documents = uploadedDocuments.filter((d) => d.phaseId === activePhase);
  const su = suItems.filter((s) => s.phaseId === activePhase);

  const phaseConfig = phaseConfigs[activePhase];

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
              {programs.length > 0 ? (
                <SavedProgramsList
                  programs={programs}
                  title={phaseConfig.programsTitle}
                  tone={phaseConfig.programsTone}
                />
              ) : null}
              {drafts.length > 0 ? <DraftApplicationsList drafts={drafts} /> : null}
              {documents.length > 0 ? <DocumentsList documents={documents} /> : null}
              {su.length > 0 ? <SUList items={su} /> : null}
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
}: {
  active: JourneyPhaseId;
  activeIndex: number;
  onChange: (id: JourneyPhaseId) => void;
}) {
  return (
    <nav aria-label="Fase i AU-rejsen">
      <ol className="flex flex-col gap-1">
        {journeyPhases.map((phase, i) => {
          const isActive = phase.id === active;
          const isPast = i < activeIndex;
          return (
            <li key={phase.id}>
              <div>
                <button
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => onChange(phase.id)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]",
                    !isActive ? "hover:bg-[var(--color-muted)]" : "",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums transition-colors",
                      isActive
                        ? "border-[var(--color-lilla)] bg-[var(--color-lilla)] text-white"
                        : isPast
                        ? "border-[var(--color-lilla)] bg-[var(--color-card)] text-[var(--color-lilla-dim)]"
                        : "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-muted-foreground)] group-hover:border-[var(--color-lilla)]/60",
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
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------- Gemte uddannelser -------------------- */

function SavedProgramsList({
  programs,
  title = "Dine gemte uddannelser",
  tone = "default",
}: {
  programs: SavedProgram[];
  title?: string;
  tone?: "default" | "submitted" | "accepted";
}) {
  return (
    <section>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
        {title}
      </h3>
      <ul className="grid gap-2">
        {programs.map((program) => (
          <li key={program.title}>
            {tone === "accepted" ? (
              <AcceptedProgramHero program={program} />
            ) : tone === "submitted" ? (
              <SubmittedProgramRow program={program} />
            ) : (
              <SavedProgramRow program={program} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function AcceptedProgramHero({ program }: { program: SavedProgram }) {
  // Hero-variant for fase 3: dette er målet med hele rejsen, så kortet får
  // ekstra padding, et stort display-typografi-niveau, og en lilla "Optaget"-
  // markering der signalerer at brugeren er nået i mål. Adskiller sig fra de
  // strammere rækker netop fordi det er det øjeblik der bør fylde mest.
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={`Optaget på ${program.title} — ${program.deadline}`}
      className="group block rounded-3xl border border-[var(--color-lilla)]/20 bg-gradient-to-br from-[var(--color-lilla-soft)] to-transparent p-6 transition-colors hover:border-[var(--color-lilla)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)] md:p-7"
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-lilla)]">
        Optaget
      </div>
      <h4 className="mt-2 text-xl font-semibold leading-tight text-[var(--color-foreground)] md:text-2xl">
        {program.title}
      </h4>
      <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
        {program.deadline}
      </p>
    </a>
  );
}

function SavedProgramRow({ program }: { program: SavedProgram }) {
  // Default-/urgent-variant: titel + højrestillet deadline-pille. Urgent rækker
  // får lilla venstrekant + countdown ("23 dage") som primært signal, så urgensen
  // bæres af information frem for farve alene.
  const countdownDays =
    program.isUrgent && program.deadlineDate
      ? daysUntil(program.deadlineDate, demoToday)
      : undefined;
  const showCountdown = countdownDays !== undefined && countdownDays >= 0;
  const countdownLabel = countdownDays === 0 ? "I dag" : `${countdownDays} dage`;

  // På urgent-rækker droppes "Frist "-præfikset fordi countdown'en allerede
  // siger frist — så undgår vi "23 dage · Frist 15. marts".
  const mainText = showCountdown
    ? program.deadline.replace(/^Frist\s+/i, "")
    : program.deadline;

  const ariaParts = [
    showCountdown ? countdownLabel : null,
    mainText,
    program.deadlineNote,
  ].filter(Boolean);
  const ariaDeadline = ariaParts.join(" · ");

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={
        program.isUrgent
          ? `${program.title} — ${ariaDeadline}, frist nærmer sig`
          : `${program.title} — ${ariaDeadline}`
      }
      className={cn(
        "group flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 transition-colors hover:border-[var(--color-lilla)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]",
        program.isUrgent && "border-l-2 border-l-[var(--color-lilla)]",
      )}
    >
      <div className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-foreground)]">
        {program.title}
      </div>
      <span
        className={cn(
          "shrink-0 inline-flex items-baseline gap-1.5 rounded-full px-2.5 py-1 tabular-nums",
          program.isUrgent ? "bg-[var(--color-lilla-soft)]" : "",
        )}
      >
        {showCountdown ? (
          <span className="text-xs font-semibold text-[var(--color-lilla)]">
            {countdownLabel}
          </span>
        ) : null}
        <span
          className={cn(
            "text-xs",
            program.isUrgent
              ? "text-[var(--color-lilla-dim)]"
              : "text-[var(--color-muted-foreground)]",
          )}
        >
          {mainText}
        </span>
        {program.deadlineNote ? (
          <span
            className={cn(
              "text-[10px] uppercase tracking-wide",
              program.isUrgent
                ? "text-[var(--color-lilla-dim)]/60"
                : "text-[var(--color-muted-foreground)]/60",
            )}
          >
            {program.deadlineNote}
          </span>
        ) : null}
      </span>
    </a>
  );
}

function SubmittedProgramRow({ program }: { program: SavedProgram }) {
  // Submitted-variant for fase 2: grøn "Ansøgt X"-badge + grå deadline-pille
  // ved siden af. Falder tilbage til en almindelig række hvis submittedDate
  // ikke er sat — så datatype-fejl ikke giver et tomt UI.
  if (!program.submittedDate) {
    return <SavedProgramRow program={program} />;
  }
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={`${program.title} — Ansøgt ${program.submittedDate}, ${program.deadline}`}
      className="group flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 transition-colors hover:border-[var(--color-lilla)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
    >
      <div className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-foreground)]">
        {program.title}
      </div>
      <div className="shrink-0 inline-flex items-center gap-1 tabular-nums">
        <span className="rounded-full bg-[var(--color-done-soft)] px-2.5 py-1 text-xs font-medium text-[var(--color-done-dim)]">
          Ansøgt {program.submittedDate}
        </span>
        <span className="rounded-full px-2.5 py-1 text-xs text-[var(--color-muted-foreground)]">
          {program.deadline}
        </span>
      </div>
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
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={`Fortsæt motiveret ansøgning til ${draft.programTitle} — ${draft.ratio} ${draft.qualifier} (${draft.progress}%)`}
      className="group flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 transition-colors hover:border-[var(--color-lilla)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
    >
      <div className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-foreground)]">
        {draft.programTitle}
      </div>
      <span className="shrink-0 inline-flex items-baseline gap-1.5 rounded-full px-2.5 py-1 tabular-nums">
        <span className="text-xs text-[var(--color-muted-foreground)]">
          {draft.ratio}
        </span>
        <span className="text-[10px] uppercase tracking-wide text-[var(--color-muted-foreground)]/60">
          {draft.qualifier}
        </span>
      </span>
    </a>
  );
}

/* -------------------- Tilmeldinger & muligheder -------------------- */

function ActivitiesList({ activities }: { activities: PhaseActivity[] }) {
  return (
    <section>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
        Info og tilmeldinger
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
      className="group flex h-full items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 transition-colors hover:border-[var(--color-lilla)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
      aria-label={isDone ? `${activity.title} (tilmeldt)` : activity.title}
    >
      <div className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-foreground)]">
        {activity.title}
      </div>
      {activity.meta ? (
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs",
            isDone
              ? "bg-[var(--color-done-soft)] font-medium text-[var(--color-done-dim)]"
              : "text-[var(--color-muted-foreground)]",
          )}
        >
          {activity.meta}
        </span>
      ) : null}
    </a>
  );
}

/* -------------------- Uploadet dokumenter -------------------- */

function DocumentsList({ documents }: { documents: UploadedDocument[] }) {
  return (
    <section>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
        Uploadet dokumenter
      </h3>
      <ul className="grid gap-2">
        {documents.map((doc) => (
          <li key={doc.title}>
            <DocumentRow document={doc} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function DocumentRow({ document }: { document: UploadedDocument }) {
  const isMissing = document.status === "missing";
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={cn(
        "group flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 transition-colors hover:border-[var(--color-lilla)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]",
        isMissing && "border-l-2 border-l-[var(--color-lilla)]",
      )}
      aria-label={`${document.title} — ${document.meta}`}
    >
      <div className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-foreground)]">
        {document.title}
      </div>
      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
          isMissing
            ? "bg-[var(--color-lilla-soft)] text-[var(--color-lilla)]"
            : "bg-[var(--color-done-soft)] text-[var(--color-done-dim)]",
        )}
      >
        {document.meta}
      </span>
    </a>
  );
}

/* -------------------- SU -------------------- */

function SUList({ items }: { items: SUItem[] }) {
  return (
    <section>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
        SU
      </h3>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.title}>
            <SUItemRow item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function SUItemRow({ item }: { item: SUItem }) {
  const isDone = item.status === "done";
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={cn(
        "group flex h-full items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 transition-colors hover:border-[var(--color-lilla)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]",
        item.isUrgent && "border-l-2 border-l-[var(--color-lilla)]",
      )}
      aria-label={isDone ? `${item.title} (klaret)` : item.title}
    >
      <div className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-foreground)]">
        {item.title}
      </div>
      {item.meta ? (
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
            isDone
              ? "bg-[var(--color-done-soft)] text-[var(--color-done-dim)]"
              : item.isUrgent
              ? "bg-[var(--color-lilla-soft)] text-[var(--color-lilla)]"
              : "font-normal text-[var(--color-muted-foreground)]",
          )}
        >
          {item.meta}
        </span>
      ) : null}
    </a>
  );
}
