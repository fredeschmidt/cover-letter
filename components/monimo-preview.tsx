"use client";

import { motion } from "framer-motion";
import { BrowserChrome } from "@/components/browser-chrome";
import { pair } from "@/lib/motion";

const toneColor = {
  income: "#5ad897",
  fixed: "#ff6279",
  spend: "#ffb83a",
  save: "#8a72ff",
} as const;

type Tone = keyof typeof toneColor;

type Category = {
  emoji: string;
  label: string;
  amount: string;
  value: number;
  tone: Tone;
};

const categories: readonly Category[] = [
  { emoji: "💰", label: "Din løn", amount: "32.400 kr./md", value: 32400, tone: "income" },
  { emoji: "🏠", label: "Faste udgifter", amount: "9.200 kr./md", value: 9200, tone: "fixed" },
  { emoji: "🛒", label: "Forventet forbrug", amount: "5.000 kr./md", value: 5000, tone: "spend" },
  { emoji: "🐷", label: "Opsparing", amount: "2.500 kr./md", value: 2500, tone: "save" },
];

const maxValue = Math.max(...categories.map((c) => c.value));

// Hoisted to module scope so these style objects aren't re-allocated each render.
const contentBgStyle = {
  backgroundImage:
    "radial-gradient(500px 300px at 10% -10%, rgba(107, 134, 255, 0.25), transparent 55%), radial-gradient(400px 260px at 100% 0%, rgba(90, 216, 151, 0.12), transparent 55%)",
} as const;

const gridOverlayStyle = {
  backgroundImage:
    "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
  backgroundSize: "26px 26px",
} as const;

const titleStyle = { letterSpacing: "-0.015em" } as const;
const surplusColorStyle = { color: toneColor.income } as const;

export function MonimoPreview() {
  return (
    <motion.a
      href="https://monimo.dk/budget"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={pair}
      whileHover={{ y: -3 }}
      className="group block overflow-hidden rounded-xl border border-[var(--color-border)] bg-gradient-to-br from-[#0a0f2e] via-[#0b0e22] to-[#0f1220] transition-all"
    >
      <BrowserChrome url="monimo.dk/budget" showArrow />

      {/* Mock content */}
      <div className="relative p-4" style={contentBgStyle}>
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={gridOverlayStyle}
        />

        <div className="relative">
          <div className="mb-1 text-[10px] font-medium tracking-[0.15em] text-[var(--color-violet)] uppercase">
            Byg dit budget
          </div>
          <div
            className="mb-4 text-base font-bold leading-tight text-white md:text-lg"
            style={titleStyle}
          >
            Hvor meget har du tilbage i slutningen af måneden?
          </div>

          <div className="space-y-2">
            {categories.map((c, i) => {
              const color = toneColor[c.tone];
              const widthPct = (c.value / maxValue) * 100;
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...pair, delay: 0.1 + i * 0.06 }}
                  className="flex items-center gap-3 rounded-md bg-white/[0.04] px-2.5 py-2"
                >
                  <span className="text-base">{c.emoji}</span>
                  <div className="flex-1">
                    <div className="mb-1 flex items-baseline justify-between text-[11px]">
                      <span className="text-white/80">{c.label}</span>
                      <span className="font-mono" style={{ color }}>
                        {c.amount}
                      </span>
                    </div>
                    <div className="relative h-1 rounded-full bg-white/5">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{
                          width: `${widthPct}%`,
                          background: color,
                          boxShadow: `0 0 8px ${color}`,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-md border border-[rgba(90,216,151,0.35)] bg-[rgba(90,216,151,0.08)] px-3 py-2">
            <span className="text-[11px] font-medium text-white/90">
              Månedligt overskud
            </span>
            <span
              className="font-mono text-sm font-bold"
              style={surplusColorStyle}
            >
              + 17.700 kr.
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
