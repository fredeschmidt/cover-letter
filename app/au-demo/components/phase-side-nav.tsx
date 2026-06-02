import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { journeyPhases, type JourneyPhaseId } from "../data";

export function PhaseSideNav({
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
      <ol className="flex flex-row justify-between gap-1 md:flex-col md:justify-start">
        {journeyPhases.map((phase, i) => {
          const isActive = phase.id === active;
          const isPast = i < activeIndex;
          return (
            <li key={phase.id} className="flex-1 md:flex-none">
              <button
                type="button"
                aria-current={isActive ? "step" : undefined}
                onClick={() => onChange(phase.id)}
                className={cn(
                  "group flex w-full flex-col items-center gap-1.5 rounded-xl px-1 py-2 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)] md:flex-row md:gap-3 md:px-3 md:py-2.5 md:text-left",
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
