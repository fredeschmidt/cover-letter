"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import {
  draftApplications,
  journeyPhases,
  phaseActivities,
  phaseConfigs,
  savedPrograms,
  suItems,
  uploadedDocuments,
  type JourneyPhaseId,
} from "../data";
import { auDemoTheme } from "../theme";
import { PhaseSideNav } from "./phase-side-nav";
import { StudySearchBar } from "./study-search-bar";
import { SavedProgramsList } from "./saved-programs-list";
import { DocumentsList } from "./documents-list";
import { ActivitiesList } from "./activities-list";
import { SUList, WhileWaitingList } from "./su-list";

export function AuDemoClient() {
  const [activePhase, setActivePhase] = useState<JourneyPhaseId>("interested");

  const activeIndex = journeyPhases.findIndex((p) => p.id === activePhase);
  const programs = savedPrograms.filter((p) => p.phaseId === activePhase);
  const drafts = draftApplications.filter((d) => d.phaseId === activePhase);
  const activities = phaseActivities.filter((a) => a.phaseId === activePhase);
  const documents = uploadedDocuments.filter((d) => d.phaseId === activePhase);
  const su = suItems.filter((s) => s.phaseId === activePhase);

  const phaseConfig = phaseConfigs[activePhase];

  return (
    <div style={auDemoTheme}>
      {/* Solid surface that hides the portfolio aurora behind this page.
          Inline position wins specificity over the global body-child rule. */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--color-background)",
        }}
      />
      <main className="relative mx-auto w-full max-w-5xl px-5 pb-24 pt-10 md:px-6 md:pt-14">
        {/* Demo-meta: portfolio-konteksten lever uden for personaen "Astrid",
            så den får sit eget visuelle lag øverst — let blå tint + lilla
            border-tone trækker den ud af det neutrale indhold uden at
            konkurrere med interaktive flader længere nede. Forklarer formål
            + brugsanvisning (klik dig gennem fase-menuen) så recruiter-
            læseren ved hvad de skal gøre med siden. */}
        <aside
          aria-label="Om demoen"
          className="mb-8 rounded-2xl border border-[var(--color-lilla)]/20 bg-[var(--color-lilla-soft)] px-4 py-4 md:px-5 md:py-4"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-lilla)]">
            Om demoen
          </p>
          <p className="mt-2.5 text-sm leading-snug text-[var(--color-foreground)]">
            En UX-case, der binder hele studierejsen sammen i én portal.
          </p>
          <p className="mt-2 text-sm leading-snug text-[var(--color-foreground)]">
            Klik dig gennem de tre faser i menuen til venstre for at se, hvordan indholdet vil skifte undervejs i forløbet.
          </p>
          {/* Scope-disclaimer: nedtonet til 12px muted så det læses som
              caveat, ikke som hovedbudskab — markerer at det visuelle
              udtryk ikke er færdigskåret i denne omgang. */}
          <p className="mt-2.5 text-xs leading-snug text-[var(--color-muted-foreground)]">
            Fokus er UX — ikke visuelt design.
          </p>
        </aside>

        <div className="mb-12">
          <h1 className="display text-balance text-3xl font-medium leading-[1.1] md:text-4xl">
            {activePhase === "interested"
              ? "Velkommen Astrid"
              : activePhase === "accepted"
              ? "Tillykke Astrid"
              : "Velkommen tilbage, Astrid"}
          </h1>
        </div>

        <div className="grid gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] lg:gap-16">
          <div className="md:sticky md:top-6 md:self-start">
            <div className="md:p-2">
              <PhaseSideNav
                active={activePhase}
                activeIndex={activeIndex}
                onChange={setActivePhase}
              />
            </div>
          </div>

          {/* md:pt-5 flugter SectionHeading'ens tekstmidte med første
              nav-knaps tekstmidte: knappen har 8px wrapper-padding + 10px
              egen py + ~12px halv-cirkel = ~30px til midten, overskriften
              til højre lå før klods op ad toppen. */}
          <div className="md:pt-5">
            {/* AnimatePresence + key på phase: hver fase mounter på ny så
                fase-skiftet bliver til en synlig transformation i stedet for
                et abrupt swap. mode="wait" sikrer at exit-animationen er
                færdig før den nye fase fader ind. Søgebar'en ligger inde i
                fase-blokken og render'es kun i "interested" — det er en
                discovery-affordance der hører til opdagelsesfasen; når man
                er sendt/optaget er det irrelevant. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                // max-w-md strammer indholdskolonnen så chevronerne sidder
                // tæt på teksten frem for i højre kant af grid-kolonnen.
                // Efter fjernelse af dato-meta passer 448px tæt til længste
                // række ("Cognitive Science — 2. prioritet · Svar 26. juli").
                className="max-w-md space-y-10 md:space-y-14"
              >
                {activePhase === "interested" ? <StudySearchBar /> : null}
                {programs.length > 0 ? (
                  <SavedProgramsList
                    programs={programs}
                    drafts={drafts}
                    title={phaseConfig.programsTitle}
                    tone={phaseConfig.programsTone}
                  />
                ) : null}
                {documents.length > 0 ? <DocumentsList documents={documents} /> : null}
                {/* Fase 2 (applied) slår SU + Info sammen til "Mens du venter"
                    — begge er sekundære i ventefasen og hører hjemme under
                    samme overskrift. Andre faser viser dem hver for sig. */}
                {activePhase === "applied" ? (
                  <WhileWaitingList suItems={su} activities={activities} />
                ) : (
                  <>
                    {su.length > 0 ? <SUList items={su} /> : null}
                    {activities.length > 0 ? <ActivitiesList activities={activities} /> : null}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <footer className="mt-16 border-t border-[var(--color-border)] pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Tilbage til portfolio
          </Link>
        </footer>
      </main>
    </div>
  );
}
