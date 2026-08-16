import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How WaverStudio handles the information you share with us.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <PageShell>
      <article className="shell prose-invert pb-24 pt-32">
        <h1 className="text-4xl font-semibold tracking-tight text-ink">
          Privacy Policy
        </h1>
        <div className="mt-8 max-w-2xl space-y-5 text-sm leading-relaxed text-ink-secondary">
          <p>
            WaverStudio respects your privacy. This page explains, in plain
            terms, what we collect and why.
          </p>
          <h2 className="pt-4 text-lg font-semibold text-ink">
            Information we collect
          </h2>
          <p>
            When you submit the contact form, we collect the details you provide
            — such as your name, business, email, phone number and a description
            of the workflow you&apos;d like help with. We use this only to
            respond to your inquiry.
          </p>
          <h2 className="pt-4 text-lg font-semibold text-ink">How we use it</h2>
          <p>
            We use your information to review your request and get back to you.
            We do not sell your information. We do not share it except as needed
            to respond to you or as required by law.
          </p>
          <h2 className="pt-4 text-lg font-semibold text-ink">Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-ink underline decoration-line-strong underline-offset-4"
            >
              {site.email}
            </a>
            .
          </p>
          <p className="pt-4 text-xs text-ink-muted">
            This is a general summary and not legal advice. It will be updated as
            our services evolve.
          </p>
        </div>
      </article>
    </PageShell>
  );
}
