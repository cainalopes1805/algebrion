// Luz do dia no mapa: a partir da hora (do aparelho ou fixa), calcula quanto é noite e o tom do ar.
const FIXED = { day: 13, dusk: 19.2, night: 23.5 };
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smooth = (t) => t * t * (3 - 2 * t);

export function skyAt(mode = 'auto', date = new Date()) {
  const h = FIXED[mode] ?? date.getHours() + date.getMinutes() / 60;
  // noite: 1 até as 5h, some até 7h30; volta entre 17h30 e 20h30
  let night = 1;
  if (h >= 7.5 && h <= 17.5) night = 0;
  else if (h > 5 && h < 7.5) night = 1 - smooth((h - 5) / 2.5);
  else if (h > 17.5 && h < 20.5) night = smooth((h - 17.5) / 3);
  // calor dourado no nascer e no pôr do sol
  const warm = clamp01(1 - Math.abs(h - 6.4) / 1.6) * 0.8 + clamp01(1 - Math.abs(h - 18.9) / 1.9);
  const w = clamp01(warm);
  const day = [255, 255, 255], deep = [92, 108, 168], gold = [255, 176, 118];
  const tint = mix(mix(day, deep, night), gold, w * 0.75 * (1 - night * 0.35));
  return { night, warm: w, tint: `rgb(${tint.join(',')})`, cloud: night > 0.5 ? '#9db0d8' : w > 0.45 ? '#ffd9b8' : '#ffffff' };
}
