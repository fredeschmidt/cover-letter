"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/section";
import { profile } from "@/lib/profile";
import { pair } from "@/lib/motion";

export function Contact() {
  return (
    <Section
      id="kontakt"
      eyebrow="Kontakt"
      title="Lad os tage en snak."
      intro="Jeg er mest interesseret i en rolle som AI frontend-udvikler i et ambitiøst in-house team med korte beslutningsveje. Men spørg endelig bare."
    >
      <div className="grid gap-3 md:grid-cols-5">
        {/* Primary CTA — email */}
        <motion.a
          href={`mailto:${profile.email}?subject=Hej%20Frederikke`}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={pair}
          whileHover={{ y: -4 }}
          className="group relative overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--color-violet)_30%,transparent)] p-6 md:col-span-3 md:p-7"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--color-violet) 18%, var(--color-card)) 0%, color-mix(in oklab, var(--color-lime) 10%, var(--color-card)) 100%)",
          }}
        >
          {/* Glow orb */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--color-violet)] opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
          />

          <div className="relative flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl"
                style={{
                  background:
                    "color-mix(in oklab, var(--color-violet) 25%, transparent)",
                  color: "var(--color-violet)",
                  boxShadow: "0 0 24px rgba(138, 114, 255, 0.4)",
                }}
              >
                <Mail className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-[var(--color-muted-foreground)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-foreground)]" />
            </div>

            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-violet)]">
                Skriv til mig
              </div>
              <div
                className="display text-xl leading-tight md:text-2xl"
                style={{ color: "var(--color-foreground)" }}
              >
                {profile.email}
              </div>
              <div className="mt-2 text-xs text-[var(--color-muted-foreground)]">
                Jeg svarer oftest inden for et døgn.
              </div>
            </div>
          </div>
        </motion.a>

        {/* Secondary — phone */}
        <motion.a
          href={`tel:${profile.phone.replace(/\s/g, "")}`}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...pair, delay: 0.08 }}
          whileHover={{ y: -4 }}
          className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--color-lime)_22%,transparent)] bg-[color-mix(in_oklab,var(--color-lime)_7%,var(--color-card))] p-5 md:col-span-2"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-[var(--color-lime)] opacity-15 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
          />
          <div className="relative flex items-start justify-between">
            <div
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{
                background:
                  "color-mix(in oklab, var(--color-lime) 18%, transparent)",
                color: "var(--color-lime)",
              }}
            >
              <Phone className="h-4 w-4" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-[var(--color-muted-foreground)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <div className="relative">
            <div className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-lime)]">
              Ring
            </div>
            <div className="display text-lg">{profile.phone}</div>
          </div>
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...pair, delay: 0.16 }}
          whileHover={{ y: -4 }}
          className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 md:col-span-3 md:flex-row md:items-center md:justify-between md:gap-5"
        >
          <div className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{
                background:
                  "color-mix(in oklab, var(--color-violet) 15%, transparent)",
                color: "var(--color-violet)",
              }}
            >
              <Linkedin className="h-4 w-4" />
            </div>
            <div>
              <div className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
                LinkedIn
              </div>
              <div className="font-semibold">linkedin.com/in/frederikkeschmidt</div>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-violet)]" />
        </motion.a>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...pair, delay: 0.24 }}
          className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 md:col-span-2"
        >
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
            style={{
              background:
                "color-mix(in oklab, var(--color-foreground) 7%, transparent)",
              color: "var(--color-foreground)",
            }}
          >
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
              Bor i
            </div>
            <div className="font-semibold">{profile.location}</div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-16 border-t border-[var(--color-border)] pt-6 text-center text-xs text-[var(--color-muted-foreground)]">
        © {new Date().getFullYear()} Frederikke Schmidt · Bygget i Next.js med
        Claude Code
      </div>
    </Section>
  );
}
