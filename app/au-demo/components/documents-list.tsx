import { Check, FileCheck } from "lucide-react";
import type { UploadedDocument } from "../data";
import { RowChevron, SectionHeading } from "./shared";

export function DocumentsList({ documents }: { documents: UploadedDocument[] }) {
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
