"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { pair } from "@/lib/motion";

const links = [
  { href: "#tænker", label: "Tankegang" },
  { href: "#arbejder", label: "Arbejde" },
  { href: "#projekter", label: "Projekter" },
  { href: "#cv", label: "CV" },
  { href: "#kontakt", label: "Kontakt" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Find the section currently in view
      const ids = links.map((l) => l.href.slice(1));
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 200) {
          current = id;
          break;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...pair, delay: 0.3 }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 px-4"
    >
      <nav
        className={`flex items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "border-[var(--color-border)] bg-[rgba(15,18,32,0.7)] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
            : "border-white/5 bg-[rgba(15,18,32,0.35)]"
        }`}
      >
        <ul className="flex items-center gap-0.5">
          {links.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative block rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:px-4 md:text-sm ${
                    isActive
                      ? "text-[var(--color-foreground)]"
                      : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-white/8"
                    />
                  ) : null}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
