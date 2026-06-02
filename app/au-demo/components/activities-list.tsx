import { Check, Lightbulb } from "lucide-react";
import type { PhaseActivity } from "../data";
import { RowChevron, SectionHeading } from "./shared";

export function ActivitiesList({ activities }: { activities: PhaseActivity[] }) {
  return (
    <section className="border-t border-[var(--color-border)] pt-8 md:pt-10">
      <SectionHeading icon={Lightbulb}>Hvad kan du gøre nu?</SectionHeading>
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

export function ActivityRow({ activity }: { activity: PhaseActivity }) {
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
