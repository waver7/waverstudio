"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="How it works"
          title="Start with the workflow, not the technology."
        />

        <div className="relative mt-12">
          {/* animated connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden lg:block" aria-hidden>
            <div className="relative mx-auto h-px w-[76%] bg-line">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brand-gradient"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-cursor="frame"
                className="surface p-6 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-line-strong bg-bg font-mono text-sm text-ink">
                  {step.n}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
