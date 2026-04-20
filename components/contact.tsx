"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/section";
import { profile } from "@/lib/profile";
import { pair } from "@/lib/motion";

type Row = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export function Contact() {
  const rows: Row[] = [
    {
      icon: <Mail className="h-4 w-4" />,
      label: "Skriv til mig",
      value: profile.email,
      href: `mailto:${profile.email}?subject=Hej%20Frederikke`,
    },
    {
      icon: <Linkedin className="h-4 w-4" />,
      label: "LinkedIn",
      value: "linkedin.com/in/frederikkeschmidt",
      href: profile.linkedin,
      external: true,
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: "Bor i",
      value: profile.location,
    },
  ];

  return (
    <Section id="kontakt" eyebrow="Kontakt" title="Lad os tage en snak.">
      <motion.a
        href={`tel:${profile.phone.replace(/\s/g, "")}`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={pair}
        className="group relative block"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 top-1/2 h-40 w-72 -translate-y-1/2 rounded-full bg-[var(--color-lilla)] opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        />

        <div className="relative flex items-start gap-4 md:gap-5">
          <div
            className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full md:h-12 md:w-12"
            style={{
              background:
                "color-mix(in oklab, var(--color-lilla) 20%, transparent)",
              color: "var(--color-lilla)",
              boxShadow: "0 0 24px rgba(187, 180, 254, 0.5)",
            }}
          >
            <Phone className="h-4 w-4 md:h-5 md:w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-lilla)]">
              Ring
            </div>
            <div
              className="display text-3xl leading-tight transition-colors group-hover:text-[var(--color-lilla)] md:text-5xl"
              style={{ letterSpacing: "-0.015em" }}
            >
              {profile.phone}
              <ArrowUpRight className="ml-2 inline-block h-5 w-5 -translate-y-1 text-[var(--color-muted-foreground)] transition-all group-hover:-translate-y-2 group-hover:translate-x-1 group-hover:text-[var(--color-lilla)] md:h-7 md:w-7" />
            </div>
            <div className="mt-3 text-sm text-[var(--color-muted-foreground)]">
              Jeg svarer oftest med det samme.
            </div>
          </div>
        </div>
      </motion.a>

      <ul className="mt-10 space-y-1 md:mt-12">
        {rows.map((row, i) => {
          const content = (
            <div className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-[rgba(20,20,20,0.04)] md:px-4 md:py-4">
              <div
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--color-muted-foreground)]"
                style={{
                  background:
                    "color-mix(in oklab, var(--color-foreground) 5%, transparent)",
                }}
              >
                {row.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                  {row.label}
                </div>
                <div className="truncate font-medium text-[var(--color-foreground)]">
                  {row.value}
                </div>
              </div>
              {row.href ? (
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] transition-all" />
              ) : null}
            </div>
          );

          return (
            <motion.li
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...pair, delay: i * 0.06 }}
              className="group"
            >
              {row.href ? (
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noreferrer" : undefined}
                  className="block"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-16 border-t border-[var(--color-border)] pt-6 text-center text-xs text-[var(--color-muted-foreground)]">
        © {new Date().getFullYear()} Frederikke Schmidt · Bygget i Next.js med
        Claude Code
      </div>
    </Section>
  );
}
