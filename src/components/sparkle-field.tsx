import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: "primary" | "accent";
  spin: number;
}

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="submit"], .surface-card';

/**
 * Full-page sparkle layer. Drifts a few ambient sparkles on its own, adds a
 * light trail behind the cursor, and bursts extra sparkles whenever the
 * pointer enters a link, button or card — a lightweight "magic dust" effect
 * that never blocks clicks (pointer-events: none throughout).
 */
export function SparkleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let lastTime = 0;
    let running = true;
    let lastTrailSpawn = 0;
    const sparkles: Sparkle[] = [];
    const maxSparkles = 140;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x: number, y: number, count: number, spread: number) => {
      for (let i = 0; i < count; i += 1) {
        if (sparkles.length >= maxSparkles) sparkles.shift();
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * spread;
        const speed = 0.015 + Math.random() * 0.03;
        const maxLife = 650 + Math.random() * 550;
        sparkles.push({
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.012,
          life: maxLife,
          maxLife,
          size: 1.4 + Math.random() * 2.4,
          hue: Math.random() > 0.55 ? "accent" : "primary",
          spin: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawStar = (x: number, y: number, size: number, rotation: number) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      for (let i = 0; i < 4; i += 1) {
        context.moveTo(0, 0);
        context.lineTo(size, 0);
        context.rotate(Math.PI / 2);
      }
      context.restore();
    };

    const draw = (now: number) => {
      if (!running) return;
      const elapsed = Math.min(now - lastTime || 16, 50);
      lastTime = now;
      context.clearRect(0, 0, width, height);

      for (let i = sparkles.length - 1; i >= 0; i -= 1) {
        const sparkle = sparkles[i];
        sparkle.life -= elapsed;
        if (sparkle.life <= 0) {
          sparkles.splice(i, 1);
          continue;
        }
        sparkle.x += sparkle.vx * elapsed;
        sparkle.y += sparkle.vy * elapsed;
        sparkle.vy += 0.000012 * elapsed;

        const lifeRatio = sparkle.life / sparkle.maxLife;
        const fade = Math.sin(lifeRatio * Math.PI);
        const color =
          sparkle.hue === "primary" ? "oklch(0.82 0.18 170" : "oklch(0.78 0.16 255";

        context.save();
        context.globalAlpha = Math.max(0, fade) * 0.85;
        context.strokeStyle = `${color} / ${fade})`;
        context.lineWidth = Math.max(0.6, sparkle.size * 0.32);
        context.shadowBlur = 6;
        context.shadowColor = `${color} / 0.6)`;
        drawStar(sparkle.x, sparkle.y, sparkle.size * (0.6 + fade * 0.6), sparkle.spin);
        context.stroke();
        context.restore();
      }

      context.shadowBlur = 0;
      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastTrailSpawn > 55) {
        lastTrailSpawn = now;
        spawn(event.clientX, event.clientY, 1, 6);
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const interactive = target?.closest(INTERACTIVE_SELECTOR);
      if (!interactive) return;
      const rect = interactive.getBoundingClientRect();
      spawn(rect.left + rect.width / 2, rect.top + rect.height / 2, 10, Math.max(rect.width, rect.height) / 2.2);
    };

    const onVisibilityChange = () => {
      running = document.visibilityState === "visible";
      cancelAnimationFrame(frame);
      if (running) {
        lastTime = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    draw(performance.now());
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="sparkle-field" />;
}
