"use client";

import { useEffect, useRef, type RefObject } from "react";

export function ChaosOrderField({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = targetRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !section || !ctx) return;

    let width = 1;
    let height = 1;
    let frame = 0;
    let progress = 0;
    let targetProgress = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const colors: [string, string, string] = ["#ff9b58", "#9ddd68", "#61b9ff"];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = section.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.min(390, Math.max(250, width * 0.34));
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = "100%";
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      targetProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight * 0.8 - rect.top) / (rect.height * 0.64)),
      );
    };

    const draw = (time: number) => {
      const t = time / 1000;
      progress = reduce.matches ? targetProgress : progress + (targetProgress - progress) * 0.08;
      const ease = progress * progress * (3 - 2 * progress);
      const padX = Math.min(44, width * 0.08);
      const graphTop = Math.max(34, height * 0.13);
      const graphBottom = Math.min(height * 0.68, height - 92);
      const graphWidth = width - padX * 2;
      const baseline = graphBottom - (graphBottom - graphTop) * 0.18;
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(135, 160, 180, .16)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i += 1) {
        const y = graphTop + (graphBottom - graphTop) * (i / 4);
        ctx.beginPath();
        ctx.moveTo(padX, y);
        ctx.lineTo(width - padX, y);
        ctx.stroke();
      }
      for (let i = 0; i < 9; i += 1) {
        const x = padX + graphWidth * (i / 8);
        ctx.beginPath();
        ctx.moveTo(x, graphTop);
        ctx.lineTo(x, graphBottom);
        ctx.stroke();
      }

      const points = Array.from({ length: 31 }, (_, i) => {
        const x = padX + graphWidth * (i / 30);
        const chaos = baseline - Math.sin(i * 2.7) * 28 - Math.cos(i * 1.3) * 18 - (i % 4) * 10;
        const organized = baseline - (graphBottom - graphTop) * (0.1 + i / 42);
        return { x, y: chaos * (1 - ease) + organized * ease };
      });

      ctx.beginPath();
      points.forEach((point, i) =>
        i ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y),
      );
      const gradient = ctx.createLinearGradient(padX, 0, width - padX, 0);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.46, colors[1]);
      gradient.addColorStop(1, colors[2]);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 16;
      ctx.shadowColor = "rgba(100, 210, 160, .35)";
      ctx.stroke();
      ctx.shadowBlur = 0;

      const active = reduce.matches ? 29 : Math.floor((t * 12) % 30);
      points.forEach((point, i) => {
        ctx.beginPath();
        ctx.fillStyle = i < 10 ? colors[0] : i < 20 ? colors[1] : colors[2];
        ctx.globalAlpha = i === active ? 1 : 0.8;
        ctx.arc(point.x, point.y, i === active ? 5 : 3, 0, Math.PI * 2);
        ctx.fill();
        if (i === active) {
          ctx.beginPath();
          ctx.globalAlpha = 0.35;
          ctx.strokeStyle = ctx.fillStyle;
          ctx.arc(point.x, point.y, 14 + Math.sin(t * 5) * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;
      ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ["ANARCHY", "PROCESSES", "AI / SCALE"].forEach((label, i) => {
        ctx.fillStyle = colors[Math.min(i, colors.length - 1)] ?? colors[2];
        ctx.fillText(label, padX + graphWidth * (i / 3) + (i ? 10 : 0), graphBottom + 28);
      });
      ctx.fillStyle = "rgba(170, 190, 205, .55)";
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillText("operational clarity", padX, graphTop - 14);
      frame = requestAnimationFrame(draw);
    };

    resize();
    update();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", update);
    };
  }, [targetRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="chaos-order-field" />;
}
