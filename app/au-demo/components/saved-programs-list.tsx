import {
  Check,
  ExternalLink,
  FilePen,
  GraduationCap,
  Send,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  demoToday,
  type DraftApplication,
  type SavedProgram,
} from "../data";
import { daysUntil } from "../theme";
import { RowChevron, SectionHeading } from "./shared";

export function SavedProgramsList({
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
      <h3 className="mt-1 text-2xl font-semibold leading-tight text-[var(--color-foreground)] md:text-3xl">
        {program.title}
      </h3>
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
