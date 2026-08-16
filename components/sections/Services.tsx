"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { services } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="What we build"
          title="Technology that does the work for you."
          description="From one automated workflow to an entire connected business system, we design solutions around how your company actually operates."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            const wide = s.span === "wide";
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className={cn(wide && "md:col-span-2")}
              >
                <SpotlightCard className="h-full">
                  <Link href={s.href} className="block h-full p-6 sm:p-7">
                    <div
                      className={cn(
                        "flex h-full flex-col gap-5",
                        wide && "md:flex-row md:items-start md:gap-8",
                      )}
                    >
                      <div className={cn(wide && "md:max-w-sm")}>
                        <div className="flex items-center justify-between">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg-soft text-ink">
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                          <ArrowUpRight className="h-5 w-5 text-ink-muted transition-colors group-hover:text-ink" />
                        </div>
                        <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
                          {s.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                          {s.description}
                        </p>
                      </div>

                      <ul
                        className={cn(
                          "flex flex-wrap gap-2",
                          wide ? "md:flex-1 md:content-start md:pt-1" : "mt-auto pt-2",
                        )}
                      >
                        {s.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="rounded-full border border-line bg-bg-soft/60 px-3 py-1 text-xs text-ink-secondary"
                          >
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
