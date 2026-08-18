"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GradientButton } from "@/components/ui/GradientButton";
import { GradientText } from "@/components/ui/GradientText";
import { HeroWorkflow } from "@/components/workflows/HeroWorkflow";
import { WaveMesh } from "@/components/hero/WaveMesh";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden pt-28 sm:pt-32 lg:min-h-[94vh] lg:pt-40">
      {/* background: faint grid + one soft glow; the wave mesh supplies the colour */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 grid-lines mask-fade-b opacity-40" />
        <div className="absolute left-1/2 top-[-12%] h-[520px] w-[820px] -translate-x-1/2 animate-glow-drift rounded-full bg-brand-violet/10 blur-[130px]" />
      </div>

      {/* three.js wave mesh (with static fallback) */}
      <WaveMesh />

      {/* legibility scrim so the headline stays crisp over the wave */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(80% 70% at 22% 42%, rgba(5,6,8,0.82), rgba(5,6,8,0.35) 45%, transparent 72%)",
        }}
      />

      <div className="shell grid items-center gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28">
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Badge gradientDot className="font-mono tracking-[0.14em]">
              AI AUTOMATION • SOFTWARE • MIAMISBURG, OH
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease }}
            className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-[4.25rem]"
          >
            Build a <GradientText>smarter business</GradientText> with AI.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease }}
            className="mt-5 max-w-xl text-balance text-base leading-relaxed text-ink-secondary sm:text-lg"
          >
            We design AI agents, automated workflows, integrations and custom
            software that eliminate repetitive work and help your business move
            faster.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-3 text-sm text-ink-muted"
          >
            Built locally in Miamisburg. Designed for businesses everywhere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <GradientButton href="/#contact" variant="solid" size="lg">
              Get a Free AI Audit <ArrowRight className="h-4 w-4" />
            </GradientButton>
            <GradientButton href="/#services" variant="ghost" size="lg">
              Explore What We Build <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-5 font-mono text-[11px] text-ink-muted"
          >
            No commitment • Tell us your workflow • We&apos;ll identify what can
            be automated
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="relative"
        >
          {/* soft glow so the card floats above the wave */}
          <div
            className="pointer-events-none absolute -inset-6 -z-[1] rounded-[32px] bg-brand-violet/10 blur-3xl"
            aria-hidden
          />
          <HeroWorkflow />
        </motion.div>
      </div>
    </section>
  );
}
