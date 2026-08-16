import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  gradientDot = false,
}: {
  children: ReactNode;
  className?: string;
  gradientDot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-bg-soft/60 px-3 py-1 text-xs font-medium text-ink-secondary backdrop-blur",
        className,
      )}
    >
      {gradientDot && (
        <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" aria-hidden />
      )}
      {children}
    </span>
  );
}
