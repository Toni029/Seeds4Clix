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

      const chartHeight = graphBottom - graphTop;
      const points = Array.from({ length: 61 }, (_, i) => {
        const x = padX + graphWidth * (i / 60);
        const phase = i / 60;
        const chaosZone = Math.min(1, phase / 0.34);
        const processZone = Math.max(0, Math.min(1, (phase - 0.24) / 0.44));
        const scaleZone = Math.max(0, Math.min(1, (phase - 0.62) / 0.38));
        const noisy =
          Math.sin(i * 2.45) * 19 + Math.cos(i * 1.17) * 10 + Math.sin(i * 5.2) * 5;
        const dampedNoise = noisy * (1 - processZone) * (1 - scaleZone);
        const processRise = chartHeight * 0.15 * processZone;
        const scaleT = scaleZone * scaleZone * (3 - 2 * scaleZone);
        const scaleWobble =
          chartHeight *
          (0.025 * Math.sin(scaleZone * Math.PI * 3.2) +
            0.014 * Math.sin(scaleZone * Math.PI * 7));
        const scaleRise = chartHeight * 0.62 * scaleT + scaleWobble;
        const y = baseline - dampedNoise - processRise - scaleRise;
        return { x, y: Math.max(graphTop + 8, Math.min(graphBottom - 8, y)) };
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

      // One slow journey from the first point to the final endpoint.
      // The endpoint gets a short hold before the signal resets to the beginning.
      const journeySeconds = 26;
      const endpointHoldSeconds = 2;
      const cycleSeconds = journeySeconds + endpointHoldSeconds;
      const cycleTime = reduce.matches ? cycleSeconds : t % cycleSeconds;
      const journeyProgress = Math.min(1, cycleTime / journeySeconds);
      const easedProgress = journeyProgress * journeyProgress * (3 - 2 * journeyProgress);
      const signalPosition = easedProgress * (points.length - 1);
      const active = Math.min(points.length - 1, Math.floor(signalPosition));
      const signalMix = active === points.length - 1 ? 0 : signalPosition - active;
      points.forEach((point, i) => {
        ctx.beginPath();
        ctx.fillStyle = i < 20 ? colors[0] : i < 40 ? colors[1] : colors[2];
        ctx.globalAlpha = 0.8;
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      const from = points[active];
      const to = points[Math.min(active + 1, points.length - 1)];
      if (!from || !to) return;
      const signalX = from.x + (to.x - from.x) * signalMix;
      const signalY = from.y + (to.y - from.y) * signalMix;
      const signalColor = active < 20 ? colors[0] : active < 40 ? colors[1] : colors[2];
      ctx.beginPath();
      ctx.fillStyle = signalColor;
      ctx.globalAlpha = 1;
      ctx.arc(signalX, signalY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = signalColor;
      ctx.arc(signalX, signalY, 13 + Math.sin(t * 2.4) * 2, 0, Math.PI * 2);
      ctx.stroke();
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
