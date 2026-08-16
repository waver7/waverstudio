"use client";

import { motion } from "framer-motion";
import { Check, Minus, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const before = [
  "New lead",
  "Check email",
  "Copy information",
  "Open CRM",
  "Create customer",
  "Write response",
  "Send booking link",
  "Remember to follow up tomorrow",
];

const after = [
  "New lead",
  "AI Automation",
  "CRM updated",
  "Customer contacted",
  "Appointment scheduled",
  "Owner notified",
  "Follow-up scheduled",
];

export function BeforeAfter() {
  return (
    <section className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="The difference"
          title="From manual work to automated systems."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {/* BEFORE */}
          <Reveal>
            <div className="surface h-full p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-line bg-bg-soft px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                  Manual
                </span>
                <Minus className="h-4 w-4 text-ink-muted" />
              </div>
              <ol className="mt-6 space-y-2.5">
                {before.map((s, i) => (
                  <li
                    key={s}
                    className="flex items-center gap-3 text-sm text-ink-secondary"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line font-mono text-[10px] text-ink-muted">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-line pt-4 text-sm font-medium text-ink-muted">
                8 manual steps
              </p>
            </div>
          </Reveal>

          {/* AFTER */}
          <Reveal delay={0.1}>
            <div className="surface relative h-full overflow-hidden p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-violet/15 blur-3xl"
                aria-hidden
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white"
                  style={{ background: "linear-gradient(100deg,#FF2EA6,#A855F7,#3287FF)" }}
                >
                  With WaverStudio
                </span>
                <Zap className="h-4 w-4 text-brand-violet" />
              </div>
              <ol className="relative mt-6 space-y-2.5">
                {after.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-center gap-3 text-sm text-ink"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                    {s}
                  </motion.li>
                ))}
              </ol>
              <p className="relative mt-6 border-t border-line pt-4 text-sm font-medium text-ink">
                1 trigger.{" "}
                <span className="text-ink-secondary">Everything else automated.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
