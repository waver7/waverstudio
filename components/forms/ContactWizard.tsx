"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { contactServiceOptions } from "@/lib/content";
import { cn } from "@/lib/cn";

type FormState = {
  service: string;
  challenge: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  company: string; // honeypot
};

const empty: FormState = {
  service: "",
  challenge: "",
  name: "",
  business: "",
  email: "",
  phone: "",
  company: "",
};

export function ContactWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canContinue =
    (step === 0 && form.service) ||
    (step === 1 && form.challenge.trim().length > 3) ||
    step === 2;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const canSubmit = form.name.trim() && form.business.trim() && emailValid;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || status === "submitting") return;
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="surface flex flex-col items-center gap-4 px-6 py-16 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white">
          <Check className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="text-2xl font-semibold text-ink">
          Thanks — we&apos;ll review your workflow.
        </h3>
        <p className="max-w-md text-sm text-ink-secondary">
          We&apos;ll take a look at what you shared and get back to you about
          what can be automated and what isn&apos;t worth automating.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="surface overflow-hidden">
      {/* progress */}
      <div className="flex items-center gap-2 border-b border-line px-6 py-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px]",
                i < step
                  ? "bg-brand-gradient text-white"
                  : i === step
                    ? "border border-brand-violet/60 text-ink"
                    : "border border-line text-ink-muted",
              )}
            >
              {i < step ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            {i < 2 && (
              <span
                className={cn(
                  "h-px flex-1",
                  i < step ? "bg-brand-violet/60" : "bg-line",
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <Panel key="s0">
              <Legend
                title="What would you like help with?"
                sub="Pick the closest fit — we'll figure out the details together."
              />
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {contactServiceOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      set("service", opt);
                      setStep(1);
                    }}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      form.service === opt
                        ? "border-brand-violet/50 bg-brand-violet/10 text-ink"
                        : "border-line bg-bg-soft/50 text-ink-secondary hover:border-line-strong hover:text-ink",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </Panel>
          )}

          {step === 1 && (
            <Panel key="s1">
              <Legend
                title="What's taking too much time today?"
                sub="A sentence or two is plenty."
              />
              <textarea
                value={form.challenge}
                onChange={(e) => set("challenge", e.target.value)}
                rows={5}
                autoFocus
                placeholder="Example: We manually respond to every website lead, copy their information into our CRM and follow up the next day."
                className="w-full resize-none rounded-xl border border-line bg-bg-soft/50 px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-brand-violet/50 focus:outline-none focus:ring-1 focus:ring-brand-violet/40"
              />
            </Panel>
          )}

          {step === 2 && (
            <Panel key="s2">
              <Legend title="How can we reach you?" sub="No spam — just a reply about your workflow." />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Name" required>
                  <input
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    autoComplete="name"
                    className="wv-input"
                  />
                </Field>
                <Field label="Business" required>
                  <input
                    value={form.business}
                    onChange={(e) => set("business", e.target.value)}
                    autoComplete="organization"
                    className="wv-input"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    autoComplete="email"
                    className="wv-input"
                  />
                </Field>
                <Field label="Phone" hint="optional">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    autoComplete="tel"
                    className="wv-input"
                  />
                </Field>
              </div>
            </Panel>
          )}
        </AnimatePresence>

        {/* honeypot — hidden from real users */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={form.company}
          onChange={(e) => set("company", e.target.value)}
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        {error && (
          <p className="mt-4 rounded-lg border border-brand-magenta/30 bg-brand-magenta/10 px-3.5 py-2.5 text-sm text-ink">
            {error}
          </p>
        )}
      </div>

      {/* controls */}
      <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm transition-colors",
            step === 0
              ? "cursor-not-allowed text-ink-muted/50"
              : "text-ink-secondary hover:text-ink",
          )}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {step < 2 ? (
          <button
            type="button"
            onClick={() => canContinue && setStep((s) => s + 1)}
            disabled={!canContinue}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity",
              canContinue ? "opacity-100" : "cursor-not-allowed opacity-40",
            )}
            style={{ background: "linear-gradient(100deg,#FF2EA6,#A855F7,#3287FF)" }}
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canSubmit || status === "submitting"}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity",
              canSubmit && status !== "submitting"
                ? "opacity-100"
                : "cursor-not-allowed opacity-50",
            )}
            style={{ background: "linear-gradient(100deg,#FF2EA6,#A855F7,#3287FF)" }}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending
              </>
            ) : (
              <>
                Show Me What We Can Automate <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function Legend({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{sub}</p>
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-ink-secondary">
        {label}
        {required && <span className="text-brand-magenta"> *</span>}
        {hint && <span className="text-ink-muted"> ({hint})</span>}
      </span>
      {children}
    </label>
  );
}
