"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/profile";
import { pair } from "@/lib/motion";

export function Hero() {

  return (
    <header className="relative flex min-h-[85svh] items-center justify-center overflow-hidden px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[50%] overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.1 }}
          className="absolute -top-20 -left-10 h-[180px] w-[180px] rounded-full bg-[var(--color-lime)] opacity-[0.12] blur-[70px] md:h-[260px] md:w-[260px] md:opacity-[0.18] md:blur-[90px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.25 }}
          className="absolute -top-16 right-[-40px] h-[160px] w-[160px] rounded-full bg-[var(--color-pink)] opacity-[0.1] blur-[70px] md:h-[240px] md:w-[240px] md:opacity-[0.15] md:blur-[90px]"
        />
      </div>
      <div className="relative mx-auto w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...pair, delay: 0.05 }}
          className="mb-5 inline-block"
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_0_40px_-10px_var(--color-lilla)]">
            <Image
              src="/frederikke.jpg"
              alt="Frederikke Schmidt"
              fill
              priority
              sizes="112px"
              className="object-cover"
              style={{ objectPosition: "50% 25%" }}
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...pair, delay: 0.25 }}
          className="display mb-3 text-balance text-4xl leading-[1.05] md:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...pair, delay: 0.35 }}
          className="mb-6 text-lg font-semibold text-[var(--color-lilla)] md:text-xl"
        >
          {profile.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mx-auto mb-8 max-w-lg text-balance leading-relaxed text-[var(--color-muted-foreground)]"
        >
          Jeg tager idéer fra rå drøm til færdigt produkt. Erfaren
          frontend-udvikler, teknisk projektleder og skaber med AI — så
          intet går tabt mellem idé, plan og kode.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...pair, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild>
            <a href="#projekter">
              Se projekter <ArrowDown className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="#kontakt">
              <Mail className="h-4 w-4" />
              Skriv til mig
            </a>
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
