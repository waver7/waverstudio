"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = 'a,button,input,textarea,select,label,[role="button"],[role="tab"]';

/**
 * Reticle cursor: four corner brackets + a centre dot that follow the pointer
 * with a subtle lag, expand over interactive elements, and hide on touch
 * devices. When active it replaces the native cursor (via the .wv-cursor class
 * on <html>) so no-JS / touch users keep the default pointer.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("wv-cursor");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;

    const render = () => {
      const ease = reduce ? 1 : 0.22;
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      const el = dotRef.current;
      if (el) el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      const t = e.target as Element | null;
      setHovering(!!t?.closest?.(INTERACTIVE));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("wv-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled) return null;

  const size = down ? 26 : hovering ? 46 : 34;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transition: "width 160ms ease, height 160ms ease",
        }}
      >
        {corners.map((c) => (
          <span
            key={c.k}
            className="absolute h-[9px] w-[9px]"
            style={{
              ...c.pos,
              borderTop: c.t ? `1.5px solid ${hovering ? "#C77DFF" : "#8A90B8"}` : undefined,
              borderBottom: c.b ? `1.5px solid ${hovering ? "#C77DFF" : "#8A90B8"}` : undefined,
              borderLeft: c.l ? `1.5px solid ${hovering ? "#C77DFF" : "#8A90B8"}` : undefined,
              borderRight: c.r ? `1.5px solid ${hovering ? "#C77DFF" : "#8A90B8"}` : undefined,
              transition: "border-color 160ms ease",
            }}
          />
        ))}
        {/* centre dot */}
        <span
          className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: hovering
              ? "linear-gradient(100deg,#FF2EA6,#A855F7,#3287FF)"
              : "#C8CCE6",
          }}
        />
      </div>
    </div>
  );
}

const corners = [
  { k: "tl", t: true, l: true, b: false, r: false, pos: { left: 0, top: 0 } },
  { k: "tr", t: true, r: true, b: false, l: false, pos: { right: 0, top: 0 } },
  { k: "bl", b: true, l: true, t: false, r: false, pos: { left: 0, bottom: 0 } },
  { k: "br", b: true, r: true, t: false, l: false, pos: { right: 0, bottom: 0 } },
] as const;
