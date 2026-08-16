"use client";

import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GradientButton } from "@/components/ui/GradientButton";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-line bg-bg-card px-6 py-16 text-center sm:px-12 sm:py-20">
            {/* ambient glow */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute left-1/2 top-1/2 h-[360px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/15 blur-[110px]" />
              <div className="absolute bottom-0 left-1/4 h-40 w-40 rounded-full bg-brand-magenta/10 blur-3xl" />
              <div className="absolute right-1/4 top-0 h-40 w-40 rounded-full bg-brand-blue/10 blur-3xl" />
            </div>

            <div className="relative mx-auto flex max-w-2xl flex-col items-center">
              <Badge gradientDot className="font-mono tracking-[0.14em]">
                LET&apos;S BUILD SOMETHING USEFUL
              </Badge>
              <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                What would you <GradientText>automate</GradientText> if you could?
              </h2>
              <p className="mt-5 text-balance text-base leading-relaxed text-ink-secondary">
                Tell us what takes too much time inside your business. We&apos;ll
                help you figure out what can be automated and what isn&apos;t
                worth automating.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <GradientButton href="/#contact" variant="solid" size="lg">
                  Get My Free AI Audit <ArrowRight className="h-4 w-4" />
                </GradientButton>
                {site.bookingUrl ? (
                  <GradientButton
                    href={site.bookingUrl}
                    variant="ghost"
                    size="lg"
                    external
                  >
                    Book a Call <ArrowRight className="h-4 w-4" />
                  </GradientButton>
                ) : (
                  <GradientButton href="/#contact" variant="ghost" size="lg">
                    Talk to WaverStudio <ArrowRight className="h-4 w-4" />
                  </GradientButton>
                )}
              </div>
              <p className="mt-6 font-mono text-[11px] text-ink-muted">
                Local to Miamisburg • Remote-friendly • No commitment
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
