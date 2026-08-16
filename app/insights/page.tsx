import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { posts } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Plain-English notes on AI automation, workflows and software for small and medium businesses — from WaverStudio in Miamisburg, Ohio.",
  alternates: { canonical: "/insights" },
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function InsightsPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 grid-lines mask-fade-b opacity-60" />
          <div className="absolute left-1/2 top-0 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-brand-violet/10 blur-[120px]" />
        </div>
        <div className="shell pb-12">
          <Badge gradientDot>Insights</Badge>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Practical notes on <GradientText>automation</GradientText>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-secondary">
            No hype, no jargon — just useful thinking on where AI and automation
            actually help a business, and where they don&apos;t.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="shell grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <SpotlightCard key={p.slug} className="h-full">
              <Link href={`/insights/${p.slug}`} className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                  <span>{fmt(p.date)}</span>
                  <span>·</span>
                  <span>{p.readMinutes} min read</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight text-ink">
                  {p.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                  {p.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  Read <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
