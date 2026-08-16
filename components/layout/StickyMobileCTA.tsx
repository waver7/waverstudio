"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * A persistent "Get a Free AI Audit" bar on mobile. Appears once the hero is
 * scrolled past and hides while the contact form is on screen (so it never
 * duplicates the primary CTA).
 */
export function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let pastHero = false;
    let contactVisible = false;

    const onScroll = () => {
      pastHero = window.scrollY > 640;
      update();
    };
    const update = () => setShow(pastHero && !contactVisible);

    const contact = document.getElementById("contact");
    let io: IntersectionObserver | null = null;
    if (contact) {
      io = new IntersectionObserver(
        ([entry]) => {
          contactVisible = entry.isIntersecting;
          update();
        },
        { rootMargin: "0px 0px -20% 0px" },
      );
      io.observe(contact);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 p-3 backdrop-blur-xl transition-transform duration-300 md:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/#contact"
        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-[15px] font-medium text-white"
      >
        <span className="absolute inset-0 bg-brand-gradient" aria-hidden />
        <span className="relative z-10 inline-flex items-center gap-2">
          Get a Free AI Audit <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}
