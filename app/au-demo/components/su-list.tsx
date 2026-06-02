import { Check, Clock, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PhaseActivity, SUItem } from "../data";
import { RowChevron, SectionHeading } from "./shared";
import { ActivityRow } from "./activities-list";

export function SUList({ items }: { items: SUItem[] }) {
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

export function WhileWaitingList({
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
