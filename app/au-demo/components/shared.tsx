import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IconComponent } from "../theme";

type RowStatus = "done" | "urgent" | "none";

export function StatusIcon({ status }: { status: RowStatus }) {
  // Fast 16px leading-slot, aria-hidden. done → grøn Check, urgent → lilla dot,
  // none → tom spacer (holder titler venstrejusteret på tværs af blandede
  // rækker).
  return (
    <span
      className="flex h-4 w-4 shrink-0 items-center justify-center"
      aria-hidden
    >
      {status === "done" ? (
        <Check
          className="h-3.5 w-3.5 text-[var(--color-done-dim)]"
          strokeWidth={3}
        />
      ) : status === "urgent" ? (
        <span className="block h-2 w-2 rounded-full bg-[var(--color-brand)]" />
      ) : null}
    </span>
  );
}

export function RowTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="min-w-0 flex-1 truncate text-sm text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-brand)]">
      {children}
    </span>
  );
}

export function Row({
  ariaLabel,
  leading,
  trailing,
  children,
  density,
}: {
  ariaLabel?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  density: "tight" | "comfortable";
}) {
  // Inert link-shell der centraliserer href="#" + preventDefault og den fælles
  // hover/focus/layout-grammatik. tight = afrundede liste-rækker (grid gap-1);
  // comfortable = kant-til-kant rækker i kort-wrapper (ring-inset).
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={ariaLabel}
      className={cn(
        "group flex items-center transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]",
        density === "tight"
          ? "gap-2.5 rounded-xl px-3 py-2"
          : "gap-3 px-4 py-3.5 focus-visible:ring-inset",
      )}
    >
      {leading}
      {children}
      {trailing}
      <RowChevron />
    </a>
  );
}

export function SectionHeading({
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
    <h2 className="mb-4 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground)]">
      <Icon className="h-4 w-4" aria-hidden />
      {children}
    </h2>
  );
}

export function RowChevron() {
  // Statisk klikbarheds-hint: ChevronRight i højre side på alle klikbare
  // rækker. Full muted-foreground (ikke /50) så den faktisk er synlig i
  // statisk tilstand — opacity-reduktion gjorde at den forsvandt og bidrog
  // til "ligner information"-følelsen. Brightner til lilla på hover.
  return (
    <ChevronRight
      className="ml-auto h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-brand)]"
      aria-hidden
    />
  );
}
