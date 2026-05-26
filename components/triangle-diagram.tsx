"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { pair } from "@/lib/motion";

/**
 * Trekant-diagram: Frederikke i centrum, tre pillars i hjørnerne.
 * Hver pillar har en bladformet løkke der buer ud fra centrum, rører pillaren,
 * og buer tilbage igen — illustrerer to-vejs kommunikation (feedback-loop).
 */
export function TriangleDiagram({ className }: { className?: string }) {
  // viewBox 200x180. Top-pillar i (100,49), nederst-venstre (50,133), nederst-højre (150,133).
  // Centrum (100,98).
  const cx = 100;
  const cy = 98;
  const pTop = { x: 100, y: 49 };
  const pLeft = { x: 50, y: 133 };
  const pRight = { x: 150, y: 133 };

  // Anker-punkter på hver pillar — hvor løkken rører pillaren.
  const aTop = { x: pTop.x, y: pTop.y + 10 };
  const aLeft = { x: pLeft.x + 14, y: pLeft.y - 8 };
  const aRight = { x: pRight.x - 14, y: pRight.y - 8 };

  // Bygger en bladformet løkke: starter ved centrum, buer ud til ankeret, og
  // buer tilbage på den anden side. Illustrerer to-vejs kommunikation.
  const loop = (anchor: { x: number; y: number }) => {
    const dx = anchor.x - cx;
    const dy = anchor.y - cy;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    // Perpendikulær (90° med uret i SVG-koordinater)
    const px = -uy;
    const py = ux;
    const stem = 14;
    const offset = 3.5;
    const bulge = 18;
    const sx = cx + ux * stem + px * offset;
    const sy = cy + uy * stem + py * offset;
    const ex = cx + ux * stem - px * offset;
    const ey = cy + uy * stem - py * offset;
    const c1x = cx + ux * len * 0.35 + px * bulge;
    const c1y = cy + uy * len * 0.35 + py * bulge;
    const c2x = anchor.x - ux * len * 0.15 + px * bulge * 0.65;
    const c2y = anchor.y - uy * len * 0.15 + py * bulge * 0.65;
    const c3x = anchor.x - ux * len * 0.15 - px * bulge * 0.65;
    const c3y = anchor.y - uy * len * 0.15 - py * bulge * 0.65;
    const c4x = cx + ux * len * 0.35 - px * bulge;
    const c4y = cy + uy * len * 0.35 - py * bulge;
    const f = (n: number) => n.toFixed(1);
    return `M ${f(sx)} ${f(sy)} C ${f(c1x)} ${f(c1y)}, ${f(c2x)} ${f(c2y)}, ${anchor.x} ${anchor.y} C ${f(c3x)} ${f(c3y)}, ${f(c4x)} ${f(c4y)}, ${f(ex)} ${f(ey)}`;
  };

  const stroke = "var(--color-lilla)";

  const edges = [
    { d: loop(aTop), delay: 0 },
    { d: loop(aLeft), delay: 1.2 },
    { d: loop(aRight), delay: 2.4 },
  ];

  return (
    <div
      className={`relative mx-auto w-full max-w-[440px] md:max-w-[480px] ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 200 180"
        className="block h-auto w-full overflow-visible"
        aria-hidden
      >
        {/* Løkker */}
        {edges.map((e, i) => (
          <motion.path
            key={i}
            d={e.d}
            stroke={stroke}
            strokeWidth={0.6}
            strokeOpacity={0.45}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.2 + i * 0.18, ease: "easeInOut" }}
          />
        ))}

        {/* Pulserende prikker — løber langs løkken (ud til pillar og tilbage til mig) */}
        {edges.map((e, i) => (
          <circle
            key={`pulse-${i}`}
            r="1.6"
            fill={stroke}
            opacity="0"
            style={{ filter: `drop-shadow(0 0 3px ${stroke})` }}
          >
            <animateMotion
              dur="5.5s"
              begin={`${e.delay}s`}
              repeatCount="indefinite"
              path={e.d}
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0.9;0"
              keyTimes="0;0.08;0.92;1"
              dur="5.5s"
              begin={`${e.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="1.6;1.6;2.4;1.6;1.6"
              keyTimes="0;0.45;0.5;0.55;1"
              dur="5.5s"
              begin={`${e.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Små anker-prikker hvor løkken rører pillaren */}
        {[aTop, aLeft, aRight].map((a, i) => (
          <motion.circle
            key={`anchor-${i}`}
            cx={a.x}
            cy={a.y}
            r="1.4"
            fill={stroke}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...pair, delay: 1.0 + i * 0.12 }}
          />
        ))}
      </svg>

      {/* Center — Frederikke (placeret hvor løkkerne mødes, SVG y=98 → 54.4% af 180) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...pair, delay: 0.1 }}
        className="absolute left-1/2 top-[54.4%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="relative h-20 w-20 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-card)] md:h-24 md:w-24"
          style={{ boxShadow: "0 0 28px -6px var(--color-lilla)" }}
        >
          <Image
            src="/frederikke.jpg"
            alt="Frederikke Schmidt"
            fill
            priority
            sizes="96px"
            className="object-cover"
            style={{ objectPosition: "50% 25%" }}
          />
        </div>
      </motion.div>

      {/* Pillar-labels — absolut positioneret oven på SVG'en */}
      <PillarLabel position="top" title="Teknik" delay={0.55} />
      <PillarLabel position="left" title="Forretning" delay={0.7} />
      <PillarLabel position="right" title="Bruger" delay={0.85} />
    </div>
  );
}

function PillarLabel({
  position,
  title,
  delay,
}: {
  position: "top" | "left" | "right";
  title: string;
  delay: number;
}) {
  // Labels centreres direkte over/under deres ankerpunkter (aTop x=50%, aLeft x=32%, aRight x=68%).
  // Samme korte y-afstand til hver blomst, så alle tre føles lige tæt på.
  const posClass =
    position === "top"
      ? "left-1/2 top-[22%] -translate-x-1/2 text-center"
      : position === "left"
        ? "left-[32%] top-[74%] -translate-x-1/2 text-center"
        : "left-[68%] top-[74%] -translate-x-1/2 text-center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...pair, delay }}
      className={`absolute ${posClass}`}
    >
      <p className="text-sm font-semibold tracking-tight text-[var(--color-foreground)] md:text-base">
        {title}
      </p>
    </motion.div>
  );
}
