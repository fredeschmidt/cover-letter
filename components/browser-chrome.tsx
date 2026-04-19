import { ArrowUpRight } from "lucide-react";

export function BrowserChrome({
  url,
  showArrow = false,
}: {
  url: string;
  showArrow?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-white/5 bg-[rgba(0,0,0,0.25)] px-3 py-2">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="ml-2 flex flex-1 items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-[11px] text-[var(--color-muted-foreground)]">
        <span className="text-[var(--color-lime)]">●</span>
        {url}
      </div>
      {showArrow ? (
        <ArrowUpRight className="h-3.5 w-3.5 text-[var(--color-muted-foreground)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-foreground)]" />
      ) : null}
    </div>
  );
}
