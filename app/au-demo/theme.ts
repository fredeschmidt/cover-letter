import type { ComponentType, CSSProperties, SVGProps } from "react";

// Pegt mod SVG-komponent-typen lucide eksporterer, så vi kan tage ikoner
// som props uden at trække i ikon-bibliotekets interne typer.
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export function daysUntil(targetISO: string, fromISO: string): number {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const from = new Date(fromISO + "T00:00:00").getTime();
  const target = new Date(targetISO + "T00:00:00").getTime();
  return Math.round((target - from) / MS_PER_DAY);
}

// Scoped palette: neutral light surface + blue brand. Inlined so it covers the
// portfolio's aurora and overrides shared CSS variables only for this page.
export const auDemoTheme = {
  "--color-background": "#f5f7fb",
  "--color-foreground": "#0b1220",
  "--color-card": "#ffffff",
  "--color-card-foreground": "#0b1220",
  "--color-muted": "#eef1f6",
  "--color-muted-foreground": "#5b6573",
  "--color-border": "rgba(15, 23, 42, 0.08)",
  "--color-brand": "#2563eb",
  "--color-brand-dim": "#1d4ed8",
  "--color-brand-soft": "rgba(37, 99, 235, 0.10)",
  "--color-done-dim": "#047857",
  "--color-done-soft": "rgba(16, 185, 129, 0.14)",
} as CSSProperties;
