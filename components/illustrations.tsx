const LILLA = "var(--color-lilla)";
const LIME = "var(--color-lime)";

export function DomainIcon({
  domain,
  className = "h-4 w-4",
}: {
  domain: "frontend" | "ai" | "leadership" | "product";
  className?: string;
}) {
  const color = domain === "ai" || domain === "product" ? LIME : LILLA;
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none">
      {domain === "frontend" && (
        <>
          <rect x="2" y="3" width="12" height="10" rx="1.5" stroke={color} strokeWidth="1.3" />
          <line x1="2" y1="6.5" x2="14" y2="6.5" stroke={color} strokeWidth="1.3" />
          <circle cx="4" cy="5" r="0.6" fill={color} />
          <circle cx="6" cy="5" r="0.6" fill={color} />
        </>
      )}
      {domain === "ai" && (
        <>
          <circle cx="8" cy="8" r="3" stroke={color} strokeWidth="1.3" />
          <circle cx="3" cy="4" r="1" fill={color} />
          <circle cx="13" cy="4" r="1" fill={color} />
          <circle cx="3" cy="12" r="1" fill={color} />
          <circle cx="13" cy="12" r="1" fill={color} />
          <line x1="5" y1="6.5" x2="4" y2="5" stroke={color} strokeWidth="1" strokeDasharray="1 1" />
          <line x1="11" y1="6.5" x2="12" y2="5" stroke={color} strokeWidth="1" strokeDasharray="1 1" />
          <line x1="5" y1="9.5" x2="4" y2="11" stroke={color} strokeWidth="1" strokeDasharray="1 1" />
          <line x1="11" y1="9.5" x2="12" y2="11" stroke={color} strokeWidth="1" strokeDasharray="1 1" />
        </>
      )}
      {domain === "leadership" && (
        <>
          <circle cx="8" cy="4.5" r="1.8" stroke={color} strokeWidth="1.3" />
          <circle cx="3.5" cy="10.5" r="1.6" stroke={color} strokeWidth="1.3" />
          <circle cx="12.5" cy="10.5" r="1.6" stroke={color} strokeWidth="1.3" />
          <line x1="8" y1="6.5" x2="4.5" y2="9" stroke={color} strokeWidth="1.1" />
          <line x1="8" y1="6.5" x2="11.5" y2="9" stroke={color} strokeWidth="1.1" />
        </>
      )}
      {domain === "product" && (
        <>
          <path d="M8 2 L14 5 V11 L8 14 L2 11 V5 Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M8 2 L8 14 M2 5 L14 5 M2 11 L14 11" stroke={color} strokeWidth="1" opacity="0.4" />
        </>
      )}
    </svg>
  );
}
