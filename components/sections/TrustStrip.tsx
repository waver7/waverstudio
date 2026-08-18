import { trustPills } from "@/lib/content";

export function TrustStrip() {
  // duplicate the list so the marquee loops seamlessly at -50%
  const row = [...trustPills, ...trustPills];

  return (
    <section className="border-y border-line bg-bg-secondary/50" aria-label="Capabilities">
      <div className="shell flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 text-center text-sm font-medium text-ink-secondary lg:text-left lg:text-base">
          One studio. <span className="text-ink">Your entire automation stack.</span>
        </p>

        {/* marquee with edge fade */}
        <div
          className="marquee relative min-w-0 flex-1 overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <ul className="marquee-track gap-2.5" aria-hidden>
            {row.map((pill, i) => (
              <li
                key={`${pill}-${i}`}
                className="whitespace-nowrap rounded-full border border-line bg-bg-card px-3.5 py-1.5 font-mono text-xs text-ink-secondary"
              >
                {pill}
              </li>
            ))}
          </ul>
          {/* accessible, non-animated copy for screen readers */}
          <ul className="sr-only">
            {trustPills.map((pill) => (
              <li key={pill}>{pill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
