"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useCases } from "@/lib/content";

export function UseCases() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 border-y border-line bg-bg-secondary/40 py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Built around your business"
          title={<>AI isn&apos;t the product. Better operations are.</>}
          description="We create custom solutions around how you already work — not one generic product sold to everyone."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u, i) => {
            const Icon = u.icon;
            return (
              <motion.div
                key={u.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              >
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-bg-soft text-ink">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {u.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                      {u.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
