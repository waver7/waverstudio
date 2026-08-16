import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms that apply to using the WaverStudio website.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <PageShell>
      <article className="shell pb-24 pt-32">
        <h1 className="text-4xl font-semibold tracking-tight text-ink">Terms</h1>
        <div className="mt-8 max-w-2xl space-y-5 text-sm leading-relaxed text-ink-secondary">
          <p>
            These terms apply to your use of the WaverStudio website. By using
            the site, you agree to them.
          </p>
          <h2 className="pt-4 text-lg font-semibold text-ink">Use of the site</h2>
          <p>
            The content on this site is provided for general information about
            our services. Specific engagements are governed by a separate
            written agreement.
          </p>
          <h2 className="pt-4 text-lg font-semibold text-ink">No warranties</h2>
          <p>
            The site is provided &quot;as is.&quot; Descriptions of example
            workflows are illustrative and do not represent guaranteed outcomes.
          </p>
          <h2 className="pt-4 text-lg font-semibold text-ink">Contact</h2>
          <p>
            Questions? Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-ink underline decoration-line-strong underline-offset-4"
            >
              {site.email}
            </a>
            .
          </p>
          <p className="pt-4 text-xs text-ink-muted">
            This is a general summary and not legal advice.
          </p>
        </div>
      </article>
    </PageShell>
  );
}
