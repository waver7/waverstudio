import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Tone = "default" | "brand" | "muted";

export function WorkflowNode({
  label,
  sub,
  icon: Icon,
  status,
  tone = "default",
  active = false,
  className,
}: {
  label: string;
  sub?: string;
  icon?: LucideIcon;
  status?: string;
  tone?: Tone;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-xl border bg-bg-soft/80 px-3.5 py-2.5 transition-colors duration-300",
        active
          ? "border-brand-violet/40"
          : "border-line hover:border-line-strong",
        className,
      )}
    >
      {Icon && (
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
            tone === "brand"
              ? "border-transparent bg-brand-gradient text-white"
              : "border-line bg-bg-card text-ink-secondary",
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{label}</p>
        {sub && <p className="truncate text-xs text-ink-muted">{sub}</p>}
      </div>
      {status && (
        <span className="status flex shrink-0 items-center gap-1.5 text-ink-muted">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              active ? "bg-brand-blue" : "bg-ink-muted/60",
              active && "shadow-[0_0_8px_2px_rgba(50,135,255,0.6)]",
            )}
            aria-hidden
          />
          {status}
        </span>
      )}
    </div>
  );
}
