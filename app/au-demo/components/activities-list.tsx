import { Lightbulb } from "lucide-react";
import type { PhaseActivity } from "../data";
import { Row, RowTitle, SectionHeading, StatusIcon } from "./shared";

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
    <Row
      density="tight"
      ariaLabel={isDone ? `${activity.title} (tilmeldt)` : activity.title}
      leading={<StatusIcon status={isDone ? "done" : "none"} />}
      trailing={
        activity.meta && !isDone ? (
          <span className="shrink-0 text-xs text-[var(--color-muted-foreground)]">
            {activity.meta}
          </span>
        ) : undefined
      }
    >
      <RowTitle>{activity.title}</RowTitle>
    </Row>
  );
}
