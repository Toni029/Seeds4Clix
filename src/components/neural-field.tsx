import { useEffect, useRef } from "react";

export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    let time = 0;
    const pointer = { x: -1000, y: -1000 };
    const nodes = Array.from({ length: 54 }, (_, index) => ({
      x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00016,
      vy: (Math.random() - 0.5) * 0.00016, focus: index % 7 === 0,
      depth: Math.random(),
    }));
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      canvas.width = width * dpr; canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      time += reduced ? 0 : 1;
      const points = nodes.map((node) => {
        if (!reduced) { node.x += node.vx; node.y += node.vy; }
        if (node.x < -0.05 || node.x > 1.05) node.vx *= -1;
        if (node.y < -0.05 || node.y > 1.05) node.vy *= -1;
        const drift = Math.sin(time * 0.006 + node.depth * 8) * 8;
        return { x: node.x * width + drift, y: node.y * height, node };
      });
      points.forEach((point, index) => {
        points.slice(index + 1).forEach((other) => {
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance < 145) {
            context.strokeStyle = `oklch(0.72 0.19 160 / ${0.11 * (1 - distance / 145)})`;
            context.lineWidth = 0.7;
            context.beginPath(); context.moveTo(point.x, point.y); context.lineTo(other.x, other.y); context.stroke();
          }
        });
      });
      points.forEach(({ x, y, node }) => {
        const distance = Math.hypot(x - pointer.x, y - pointer.y);
        const active = node.focus || distance < 110;
        context.globalAlpha = node.focus ? 0.9 : Math.max(0.12, 0.45 - node.depth * 0.25);
        context.fillStyle = active ? "oklch(0.72 0.19 160)" : "oklch(0.66 0.18 255)";
        context.shadowBlur = active ? 14 : 0; context.shadowColor = "oklch(0.72 0.19 160)";
        context.beginPath(); context.arc(x, y, active ? 2.3 : 1.25 + node.depth, 0, Math.PI * 2); context.fill();
      });
      context.globalAlpha = 1; context.shadowBlur = 0;
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    const onMove = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top; };
    const onLeave = () => { pointer.x = -1000; pointer.y = -1000; };
    resize(); draw(); window.addEventListener("resize", resize); canvas.addEventListener("pointermove", onMove); canvas.addEventListener("pointerleave", onLeave);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); canvas.removeEventListener("pointermove", onMove); canvas.removeEventListener("pointerleave", onLeave); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-field" />;
}
