import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  size?: "md" | "lg";
};

/**
 * Primary CTA. "solid" uses the brand gradient; "outline" keeps a dark
 * surface with a gradient border so most of the UI stays restrained.
 */
export function GradientButton({
  href,
  children,
  variant = "solid",
  size = "md",
  className,
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-transform duration-200 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-[0.98]";
  const sizing = size === "lg" ? "px-6 py-3 text-[15px]" : "px-5 py-2.5 text-sm";

  if (variant === "solid") {
    return (
      <Link
        href={href}
        className={cn(base, sizing, "text-white hover:-translate-y-0.5", className)}
      >
        <span className="absolute inset-0 rounded-full bg-brand-gradient bg-[length:150%_150%] animate-gradient-shift" />
        <span
          className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60"
          style={{
            background:
              "linear-gradient(100deg,#FF2EA6,#A855F7,#3287FF)",
          }}
          aria-hidden
        />
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </Link>
    );
  }

  if (variant === "outline") {
    return (
      <Link
        href={href}
        className={cn(base, sizing, "text-ink hover:-translate-y-0.5", className)}
      >
        <span
          className="absolute inset-0 rounded-full p-px"
          style={{
            background:
              "linear-gradient(100deg,rgba(255,46,166,0.7),rgba(168,85,247,0.7),rgba(50,135,255,0.7))",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          aria-hidden
        />
        <span className="absolute inset-px rounded-full bg-bg-secondary" aria-hidden />
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        base,
        sizing,
        "text-ink-secondary hover:text-ink",
        className,
      )}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}
