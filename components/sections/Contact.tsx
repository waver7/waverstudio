import { ContactWizard } from "@/components/forms/ContactWizard";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-line bg-bg-secondary/40 py-20 sm:py-28"
    >
      <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Start here</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Get your free AI audit.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-secondary">
              Three quick questions. We&apos;ll review the workflow you describe
              and come back with what can be automated — no commitment, no
              pressure.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ink-secondary">
              {[
                "Tell us what you'd like help with",
                "Describe what's taking too much time",
                "We map what can be automated",
              ].map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line font-mono text-[11px] text-ink-muted">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            {site.bookingUrl && (
              <p className="mt-8 text-sm text-ink-muted">
                Prefer to talk?{" "}
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-brand-violet"
                >
                  Book a 15-minute call →
                </a>
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactWizard />
        </Reveal>
      </div>
    </section>
  );
}
