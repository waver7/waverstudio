"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { exampleProjects } from "@/lib/content";

export function ExampleProjects() {
  return (
    <section className="border-t border-line bg-bg-secondary/40 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Case studies"
          title="Example workflows we build."
          description="Illustrations of how the pieces fit together. We'll publish real, named case studies as clients approve them."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {exampleProjects.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-bg-soft text-ink">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                        Example Workflow
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-ink">{p.title}</h3>
                    <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink-secondary">
                      {p.flow}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors"
          >
            Have a workflow like this? Let&apos;s automate it
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
