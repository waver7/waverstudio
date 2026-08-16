import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { GradientButton } from "@/components/ui/GradientButton";
import { GradientText } from "@/components/ui/GradientText";

export function ServiceDetail({
  service,
  intro,
  outcomes,
}: {
  service: Service;
  intro: string;
  outcomes: string[];
}) {
  const Icon = service.icon;
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 grid-lines mask-fade-b opacity-60" />
          <div className="absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-brand-violet/10 blur-[120px]" />
        </div>
        <div className="shell pb-14">
          <Link
            href="/#services"
            className="text-sm text-ink-muted transition-colors hover:text-ink"
          >
            ← All services
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-bg-soft text-ink">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <Badge gradientDot>Service</Badge>
          </div>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            <GradientText>{service.title}</GradientText>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-secondary">
            {intro}
          </p>
          <div className="mt-8">
            <GradientButton href="/#contact" variant="solid" size="lg">
              Get a Free AI Audit <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="border-y border-line bg-bg-secondary/40 py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-semibold text-ink">What&apos;s included</h2>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {service.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="flex items-start gap-2.5 rounded-xl border border-line bg-bg-card px-3.5 py-3 text-sm text-ink-secondary"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                    <Check className="h-2.5 w-2.5" aria-hidden />
                  </span>
                  {cap}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">What you get out of it</h2>
            <ul className="mt-6 space-y-3">
              {outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm text-ink-secondary">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="shell">
          <div className="surface flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-ink">
                Not sure if this is the right fit?
              </h2>
              <p className="mt-2 max-w-lg text-sm text-ink-secondary">
                Tell us what&apos;s taking too much time and we&apos;ll point you
                to what actually makes sense to automate.
              </p>
            </div>
            <GradientButton href="/#contact" variant="outline" size="lg">
              Talk to WaverStudio <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </div>
        </div>
      </section>
    </>
  );
}
