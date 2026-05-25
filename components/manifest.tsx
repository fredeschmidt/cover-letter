"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { pair } from "@/lib/motion";

/**
 * Case-tekst for chapter 2 og 3 — bruges som intro.
 * Chapter 1 inliner sin tekst som flere paragraffer direkte i Section.
 */
const caseTexts = {
  forside:
    "Som projektleder for TV2 Østjyllands nye forside byggede jeg bro mellem forretningens mål og brugernes behov. Jeg satte processen i gang med workshops og brugertest, og vi landede på et one-column layout med fokus på reels, som blev det første af sin slags i et dansk nyhedsmedie. Valget var underbygget af data fra 100.000+ daglige besøgende og tog afsæt i den måde, brugerne allerede navigerer på fra sociale medier.",
  valgdag:
    "Til kommunalvalget 2025 satte jeg de tekniske forberedelser i gang 8 måneder før valgdagen, så husets behov til CMS, valgmoduler og den visuelle oplevelse blev hørt og omsat i god tid. Jeg faciliterede møder, holdt overblikket og gjorde det tydeligt, hvad der teknisk kunne lade sig gøre. Med erfaring fra sidste valg og forståelse for både forretning og brugere hjalp jeg med at prioritere de idéer, der skabte mest værdi. Samtidig kommunikerede jeg løbende om fremdrift og forberedte nødplaner, så huset kunne have ro i maven efter sidste valgs trafiknedbrud. Da en ekstern Cloudflare-fejl ramte på valgdagen, kunne vi aktivere nødplanen roligt, informere hurtigt og lande dagen med overblik og overskud.",
};

/**
 * Case 1 — Bindeled · "Vendepunktet"
 * Én kurve fra fejl/uro (top-venstre, zigzag) ned til ro (bund-højre, flad).
 * "JEG TRÅDTE IND"-markør ved kurvens knæk.
 * Start- og slut-labels forankret ved kurvens to ender.
 */
function CaseBindeled() {
  const stroke = "var(--color-lilla)";
  const muted = "var(--color-muted-foreground)";

  // Kurve: skarp zigzag-uro før markøren, glat beroligelse efter
  // viewBox 400x150 — zigzag starter højere (y=38) så toppen er fri til labellen
  const curve =
    "M 10 38 L 14 46 L 20 36 L 28 60 L 36 40 L 46 66 L 54 48 L 64 42 L 74 70 L 84 50 L 94 36 L 106 72 L 118 46 L 130 76 L 144 50 L 160 78 L 170 84 C 220 92, 290 122, 390 124";

  // Markør "JEG TRÅDTE IND" — placeret ved et knæk på kurven
  const markerX = 170;
  const markerY = 84;

  // Startpunkt — der hvor kurven (og krisen) begynder
  const startX = 10;
  const startY = 38;

  // Endepunkt — den lilla glow-prik der lander i den flade del
  const endX = 386;
  const endY = 122;

  return (
    <div className="mt-2">
      <div className="relative w-full">
        <svg
          viewBox="0 0 400 150"
          className="block h-auto w-full overflow-visible"
          aria-hidden
          style={{ maxHeight: 180 }}
        >
          {/* Selve kurven */}
          <motion.path
            d={curve}
            stroke={stroke}
            strokeWidth={1.1}
            strokeOpacity={0.7}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.6, delay: 0.1, ease: "easeInOut" }}
          />

          {/* Start-prik (samme stil som slut-prikken, men uden glow — det er krisens udgangspunkt) */}
          <motion.circle
            cx={startX}
            cy={startY}
            r={3.4}
            fill={stroke}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ ...pair, delay: 0.05 }}
          />

          {/* Start-label: står frit over kurvens zigzag-zone.
              NB: text skrumper på sm:+ fordi SVG'et skaleres op via viewBox — mindre font-px
              giver samme visuelle størrelse på bredere skærme. Gælder også de øvrige <text>. */}
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ ...pair, delay: 0.15 }}
          >
            <text
              x={startX}
              y={startY - 10}
              fill={muted}
              className="text-[10px] sm:text-[7px]"
              style={{
                letterSpacing: "0.2em",
                fontWeight: 500,
              }}
            >
              FEJL, LAV TILLID I HUSET
            </text>
          </motion.g>

          {/* Markør: lille vertikal tick + label "JEG TRÅDTE IND" */}
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ ...pair, delay: 0.7 }}
          >
            <line
              x1={markerX}
              y1={markerY - 16}
              x2={markerX}
              y2={markerY + 8}
              stroke={stroke}
              strokeWidth={0.8}
              strokeOpacity={0.55}
            />
            <circle cx={markerX} cy={markerY} r={2.2} fill={stroke} />
            <text
              x={markerX + 6}
              y={markerY - 10}
              fill={stroke}
              className="text-[10.5px] uppercase sm:text-[7.5px]"
              style={{
                letterSpacing: "0.22em",
                fontWeight: 600,
              }}
            >
              Jeg trådte ind
            </text>
          </motion.g>

          {/* Slut-prik med glow */}
          <motion.circle
            cx={endX}
            cy={endY}
            r={3.4}
            fill={stroke}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ ...pair, delay: 1.5 }}
            style={{ filter: `drop-shadow(0 0 6px ${stroke})` }}
          />

          {/* Slut-label: forankret ved slut-prikken, bund-højre */}
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ ...pair, delay: 1.65 }}
          >
            <text
              x={endX}
              y={endY + 16}
              textAnchor="end"
              fill={stroke}
              className="text-[10px] sm:text-[7px]"
              style={{
                letterSpacing: "0.2em",
                fontWeight: 600,
              }}
            >
              RO · OPLYST HUS
            </text>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

/**
 * Case 2 — Forside · "FØR ↔ NU"
 * To-spaltet sammenligning: traditionelt multi-column grid (dr.dk-stil) til
 * venstre, modigt one-column feed med 2:3 reels til højre.
 */
function CaseForside() {
  const stroke = "var(--color-lilla)";

  // Artikel-rækker: skeleton-look (titel-linje + meta-linje)
  // 2 reels iblandet — så fokus på reels er tydeligt i "NU"-layoutet
  type Row =
    | { kind: "article"; titleW: number; metaW: number }
    | { kind: "reel" };

  const nuRows: Row[] = [
    { kind: "article", titleW: 78, metaW: 32 },
    { kind: "reel" },
    { kind: "article", titleW: 64, metaW: 28 },
  ];

  return (
    <div className="mt-2">
      <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-[200px_170px] md:justify-center md:gap-10">
        {/* FØR — traditionelt 3-col grid (referencepunkt) */}
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...pair, delay: 0.1 }}
          className="w-[200px]"
        >
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
            Før · Traditionelt grid
          </p>
          <div className="space-y-1" aria-hidden>
            {/* Øverst: stor hero til venstre + to mindre stablet til højre */}
            <div className="grid grid-cols-3 gap-1">
              <div className="col-span-2 aspect-[3/2] rounded-[2px] bg-[var(--color-muted)] opacity-55" />
              <div className="flex flex-col gap-1">
                <div className="aspect-[3/2] rounded-[2px] bg-[var(--color-muted)] opacity-50" />
                <div className="aspect-[3/2] rounded-[2px] bg-[var(--color-muted)] opacity-50" />
              </div>
            </div>
            {/* Nedenunder: spejlvendt — to mindre stablet til venstre + stor hero til højre */}
            <div className="grid grid-cols-3 gap-1">
              <div className="flex flex-col gap-1">
                <div className="aspect-[3/2] rounded-[2px] bg-[var(--color-muted)] opacity-50" />
                <div className="aspect-[3/2] rounded-[2px] bg-[var(--color-muted)] opacity-50" />
              </div>
              <div className="col-span-2 aspect-[3/2] rounded-[2px] bg-[var(--color-muted)] opacity-55" />
            </div>
          </div>
        </motion.div>

        {/* NU — modigt one-column med prominent reels */}
        <div className="w-[170px]">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--color-lilla)]">
            Nu · One-column
          </p>
          <div className="flex flex-col gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/40 p-3">
            {nuRows.map((row, i) => {
              if (row.kind === "reel") {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ ...pair, delay: 0.15 + i * 0.08 }}
                    className="flex flex-col gap-1.5"
                  >
                    {/* Reel-thumbnail i lilla — 2:3 portrait med centreret play */}
                    <div
                      className="relative aspect-[2/3] w-full rounded-[4px]"
                      style={{
                        background: stroke,
                        boxShadow: `0 0 14px -2px ${stroke}`,
                      }}
                      aria-hidden
                    >
                      <svg
                        viewBox="0 0 60 90"
                        className="absolute inset-0 h-full w-full"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          d="M 26 40 L 38 45 L 26 50 Z"
                          fill="#fff"
                          fillOpacity={0.95}
                        />
                      </svg>
                    </div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--color-lilla)]">
                      Reel
                    </p>
                    <div className="h-[6px] w-[55%] rounded-sm bg-[var(--color-lilla)] opacity-35" />
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ ...pair, delay: 0.15 + i * 0.08 }}
                  className="flex flex-col gap-1.5"
                >
                  {/* Artikel-thumbnail fuld bredde — 5:4 */}
                  <div
                    className="aspect-[5/4] w-full rounded-[4px] bg-[var(--color-muted)]"
                    aria-hidden
                  />
                  <div
                    className="h-[7px] rounded-sm bg-[var(--color-foreground)]"
                    style={{ width: `${row.titleW}%`, opacity: 0.32 }}
                  />
                  <div
                    className="h-[5px] rounded-sm bg-[var(--color-foreground)]"
                    style={{ width: `${row.metaW}%`, opacity: 0.16 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * Case 3 — Bindeled · "Behov → Jeg → Valgdag"
 * Tre-trins flow: husets behov samles, bindeled (JEG) i midten oversætter,
 * lander i VALGDAG med outcome "Overblik og overskud".
 */
function CaseBruger() {
  const stroke = "var(--color-lilla)";

  const behov = [
    "CMS-tilpasning",
    "Valgmoduler",
    "Visuel oplevelse",
    "Tryghed efter nedbrud",
  ];

  return (
    <div className="mt-4">
      <div className="flex flex-col items-center gap-5 md:flex-row md:flex-wrap md:justify-center md:gap-7">
        {/* 1. HUSETS BEHOV */}
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...pair, delay: 0.1 }}
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
            Husets behov
          </p>
          <ul className="space-y-2">
            {behov.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ ...pair, delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-2.5 text-xs text-[var(--color-muted-foreground)] md:text-sm"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-muted-foreground)] opacity-60" />
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* 2. PIL */}
        <Arrow delay={0.4} />

        {/* 3. BINDELED-hub (JEG) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...pair, delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-lilla)] bg-[var(--color-lilla-soft)] md:h-16 md:w-16"
            style={{ boxShadow: `0 0 22px -4px ${stroke}` }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-lilla)] md:text-xs">
              Jeg
            </span>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-lilla)]">
            Bindeled
          </p>
        </motion.div>

        {/* 4. PIL */}
        <Arrow delay={0.7} />

        {/* 5. VALGDAG */}
        <motion.div
          initial={{ opacity: 0, x: 6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...pair, delay: 0.8 }}
          className="flex items-center gap-3"
        >
          <div
            className="h-3.5 w-3.5 shrink-0 rotate-45 bg-[var(--color-lilla)]"
            style={{ boxShadow: `0 0 12px ${stroke}` }}
            aria-hidden
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-foreground)] md:text-sm">
              Valgdag
            </p>
            <p className="text-[11px] text-[var(--color-muted-foreground)] md:text-xs">
              Overblik og overskud
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Arrow({ delay }: { delay: number }) {
  // Rotation skal sidde på wrapperen — framer-motion ejer transform på selve motion.svg,
  // og inline transform vinder over Tailwinds rotate-utility.
  return (
    <div className="rotate-90 md:rotate-0">
      <motion.svg
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ ...pair, delay }}
        viewBox="0 0 28 8"
        className="h-2 w-7 text-[var(--color-lilla)] md:w-9"
        aria-hidden
      >
        <line
          x1="0"
          y1="4"
          x2="22"
          y2="4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path d="M 20 1 L 26 4 L 20 7 Z" fill="currentColor" />
      </motion.svg>
    </div>
  );
}

export function Manifest() {
  return (
    <section
      id="manifest"
      className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 pb-16 pt-20 md:pb-24 md:pt-28"
    >
      <div className="relative">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={pair}
          className="display mb-10 text-balance text-3xl leading-[1.1] md:mb-14 md:text-5xl"
        >
          Sådan arbejder jeg som projektleder og bindeled
        </motion.h2>

        <Section
          variant="chapter"
          chapterNumber={1}
          eyebrow="Bindeled mellem teknik og huset"
          title="Hvordan jeg vendte et CMS-skifte i krise"
          intro={
            <p>
              Da jeg startede som teknisk projektleder på TV2 Østjylland, var
              frontend-teamet midt i et komplekst CMS-skifte med mange fejl og
              dalende tillid i huset. Med fast, daglig statuskommunikation,
              tydelige prioriteringer og benhård fokusering på det vigtigste
              først, fik jeg processen vendt inden for et kvartal.
            </p>
          }
        >
          <CaseBindeled />
        </Section>

        <Section
          variant="chapter"
          chapterNumber={2}
          eyebrow="Bindeled mellem forretning og brugere"
          title="Hvordan jeg ledte forsidens redesign med brugerne i centrum"
          intro={caseTexts.forside}
        >
          <CaseForside />
        </Section>

        <Section
          variant="chapter"
          chapterNumber={3}
          isLastChapter
          eyebrow="Bindeled mellem behov og beredskab"
          title="Hvordan jeg ledte 8 måneders valgforberedelse trygt i mål"
          intro={caseTexts.valgdag}
        >
          <CaseBruger />
        </Section>
      </div>
    </section>
  );
}
