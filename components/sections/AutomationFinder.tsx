"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepFlow } from "@/components/workflows/StepFlow";
import { GradientButton } from "@/components/ui/GradientButton";
import { finderOptions } from "@/lib/content";
import { cn } from "@/lib/cn";

export function AutomationFinder() {
  const [selected, setSelected] = useState(finderOptions[0].id);
  const current = finderOptions.find((o) => o.id === selected)!;

  return (
    <section
      id="solutions"
      className="relative scroll-mt-24 border-y border-line bg-bg-secondary/40 py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Automation finder"
          title="What slows your business down?"
          description="Choose something your team spends too much time doing — we'll show you the workflow that could handle it."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* Selectable pills */}
          <div role="tablist" aria-label="Automation options" className="flex flex-wrap gap-2.5 self-start">
            {finderOptions.map((opt) => {
              const active = opt.id === selected;
              return (
                <button
                  key={opt.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelected(opt.id)}
                  className={cn(
                    "relative rounded-full border px-4 py-2.5 text-sm transition-all duration-200",
                    active
                      ? "border-transparent text-ink"
                      : "border-line bg-bg-card text-ink-secondary hover:border-line-strong hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="finder-active"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(100deg,rgba(255,46,166,0.16),rgba(168,85,247,0.16),rgba(50,135,255,0.16))",
                        boxShadow: "inset 0 0 0 1px rgba(168,85,247,0.5)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Suggested workflow */}
          <div className="surface p-6 sm:p-7">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white">
                <Sparkles className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="status text-ink-muted">Suggested workflow</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium text-ink"
                  >
                    {current.label}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <StepFlow steps={current.steps} animateKey={current.id} />

            <div className="mt-6 border-t border-line pt-5">
              <GradientButton href="/#contact" variant="outline" className="w-full">
                Automate This Workflow <ArrowRight className="h-4 w-4" />
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
