"use client";

import { useEffect, useRef, type RefObject } from "react";

export function ChaosOrderField({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = targetRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !section || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 1;
    let frame = 0;
    let progress = 0;
    let visible = true;

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
    };

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      progress = Math.max(0, Math.min(1, (viewport * 0.82 - rect.top) / (rect.height * 0.72)));
    };

    const draw = (time: number) => {
      if (!visible) return;
      const t = time * 0.001;
      const eased = progress * progress * (3 - 2 * progress);
      context.clearRect(0, 0, width, height);

      const left = width * 0.08;
      const right = width * 0.92;
      const top = height * 0.16;
      const bottom = height * 0.72;
      const step = (right - left) / 24;
      const points = Array.from({ length: 25 }, (_, index) => {
        const x = left + index * step;
        const chaos =
          Math.sin(index * 3.7) * 0.18 + Math.cos(index * 1.9) * 0.11 + (index % 3) * 0.05;
        const order = 0.78 - index * 0.022 + Math.sin(index * 0.7) * 0.025;
        const yRatio = chaos * (1 - eased) + order * eased;
        return { x, y: top + yRatio * (bottom - top) };
      });

      context.strokeStyle = "oklch(0.32 0.03 250 / 0.55)";
      context.lineWidth = 1;
      for (let row = 0; row < 4; row += 1) {
        const y = top + row * ((bottom - top) / 3);
        context.beginPath();
        context.moveTo(left, y);
        context.lineTo(right, y);
        context.stroke();
      }

      context.beginPath();
      points.forEach((point, index) => {
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      });
      context.lineWidth = 2.5;
      const gradient = context.createLinearGradient(left, 0, right, 0);
      gradient.addColorStop(0, "oklch(0.68 0.18 52)");
      gradient.addColorStop(0.48, "oklch(0.72 0.17 145)");
      gradient.addColorStop(1, "oklch(0.74 0.16 215)");
      context.strokeStyle = gradient;
      context.shadowBlur = 12;
      context.shadowColor = "oklch(0.72 0.16 180 / 0.35)";
      context.stroke();
      context.shadowBlur = 0;

      const activeIndex = reducedMotion.matches ? 24 : Math.floor((t * 8) % 25);
      points.forEach((point, index) => {
        const active = index === activeIndex;
        context.beginPath();
        context.fillStyle =
          index < 8
            ? "oklch(0.68 0.18 52)"
            : index < 16
              ? "oklch(0.72 0.17 145)"
              : "oklch(0.74 0.16 215)";
        context.globalAlpha = active ? 1 : 0.72;
        context.arc(point.x, point.y, active ? 4.5 : 2.5, 0, Math.PI * 2);
        context.fill();
        if (active) {
          context.beginPath();
          context.strokeStyle = context.fillStyle;
          context.globalAlpha = 0.35;
          context.arc(point.x, point.y, 12 + Math.sin(t * 4) * 3, 0, Math.PI * 2);
          context.stroke();
        }
      });

      context.globalAlpha = 1;
      context.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.letterSpacing = "1px";
      context.fillStyle = "oklch(0.68 0.18 52)";
      context.fillText("ANARCHY", left, bottom + 28);
      context.fillStyle = "oklch(0.72 0.17 145)";
      context.fillText("PROCESSES", width * 0.43, bottom + 28);
      context.fillStyle = "oklch(0.74 0.16 215)";
      context.fillText("AI / SCALE", width * 0.78, bottom + 28);

      frame = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible) frame = requestAnimationFrame(draw);
      else cancelAnimationFrame(frame);
    };

    resize();
    updateProgress();
    frame = requestAnimationFrame(draw);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [targetRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="chaos-order-field" />;
}
