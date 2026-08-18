"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A three.js gradient "wave mesh" that recedes into the dark and ripples where
 * the cursor moves — a nod to WaverStudio's name. WebGL is lazy-loaded and only
 * used on capable, motion-friendly devices; otherwise a static CSS gradient
 * fallback renders so the hero always looks intentional. Purely decorative.
 */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;   // plane-local ripple centre
  uniform float uMouseStrength;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // layered travelling waves
    float h = 0.0;
    h += sin(pos.x * 0.55 + uTime * 0.55) * 0.55;
    h += sin(pos.y * 0.42 - uTime * 0.40) * 0.45;
    h += sin((pos.x + pos.y) * 0.30 + uTime * 0.32) * 0.35;
    h += sin((pos.x * 0.8 - pos.y * 0.6) + uTime * 0.9) * 0.15;

    // cursor ripple — a soft bump that oscillates around the pointer
    float d = distance(pos.xy, uMouse);
    h += exp(-d * d * 0.05) * uMouseStrength * sin(d * 1.4 - uTime * 2.4) * 1.2;

    pos.z += h;
    vElevation = h;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColorA; // magenta
  uniform vec3 uColorB; // violet
  uniform vec3 uColorC; // blue
  uniform float uGrid;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    // colour by elevation + a diagonal hue sweep
    float t = clamp(vElevation * 0.5 + 0.5, 0.0, 1.0);
    float sweep = clamp(vUv.x * 0.6 + vUv.y * 0.4, 0.0, 1.0);
    vec3 lowMix = mix(uColorC, uColorB, sweep);
    vec3 col = mix(lowMix, uColorA, smoothstep(0.55, 1.0, t));

    // crisp grid lines on the surface (a real mesh, no triangulation seams)
    vec2 g = abs(fract(vUv * uGrid - 0.5) - 0.5) / fwidth(vUv * uGrid);
    float line = 1.0 - min(min(g.x, g.y), 1.0);

    // brightness: dark troughs, luminous crests, plus the grid
    float glow = smoothstep(0.1, 1.0, t);
    float intensity = 0.07 + glow * 0.42 + line * 0.26;

    // fade into darkness toward the far edge and the sides
    float depthFade = smoothstep(0.0, 0.45, vUv.y);
    float sideFade = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
    float alpha = intensity * depthFade * mix(0.6, 1.0, sideFade);

    gl_FragColor = vec4(col * intensity, alpha);
  }
`;

type Mode = "idle" | "webgl" | "fallback";

export function WaveMesh() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("idle");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) {
      setMode("fallback");
      return;
    }

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        if (!disposed) setMode("fallback");
        return;
      }
      const host = hostRef.current;
      if (disposed || !host) return;

      // test WebGL availability
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      if (!gl) {
        setMode("fallback");
        return;
      }

      setMode("webgl");

      const canvas = document.createElement("canvas");
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      host.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.set(0, 3.0, 6.2);
      camera.lookAt(0, -0.4, -2);

      const SIZE = 26;
      const SEG = 150;
      const geometry = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);

      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseStrength: { value: 0 },
        uColorA: { value: new THREE.Color("#FF2EA6") },
        uColorB: { value: new THREE.Color("#A855F7") },
        uColorC: { value: new THREE.Color("#3287FF") },
        uGrid: { value: SEG },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2.15;
      scene.add(mesh);

      const resize = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      // pointer → plane-local target (smoothed)
      const target = new THREE.Vector2(0, 0);
      let strengthTarget = 0;
      const onMove = (e: MouseEvent) => {
        const r = host.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        target.set(nx * (SIZE / 2), -ny * (SIZE / 2));
        strengthTarget = 1;
      };
      const onLeave = () => (strengthTarget = 0);
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseout", onLeave);

      let visible = true;
      const io = new IntersectionObserver(
        ([entry]) => (visible = entry.isIntersecting),
        { threshold: 0 },
      );
      io.observe(host);

      const clock = new THREE.Clock();
      let raf = 0;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        uniforms.uTime.value += clock.getDelta();
        uniforms.uMouse.value.lerp(target, 0.08);
        uniforms.uMouseStrength.value +=
          (strengthTarget - uniforms.uMouseStrength.value) * 0.05;
        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseout", onLeave);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-[1] overflow-hidden" aria-hidden>
      {/* WebGL surface (fills once ready) */}
      <div
        ref={hostRef}
        className="absolute inset-x-0 bottom-0 h-[78%]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 34%, #000 88%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 34%, #000 88%, transparent)",
        }}
      />
      {/* Static fallback — also visible briefly before WebGL mounts */}
      {mode !== "webgl" && <WaveFallback />}
    </div>
  );
}

function WaveFallback() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[70%]" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 120%, rgba(168,85,247,0.35), rgba(50,135,255,0.18) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 42px), repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 42px)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 130%, #000, transparent 70%)",
          maskImage:
            "radial-gradient(120% 90% at 50% 130%, #000, transparent 70%)",
          transform: "perspective(600px) rotateX(58deg)",
          transformOrigin: "bottom",
        }}
      />
    </div>
  );
}
