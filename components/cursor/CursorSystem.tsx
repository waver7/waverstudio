"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

/**
 * A single "focus" system. Four corner brackets + a centre dot behave as one
 * object that:
 *  - follows the pointer as a small targeting reticle (spring physics +
 *    velocity-based tilt + subtle idle breathing), and
 *  - morphs into a frame locked to the bounding box of any hovered element
 *    marked with `data-cursor="frame"`, then morphs back on exit.
 *
 * Reusable API (no per-component wiring):
 *   data-cursor="frame"    -> reticle expands into a frame around the element
 *   data-cursor="pointer"  -> tighter reticle (use on controls nested in frames)
 *   data-cursor="none"     -> hide the reticle (used automatically for inputs)
 *
 * Everything animates via MotionValues/springs — no React state per mousemove.
 */

const OFFSET = 12; // gap between the frame and a card's edge
const BASE = 46; // reticle size in pointer mode
const TIGHT = 30; // reticle size over small controls

type Mode = "pointer" | "tight" | "frame" | "none";

export function CursorSystem() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduce] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // spring configs (calmer + snappier under reduced motion)
  const posCfg = reduce
    ? { stiffness: 1400, damping: 90 }
    : { stiffness: 550, damping: 42, mass: 0.6 };
  const sizeCfg = reduce
    ? { stiffness: 1400, damping: 90 }
    : { stiffness: 300, damping: 26, mass: 0.7 };
  const rotCfg = reduce
    ? { stiffness: 1200, damping: 90 }
    : { stiffness: 200, damping: 18 };

  // targets we .set() from the rAF loop; springs follow them
  const tX = useMotionValue(0);
  const tY = useMotionValue(0);
  const tW = useMotionValue(BASE);
  const tH = useMotionValue(BASE);
  const tR = useMotionValue(0);
  const tOp = useMotionValue(0);
  const tDot = useMotionValue(1);

  const x = useSpring(tX, posCfg);
  const y = useSpring(tY, posCfg);
  const w = useSpring(tW, sizeCfg);
  const h = useSpring(tH, sizeCfg);
  const r = useSpring(tR, rotCfg);
  const op = useSpring(tOp, { stiffness: 300, damping: 30 });
  const dot = useSpring(tDot, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`translate(${x}px, ${y}px) rotate(${r}deg)`;

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("wv-cursor");

    const INPUTS = 'input,textarea,select,[contenteditable="true"]';

    const state = {
      mx: window.innerWidth / 2,
      my: window.innerHeight / 2,
      px: window.innerWidth / 2,
      py: window.innerHeight / 2,
      svx: 0,
      svy: 0,
      mode: "pointer" as Mode,
      target: null as Element | null,
      rect: null as { cx: number; cy: number; w: number; h: number } | null,
      needMeasure: false,
    };

    tX.set(state.mx);
    tY.set(state.my);

    const measure = (el: Element) => {
      const b = el.getBoundingClientRect();
      state.rect = {
        cx: b.left + b.width / 2,
        cy: b.top + b.height / 2,
        w: b.width,
        h: b.height,
      };
    };

    let ro: ResizeObserver | null = null;
    const observe = (el: Element) => {
      if (ro) ro.disconnect();
      ro = new ResizeObserver(() => (state.needMeasure = true));
      ro.observe(el);
    };

    const resolve = (target: EventTarget | null) => {
      const el = target as Element | null;
      if (!el || !el.closest) return;
      if (el.closest(INPUTS)) {
        state.mode = "none";
        state.target = null;
        return;
      }
      const marked = el.closest<HTMLElement>("[data-cursor]");
      if (marked) {
        const val = marked.dataset.cursor;
        if (val === "frame") {
          if (state.target !== marked) {
            state.target = marked;
            measure(marked);
            observe(marked);
          }
          state.mode = "frame";
          return;
        }
        if (val === "none") {
          state.mode = "none";
          state.target = null;
          return;
        }
        state.mode = "tight"; // "pointer"
        state.target = null;
        return;
      }
      // generic controls get a slightly tighter reticle
      if (el.closest('a,button,[role="button"],[role="tab"],label')) {
        state.mode = "tight";
      } else {
        state.mode = "pointer";
      }
      state.target = null;
    };

    let shown = false;
    const show = (v: boolean) => {
      if (shown === v) return;
      shown = v;
      setVisible(v);
    };
    const onMove = (e: MouseEvent) => {
      state.mx = e.clientX;
      state.my = e.clientY;
      show(true);
    };
    const onOver = (e: MouseEvent) => resolve(e.target);
    const onDocLeave = () => show(false);
    const onDocEnter = () => show(true);
    const onScroll = () => {
      if (state.mode === "frame") state.needMeasure = true;
    };
    const onResize = () => {
      if (state.mode === "frame") state.needMeasure = true;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);

    let raf = 0;
    let t0 = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - t0, 40) || 16.67;
      t0 = now;

      // velocity (px/frame), smoothed
      const vx = state.mx - state.px;
      const vy = state.my - state.py;
      state.px = state.mx;
      state.py = state.my;
      state.svx = state.svx * 0.75 + vx * 0.25;
      state.svy = state.svy * 0.75 + vy * 0.25;

      if (state.needMeasure && state.target) {
        measure(state.target);
        state.needMeasure = false;
      }

      if (state.mode === "frame" && state.rect) {
        tX.set(state.rect.cx);
        tY.set(state.rect.cy);
        tW.set(state.rect.w + OFFSET * 2);
        tH.set(state.rect.h + OFFSET * 2);
        tR.set(0);
        tDot.set(0);
        tOp.set(1);
      } else if (state.mode === "none") {
        tOp.set(0);
        tDot.set(0);
      } else {
        const size = state.mode === "tight" ? TIGHT : BASE;
        const breathe = reduce ? 0 : Math.sin(now * 0.0022) * 1.6;
        tX.set(state.mx);
        tY.set(state.my);
        tW.set(size + breathe);
        tH.set(size + breathe);
        tR.set(
          reduce
            ? 0
            : Math.max(-20, Math.min(20, state.svx * 0.7 + state.svy * 0.22)),
        );
        tDot.set(1);
        tOp.set(1);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      document.documentElement.classList.remove("wv-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 220ms ease" }}
    >
      {/* anchor: positioned at the reticle/frame centre */}
      <motion.div className="absolute left-0 top-0" style={{ transform }}>
        {/* box: width/height morph between reticle and card frame */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ width: w, height: h, opacity: op }}
        >
          <Corner edge="tl" />
          <Corner edge="tr" />
          <Corner edge="bl" />
          <Corner edge="br" />
          <motion.span
            className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{ opacity: dot }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

const ARM = 13; // corner arm length
const THICK = 2; // stroke thickness

function Corner({ edge }: { edge: "tl" | "tr" | "bl" | "br" }) {
  const white = "rgba(255,255,255,0.95)";
  const base: React.CSSProperties = {
    width: ARM,
    height: ARM,
    borderColor: white,
    filter: "drop-shadow(0 0 6px rgba(168,85,247,0.35))",
  };
  const pos: Record<string, React.CSSProperties> = {
    tl: {
      left: -1,
      top: -1,
      borderLeft: `${THICK}px solid`,
      borderTop: `${THICK}px solid`,
      borderTopLeftRadius: 4,
    },
    tr: {
      right: -1,
      top: -1,
      borderRight: `${THICK}px solid`,
      borderTop: `${THICK}px solid`,
      borderTopRightRadius: 4,
    },
    bl: {
      left: -1,
      bottom: -1,
      borderLeft: `${THICK}px solid`,
      borderBottom: `${THICK}px solid`,
      borderBottomLeftRadius: 4,
    },
    br: {
      right: -1,
      bottom: -1,
      borderRight: `${THICK}px solid`,
      borderBottom: `${THICK}px solid`,
      borderBottomRightRadius: 4,
    },
  };
  return <span className="absolute" style={{ ...base, ...pos[edge] }} />;
}
