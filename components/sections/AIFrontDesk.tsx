"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  "Answers common questions",
  "Captures customer information",
  "Qualifies leads",
  "Books appointments",
  "Updates CRM",
  "Sends notifications",
  "Escalates to a human when needed",
];

type Msg = { from: "customer" | "ai"; text: string };
const convo: Msg[] = [
  { from: "customer", text: "Hi, do you have availability next Tuesday?" },
  {
    from: "ai",
    text: "Absolutely. I can help with that. What service are you looking for?",
  },
  { from: "customer", text: "A standard checkup and cleaning." },
  {
    from: "ai",
    text: "Great — I have Tuesday at 10:30am or 2:15pm open. Which works best?",
  },
];

const statuses = [
  "Customer identified",
  "Request classified",
  "Calendar checked",
  "CRM updated",
];

export function AIFrontDesk() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [visible, setVisible] = useState(0);
  const [statusVisible, setStatusVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(convo.length);
      setStatusVisible(statuses.length);
      return;
    }
    let m = 0;
    const mi = setInterval(() => {
      m += 1;
      setVisible((v) => Math.min(v + 1, convo.length));
      if (m >= convo.length) clearInterval(mi);
    }, 1100);
    let s = 0;
    const si = setInterval(() => {
      s += 1;
      setStatusVisible((v) => Math.min(v + 1, statuses.length));
      if (s >= statuses.length) clearInterval(si);
    }, 900);
    return () => {
      clearInterval(mi);
      clearInterval(si);
    };
  }, [inView]);

  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="surface relative overflow-hidden">
            <div
              className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-magenta/10 blur-[100px]"
              aria-hidden
            />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-blue/10 blur-[100px]" aria-hidden />

            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14">
              <div>
                <span className="eyebrow">Featured automation</span>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Your AI Front Desk
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-secondary">
                  Imagine every new inquiry getting an immediate, intelligent
                  response — even when you&apos;re busy, closed or on another job.
                </p>
                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                        <Check className="h-2.5 w-2.5" aria-hidden />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <GradientButton href="/#contact" variant="outline">
                    See What AI Could Handle For You <ArrowRight className="h-4 w-4" />
                  </GradientButton>
                </div>
              </div>

              {/* Phone mock */}
              <div ref={ref} className="mx-auto w-full max-w-sm">
                <div className="rounded-[28px] border border-line-strong bg-bg p-3 shadow-2xl">
                  <div className="rounded-[20px] border border-line bg-bg-secondary">
                    <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
                        W
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">AI Assistant</p>
                        <p className="status flex items-center gap-1.5 text-ink-muted">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-blue" />
                          Online
                        </p>
                      </div>
                    </div>

                    <div className="flex min-h-[280px] flex-col gap-3 p-4">
                      {convo.slice(0, visible).map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35 }}
                          className={
                            m.from === "customer"
                              ? "max-w-[85%] self-end rounded-2xl rounded-br-sm bg-bg-soft px-3.5 py-2.5 text-sm text-ink"
                              : "max-w-[85%] self-start rounded-2xl rounded-bl-sm border border-brand-violet/20 bg-brand-violet/10 px-3.5 py-2.5 text-sm text-ink"
                          }
                        >
                          {m.text}
                        </motion.div>
                      ))}
                      {visible < convo.length && (
                        <div className="max-w-[60px] self-start rounded-2xl rounded-bl-sm border border-line bg-bg-soft px-3.5 py-3">
                          <span className="flex gap-1">
                            <Dot delay="0s" />
                            <Dot delay="0.15s" />
                            <Dot delay="0.3s" />
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-line p-3">
                      <p className="status mb-2 text-ink-muted">Automation</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {statuses.map((s, i) => (
                          <motion.div
                            key={s}
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: i < statusVisible ? 1 : 0.3 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-1.5 rounded-md border border-line bg-bg px-2 py-1.5 text-[11px] text-ink-secondary"
                          >
                            <Check
                              className={
                                i < statusVisible
                                  ? "h-3 w-3 text-brand-violet"
                                  : "h-3 w-3 text-ink-muted"
                              }
                              aria-hidden
                            />
                            {s}
                          </motion.div>
                        ))}
                      </div>
                    </div>
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

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted"
      style={{ animationDelay: delay, animationDuration: "1s" }}
    />
  );
}
