"use client";

import { MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function LocalSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="surface relative overflow-hidden p-8 sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 grid-lines opacity-40"
              aria-hidden
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="eyebrow">Local AI &amp; software partner</span>
                <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  AI automation for businesses in Miamisburg and the Dayton area.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-secondary">
                  WaverStudio works with businesses that want modern technology
                  without dealing with a large consulting firm. Whether you need
                  one workflow automated or a completely custom system, we&apos;ll
                  help determine what makes sense for your business.
                </p>
              </div>

              <div className="shrink-0">
                <div className="inline-flex items-center gap-3 rounded-2xl border border-line bg-bg px-5 py-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">
                      Based in {site.city}, {site.region}
                    </p>
                    <p className="font-mono text-xs text-ink-muted">
                      {site.zip} • {site.area} • Remote-friendly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
