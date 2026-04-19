"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { pair } from "@/lib/motion";

type Region = { name: string; color: string; chipShadow: string };

const regions: readonly Region[] = [
  { name: "Østjylland", color: "#0a4ea3", chipShadow: "0 0 8px #0a4ea380" },
  { name: "Bornholm", color: "#2a8b3a", chipShadow: "0 0 8px #2a8b3a80" },
  { name: "Fyn", color: "#1aa3d4", chipShadow: "0 0 8px #1aa3d480" },
  { name: "Midtvest", color: "#e85a23", chipShadow: "0 0 8px #e85a2380" },
  { name: "Nord", color: "#1a4a8a", chipShadow: "0 0 8px #1a4a8a80" },
  { name: "Syd", color: "#d63a3a", chipShadow: "0 0 8px #d63a3a80" },
  { name: "Øst", color: "#b8324a", chipShadow: "0 0 8px #b8324a80" },
  { name: "Lorry", color: "#0e2a5e", chipShadow: "0 0 8px #0e2a5e80" },
];

type ButtonVariant = "primary" | "secondary";
type ButtonState = "default" | "hover";

const buttonStyles: Record<
  ButtonVariant,
  Record<ButtonState, { background: string; color: string; borderColor: string }>
> = {
  primary: {
    default: { background: "#1942c4", color: "#ffffff", borderColor: "transparent" },
    hover: { background: "#0a1a52", color: "#ffffff", borderColor: "transparent" },
  },
  secondary: {
    default: {
      background: "transparent",
      color: "#ffffff",
      borderColor: "rgba(255,255,255,0.35)",
    },
    hover: {
      background: "rgba(255,255,255,0.08)",
      color: "#ffffff",
      borderColor: "rgba(255,255,255,0.45)",
    },
  },
};

function MockButton({
  variant,
  state,
}: {
  variant: ButtonVariant;
  state: ButtonState;
}) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
      style={buttonStyles[variant][state]}
    >
      <ArrowRight className="h-2.5 w-2.5" />
      <span>Læs mere</span>
      <ArrowRight className="h-2.5 w-2.5" />
    </div>
  );
}

const canvasBgStyle = {
  backgroundImage:
    "radial-gradient(500px 300px at 10% -10%, rgba(122, 77, 255, 0.18), transparent 55%), radial-gradient(400px 260px at 100% 0%, rgba(90, 216, 151, 0.10), transparent 55%)",
} as const;

export function TV2RegPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={pair}
      className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-gradient-to-br from-[#0a0f2e] via-[#0b0e22] to-[#0f1220]"
    >
      <div className="flex items-center gap-2 border-b border-white/5 bg-[rgba(0,0,0,0.25)] px-3 py-2">
        <FigmaMark />
        <div className="ml-1 flex flex-1 items-center gap-2 text-[11px] text-[var(--color-muted-foreground)]">
          <span className="text-white/85">TV2 Regionernes designsystem</span>
          <span className="opacity-50">/</span>
          <span>Buttons</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--color-lime)]" />
          <span className="text-[10px] text-[var(--color-muted-foreground)]">
            8 regioner
          </span>
        </div>
      </div>

      <div className="relative p-4" style={canvasBgStyle}>
        <div className="relative">
          <div className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--color-violet)]">
            Frame · Button
          </div>

          <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
            <div className="mb-2 grid grid-cols-[60px_1fr_1fr] items-end gap-2 text-[9px] text-white/55">
              <span />
              <span className="font-semibold text-white/90">Primary</span>
              <span className="font-semibold text-white/90">Secondary</span>
            </div>

            <div className="mb-1.5 grid grid-cols-[60px_1fr_1fr] items-center gap-2">
              <span className="text-[9px] text-white/55">Default</span>
              <MockButton variant="primary" state="default" />
              <MockButton variant="secondary" state="default" />
            </div>

            <div className="grid grid-cols-[60px_1fr_1fr] items-center gap-2">
              <span className="text-[9px] text-white/55">Hover</span>
              <MockButton variant="primary" state="hover" />
              <MockButton variant="secondary" state="hover" />
            </div>
          </div>

          <div className="mt-3 rounded-md border border-white/10 bg-white/[0.04] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--color-violet)]">
                Tokens · Tema
              </span>
              <span className="text-[9px] font-mono text-white/55">
                primary-color
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {regions.map((r) => (
                <div
                  key={r.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: r.color, boxShadow: r.chipShadow }}
                  />
                  <span className="text-[9px] font-medium text-white/85">
                    {r.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FigmaMark() {
  return (
    <svg
      viewBox="0 0 38 57"
      className="h-3.5 w-auto"
      aria-hidden
    >
      <path d="M19 28.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19z" fill="#1abcfe" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
    </svg>
  );
}
