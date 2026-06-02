import { Clock, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PhaseActivity, SUItem } from "../data";
import { Row, RowTitle, SectionHeading, StatusIcon } from "./shared";
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
    <Row
      density="tight"
      ariaLabel={isDone ? `${item.title} (klaret)` : item.title}
      leading={
        <StatusIcon status={isDone ? "done" : isUrgent ? "urgent" : "none"} />
      }
      trailing={
        item.meta ? (
          <span
            className={cn(
              "shrink-0 text-xs",
              isUrgent
                ? "font-medium text-[var(--color-brand)]"
                : "text-[var(--color-muted-foreground)]",
            )}
          >
            {item.meta}
          </span>
        ) : undefined
      }
    >
      <RowTitle>{item.title}</RowTitle>
    </Row>
  );
}
