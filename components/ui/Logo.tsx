import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="WaverStudio home"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet/70",
        className,
      )}
    >
      <span className="relative flex h-8 w-8 items-center justify-center">
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="wv-logo" x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF2EA6" />
              <stop offset="0.5" stopColor="#A855F7" />
              <stop offset="1" stopColor="#3287FF" />
            </linearGradient>
          </defs>
          <rect
            x="1"
            y="1"
            width="30"
            height="30"
            rx="9"
            stroke="url(#wv-logo)"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
          {/* Abstract W formed from two connected strokes (a signal / waveform) */}
          <path
            d="M7 10.5 L11.5 22 L16 13 L20.5 22 L25 10.5"
            stroke="url(#wv-logo)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-ink">
        Waver<span className="text-ink-secondary">Studio</span>
      </span>
    </Link>
  );
}
