"use client";

import { useEffect, useRef } from "react";

function hexToRGB(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  if (isNaN(n)) return [62, 224, 143];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function readTokenColor(cssVar: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
  return v || fallback;
}

type ConstellationProps = {
  density?: number;
  maxParticles?: number;
  minParticles?: number;
  linkDist?: number;
  color?: string;
  linkColor?: string;
  speed?: number;
  parallax?: number;
  className?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
};

export function Constellation({
  density = 0.00022,
  maxParticles = 280,
  minParticles = 80,
  linkDist = 160,
  color,
  linkColor,
  speed = 0.28,
  parallax = 22,
  className = "",
  style,
  interactive = true,
}: ConstellationProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const dotHex = color || readTokenColor("--tok-accent", "#3ee08f");
    const lineHex = linkColor || readTokenColor("--tok-accent-soft", "#5cffb1");
    const [dr, dg, db] = hexToRGB(dotHex);
    const [lr, lg, lb] = hexToRGB(lineHex);

    let W = 800;
    let H = 600;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
    }[] = [];
    let raf: number | null = null;
    let mounted = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (n: number) => {
      const out = [];
      for (let i = 0; i < n; i++) {
        out.push({
          x: rand(0, W),
          y: rand(0, H),
          vx: rand(-speed, speed),
          vy: rand(-speed, speed),
          r: rand(1.0, 2.6),
          a: rand(0.55, 1.0),
        });
      }
      return out;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(rect.width, 100);
      H = Math.max(rect.height, 100);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.max(minParticles, Math.min(maxParticles, Math.round(W * H * density)));
      if (particles.length < target) {
        particles = particles.concat(spawn(target - particles.length));
      } else if (particles.length > target) {
        particles.length = target;
      }
    };

    const onMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left - W / 2) / (W / 2);
      mouse.ty = (e.clientY - rect.top - H / 2) / (H / 2);
    };

    const tick = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const ox = mouse.x * parallax;
      const oy = mouse.y * parallax;

      ctx.clearRect(0, 0, W, H);

      const linkSq = linkDist * linkDist;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkSq) {
            const t = 1 - d2 / linkSq;
            ctx.strokeStyle = `rgba(${lr},${lg},${lb},${0.42 * t})`;
            ctx.beginPath();
            ctx.moveTo(p.x + ox * 0.6, p.y + oy * 0.6);
            ctx.lineTo(q.x + ox * 0.6, q.y + oy * 0.6);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;

        const grad = ctx.createRadialGradient(p.x + ox, p.y + oy, 0, p.x + ox, p.y + oy, p.r * 4);
        grad.addColorStop(0, `rgba(${dr},${dg},${db},${p.a * 0.55})`);
        grad.addColorStop(1, `rgba(${dr},${dg},${db},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${dr},${dg},${db},${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!mounted) return;
      tick();
      raf = requestAnimationFrame(loop);
    };

    resize();
    setTimeout(resize, 60);
    setTimeout(resize, 300);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (interactive) window.addEventListener("mousemove", onMove, { passive: true });
    loop();

    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      if (interactive) window.removeEventListener("mousemove", onMove);
    };
  }, [density, maxParticles, minParticles, linkDist, color, linkColor, speed, parallax, interactive]);

  return (
    <div className={`constellation ${className}`} style={style}>
      <canvas ref={ref} />
    </div>
  );
}

type DriftDotsProps = {
  count?: number;
  color?: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function DriftDots({
  count = 80,
  color,
  speed = 0.18,
  className = "",
  style,
}: DriftDotsProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const [dr, dg, db] = hexToRGB(color || readTokenColor("--tok-accent", "#3ee08f"));

    let W = 800;
    let H = 400;
    const pts: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    let raf: number | null = null;
    let mounted = true;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const make = () => ({
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-speed, speed),
      vy: rand(-speed * 0.5, speed * 0.5),
      r: rand(0.8, 2.0),
      a: rand(0.3, 0.75),
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(rect.width, 100);
      H = Math.max(rect.height, 100);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (pts.length < count) {
        for (let i = pts.length; i < count; i++) pts.push(make());
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
        ctx.fillStyle = `rgba(${dr},${dg},${db},${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const loop = () => {
      if (!mounted) return;
      tick();
      raf = requestAnimationFrame(loop);
    };

    resize();
    setTimeout(resize, 60);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    loop();
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count, color, speed]);

  return (
    <div className={`drift-dots ${className}`} style={style}>
      <canvas ref={ref} />
    </div>
  );
}

type NodeGlobeProps = {
  count?: number;
  radius?: number;
  color?: string;
  linkColor?: string;
  linkDist?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function NodeGlobe({
  count = 64,
  radius = 140,
  color,
  linkColor,
  linkDist = 150,
  speed = 0.002,
  className = "",
  style,
}: NodeGlobeProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const [dr, dg, db] = hexToRGB(color || readTokenColor("--tok-accent", "#3ee08f"));
    const [lr, lg, lb] = hexToRGB(linkColor || readTokenColor("--tok-accent-soft", "#5cffb1"));

    const pts: { x: number; y: number; z: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / Math.max(1, count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    let W = 800;
    let H = 600;
    let raf: number | null = null;
    let mounted = true;
    let angle = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(rect.width, 100);
      H = Math.max(rect.height, 100);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      angle += speed;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(radius, Math.min(W, H) * 0.4);
      const sa = Math.sin(angle);
      const ca = Math.cos(angle);
      const sb = Math.sin(angle * 0.6);
      const cb = Math.cos(angle * 0.6);
      const proj = pts.map((p) => {
        let x = p.x * ca + p.z * sa;
        let z = -p.x * sa + p.z * ca;
        let y = p.y * cb - z * sb;
        z = p.y * sb + z * cb;
        const scale = 1 / (1.8 - z);
        return { sx: cx + x * R * scale, sy: cy + y * R * scale, z, scale };
      });

      const linkSq = linkDist * linkDist;
      ctx.lineWidth = 1;
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const dx = proj[i].sx - proj[j].sx;
          const dy = proj[i].sy - proj[j].sy;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkSq) {
            const depth = (proj[i].z + proj[j].z) / 2;
            const a = (1 - d2 / linkSq) * (0.3 + depth * 0.3);
            if (a > 0.02) {
              ctx.strokeStyle = `rgba(${lr},${lg},${lb},${a})`;
              ctx.beginPath();
              ctx.moveTo(proj[i].sx, proj[i].sy);
              ctx.lineTo(proj[j].sx, proj[j].sy);
              ctx.stroke();
            }
          }
        }
      }
      const sorted = proj.slice().sort((a, b) => a.z - b.z);
      for (const p of sorted) {
        const alpha = 0.55 + (p.z + 1) * 0.3;
        const r = 1.6 + p.scale * 1.8;
        const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 3.5);
        grad.addColorStop(0, `rgba(${dr},${dg},${db},${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${dr},${dg},${db},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${dr},${dg},${db},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!mounted) return;
      tick();
      raf = requestAnimationFrame(loop);
    };

    resize();
    setTimeout(resize, 60);
    setTimeout(resize, 300);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    loop();
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count, radius, color, linkColor, linkDist, speed]);

  return (
    <div className={`node-globe ${className}`} style={style}>
      <canvas ref={ref} />
    </div>
  );
}
