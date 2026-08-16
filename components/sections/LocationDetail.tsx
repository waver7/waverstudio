import Link from "next/link";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GradientButton } from "@/components/ui/GradientButton";
import { GradientText } from "@/components/ui/GradientText";
import { services } from "@/lib/content";
import type { Location } from "@/lib/locations";
import { site } from "@/lib/site";

const reasons = [
  "Work with a local studio, not a large consulting firm.",
  "Start with one workflow or a full custom system — your call.",
  "Practical AI applied only where it saves real time.",
  "Remote-friendly, so distance is never a blocker.",
];

export function LocationDetail({ location }: { location: Location }) {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 grid-lines mask-fade-b opacity-60" />
          <div className="absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-brand-violet/10 blur-[120px]" />
        </div>
        <div className="shell pb-14">
          <Badge gradientDot className="font-mono tracking-[0.14em]">
            <MapPin className="h-3.5 w-3.5" /> {location.city.toUpperCase()}, OHIO •{" "}
            {location.zip}
          </Badge>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            <GradientText>AI automation</GradientText> for {location.city}{" "}
            businesses.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-secondary">
            {location.intro}
          </p>
          <div className="mt-8">
            <GradientButton href="/#contact" variant="solid" size="lg">
              Get a Free AI Audit <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-bg-secondary/40 py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-semibold text-ink">
              Why local businesses work with us
            </h2>
            <ul className="mt-6 space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-ink-secondary">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                    <Check className="h-2.5 w-2.5" aria-hidden />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">What we build</h2>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={s.href}
                  className="rounded-xl border border-line bg-bg-card px-4 py-3 text-sm text-ink-secondary transition-colors hover:border-line-strong hover:text-ink"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="shell">
          <p className="text-sm text-ink-muted">
            WaverStudio is based in {site.city}, {site.regionShort} {site.zip} and
            serves {location.city} and the greater {site.area}.
          </p>
        </div>
      </section>
    </>
  );
}
