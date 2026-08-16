"use client";

import { motion } from "framer-motion";
import { FileCheck2, Boxes, Unlock, MessagesSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    icon: FileCheck2,
    title: "Fixed-scope proposals",
    body: "After a short conversation we send a clear proposal — what we'll build, the timeline and the price. No open-ended hourly billing.",
  },
  {
    icon: Boxes,
    title: "Start small, prove it",
    body: "We'd rather automate one workflow well and let the results earn the next project than sell you a system you don't need yet.",
  },
  {
    icon: Unlock,
    title: "You own what we build",
    body: "The code, the automations and the accounts are yours. No lock-in, no proprietary platform you can only run through us.",
  },
  {
    icon: MessagesSquare,
    title: "Plain-English updates",
    body: "You'll always know what's happening without needing a technical translator. We explain trade-offs, not jargon.",
  },
];

export function HowWeWork() {
  return (
    <section className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="How we work"
          title="Low risk. No lock-in. Built to earn the next project."
          description="We're a small studio, so trust matters more to us than a big first invoice. Here's what working together actually looks like."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                data-cursor="frame"
                className="surface flex gap-4 p-6 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-brand-violet">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
