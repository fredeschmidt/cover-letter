"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  Compass,
  GraduationCap,
  Inbox,
  KeyRound,
  Library,
  LifeBuoy,
  Mail,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  communicationMessages,
  journeyPhases,
  nextSteps,
  overviewCards,
  selfServiceActions,
  type CommunicationMessage,
  type JourneyPhaseId,
} from "./data";

type ActionTile = {
  title: string;
  system: string;
  isPriority?: boolean;
};

const systemIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  MitStudie: GraduationCap,
  Brightspace: Inbox,
  STADS: BookOpen,
  "AU-mail": Mail,
  "AU Library": Library,
  Studieportalen: Compass,
  "AU IT": KeyRound,
  "AU Support": LifeBuoy,
  "AU Studievejledning": Users,
};

function iconForSystem(system?: string) {
  if (!system) return Sparkles;
  return systemIcon[system] ?? Sparkles;
}

function actionsForPhase(phase: JourneyPhaseId): ActionTile[] {
  const fromOverview: ActionTile[] = overviewCards
    .filter((c) => c.phaseId === phase)
    .map((c) => ({
      title: c.title,
      system: c.system ?? "Studieportalen",
      isPriority:
        !!c.status &&
        (c.status.toLowerCase().includes("vigtig") ||
          c.status.toLowerCase().includes("kræver handling")),
    }));
  const fromSelf: ActionTile[] = selfServiceActions
    .filter((a) => a.phaseIds.includes(phase))
    .map((a) => ({ title: a.title, system: a.area }));

  const seen = new Set<string>();
  return [...fromOverview, ...fromSelf]
    .filter((t) => {
      if (seen.has(t.title)) return false;
      seen.add(t.title);
      return true;
    })
    .slice(0, 6);
}

export function AuDemoClient() {
  const [activePhase, setActivePhase] = useState<JourneyPhaseId>("interested");

  const activeIndex = journeyPhases.findIndex((p) => p.id === activePhase);
  const activeNextStep = nextSteps.find((s) => s.phaseId === activePhase)!;
  const actions = useMemo(() => actionsForPhase(activePhase), [activePhase]);
  const messages = useMemo(
    () => communicationMessages.filter((m) => m.phaseId === activePhase),
    [activePhase],
  );

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-10 md:px-6 md:pt-14">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Tilbage til portfolio
      </Link>

      <header className="mb-10 md:mb-12">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          UX-prototype · Aarhus Universitet
        </span>
        <h1 className="display mt-3 text-balance text-3xl leading-[1.05] md:text-5xl">
          Min AU-rejse
        </h1>
        <p className="mt-3 text-sm text-[var(--color-muted-foreground)] md:text-base">
          Et personligt overblik fra interesse til studieliv.
        </p>
      </header>

      <PhaseTabs
        active={activePhase}
        activeIndex={activeIndex}
        onChange={setActivePhase}
      />

      <JourneyChain step={activeNextStep} messages={messages} />

      <Section title="Du kan nu">
        <ul className="grid gap-2 sm:grid-cols-2">
          {actions.map((action) => (
            <li key={action.title}>
              <Tile title={action.title} system={action.system} priority={action.isPriority} />
            </li>
          ))}
        </ul>
      </Section>

      <footer className="mt-16 border-t border-[var(--color-border)] pt-8">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          Om demoen
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          En afgrænset UX-/frontend-case. Ikke et redesign, men et eksempel på
          hvordan en samlet studieportal kan binde rejsen fra interesse til
          studieliv sammen.
        </p>
        <ul className="mt-5 grid gap-1.5 text-sm text-[var(--color-muted-foreground)]">
          <li className="flex gap-2">
            <span className="text-[var(--color-lilla)]" aria-hidden>·</span>
            Én sammenhængende rejse i stedet for mange løse systemer.
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-lilla)]" aria-hidden>·</span>
            Indhold og handlinger prioriteres efter fase.
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-lilla)]" aria-hidden>·</span>
            Færre ord, tydeligere næste skridt.
          </li>
        </ul>
      </footer>
    </main>
  );
}

/* -------------------- Section wrapper -------------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12 md:mb-14">
      <h2 className="mb-4 text-base font-semibold text-[var(--color-foreground)] md:text-lg">
        {title}
      </h2>
      {children}
    </section>
  );
}

/* -------------------- Phase tabs -------------------- */

function PhaseTabs({
  active,
  activeIndex,
  onChange,
}: {
  active: JourneyPhaseId;
  activeIndex: number;
  onChange: (id: JourneyPhaseId) => void;
}) {
  const progress = (activeIndex / (journeyPhases.length - 1)) * 100;

  return (
    <nav aria-label="Fase i AU-rejsen" className="mb-10 md:mb-12">
      <ol className="relative grid grid-cols-4">
        <div
          className="absolute left-[12.5%] right-[12.5%] top-3 h-px bg-[var(--color-border)]"
          aria-hidden
        />
        <div
          className="absolute left-[12.5%] top-3 h-px bg-[var(--color-lilla)] transition-[width] duration-500 ease-out"
          style={{ width: `calc((100% - 25%) * ${progress / 100})` }}
          aria-hidden
        />
        {journeyPhases.map((phase, i) => {
          const isActive = phase.id === active;
          const isPast = i < activeIndex;
          return (
            <li key={phase.id} className="relative">
              <button
                type="button"
                aria-current={isActive ? "step" : undefined}
                onClick={() => onChange(phase.id)}
                className="group flex w-full flex-col items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
              >
                <span
                  className={cn(
                    "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums transition-colors",
                    isActive &&
                      "border-[var(--color-lilla)] bg-[var(--color-lilla)] text-[var(--color-background)]",
                    isPast &&
                      !isActive &&
                      "border-[var(--color-lilla)] bg-[var(--color-lilla)] text-[var(--color-background)]",
                    !isActive &&
                      !isPast &&
                      "border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-muted-foreground)] group-hover:border-[var(--color-lilla)]/60",
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
                    "text-[11px] font-medium md:text-xs",
                    isActive
                      ? "text-[var(--color-foreground)]"
                      : "text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]",
                  )}
                >
                  {phase.shortLabel}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------- Journey chain (next step + follow-up messages) -------------------- */

function JourneyChain({
  step,
  messages,
}: {
  step: (typeof nextSteps)[number];
  messages: CommunicationMessage[];
}) {
  return (
    <section aria-labelledby="next-step-title" className="mb-12 md:mb-14">
      <ol>
        <FeaturedStep step={step} hasFollowUps={messages.length > 0} />
        {messages.map((msg, i) => (
          <FollowUpStep
            key={msg.title}
            msg={msg}
            isLast={i === messages.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}

function FeaturedStep({
  step,
  hasFollowUps,
}: {
  step: (typeof nextSteps)[number];
  hasFollowUps: boolean;
}) {
  return (
    <li className="relative pb-3 pl-12">
      {/* Marker top:28 = card padding p-6 (24) + 4 to align with eyebrow x-height.
          Connector top:52 = marker top (28) + marker height (24). Hand-tuned pair. */}
      <span
        className="absolute left-0 top-[28px] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-lilla)] ring-4 ring-[var(--color-background)]"
        aria-hidden
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-background)]" />
      </span>
      {hasFollowUps ? (
        <span
          className="absolute left-3 top-[52px] bottom-0 w-px bg-[var(--color-border)]"
          aria-hidden
        />
      ) : null}

      <div className="rounded-3xl border border-[var(--color-lilla)]/30 bg-[var(--color-card)] p-6 md:p-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-lilla)]">
          Næste skridt
        </span>
        <h2
          id="next-step-title"
          className="display mt-2 text-balance text-2xl leading-[1.15] md:text-3xl"
        >
          {step.title}
        </h2>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-foreground)] px-5 py-2.5 text-sm font-medium text-[var(--color-background)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-card)]"
        >
          {step.ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </li>
  );
}

function FollowUpStep({
  msg,
  isLast,
}: {
  msg: CommunicationMessage;
  isLast: boolean;
}) {
  const isUrgent =
    msg.relevance.toLowerCase() === "nu" ||
    msg.relevance.toLowerCase().includes("vigtig");
  return (
    <li className="relative pl-12">
      {/* Connector running through this row — masked by the marker's ring */}
      {!isLast ? (
        <span
          className="absolute left-3 top-0 bottom-0 w-px bg-[var(--color-border)]"
          aria-hidden
        />
      ) : (
        <span
          className="absolute left-3 top-0 h-3 w-px bg-[var(--color-border)]"
          aria-hidden
        />
      )}
      {/* Marker — small dot, lilla if urgent */}
      <span
        className={cn(
          "absolute left-[6px] top-3 z-10 h-3 w-3 rounded-full ring-4 ring-[var(--color-background)]",
          isUrgent ? "bg-[var(--color-lilla)]" : "bg-[var(--color-border)]",
        )}
        aria-hidden
      />
      <div className="py-2">
        <div className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-muted-foreground)]">
          {msg.channel} · {msg.relevance}
        </div>
        <div className="text-sm text-[var(--color-foreground)]">{msg.title}</div>
      </div>
    </li>
  );
}

/* -------------------- Tile (action / result) -------------------- */

function Tile({
  title,
  system,
  priority,
}: {
  title: string;
  system: string;
  priority?: boolean;
}) {
  const Icon = iconForSystem(system);
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="group relative flex h-full items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 pr-4 transition-all hover:border-[var(--color-lilla)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
      aria-label={priority ? `${title} — ${system} (prioritet)` : `${title} — ${system}`}
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-muted)] text-[var(--color-muted-foreground)] transition-colors group-hover:bg-[var(--color-lilla-soft)] group-hover:text-[var(--color-lilla-dim)]">
        <Icon className="h-4 w-4" aria-hidden />
        {priority ? (
          <span
            className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[var(--color-lilla)] ring-2 ring-[var(--color-card)]"
            aria-hidden
          />
        ) : null}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-[var(--color-foreground)]">
          {title}
        </div>
        <div className="text-xs text-[var(--color-muted-foreground)]">{system}</div>
      </div>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
    </a>
  );
}

