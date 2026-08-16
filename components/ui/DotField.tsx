"use client";

import { useEffect, useRef } from "react";

/**
 * Full-viewport animated dot grid used as the site's base texture.
 * Dots softly twinkle, a few slow "blobs" of brightness drift across the
 * field (the bubbling effect), and dots near the cursor light up in the
 * brand colours. Renders behind all content; purely decorative.
 */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cv: HTMLCanvasElement = canvas;
    const context = cv.getContext("2d", { alpha: false });
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const SPACING = 28; // px between dots
    const DOT = 1.15; // base radius
    const CURSOR_R = 150; // cursor influence radius

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;

    // Drifting brightness centres (the "bubbles")
    const blobs = Array.from({ length: 3 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      // slow independent drift speeds/directions
      ax: 0.00006 + Math.random() * 0.00008,
      ay: 0.00006 + Math.random() * 0.00008,
      px: Math.random() * Math.PI * 2,
      py: Math.random() * Math.PI * 2,
      r: 220 + i * 90,
    }));

    const mouse = { x: -9999, y: -9999, active: false };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / SPACING) + 1;
      rows = Math.ceil(h / SPACING) + 1;
    }

    function draw(time: number) {
      // base background
      ctx.fillStyle = "#050608";
      ctx.fillRect(0, 0, w, h);

      // update blob positions
      const bx: number[] = [];
      const by: number[] = [];
      for (const b of blobs) {
        bx.push((0.5 + 0.5 * Math.sin(time * b.ax + b.px)) * w);
        by.push((0.5 + 0.5 * Math.sin(time * b.ay + b.py)) * h);
      }

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * SPACING;
          const y = r * SPACING;

          // per-dot twinkle
          const twinkle = reduce
            ? 0
            : 0.5 + 0.5 * Math.sin(time * 0.0016 + (c * 0.55 + r * 0.42));
          let alpha = 0.05 + twinkle * 0.05;

          // brightness from drifting blobs
          let blobBoost = 0;
          for (let i = 0; i < blobs.length; i++) {
            const dx = x - bx[i];
            const dy = y - by[i];
            const d2 = dx * dx + dy * dy;
            const rr = blobs[i].r * blobs[i].r;
            if (d2 < rr) blobBoost += (1 - d2 / rr) * 0.22;
          }
          alpha += blobBoost;

          // cursor halo
          let cursorK = 0;
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < CURSOR_R) cursorK = 1 - d / CURSOR_R;
          }

          let radius = DOT;
          let color: string;
          if (cursorK > 0) {
            // blend toward brand violet/blue near the cursor
            alpha = Math.min(0.85, alpha + cursorK * 0.7);
            radius = DOT + cursorK * 1.1;
            const mix = cursorK;
            const rC = Math.round(120 + mix * 88); // -> 208
            const gC = Math.round(120 + mix * -20);
            const bC = Math.round(200 + mix * 55);
            color = `rgba(${rC},${gC},${bC},${alpha})`;
          } else {
            color = `rgba(150,155,225,${alpha})`;
          }

          if (alpha <= 0.045) continue; // skip near-invisible dots
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
    }

    let raf = 0;
    let running = true;
    function loop(t: number) {
      if (!running) return;
      draw(t);
      if (!reduce) raf = requestAnimationFrame(loop);
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
    }
    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    }

    resize();
    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
