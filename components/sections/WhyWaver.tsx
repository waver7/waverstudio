"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { values } from "@/lib/content";

export function WhyWaver() {
  return (
    <section className="border-y border-line bg-bg-secondary/40 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Why WaverStudio"
          title="Local partner. Serious engineering."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="surface flex flex-col p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg text-brand-violet">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                  {v.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
