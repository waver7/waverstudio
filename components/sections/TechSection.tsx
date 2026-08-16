"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techGroups } from "@/lib/content";

export function TechSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Technology"
          title="We connect the tools your business already uses."
          description="Every technology below is a capability, not a partnership claim — we use what fits the job."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {techGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="surface p-5"
            >
              <p className="status text-ink-muted">{group.label}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-bg-soft/60 px-3 py-1.5 text-xs text-ink-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
