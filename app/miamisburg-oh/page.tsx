import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Badge } from "@/components/ui/Badge";
import { GradientButton } from "@/components/ui/GradientButton";
import { GradientText } from "@/components/ui/GradientText";
import { services } from "@/lib/content";
import { localBusinessLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Automation & Software in Miamisburg, OH",
  description:
    "WaverStudio builds AI agents, workflow automation, CRM integrations and custom software for businesses in Miamisburg, Ohio (45342) and the Dayton area.",
  alternates: { canonical: "/miamisburg-oh" },
};

const localReasons = [
  "Work with someone nearby who understands local businesses.",
  "Start with one workflow or a full custom system — your call.",
  "Practical AI applied only where it saves real time.",
  "Remote-friendly, so distance is never a blocker.",
];

export default function Page() {
  return (
    <PageShell>
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 grid-lines mask-fade-b opacity-60" />
          <div className="absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-brand-violet/10 blur-[120px]" />
        </div>
        <div className="shell pb-14">
          <Badge gradientDot className="font-mono tracking-[0.14em]">
            <MapPin className="h-3.5 w-3.5" /> MIAMISBURG, OHIO • 45342
          </Badge>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            <GradientText>AI automation</GradientText> for businesses in
            Miamisburg &amp; the Dayton area.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-secondary">
            WaverStudio is a local AI and software studio helping businesses
            around Miamisburg and greater Dayton automate repetitive work,
            connect their systems and build the software they actually need —
            without the overhead of a large consulting firm.
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
              A local partner for modern technology
            </h2>
            <ul className="mt-6 space-y-3">
              {localReasons.map((r) => (
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
            <h2 className="text-2xl font-semibold text-ink">What we build locally</h2>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ ...localBusinessLd, url: `${site.url}/miamisburg-oh` }),
        }}
      />
    </PageShell>
  );
}
