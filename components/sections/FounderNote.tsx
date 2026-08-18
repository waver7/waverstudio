"use client";

import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";

/**
 * Honest trust-builder for a new studio: a founder-voice note plus a real
 * "founding client" offer — instead of fabricated testimonials or logos.
 * Personalize the signature and, once you have them, swap this section for
 * named client results.
 */
export function FounderNote() {
  return (
    <section className="py-20 sm:py-28">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="surface relative overflow-hidden p-8 sm:p-12"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-violet/10 blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
            <div>
              <Quote className="h-7 w-7 text-brand-violet" aria-hidden />
              <p className="mt-5 text-balance text-xl font-medium leading-relaxed text-ink sm:text-2xl">
                We started WaverStudio because most local businesses are stuck
                doing work software should be doing for them — and the firms that
                could fix it either cost too much or disappear after launch.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-secondary">
                So we keep it simple: start with one workflow, prove it saves you
                time, and earn the next project. No jargon, no lock-in, and
                you&apos;ll always talk to the people actually building your
                system.
              </p>
              <p className="mt-6 font-mono text-sm text-ink-muted">
                — The WaverStudio team, Miamisburg, OH
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-line bg-bg p-6">
              <span className="font-mono text-[11px] uppercase tracking-wider text-brand-violet">
                Founding clients
              </span>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                We&apos;re a new studio taking on a small number of founding
                clients. Work with us early and you&apos;ll get direct attention,
                honest scoping, and a case study we build together.
              </p>
              <div className="mt-6">
                <GradientButton href="/#contact" variant="outline" className="w-full">
                  Become a founding client <ArrowRight className="h-4 w-4" />
                </GradientButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
