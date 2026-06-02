import {
  ArrowRight,
  Atom,
  BookOpen,
  Cog,
  Compass,
  GraduationCap,
  HeartPulse,
  Scale,
  Search,
} from "lucide-react";
import type { IconComponent } from "../theme";
import { SectionHeading } from "./shared";

// AU's seks hovedområder — det er sådan unge faktisk tænker når de
// "browser" uddannelser (ikke efter faculty-koder). Hvert område får et
// ikon der differentierer rækken visuelt og bærer betydning, ikke
// dekoration: BookOpen=humaniora, Scale=jura/samfund, HeartPulse=sundhed,
// Atom=naturvidenskab, Cog=teknik, GraduationCap=pædagogik/undervisning.
const studyAreas: { label: string; icon: IconComponent }[] = [
  { label: "Humaniora", icon: BookOpen },
  { label: "Samfundsvidenskab", icon: Scale },
  { label: "Sundhedsvidenskab", icon: HeartPulse },
  { label: "Naturvidenskab", icon: Atom },
  { label: "Teknik", icon: Cog },
  { label: "Pædagogik", icon: GraduationCap },
];

export function StudySearchBar() {
  // To ligestillede veje ind i uddannelseskataloget — begge synlige fra start
  // så valget er åbent for både den målrettede søger (Astrid: "jeg vil læse
  // datavidenskab") og den udforskende (Jonas: "jeg ved ikke hvad jeg vil"):
  //  1. Søg — tast + Enter, eller klik den lille pile-knap inde i feltet
  //  2. Hovedområde-chips — klik et chip og bliv inspireret efter retning
  // Ingen toggle: at gemme inspirationsrækken bag en knap mister halvdelen af
  // målgruppen. Lette muted-baggrund + ikoner gør det til ét sammenhængende
  // "inspirations-modul" — ikke en filter-bar.
  return (
    <section>
      <SectionHeading icon={Compass}>Find din uddannelse</SectionHeading>
      <div className="space-y-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          role="search"
          aria-label="Søg efter en uddannelse"
          className="group flex w-full items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] py-1.5 pl-4 pr-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-colors focus-within:border-[var(--color-lilla)] focus-within:ring-2 focus-within:ring-[var(--color-lilla)]/30"
        >
          <Search
            className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] transition-colors group-focus-within:text-[var(--color-lilla)]"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Søg efter en uddannelse"
            aria-label="Søg efter en uddannelse"
            className="flex-1 bg-transparent py-1.5 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Søg"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-lilla)] text-white transition-colors hover:bg-[var(--color-lilla-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </form>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
          <p className="mb-3 text-xs text-[var(--color-muted-foreground)]">
            Eller vælg et hovedområde
          </p>
          <div className="flex flex-wrap gap-2">
            {studyAreas.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={(e) => e.preventDefault()}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3.5 py-2 text-xs font-medium text-[var(--color-foreground)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:border-[var(--color-lilla)] hover:bg-[var(--color-lilla-soft)] hover:text-[var(--color-lilla)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lilla)]"
              >
                <Icon
                  className="h-3.5 w-3.5 shrink-0 text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-lilla)]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
