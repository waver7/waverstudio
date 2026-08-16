"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Card with a soft gradient glow that follows the cursor and a border that
 * brightens on hover. Restrained by default — the glow is subtle.
 */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as never}
      onMouseMove={onMove}
      data-cursor="frame"
      className={cn(
        "group relative overflow-hidden rounded-card border border-line bg-bg-card transition-[colors,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_18px_40px_-24px_rgba(168,85,247,0.5)]",
        className,
      )}
      style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04)" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx,50%) var(--my,0%), rgba(168,85,247,0.14), transparent 70%)",
        }}
      />
      <span className="relative z-10 block h-full">{children}</span>
    </Comp>
  );
}
