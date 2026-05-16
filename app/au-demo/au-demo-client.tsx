"use client";

import { useState, type ComponentType, type CSSProperties, type SVGProps } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock,
  ExternalLink,
  FileCheck,
  Send,
  Sparkles,
  Wallet,
} from "lucide-react";
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

// Pegt mod SVG-komponent-typen lucide eksporterer, så vi kan tage ikoner
// som props uden at trække i ikon-bibliotekets interne typer.
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

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
        <div className="mb-10 flex flex-col gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-baseline md:gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 self-start text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)] md:justify-self-start"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Tilbage til portfolio
          </Link>
          <h1 className="display text-balance text-2xl leading-[1.1] md:text-center md:text-3xl">
            Velkommen tilbage, Astrid
          </h1>
          <div aria-hidden className="hidden md:block" />
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
            {/* AnimatePresence + key på phase: hver fase mounter på ny så
                fase-skiftet bliver til en synlig transformation i stedet for
                et abrupt swap. mode="wait" sikrer at exit-animationen er
                færdig før den nye fase fader ind. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="space-y-10 md:space-y-14"
              >
                {programs.length > 0 ? (
                  <SavedProgramsList
                    programs={programs}
                    drafts={drafts}
                    title={phaseConfig.programsTitle}
                    tone={phaseConfig.programsTone}
                  />
                ) : null}
                {documents.length > 0 ? <DocumentsList documents={documents} /> : null}
                {/* Fase 2 (applied) slår SU + Info sammen til "Mens du venter"
                    — begge er sekundære i ventefasen og hører hjemme under
                    samme overskrift. Andre faser viser dem hver for sig. */}
                {activePhase === "applied" ? (
                  <WhileWaitingList suItems={su} activities={activities} />
                ) : (
                  <>
                    {su.length > 0 ? <SUList items={su} /> : null}
                    {activities.length > 0 ? <ActivitiesList activities={activities} /> : null}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <footer className="mt-16 border-t border-[var(--color-border)] pt-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            Om demoen
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            En afgrænset UX-/frontend-case. Ikke et redesign, men et eksempel på
            hvordan en samlet studieportal kan binde rejsen fra interesse til
            optagelse sammen.
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

/* -------------------- Fase-indikator + sektionsoverskrift -------------------- */

function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: IconComponent;
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-4 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground)]">
      <Icon className="h-4 w-4" aria-hidden />
      {children}
    </h3>
  );
}

/* -------------------- Gemte uddannelser -------------------- */

function SavedProgramsList({
  programs,
  drafts = [],
  title = "Dine gemte uddannelser",
  tone = "default",
}: {
  programs: SavedProgram[];
  drafts?: DraftApplication[];
  title?: string;
  tone?: "default" | "submitted" | "accepted";
}) {
  // Drafts kobles på programmer via titel — så fase 1 viser én række pr.
  // uddannelse i stedet for to parallelle lister med samme titler.
  const draftByTitle = new Map(drafts.map((d) => [d.programTitle, d]));

  // Accepted-tone springer overskriften helt over — hero'en har sin egen
  // "OPTAGET"-eyebrow, så en ekstra sektionsoverskrift ovenover ville gentage
  // det samme signal.
  const HeadingIcon = tone === "submitted" ? Send : Bookmark;

  return (
    <section>
      {tone !== "accepted" ? (
        <SectionHeading icon={HeadingIcon}>{title}</SectionHeading>
      ) : null}
      <ul className="grid gap-2">
        {programs.map((program) => (
          <li key={program.title}>
            {tone === "accepted" ? (
              <AcceptedProgramHero program={program} />
            ) : tone === "submitted" ? (
              <SubmittedProgramRow program={program} />
            ) : (
              <SavedProgramRow
                program={program}
                draft={draftByTitle.get(program.title)}
              />
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
  // markering der signalerer at brugeren er nået i mål. Den primære handling
  // (gå videre til MitStudie) bæres af en eksplicit CTA-knap frem for at
  // gøre hele kortet klikbart — så det er entydigt hvor brugeren går hen.
  return (
    <div className="rounded-3xl border border-[var(--color-lilla)]/20 bg-gradient-to-br from-[var(--color-lilla-soft)] to-transparent p-6 md:p-7">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-lilla)]">
        Optaget
      </div>
      <h4 className="mt-2 text-xl font-semibold leading-tight text-[var(--color-foreground)] md:text-2xl">
        {program.title}
      </h4>
      <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
        {program.deadline}
      </p>
      <button
        type="button"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-lilla)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-lilla-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
      >
        Gå til MitStudie
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}

function SavedProgramRow({
  program,
  draft,
}: {
  program: SavedProgram;
  draft?: DraftApplication;
}) {
  // Fase 1-række: kompakt og fladt format — alle programmer deler samme
  // grammatik så de tre rækker visuelt læses som "samme slags ting". Countdown
  // som lille lilla pille hvis urgent, ellers blot "Frist 15. marts" som
  // dæmpet tekst. Progress-bar bevares som én tynd linje i bunden — bar'en
  // ER status; ingen ekstra tekst-label. KVOTE-note er fjernet fra dashboardet
  // (jargon → detaljesiden).
  const countdownDays =
    program.isUrgent && program.deadlineDate
      ? daysUntil(program.deadlineDate, demoToday)
      : undefined;
  const showCountdown = countdownDays !== undefined && countdownDays >= 0;
  const countdownLabel =
    countdownDays === 0
      ? "I dag"
      : countdownDays === 1
      ? "Om 1 dag"
      : `Om ${countdownDays} dage`;

  const ariaParts = [
    showCountdown ? countdownLabel : null,
    program.deadline,
  ].filter(Boolean);
  const ariaDeadline = ariaParts.join(", ");
  const baseAria = program.isUrgent
    ? `${program.title} — ${ariaDeadline}, frist nærmer sig`
    : `${program.title} — ${ariaDeadline}`;
  const ariaLabel = draft
    ? `${baseAria}. Ansøgning ${draft.ratio} trin udfyldt.`
    : baseAria;

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={ariaLabel}
      className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 truncate text-sm text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]">
          {program.title}
        </div>
        <div className="shrink-0 inline-flex items-baseline gap-2 tabular-nums">
          {showCountdown ? (
            <span className="inline-flex items-baseline rounded-full bg-[var(--color-lilla-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--color-lilla)]">
              {countdownLabel}
            </span>
          ) : null}
          <span className="text-[11px] text-[var(--color-muted-foreground)]">
            {program.deadline}
          </span>
        </div>
      </div>
      {draft && draft.progress > 0 ? (
        <div
          className="mt-2 h-[2px] overflow-hidden rounded-full bg-[var(--color-muted)]"
          role="progressbar"
          aria-valuenow={draft.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Ansøgning ${draft.ratio} trin udfyldt`}
        >
          <div
            aria-hidden
            className="h-full rounded-full bg-[var(--color-lilla)] transition-[width] duration-300"
            style={{ width: `${draft.progress}%` }}
          />
        </div>
      ) : null}
    </a>
  );
}

function SubmittedProgramRow({ program }: { program: SavedProgram }) {
  // Matcher DocumentRow's flade list-grammatik: check-ikon i 4x4-slot, muted
  // titel, inline muted meta. Falder tilbage til standard hvis submittedDate mangler.
  if (!program.submittedDate) {
    return <SavedProgramRow program={program} />;
  }
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={`${program.title} — Ansøgt ${program.submittedDate}, ${program.deadline}`}
      className="group flex items-baseline gap-2.5 py-2 transition-colors focus-visible:outline-none focus-visible:text-[var(--color-lilla)]"
    >
      <span
        className="flex h-4 w-4 shrink-0 translate-y-[2px] items-center justify-center"
        aria-hidden
      >
        <Check
          className="h-3.5 w-3.5 text-[var(--color-done-dim)]"
          strokeWidth={3}
        />
      </span>
      <span className="text-sm text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]">
        {program.title}
      </span>
      <span className="text-xs text-[var(--color-muted-foreground)]">
        · Ansøgt {program.submittedDate} · {program.deadline}
      </span>
    </a>
  );
}

/* -------------------- Tilmeldinger & muligheder -------------------- */

function ActivitiesList({ activities }: { activities: PhaseActivity[] }) {
  return (
    <section>
      <SectionHeading icon={Sparkles}>Info og tilmeldinger</SectionHeading>
      <ul className="grid gap-1">
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
  // List-format: done-rækker får en grøn check som visuel anker foran titlen
  // så øjet kan skille "afsluttet" fra "kan jeg stadig gøre" på under et sekund
  // (Gestalt: lighed). Open-rækker har en lige så bred placeholder-spacer så
  // titler stadig venstrejusteres ens — listen flimrer ikke. Done-titler
  // dæmpes en anelse i farve så de falder bagud i hierarkiet.
  const isDone = activity.status === "done";
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="group flex items-baseline gap-2.5 py-2 transition-colors focus-visible:outline-none focus-visible:text-[var(--color-lilla)]"
      aria-label={isDone ? `${activity.title} (tilmeldt)` : activity.title}
    >
      <span
        className="flex h-4 w-4 shrink-0 translate-y-[2px] items-center justify-center"
        aria-hidden
      >
        {isDone ? (
          <Check
            className="h-3.5 w-3.5 text-[var(--color-done-dim)]"
            strokeWidth={3}
          />
        ) : null}
      </span>
      <span className="text-sm text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]">
        {activity.title}
      </span>
      {activity.meta && !isDone ? (
        <span className="text-xs text-[var(--color-muted-foreground)]">
          · {activity.meta}
        </span>
      ) : null}
    </a>
  );
}

/* -------------------- Uploadet dokumenter -------------------- */

function DocumentsList({ documents }: { documents: UploadedDocument[] }) {
  return (
    <section>
      <SectionHeading icon={FileCheck}>Uploadet dokumenter</SectionHeading>
      <ul className="grid gap-1">
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
  // List-format som ActivityRow: verified = grøn check + dæmpet titel + dato
  // som muted inline-tekst. Missing = lilla dot i samme slot-bredde så listen
  // flugter, lilla titel, "Mangler" som plain lilla inline-tekst (ikke pille).
  // Drop card-chrome — signal bæres af ikon + farve, ikke af kant og baggrund.
  const isMissing = document.status === "missing";
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={isMissing ? `${document.title} — mangler` : document.title}
      className="group flex items-baseline gap-2.5 py-2 transition-colors focus-visible:outline-none focus-visible:text-[var(--color-lilla)]"
    >
      <span
        className="flex h-4 w-4 shrink-0 translate-y-[2px] items-center justify-center"
        aria-hidden
      >
        {isMissing ? (
          <span className="block h-2 w-2 rounded-full bg-[var(--color-lilla)]" />
        ) : (
          <Check
            className="h-3.5 w-3.5 text-[var(--color-done-dim)]"
            strokeWidth={3}
          />
        )}
      </span>
      <span
        className={cn(
          "text-sm transition-colors group-hover:text-[var(--color-lilla)]",
          isMissing
            ? "font-medium text-[var(--color-lilla)]"
            : "text-[var(--color-muted-foreground)]",
        )}
      >
        {document.title}
      </span>
      <span
        className={cn(
          "text-xs",
          isMissing
            ? "font-medium text-[var(--color-lilla)]"
            : "text-[var(--color-muted-foreground)]",
        )}
      >
        · {document.meta}
      </span>
    </a>
  );
}

/* -------------------- SU -------------------- */

function SUList({ items }: { items: SUItem[] }) {
  return (
    <section>
      <SectionHeading icon={Wallet}>SU</SectionHeading>
      <ul className="grid gap-1">
        {items.map((item) => (
          <li key={item.title}>
            <SUItemRow item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function WhileWaitingList({
  suItems,
  activities,
}: {
  suItems: SUItem[];
  activities: PhaseActivity[];
}) {
  // Fase 2-specifik: SU + info-tilmeldinger er begge ting brugeren KAN gøre
  // mens de venter på ansøgningssvar — ikke ting der haster. Samles under én
  // overskrift for at reducere antallet af konkurrerende sektioner og signalere
  // hierarki (urgent ting er allerede vist højere oppe).
  if (suItems.length === 0 && activities.length === 0) return null;
  return (
    <section>
      <SectionHeading icon={Clock}>Mens du venter</SectionHeading>
      <ul className="grid gap-1">
        {suItems.map((item) => (
          <li key={`su-${item.title}`}>
            <SUItemRow item={item} />
          </li>
        ))}
        {activities.map((activity) => (
          <li key={`act-${activity.title}`}>
            <ActivityRow activity={activity} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function SUItemRow({ item }: { item: SUItem }) {
  // List-format som ActivityRow: done = grøn check + dæmpet titel. Urgent =
  // lilla dot i samme slot-bredde + lilla titel/meta. Almindelig = tom slot
  // så alle tre tilstande venstrejusterer ens (Gestalt: lighed). Bullet-
  // separator binder meta til titlen så frist + handling læses som ét.
  const isDone = item.status === "done";
  const isUrgent = item.isUrgent && !isDone;
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="group flex items-baseline gap-2.5 py-2 transition-colors focus-visible:outline-none focus-visible:text-[var(--color-lilla)]"
      aria-label={isDone ? `${item.title} (klaret)` : item.title}
    >
      <span
        className="flex h-4 w-4 shrink-0 translate-y-[2px] items-center justify-center"
        aria-hidden
      >
        {isDone ? (
          <Check
            className="h-3.5 w-3.5 text-[var(--color-done-dim)]"
            strokeWidth={3}
          />
        ) : isUrgent ? (
          <span className="block h-2 w-2 rounded-full bg-[var(--color-lilla)]" />
        ) : null}
      </span>
      <span
        className={cn(
          "text-sm transition-colors group-hover:text-[var(--color-lilla)]",
          isUrgent
            ? "font-medium text-[var(--color-lilla)]"
            : "text-[var(--color-muted-foreground)]",
        )}
      >
        {item.title}
      </span>
      {item.meta ? (
        <span
          className={cn(
            "text-xs",
            isUrgent
              ? "font-medium text-[var(--color-lilla)]"
              : "text-[var(--color-muted-foreground)]",
          )}
        >
          · {item.meta}
        </span>
      ) : null}
    </a>
  );
}
