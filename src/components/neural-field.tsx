import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  phase: number;
  focus: boolean;
}

/**
 * Full-page ambient particle network. Mounted once in the root layout as a
 * fixed background so the "matrix" style node field is visible behind every
 * section, from the top of the page to the bottom, while staying out of the
 * way of clicks (pointer-events: none) and scrolling with the viewport.
 */
export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerTarget = { x: -1000, y: -1000 };
    const pointer = { x: -1000, y: -1000 };
    const nodeCount = window.innerWidth < 640 ? 58 : 96;
    const nodes: Node[] = Array.from({ length: nodeCount }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00006,
      vy: 0.00003 + Math.random() * 0.00005,
      radius: 0.7 + Math.random() * 1.5,
      opacity: 0.2 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      focus: index % 10 === 0,
    }));

    let width = 1;
    let height = 1;
    let frame = 0;
    let lastTime = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      if (!running) return;
      const elapsed = Math.min(now - lastTime || 16, 50);
      lastTime = now;
      const seconds = now * 0.001;
      context.clearRect(0, 0, width, height);

      // Smoothly ease the tracked pointer toward its real position so the
      // highlight glides instead of snapping — this is what makes the
      // interaction feel fluid rather than jittery.
      const ease = 1 - Math.pow(0.001, elapsed / 1000);
      pointer.x += (pointerTarget.x - pointer.x) * ease;
      pointer.y += (pointerTarget.y - pointer.y) * ease;

      const points = nodes.map((node) => {
        if (!reducedMotion.matches) {
          node.x += node.vx * elapsed;
          node.y += node.vy * elapsed;
          if (node.x < -0.04) node.x = 1.04;
          if (node.x > 1.04) node.x = -0.04;
          if (node.y > 1.04) {
            node.y = -0.04;
            node.x = Math.random();
          }
        }
        const breathing = Math.sin(seconds * 0.35 + node.phase) * 4;
        const x = node.x * width + Math.cos(node.phase) * breathing;
        const y = node.y * height + Math.sin(node.phase) * breathing;
        return { x, y, node };
      });

      for (let index = 0; index < points.length; index += 1) {
        for (let next = index + 1; next < points.length; next += 1) {
          const a = points[index];
          const b = points[next];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 138) continue;
          const strength = (1 - distance / 138) * 0.18;
          context.strokeStyle = `oklch(0.78 0.16 170 / ${strength})`;
          context.lineWidth = 0.65;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      for (const { x, y, node } of points) {
        const pointerDistance = Math.hypot(x - pointer.x, y - pointer.y);
        const highlighted = node.focus || pointerDistance < 120;
        const pulse = 1 + Math.sin(seconds * 1.4 + node.phase) * 0.16;
        context.globalAlpha = highlighted ? 0.9 : node.opacity;
        context.fillStyle = highlighted ? "oklch(0.82 0.18 170)" : "oklch(0.72 0.12 205)";
        context.shadowBlur = highlighted ? 12 : 0;
        context.shadowColor = "oklch(0.78 0.18 170)";
        context.beginPath();
        context.arc(x, y, (highlighted ? 2.1 : node.radius) * pulse, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.x = event.clientX;
      pointerTarget.y = event.clientY;
    };
    const onPointerLeave = () => {
      pointerTarget.x = -1000;
      pointerTarget.y = -1000;
    };
    const onVisibilityChange = () => {
      running = document.visibilityState === "visible";
      cancelAnimationFrame(frame);
      if (running && !reducedMotion.matches) {
        lastTime = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    draw(performance.now());
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-field" />;
}
