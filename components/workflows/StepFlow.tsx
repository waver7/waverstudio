"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * A vertical list of steps connected by animated gradient connectors with a
 * traveling pulse. Used by the Automation Finder and the "After" workflow.
 */
export function StepFlow({
  steps,
  animateKey,
  className,
}: {
  steps: string[];
  animateKey?: string;
  className?: string;
}) {
  return (
    <ol className={cn("relative flex flex-col", className)}>
      <AnimatePresence mode="popLayout">
        {steps.map((step, i) => (
          <motion.li
            key={`${animateKey ?? "flow"}-${i}-${step}`}
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{
              duration: 0.4,
              delay: i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative pl-9"
          >
            {/* index marker */}
            <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-bg-soft font-mono text-[10px] text-ink-secondary">
              {i + 1}
            </span>
            {/* connector line */}
            {i < steps.length - 1 && (
              <span
                className="absolute left-[11px] top-7 h-[calc(100%-4px)] w-px overflow-hidden bg-line-strong"
                aria-hidden
              >
                <span
                  className="flow-pulse absolute left-0 h-4 w-px bg-brand-gradient"
                  style={{ ["--delay" as string]: `${i * 0.25}s` } as React.CSSProperties}
                />
              </span>
            )}
            <div className="rounded-lg border border-line bg-bg-soft/60 px-3.5 py-2 text-sm text-ink">
              {step}
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ol>
  );
}
