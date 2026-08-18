"use client";

import { motion } from "framer-motion";

/** A thin centered gradient hairline that draws itself in on scroll. */
export function GradientDivider() {
  return (
    <div className="shell py-2" aria-hidden>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto h-px w-full max-w-3xl origin-center"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(168,85,247,0.5), rgba(50,135,255,0.5), transparent)",
        }}
      />
    </div>
  );
}
