"use client";

import { motion } from "framer-motion";
import { trustPills } from "@/lib/content";

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-bg-secondary/50" aria-label="Capabilities">
      <div className="shell flex flex-col items-center gap-6 py-10 lg:flex-row lg:justify-between lg:gap-10">
        <p className="text-center text-sm font-medium text-ink-secondary lg:text-left lg:text-base">
          One studio.{" "}
          <span className="text-ink">Your entire automation stack.</span>
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-2.5">
          {trustPills.map((pill, i) => (
            <motion.li
              key={pill}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="rounded-full border border-line bg-bg-card px-3.5 py-1.5 font-mono text-xs text-ink-secondary"
            >
              {pill}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
