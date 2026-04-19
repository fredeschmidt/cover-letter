"use client";

import { motion } from "framer-motion";
import { Check, Heart, MapPin, Minus } from "lucide-react";
import { BrowserChrome } from "@/components/browser-chrome";
import { pair } from "@/lib/motion";

type Strength = "strong" | "ok" | "miss";

type MatchItem = {
  label: string;
  value: string;
  strength: Strength;
};

const profileMatch: MatchItem[] = [
  { label: "Rolle", value: "AI frontend", strength: "strong" },
  { label: "AI", value: "Stærk vinkel", strength: "strong" },
  { label: "Teknologi", value: "Next.js, React", strength: "strong" },
];

const dreamMatch: MatchItem[] = [
  { label: "In-house", value: "Ja", strength: "strong" },
  { label: "Afstand", value: "17 km", strength: "miss" },
  { label: "Størrelse", value: "Under 100", strength: "strong" },
  { label: "Kontor", value: "Fysisk kontor", strength: "strong" },
  { label: "Ansættelse", value: "Vikariat", strength: "ok" },
];

const strengthColor: Record<Strength, string> = {
  strong: "#5ad897",
  ok: "#ffb83a",
  miss: "#ff6279",
};

function StrengthIcon({ strength }: { strength: Strength }) {
  const color = strengthColor[strength];
  if (strength === "strong") return <Check className="h-3 w-3" style={{ color }} />;
  if (strength === "ok")
    return (
      <span
        className="inline-block text-[10px] font-bold leading-none"
        style={{ color }}
      >
        ~
      </span>
    );
  return <Minus className="h-3 w-3" style={{ color }} />;
}

function ScoreRing({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  const circumference = 2 * Math.PI * 20;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-12 w-12">
        <svg viewBox="0 0 48 48" className="h-full w-full -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3"
            fill="none"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke={color}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span
            className="text-xs font-bold"
            style={{ color, letterSpacing: "-0.02em" }}
          >
            {value}
          </span>
        </div>
      </div>
      <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/60">
        {label}
      </span>
    </div>
  );
}

function MatchColumn({ title, items }: { title: string; items: MatchItem[] }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-1.5 border-b border-white/10 pb-1 text-[10px] font-semibold tracking-tight text-white">
        {title}
      </div>
      <div className="space-y-0">
        {items.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex items-center justify-between gap-2 border-b border-white/5 py-1 last:border-b-0"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white/55">
              {item.label}
            </span>
            <span
              className="flex items-center gap-1 text-[10px] font-semibold"
              style={{ color: strengthColor[item.strength] }}
            >
              <StrengthIcon strength={item.strength} />
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function JobsoegningPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={pair}
      className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]"
    >
      <BrowserChrome url="jobsoegning.local/jobs" />

      {/* Mock job card */}
      <div
        className="relative p-4"
        style={{
          backgroundImage:
            "radial-gradient(500px 300px at 10% -10%, rgba(138, 114, 255, 0.18), transparent 55%), radial-gradient(400px 260px at 100% 0%, rgba(90, 216, 151, 0.1), transparent 55%)",
        }}
      >
        <div className="rounded-lg border border-white/10 bg-[rgba(20,22,38,0.7)] p-3">
          {/* Meta row */}
          <div className="mb-2 flex items-center justify-between text-[9px] text-white/50">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5" />
              Aarhus · Jobindex
            </span>
            <span>
              Frist <span className="text-white/80">05/05</span>
            </span>
          </div>

          {/* Title */}
          <div className="mb-3">
            <h4
              className="text-base font-bold leading-tight text-white md:text-lg"
              style={{ letterSpacing: "-0.02em" }}
            >
              AI Frontend-udvikler
            </h4>
          </div>

          {/* Rings + matches */}
          <div className="grid grid-cols-[auto_1fr_1fr] gap-3">
            <div className="flex flex-col items-center gap-2 border-r border-white/10 pr-3">
              <ScoreRing value={100} label="Profil" color="#5ad897" />
              <ScoreRing value={75} label="Arbejdsplads" color="#8a72ff" />
            </div>
            <MatchColumn title="Profil" items={profileMatch} />
            <MatchColumn title="Arbejdsplads" items={dreamMatch} />
          </div>

          {/* Actions */}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(90,216,151,0.3)] bg-[rgba(90,216,151,0.08)] px-2.5 py-1 text-[10px] font-medium text-[#5ad897]"
            >
              <Heart className="h-2.5 w-2.5" />
              Gem
            </button>
            <button
              type="button"
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/60"
            >
              Skjul
            </button>
            <div className="flex-1" />
            <span className="text-[9px] text-white/50">
              Foreslået ansøgning →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
