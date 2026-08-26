"use client";

import { useEffect, useRef, type RefObject } from "react";

interface Particle {
  chaosX: number;
  chaosY: number;
  orderX: number;
  orderY: number;
  x: number;
  y: number;
  jitterPhase: number;
  jitterSpeed: number;
  jitterRadius: number;
  size: number;
  cluster: number;
}

const CLUSTER_COUNT = 3;
const PARTICLES_PER_CLUSTER = 26;

/**
 * Canvas backdrop for the "From anarchy to scale" section. Particles start
 * scattered at random (anarchy) and, as the section scrolls through the
 * viewport, converge into three ordered clusters that line up behind the
 * stage cards — color shifting from a muted warm tone to the green/blue
 * brand gradient as order takes hold. Progress is driven purely by scroll
 * position, so the story plays out as the user reads the section.
 */
export function ChaosOrderField({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const section = targetRef.current;
    if (!canvas || !context || !section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 1;
    let height = 1;
    let frame = 0;
    let running = true;

    const particles: Particle[] = [];
    for (let cluster = 0; cluster < CLUSTER_COUNT; cluster += 1) {
      for (let i = 0; i < PARTICLES_PER_CLUSTER; i += 1) {
        particles.push({
          chaosX: Math.random(),
          chaosY: Math.random(),
          orderX: 0,
          orderY: 0,
          x: 0,
          y: 0,
          jitterPhase: Math.random() * Math.PI * 2,
          jitterSpeed: 0.4 + Math.random() * 0.6,
          jitterRadius: 3 + Math.random() * 6,
          size: 1.1 + Math.random() * 1.8,
          cluster,
        });
      }
    }

    const layoutOrder = () => {
      const columnGap = width / CLUSTER_COUNT;
      for (const particle of particles) {
        const columnCenter = columnGap * particle.cluster + columnGap / 2;
        const local = (particle.chaosX + particle.chaosY) * 0.5;
        particle.orderX = columnCenter + (local - 0.5) * columnGap * 0.55;
        particle.orderY = height * 0.28 + (particle.chaosY - 0.5) * height * 0.44;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = section.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      layoutOrder();
    };

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const raw = (viewport * 0.85 - rect.top) / (rect.height * 0.7 + viewport * 0.3);
      progressRef.current = Math.min(1, Math.max(0, raw));
    };

    const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

    const draw = (now: number) => {
      if (!running) return;
      const seconds = now * 0.001;
      const progress = progressRef.current;
      const eased = progress * progress * (3 - 2 * progress);
      context.clearRect(0, 0, width, height);

      const positions = particles.map((particle) => {
        const chaosPixelX = particle.chaosX * width;
        const chaosPixelY = particle.chaosY * height;
        const jitter = reducedMotion.matches
          ? 0
          : Math.sin(seconds * particle.jitterSpeed + particle.jitterPhase) *
            particle.jitterRadius *
            (1 - eased);
        const baseX = mix(chaosPixelX, particle.orderX, eased);
        const baseY = mix(chaosPixelY, particle.orderY, eased);
        return {
          x: baseX + jitter,
          y: baseY + jitter * 0.6,
          particle,
        };
      });

      // Connective lines only emerge once particles have organized —
      // this is the visual payoff for "scale".
      if (eased > 0.35) {
        const lineStrength = (eased - 0.35) / 0.65;
        for (let cluster = 0; cluster < CLUSTER_COUNT - 1; cluster += 1) {
          const from = positions.filter((p) => p.particle.cluster === cluster);
          const to = positions.filter((p) => p.particle.cluster === cluster + 1);
          if (!from.length || !to.length) continue;
          const a = from[Math.floor(from.length / 2)]!;
          const b = to[Math.floor(to.length / 2)]!;
          context.strokeStyle = `oklch(0.72 0.16 190 / ${0.35 * lineStrength})`;
          context.lineWidth = 1.4;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      for (const { x, y, particle } of positions) {
        const hue = mix(28, 190 + particle.cluster * 24, eased);
        const chroma = mix(0.06, 0.19, eased);
        const lightness = mix(0.58, 0.75, eased);
        context.globalAlpha = mix(0.35, 0.85, eased);
        context.fillStyle = `oklch(${lightness} ${chroma} ${hue})`;
        context.shadowBlur = mix(0, 8, eased);
        context.shadowColor = `oklch(${lightness} ${chroma} ${hue})`;
        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };

    const onScroll = () => updateProgress();
    const onResize = () => {
      resize();
      updateProgress();
    };
    const onVisibilityChange = () => {
      running = document.visibilityState === "visible";
      cancelAnimationFrame(frame);
      if (running) frame = requestAnimationFrame(draw);
    };

    resize();
    updateProgress();
    frame = requestAnimationFrame(draw);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [targetRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="chaos-order-field" />;
}
