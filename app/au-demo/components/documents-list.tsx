import { FileCheck } from "lucide-react";
import type { UploadedDocument } from "../data";
import { Row, RowTitle, SectionHeading, StatusIcon } from "./shared";

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
    <Row
      density="comfortable"
      ariaLabel={isMissing ? `${document.title} — mangler` : document.title}
      leading={<StatusIcon status={isMissing ? "urgent" : "done"} />}
      trailing={
        isMissing ? (
          <span className="shrink-0 text-xs font-medium text-[var(--color-brand)]">
            {document.meta}
          </span>
        ) : undefined
      }
    >
      <RowTitle>{document.title}</RowTitle>
    </Row>
  );
}
