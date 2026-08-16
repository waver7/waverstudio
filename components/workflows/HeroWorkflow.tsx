"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Bot,
  Database,
  CalendarCheck,
  MessageSquare,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Step = {
  icon: typeof Globe;
  label: string;
  sub: string;
};

const source: Step = { icon: Globe, label: "Website Lead", sub: "New inquiry received" };
const agent: Step = { icon: Bot, label: "AI Agent", sub: "Qualifies customer" };
const branches: Step[] = [
  { icon: Database, label: "CRM", sub: "Contact created" },
  { icon: CalendarCheck, label: "Calendar", sub: "Appointment booked" },
  { icon: MessageSquare, label: "SMS", sub: "Confirmation sent" },
];
const owner: Step = { icon: UserRound, label: "Owner", sub: "Qualified lead received" };

// Stages: 0 lead, 1 agent, 2 branches, 3 owner
const TOTAL = 4;

export function HeroWorkflow() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStage(TOTAL - 1);
      return;
    }
    const id = setInterval(() => setStage((s) => (s + 1) % (TOTAL + 1)), 1400);
    return () => clearInterval(id);
  }, []);

  const isDone = (s: number) => stage > s || stage === TOTAL;
  const isActive = (s: number) => stage === s;

  return (
    <div className="surface relative overflow-hidden p-4 sm:p-5">
      {/* window chrome */}
      <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-2 font-mono text-[11px] text-ink-muted">
            workflow / new-customer-lead
          </span>
        </div>
        <span className="status flex items-center gap-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-2 py-0.5 text-brand-blue">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-blue" />
          {stage === TOTAL || stage === 3 ? "Completed" : stage === 1 ? "AI Running" : "Automated"}
        </span>
      </div>

      <div className="flex flex-col items-stretch gap-2.5">
        <HeroNode step={source} active={isActive(0)} done={isDone(0)} status={isDone(0) ? "Received" : "Listening"} />
        <Connector on={stage >= 1} />
        <HeroNode
          step={agent}
          active={isActive(1)}
          done={isDone(1)}
          tone="brand"
          status={isActive(1) ? "Thinking" : isDone(1) ? "Qualified" : "Idle"}
        />
        <Connector on={stage >= 2} fan />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {branches.map((b, i) => (
            <HeroNode
              key={b.label}
              step={b}
              compact
              active={isActive(2)}
              done={isDone(2)}
              delay={i * 0.08}
              status={isDone(2) ? "Done" : "Queued"}
            />
          ))}
        </div>
        <Connector on={stage >= 3} />
        <HeroNode step={owner} active={isActive(3)} done={isDone(3)} status={isDone(3) ? "Notified" : "Waiting"} />
      </div>

      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -right-16 top-1/3 h-40 w-40 rounded-full bg-brand-violet/20 blur-3xl"
        aria-hidden
      />
    </div>
  );
}

function HeroNode({
  step,
  active,
  done,
  status,
  tone = "default",
  compact = false,
  delay = 0,
}: {
  step: Step;
  active: boolean;
  done: boolean;
  status: string;
  tone?: "default" | "brand";
  compact?: boolean;
  delay?: number;
}) {
  const Icon = step.icon;
  const lit = active || done;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative flex items-center gap-3 rounded-xl border bg-bg-soft/80 px-3 py-2.5 transition-all duration-500",
        active ? "border-brand-violet/50" : lit ? "border-line-strong" : "border-line",
      )}
      style={
        active
          ? { boxShadow: "0 0 0 1px rgba(168,85,247,0.25), 0 8px 30px -12px rgba(168,85,247,0.5)" }
          : undefined
      }
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg transition-colors duration-500",
          compact ? "h-7 w-7" : "h-9 w-9",
          tone === "brand" || active
            ? "bg-brand-gradient text-white"
            : lit
              ? "border border-line-strong bg-bg-card text-ink"
              : "border border-line bg-bg-card text-ink-muted",
        )}
      >
        <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn("truncate font-medium text-ink", compact ? "text-[13px]" : "text-sm")}>
          {step.label}
        </p>
        {!compact && <p className="truncate text-xs text-ink-muted">{step.sub}</p>}
        {compact && <p className="truncate text-[11px] text-ink-muted">{step.sub}</p>}
      </div>
      <span className="status flex shrink-0 items-center gap-1.5 text-ink-muted">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors duration-500",
            active ? "bg-brand-blue shadow-[0_0_8px_2px_rgba(50,135,255,0.6)]" : done ? "bg-brand-violet" : "bg-ink-muted/50",
          )}
          aria-hidden
        />
        <span className="hidden sm:inline">{status}</span>
      </span>
    </motion.div>
  );
}

function Connector({ on, fan = false }: { on: boolean; fan?: boolean }) {
  return (
    <div className="relative mx-auto h-3 w-px" aria-hidden>
      <span className="absolute inset-0 bg-line-strong" />
      <motion.span
        className="absolute inset-x-0 top-0 bg-brand-gradient"
        initial={{ height: 0 }}
        animate={{ height: on ? "100%" : 0 }}
        transition={{ duration: 0.4 }}
      />
      {fan && (
        <span className="absolute left-1/2 top-full h-px w-[62%] -translate-x-1/2 bg-line-strong sm:w-[66%]" />
      )}
    </div>
  );
}
