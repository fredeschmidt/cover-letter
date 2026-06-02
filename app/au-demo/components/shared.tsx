import { ChevronRight } from "lucide-react";
import type { IconComponent } from "../theme";

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
      className="ml-auto h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]"
      aria-hidden
    />
  );
}
