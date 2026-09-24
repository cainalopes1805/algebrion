import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGame } from '../store/useGame';

const GLYPHS = ['[', ']', '∑', 'det', 'Aᵀ', 'I', '×', '0', '1', 'A⁻¹', 'λ', 'π'];

// Canvas de partículas ambientes: brasas, vaga-lumes, neve ou runas. Respeita o controle de movimento.
export default function ParticleField() {
  const canvasRef = useRef(null);
  const { particles, particleDensity, motion, accent } = useGame(
    useShallow((s) => ({
      particles: s.settings.particles,
      particleDensity: s.settings.particleDensity,
      motion: s.settings.motion,
      accent: s.settings.accent,
    })),
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || particles === 'none' || motion === 'off') return undefined;
    const ctx = canvas.getContext('2d');
    let raf;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rgb = getComputedStyle(document.documentElement).getPropertyValue('--glow').trim().replace(/\s+/g, ',') || '217,164,65';
    const speedK = motion === 'reduced' ? 0.4 : 1;
    const base = (motion === 'reduced' ? 26 : 52) * particleDensity;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (initial) => {
      const r = Math.random();
      const p = { x: Math.random() * w, y: initial ? Math.random() * h : h + 10, r: 0.8 + Math.random() * 2.2, ph: Math.random() * 6.28, sp: 0.3 + Math.random() * 0.9, life: Math.random(), g: GLYPHS[Math.floor(Math.random() * GLYPHS.length)] };
      if (particles === 'snow') { p.y = initial ? Math.random() * h : -10; p.r = 1 + Math.random() * 2.4; }
      if (particles === 'fireflies') { p.y = Math.random() * h; }
      if (particles === 'runes') { p.r = 9 + r * 10; }
      return p;
    };
    const count = Math.round(base * (particles === 'runes' ? 1.5 : particles === 'snow' ? 1.3 : 1));
    const ps = Array.from({ length: count }, () => spawn(true));

    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000) * 60 * speedK;
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.ph += 0.02 * dt;
        if (particles === 'embers') {
          p.y -= p.sp * 0.9 * dt;
          p.x += Math.sin(p.ph) * 0.5 * dt;
          const a = Math.max(0, Math.min(1, p.y / h)) * 0.9;
          ctx.fillStyle = `rgba(255,${140 + p.r * 20},60,${a})`;
          ctx.shadowColor = 'rgba(255,140,40,.9)';
          ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
          if (p.y < -10) ps[i] = spawn(false);
        } else if (particles === 'fireflies') {
          p.x += Math.cos(p.ph * 0.7) * 0.5 * dt;
          p.y += Math.sin(p.ph) * 0.4 * dt;
          const a = 0.25 + 0.75 * Math.abs(Math.sin(p.ph * 1.3));
          ctx.fillStyle = `rgba(200,255,120,${a})`;
          ctx.shadowColor = 'rgba(190,255,100,.9)';
          ctx.shadowBlur = 12;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.9, 0, 6.28); ctx.fill();
          if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) ps[i] = spawn(true);
        } else if (particles === 'snow') {
          p.y += p.sp * 0.8 * dt;
          p.x += Math.sin(p.ph) * 0.4 * dt;
          ctx.fillStyle = 'rgba(235,245,255,.75)';
          ctx.shadowBlur = 0;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
          if (p.y > h + 10) ps[i] = spawn(false);
        } else if (particles === 'runes') {
          p.y -= p.sp * 0.35 * dt;
          p.x += Math.sin(p.ph) * 0.25 * dt;
          const a = Math.sin(Math.max(0, Math.min(1, p.y / h)) * Math.PI) * (0.4 + 0.3 * Math.abs(Math.sin(p.ph * 0.8)));
          ctx.fillStyle = `rgba(${rgb},${a})`;
          ctx.shadowBlur = 0;
          ctx.font = `${p.r}px Cinzel, serif`;
          ctx.fillText(p.g, p.x, p.y);
          if (p.y < -20) ps[i] = spawn(false);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { last = performance.now(); raf = requestAnimationFrame(frame); }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [particles, particleDensity, motion, accent]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[2] pointer-events-none" aria-hidden="true" />;
}
