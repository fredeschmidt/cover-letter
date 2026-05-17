"use client";

import { useState, type ComponentType, type CSSProperties, type SVGProps } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Cog,
  Compass,
  ExternalLink,
  FileCheck,
  FilePen,
  GraduationCap,
  HeartPulse,
  Scale,
  Search,
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
  const drafts = draftApplications.filter((d) => d.phaseId === activePhase);
  const activities = phaseActivities.filter((a) => a.phaseId === activePhase);
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
          <h1 className="display text-balance text-2xl leading-[1.1] md:text-3xl">
            Velkommen tilbage, Astrid
          </h1>
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
                færdig før den nye fase fader ind. Søgebar'en ligger inde i
                fase-blokken og render'es kun i "interested" — det er en
                discovery-affordance der hører til opdagelsesfasen; når man
                er sendt/optaget er det irrelevant. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                // max-w-md strammer indholdskolonnen så chevronerne sidder
                // tæt på teksten frem for i højre kant af grid-kolonnen.
                // Efter fjernelse af dato-meta passer 448px tæt til længste
                // række ("Cognitive Science — 2. prioritet · Svar 26. juli").
                className="max-w-md space-y-10 md:space-y-14"
              >
                {activePhase === "interested" ? <StudySearchBar /> : null}
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
            studieliv sammen.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Tilbage til portfolio
          </Link>
        </footer>
      </main>
    </div>
  );
}

/* -------------------- Søgefelt -------------------- */

// AU's seks hovedområder — det er sådan unge faktisk tænker når de
// "browser" uddannelser (ikke efter faculty-koder). Hvert område får et
// ikon der differentierer rækken visuelt og bærer betydning, ikke
// dekoration: BookOpen=humaniora, Scale=jura/samfund, HeartPulse=sundhed,
// Atom=naturvidenskab, Cog=teknik, GraduationCap=pædagogik/undervisning.
const studyAreas: { label: string; icon: IconComponent }[] = [
  { label: "Humaniora", icon: BookOpen },
  { label: "Samfundsvidenskab", icon: Scale },
  { label: "Sundhedsvidenskab", icon: HeartPulse },
  { label: "Naturvidenskab", icon: Atom },
  { label: "Teknik", icon: Cog },
  { label: "Pædagogik", icon: GraduationCap },
];

function StudySearchBar() {
  // To ligestillede veje ind i uddannelseskataloget — begge synlige fra start
  // så valget er åbent for både den målrettede søger (Astrid: "jeg vil læse
  // datavidenskab") og den udforskende (Jonas: "jeg ved ikke hvad jeg vil"):
  //  1. Søg — tast + Enter, eller klik den lille pile-knap inde i feltet
  //  2. Hovedområde-chips — klik et chip og bliv inspireret efter retning
  // Ingen toggle: at gemme inspirationsrækken bag en knap mister halvdelen af
  // målgruppen. Lette muted-baggrund + ikoner gør det til ét sammenhængende
  // "inspirations-modul" — ikke en filter-bar.
  return (
    <section>
      <SectionHeading icon={Compass}>Find din uddannelse</SectionHeading>
      <div className="space-y-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          role="search"
          aria-label="Søg efter en uddannelse"
          className="group flex w-full items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] py-1.5 pl-4 pr-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-colors focus-within:border-[var(--color-lilla)] focus-within:ring-2 focus-within:ring-[var(--color-lilla)]/30"
        >
          <Search
            className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] transition-colors group-focus-within:text-[var(--color-lilla)]"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Søg efter en uddannelse"
            aria-label="Søg efter en uddannelse"
            className="flex-1 bg-transparent py-1.5 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Søg"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-lilla)] text-white transition-colors hover:bg-[var(--color-lilla-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </form>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
          <p className="mb-3 text-xs text-[var(--color-muted-foreground)]">
            Eller vælg et hovedområde
          </p>
          <div className="flex flex-wrap gap-2">
            {studyAreas.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={(e) => e.preventDefault()}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3.5 py-2 text-xs font-medium text-[var(--color-foreground)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:border-[var(--color-lilla)] hover:bg-[var(--color-lilla-soft)] hover:text-[var(--color-lilla)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
              >
                <Icon
                  className="h-3.5 w-3.5 shrink-0 text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
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
  // Label-grammatik: UPPERCASE + tracking + ikon — signalerer at det her er
  // en handlings-zone. Bruges som primær overskrift på alle sektioner;
  // sub-zoner (WhileWaitingList, ActivitiesList) markerer separation med
  // border-t-divider i stedet for et nedtonet heading-niveau.
  return (
    <h3 className="mb-4 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground)]">
      <Icon className="h-4 w-4" aria-hidden />
      {children}
    </h3>
  );
}

/* -------------------- Klikbar række-affordance -------------------- */

function RowChevron() {
  // Statisk klikbarheds-hint: ChevronRight i højre side på alle klikbare
  // rækker. Full muted-foreground (ikke /50) så den faktisk er synlig i
  // statisk tilstand — opacity-reduktion gjorde at den forsvandt og bidrog
  // til "ligner information"-følelsen. Brightner til lilla på hover.
  return (
    <ChevronRight
      className="ml-auto h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]"
      aria-hidden
    />
  );
}

/* -------------------- Dine uddannelser -------------------- */

function DraftProgress({ draft }: { draft: DraftApplication }) {
  // "Igang"-label + pips for aktive kladder: ordet siger direkte at det er
  // en ansøgning under udarbejdelse (ikke bare en bogmærket uddannelse), og
  // pips'ene tegner fremdrift visuelt så øjet aflæser "hvor langt er jeg"
  // uden at læse tal. Tom kladde (0%) får "Ikke startet" i lilla som
  // handlings-invitation. Den præcise ratio bevares i aria-label til screen
  // readers.
  const isEmpty = draft.progress === 0;
  const ratioParts = draft.ratio.match(/(\d+)\s*af\s*(\d+)/i);
  const filled = ratioParts ? Number(ratioParts[1]) : 0;
  const total = ratioParts ? Number(ratioParts[2]) : 5;

  if (isEmpty) {
    return (
      <span className="shrink-0 text-[11px] font-medium text-[var(--color-lilla)]">
        Ikke startet
      </span>
    );
  }
  return (
    <span className="flex shrink-0 items-center gap-2.5">
      <span className="text-[11px] font-medium text-[var(--color-lilla)]">
        Igang
      </span>
      <span
        className="flex items-center gap-[3px]"
        role="progressbar"
        aria-valuenow={draft.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Kladde ${draft.ratio} sektioner udfyldt`}
      >
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "block h-1 w-2.5 rounded-full transition-colors",
              i < filled
                ? "bg-[var(--color-lilla)]"
                : "bg-[var(--color-muted)]",
            )}
            aria-hidden
          />
        ))}
      </span>
    </span>
  );
}

function SavedProgramsList({
  programs,
  drafts = [],
  title,
  tone,
}: {
  programs: SavedProgram[];
  drafts?: DraftApplication[];
  title: string;
  tone: "default" | "submitted" | "accepted";
}) {
  // Ikonet bærer fase-status visuelt: FilePen=kladder under udarbejdelse,
  // Send=afsendte ansøgninger, GraduationCap=optaget på uddannelse.
  const HeadingIcon =
    tone === "submitted" ? Send : tone === "accepted" ? GraduationCap : FilePen;

  return (
    <section>
      <SectionHeading icon={HeadingIcon}>{title}</SectionHeading>
      {/* Listen samles i ét hvidt kort med afrundede hjørner så rækkerne læses
          som én sammenhængende enhed — kortet bærer hierarkiet i stedet for
          individuelle row-baggrunde. Accepted-tonen er én enkelt hero (ikke
          en liste) og render'es uden kort-wrapper — AcceptedProgramHero
          bærer sin egen kort-styling internt. */}
      <ul
        className={cn(
          tone !== "accepted"
            ? "overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] divide-y divide-[var(--color-border)]"
            : "grid gap-2",
        )}
      >
        {programs.map((program) => {
          const draft = drafts.find((d) => d.programTitle === program.title);
          return (
            <li key={program.title}>
              {tone === "accepted" ? (
                <AcceptedProgramHero program={program} />
              ) : tone === "submitted" ? (
                <SubmittedProgramRow program={program} />
              ) : (
                <SavedProgramRow program={program} draft={draft} />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function AcceptedProgramHero({ program }: { program: SavedProgram }) {
  // Optaget-fasen er målet med hele rejsen, så kortet får mere fylde end de
  // øvrige liste-kort: rigeligere padding (p-6 md:p-8), en "Tillykke!"-
  // eyebrow med sparkle der bærer den emotionelle markering, og en intro-
  // linje der leder ned i programnavnet — som er hierarkiets højeste punkt
  // (text-2xl md:text-3xl, semibold). CTA-knappen er den eneste lilla
  // flade og samler kortets ene tydelige næste handling.
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] md:p-8">
      <div className="flex items-center gap-2">
        <Sparkles
          className="h-4 w-4 shrink-0 text-[var(--color-lilla)]"
          strokeWidth={2}
          aria-hidden
        />
        <span className="text-sm font-semibold text-[var(--color-lilla)]">
          Tillykke!
        </span>
      </div>
      <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">
        Du er blevet optaget på
      </p>
      <h4 className="mt-1 text-2xl font-semibold leading-tight text-[var(--color-foreground)] md:text-3xl">
        {program.title}
      </h4>
      <p className="mt-5 text-sm text-[var(--color-muted-foreground)]">
        {program.deadline}
      </p>
      <button
        type="button"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-lilla)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-lilla-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
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
  // Én række pr uddannelse — bærer både kladde-fremdrift (pips/Ikke startet)
  // og tids-signal (urgent countdown eller frist). De to signaler er
  // komplementære: pips siger "hvor langt er jeg med at skrive", countdown
  // siger "hvornår er deadline". Rækkefølge: titel · pips · tids-signal ·
  // chevron — pips står tættest på titlen fordi de hører til kladden,
  // tids-signalet står yderst som ankerpunkt for hastværk.
  const countdownDays =
    program.isUrgent && program.deadlineDate
      ? daysUntil(program.deadlineDate, demoToday)
      : undefined;
  const showCountdown = countdownDays !== undefined && countdownDays >= 0;
  const countdownLabel =
    countdownDays === 0
      ? "Frist i dag"
      : countdownDays === 1
      ? "Frist 1 dag"
      : `Frist ${countdownDays} dage`;

  const ariaParts = [program.title];
  if (draft) ariaParts.push(`kladde ${draft.ratio} udfyldt`);
  if (showCountdown) ariaParts.push(`${countdownLabel}, frist nærmer sig`);
  else ariaParts.push(program.deadline);
  const ariaLabel = ariaParts.join(" — ");

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={ariaLabel}
      className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-lilla)]"
    >
      {/* Venstre kolonne: titel + (evt.) kladde-fremdrift stablet under.
          Min-w-0 + flex-1 sikrer at lange titler trunker frem for at presse
          countdown'et ud i kanten. */}
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="truncate text-sm text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]">
          {program.title}
        </span>
        {draft ? <DraftProgress draft={draft} /> : null}
      </span>
      {showCountdown ? (
        <span className="shrink-0 text-[11px] font-medium tabular-nums text-[var(--color-lilla)]">
          {countdownLabel}
        </span>
      ) : (
        <span className="shrink-0 text-[11px] tabular-nums text-[var(--color-muted-foreground)]">
          {program.deadline}
        </span>
      )}
      <RowChevron />
    </a>
  );
}

function SubmittedProgramRow({ program }: { program: SavedProgram }) {
  // Rendres altid inde i kort-wrapperen i SavedProgramsList (tone="submitted"),
  // så rækken er kant-til-kant uden egne afrundede hjørner — kortets ydre
  // radius klipper hover-baggrunden naturligt på første/sidste række via
  // overflow-hidden. Lidt mere vertikal padding (py-3.5) end de åbne lister
  // for at rækkerne får luft i et tæt samlet kort.
  if (!program.submittedDate) {
    return <SavedProgramRow program={program} />;
  }
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={program.title}
      className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-lilla)]"
    >
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center"
        aria-hidden
      >
        <Check
          className="h-3.5 w-3.5 text-[var(--color-done-dim)]"
          strokeWidth={3}
        />
      </span>
      <span className="min-w-0 flex-1 truncate text-sm text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]">
        {program.title}
      </span>
      <RowChevron />
    </a>
  );
}

/* -------------------- Tilmeldinger & muligheder -------------------- */

function ActivitiesList({ activities }: { activities: PhaseActivity[] }) {
  return (
    <section className="border-t border-[var(--color-border)] pt-8 md:pt-10">
      <SectionHeading icon={Sparkles}>Hvad kan du gøre nu?</SectionHeading>
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
      className="group flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
      aria-label={isDone ? `${activity.title} (tilmeldt)` : activity.title}
    >
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center"
        aria-hidden
      >
        {isDone ? (
          <Check
            className="h-3.5 w-3.5 text-[var(--color-done-dim)]"
            strokeWidth={3}
          />
        ) : null}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]">
        {activity.title}
      </span>
      {activity.meta && !isDone ? (
        <span className="shrink-0 text-xs text-[var(--color-muted-foreground)]">
          {activity.meta}
        </span>
      ) : null}
      <RowChevron />
    </a>
  );
}

/* -------------------- Uploadet dokumenter -------------------- */

function DocumentsList({ documents }: { documents: UploadedDocument[] }) {
  return (
    <section>
      <SectionHeading icon={FileCheck}>Uploadet dokumenter</SectionHeading>
      <ul className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] divide-y divide-[var(--color-border)]">
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
  // Rendres altid inde i kort-wrapperen i DocumentsList — kant-til-kant uden
  // egne afrundede hjørner. Signal bæres af ikon + farve: verified = grøn
  // check + dæmpet titel; missing = lilla dot + lilla titel + "Mangler"-tag.
  const isMissing = document.status === "missing";
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={isMissing ? `${document.title} — mangler` : document.title}
      className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-lilla)]"
    >
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center"
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
      <span className="min-w-0 flex-1 truncate text-sm text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]">
        {document.title}
      </span>
      {isMissing ? (
        <span className="shrink-0 text-xs font-medium text-[var(--color-lilla)]">
          {document.meta}
        </span>
      ) : null}
      <RowChevron />
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
    <section className="border-t border-[var(--color-border)] pt-8 md:pt-10">
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
      className="group flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
      aria-label={isDone ? `${item.title} (klaret)` : item.title}
    >
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center"
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
      <span className="min-w-0 flex-1 truncate text-sm text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]">
        {item.title}
      </span>
      {item.meta ? (
        <span
          className={cn(
            "shrink-0 text-xs",
            isUrgent
              ? "font-medium text-[var(--color-lilla)]"
              : "text-[var(--color-muted-foreground)]",
          )}
        >
          {item.meta}
        </span>
      ) : null}
      <RowChevron />
    </a>
  );
}
