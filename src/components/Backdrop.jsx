import { useEffect, useRef, useState } from 'react';

// Cenários das cenas de história — SVG em camadas com detalhes animados (fogo, estrelas, névoa…)
const Stars = ({ n = 30, h = 150 }) => (
  <g fill="#fff">
    {Array.from({ length: n }, (_, i) => (
      <circle key={i} cx={(i * 53) % 400} cy={(i * 37) % h} r={0.6 + (i % 3) * 0.4} className="anim-twinkle" style={{ animationDelay: `${(i % 9) * 0.35}s` }} />
    ))}
  </g>
);
const Fog = ({ y = 200, o = 0.18 }) => (
  <g opacity={o}>
    <ellipse cx="60" cy={y} rx="140" ry="22" fill="#cfd8e0" style={{ animation: 'drift 70s linear infinite' }} />
    <ellipse cx="250" cy={y + 20} rx="160" ry="26" fill="#cfd8e0" style={{ animation: 'drift 95s linear infinite', animationDelay: '-40s' }} />
  </g>
);
const Torch = ({ x, y, c = '#ffb14a' }) => (
  <g>
    <rect x={x - 2} y={y} width="4" height="26" fill="#3a2a1a" />
    <circle cx={x} cy={y - 4} r="20" fill={c} opacity=".18" className="anim-glow" style={{ color: c }} />
    <path d={`M${x} ${y + 2} q-8 -10 0 -22 q8 12 0 22z`} fill={c} className="anim-flame" />
    <path d={`M${x} ${y} q-4 -6 0 -13 q4 7 0 13z`} fill="#fff3c0" className="anim-flame" />
  </g>
);

const SCENES = {
  tavern: () => (
    <>
      <rect width="400" height="300" fill="#231710" />
      <rect y="210" width="400" height="90" fill="#150d08" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={i * 90 - 10} y="0" width="6" height="215" fill="#2f1f14" />)}
      <rect x="0" y="40" width="400" height="10" fill="#2f1f14" />
      {/* janela com tempestade */}
      <rect x="290" y="70" width="70" height="80" rx="4" fill="#0f1a26" stroke="#4a3220" strokeWidth="5" />
      <path d="M300 90 l10 20 M320 85 l8 22 M340 92 l10 20" stroke="#6f8fb0" strokeWidth="1" opacity=".6" />
      {/* lareira */}
      <rect x="40" y="110" width="110" height="110" fill="#3a2a20" />
      <rect x="58" y="132" width="74" height="88" fill="#0a0604" />
      <circle cx="95" cy="200" r="46" fill="#ff8a30" opacity=".22" className="anim-glow" style={{ color: '#ff8a30' }} />
      <path d="M95 218 q-26 -22 -6 -50 q4 16 14 12 q-2 -18 10 -30 q6 30 14 44 q6 14 -32 24z" fill="#ff8a30" className="anim-flame" />
      <path d="M95 218 q-12 -14 0 -30 q12 16 0 30z" fill="#ffd27a" className="anim-flame" />
      {/* barris e mesa */}
      <ellipse cx="330" cy="240" rx="30" ry="34" fill="#4a2f1c" /><rect x="300" y="228" width="60" height="4" fill="#7a5a34" /><rect x="300" y="248" width="60" height="4" fill="#7a5a34" />
      <rect x="170" y="230" width="120" height="10" fill="#5a3b22" /><rect x="180" y="240" width="8" height="52" fill="#3a2515" /><rect x="272" y="240" width="8" height="52" fill="#3a2515" />
      <rect x="205" y="214" width="12" height="16" rx="2" fill="#c9a35a" /><rect x="238" y="216" width="10" height="14" rx="2" fill="#c9a35a" />
      <circle cx="211" cy="210" r="14" fill="#ffb14a" opacity=".12" />
    </>
  ),
  abbey: () => (
    <>
      <defs><linearGradient id="ab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a2233" /><stop offset="1" stopColor="#0d1119" /></linearGradient></defs>
      <rect width="400" height="300" fill="url(#ab)" />
      {[20, 120, 220, 320].map((x) => (
        <g key={x}>
          <path d={`M${x} 250 V80 q40 -70 80 0 V250z`} fill="#141b28" stroke="#28344a" strokeWidth="3" />
          {[110, 140, 170, 200].map((y, i) => <g key={y}>{Array.from({ length: 5 }, (_, k) => <rect key={k} x={x + 8 + k * 12} y={y} width="8" height="26" fill={['#7a3a3a', '#3a5a7a', '#5a7a3a', '#7a6a3a', '#5a3a7a'][(i + k) % 5]} opacity=".75" />)}<rect x={x + 4} y={y + 26} width="72" height="3" fill="#3a2a1a" /></g>)}
        </g>
      ))}
      <rect y="250" width="400" height="50" fill="#0a0e14" />
      {['A', '∑', 'det', '[ ]', 'Aᵀ', 'I'].map((g, i) => (
        <text key={g} x={40 + i * 65} y={120 + (i % 3) * 30} fill="#8fd4ff" fontSize="14" fontFamily="Nunito" fontWeight="800" opacity=".5" className="anim-float" style={{ animationDelay: `${i * 0.5}s` }}>{g}</text>
      ))}
      <Fog y={235} />
    </>
  ),
  lab: () => (
    <>
      <rect width="400" height="300" fill="#1a1524" />
      <rect y="220" width="400" height="80" fill="#0f0b16" />
      {[30, 80, 130].map((x, i) => <g key={x}><rect x={x} y={70 + i * 6} width="34" height="44" rx="6" fill={['#5a9a7a', '#8a5aa8', '#5a7aa8'][i]} opacity=".55" /><rect x={x + 10} y={60 + i * 6} width="14" height="12" fill="#3a2f45" /></g>)}
      <rect x="20" y="118" width="150" height="6" fill="#4a3a2a" />
      {/* caldeirão */}
      <ellipse cx="300" cy="235" rx="62" ry="14" fill="#000" opacity=".4" />
      <path d="M240 180 q-6 50 26 58 h68 q32 -8 26 -58z" fill="#2b2b34" />
      <ellipse cx="300" cy="180" rx="60" ry="14" fill="#7be08a" opacity=".85" className="anim-glow" style={{ color: '#7be08a' }} />
      {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={270 + i * 15} cy={168 - (i % 3) * 14} r={3 + (i % 2) * 2} fill="#b8f5c0" opacity=".7" className="anim-float" style={{ animationDelay: `${i * 0.4}s` }} />)}
      <path d="M270 150 q10 -30 -4 -60 M310 145 q-12 -30 6 -58" stroke="#b8f5c0" strokeWidth="6" fill="none" opacity=".18" className="anim-float" />
      <Fog y={250} o={0.12} />
    </>
  ),
  fort: () => (
    <>
      <defs><linearGradient id="fs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a2233" /><stop offset="1" stopColor="#4a2f2f" /></linearGradient></defs>
      <rect width="400" height="300" fill="url(#fs)" />
      <Stars n={16} h={110} />
      <rect y="150" width="400" height="150" fill="#2b2b33" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={i * 46} y="130" width="30" height="26" fill="#2b2b33" />)}
      {Array.from({ length: 6 }, (_, r) => Array.from({ length: 10 }, (_, c) => <rect key={`${r}${c}`} x={c * 42 + (r % 2) * 20 - 10} y={160 + r * 24} width="40" height="22" fill="none" stroke="#1b1b22" strokeWidth="2" />))}
      <path d="M170 300 V210 q30 -50 60 0 V300z" fill="#0f0f14" />
      <Torch x="120" y="190" /><Torch x="280" y="190" />
      <path d="M60 70 v100 M340 70 v100" stroke="#3a2a1a" strokeWidth="4" />
      <path d="M62 74 h40 l-8 18 l8 18 h-40z" fill="#8a2a2a" className="anim-wobble" />
      <path d="M338 74 h-40 l8 18 l-8 18 h40z" fill="#8a2a2a" className="anim-wobble" />
    </>
  ),
  tower: () => (
    <>
      <defs><linearGradient id="tw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d1633" /><stop offset="1" stopColor="#0d0a1a" /></linearGradient></defs>
      <rect width="400" height="300" fill="url(#tw)" />
      <Stars n={28} h={200} />
      {[[40, 60], [130, 40], [230, 60], [320, 40], [80, 160], [180, 150], [290, 160]].map(([x, y], i) => (
        <g key={i} className="anim-float" style={{ animationDelay: `${i * 0.4}s` }}>
          <ellipse cx={x + 25} cy={y + 40} rx="26" ry="42" fill="#0f0b1e" stroke="#7d6aa6" strokeWidth="3" />
          <ellipse cx={x + 25} cy={y + 40} rx="20" ry="36" fill="#3a2f66" opacity=".6" />
          <path d={`M${x + 12} ${y + 20} q10 -6 16 4`} stroke="#fff" strokeWidth="2" fill="none" opacity=".5" />
        </g>
      ))}
      <rect y="255" width="400" height="45" fill="#07050f" />
      <Fog y={255} o={0.15} />
    </>
  ),
  forge: () => (
    <>
      <rect width="400" height="300" fill="#1a1010" />
      <path d="M0 0 H400 V80 q-100 30 -200 6 t-200 -6z" fill="#0d0808" />
      <rect y="200" width="400" height="100" fill="#0d0808" />
      <path d="M0 230 q100 -22 200 0 t200 0 V300 H0z" fill="#e0561a" opacity=".85" className="anim-glow" style={{ color: '#e0561a' }} />
      <path d="M0 250 q100 -18 200 0 t200 0" stroke="#ffb14a" strokeWidth="4" fill="none" opacity=".7" />
      <rect x="60" y="140" width="110" height="80" rx="6" fill="#241a1a" /><rect x="76" y="156" width="78" height="64" fill="#050303" />
      <circle cx="115" cy="205" r="34" fill="#ff8a30" opacity=".3" className="anim-glow" style={{ color: '#ff8a30' }} />
      <path d="M100 218 q-14 -14 0 -34 q10 12 8 22 q10 -10 6 -22 q18 14 0 34z" fill="#ff8a30" className="anim-flame" />
      <path d="M230 200 h90 l10 -12 h-110z" fill="#4a4d55" /><rect x="250" y="200" width="50" height="34" fill="#3a3c44" /><rect x="238" y="234" width="74" height="10" fill="#2a2c33" />
      {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={230 + (i * 37) % 120} cy={190 - (i * 23) % 80} r="1.6" fill="#ffd27a" className="anim-twinkle" style={{ animationDelay: `${(i % 6) * 0.25}s` }} />)}
    </>
  ),
  maze: () => (
    <>
      <defs><linearGradient id="mz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d1f22" /><stop offset="1" stopColor="#060f11" /></linearGradient></defs>
      <rect width="400" height="300" fill="url(#mz)" />
      {[0, 1, 2, 3, 4].map((i) => {
        const s = 1 - i * 0.17;
        const w = 320 * s, h = 250 * s, x = (400 - w) / 2, y = 40 + i * 14;
        return <rect key={i} x={x} y={y} width={w} height={h} fill="none" stroke="#2f6f6c" strokeWidth={3 - i * 0.4} opacity={1 - i * 0.16} />;
      })}
      <path d="M0 300 L120 220 M400 300 L280 220 M0 0 L120 70 M400 0 L280 70" stroke="#2f6f6c" strokeWidth="2" opacity=".6" />
      <circle cx="200" cy="150" r="30" fill="#6ff0e6" opacity=".08" className="anim-glow" style={{ color: '#6ff0e6' }} />
      {['0', '≠0', 'det', '1', '−1', '0'].map((g, i) => <text key={i} x={30 + i * 62} y={90 + (i % 2) * 110} fill="#6ff0e6" fontSize="12" fontFamily="Nunito" fontWeight="800" opacity=".4" className="anim-twinkle" style={{ animationDelay: `${i * 0.5}s` }}>{g}</text>)}
      <Fog y={230} o={0.2} />
    </>
  ),
  throne: () => (
    <>
      <defs><linearGradient id="th" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#241018" /><stop offset="1" stopColor="#0f070b" /></linearGradient></defs>
      <rect width="400" height="300" fill="url(#th)" />
      {[30, 100, 300, 370].map((x) => <g key={x}><rect x={x - 12} y="20" width="24" height="220" fill="#2b1c22" /><rect x={x - 18} y="16" width="36" height="10" fill="#3a262e" /><rect x={x - 18} y="236" width="36" height="10" fill="#3a262e" /></g>)}
      <path d="M170 240 V120 q30 -36 60 0 V240z" fill="#33202a" stroke="#c9a35a" strokeWidth="3" />
      <rect x="180" y="140" width="40" height="50" rx="4" fill="#8e1f3a" />
      <path d="M150 300 L185 240 H215 L250 300z" fill="#7a1a30" />
      <Torch x="60" y="130" c="#ff9ab0" /><Torch x="340" y="130" c="#ff9ab0" />
      <path d="M120 40 h20 l-6 12 z M260 40 h20 l-6 12z" fill="#c9a35a" />
      <Fog y={250} o={0.2} />
    </>
  ),
  road: () => (
    <>
      <defs><linearGradient id="rd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#101830" /><stop offset="1" stopColor="#2a2a3a" /></linearGradient></defs>
      <rect width="400" height="300" fill="url(#rd)" />
      <Stars n={40} h={160} />
      <circle cx="300" cy="60" r="22" fill="#f0e8c8" /><circle cx="300" cy="60" r="34" fill="#f0e8c8" opacity=".12" />
      <path d="M0 200 L70 140 L130 190 L210 120 L290 190 L360 150 L400 180 V300 H0z" fill="#0d1220" />
      <path d="M160 300 q30 -70 40 -100 q10 30 30 100z" fill="#4a4030" />
      <Fog y={210} o={0.14} />
    </>
  ),
};

const SKY = { tavern: '#231710', abbey: '#1a2233', lab: '#1a1524', fort: '#2a2233', tower: '#1d1633', forge: '#1a1010', maze: '#0d1f22', throne: '#241018', road: '#101830' };
const CEIL = { tavern: '#0f0a06', abbey: '#080b12', lab: '#0c0910', fort: '#0e0b14', tower: '#08060f', forge: '#070404', maze: '#04090b', throne: '#0a0407', road: '#05070f' };

// Parte de cima da cena em telas altas (celular): teto, abóbada ou céu que continua a arte para cima.
// Desenhada em y ∈ [0, h] e termina exatamente na cor de topo da cena.
const Top = ({ kind, h }) => {
  const rows = Math.ceil(h / 70);
  const grad = (
    <>
      <defs><linearGradient id={`top-${kind}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={CEIL[kind]} /><stop offset="1" stopColor={SKY[kind]} /></linearGradient></defs>
      <rect x="-200" width="800" height={h + 1} fill={`url(#top-${kind})`} />
    </>
  );
  switch (kind) {
    case 'tavern':
      return (
        <>
          {grad}
          {Array.from({ length: rows }, (_, r) => <rect key={r} x="-200" y={r * 70 + 40} width="800" height="10" fill="#2f1f14" opacity=".8" />)}
          {[60, 200, 340].map((x, i) => <g key={x}><path d={`M${x} 0 V${h * 0.5 + i * 18}`} stroke="#3a2515" strokeWidth="1.5" /><rect x={x - 8} y={h * 0.5 + i * 18} width="16" height="20" rx="3" fill="#ffb14a" opacity=".85" /><circle cx={x} cy={h * 0.5 + 10 + i * 18} r="30" fill="#ffb14a" opacity=".12" className="anim-glow" style={{ color: '#ffb14a' }} /></g>)}
        </>
      );
    case 'abbey':
    case 'throne':
      return (
        <>
          {grad}
          {Array.from({ length: Math.max(1, rows) }, (_, r) => [-40, 60, 160, 260, 360].map((x) => <path key={`${r}${x}`} d={`M${x} ${r * 90 + 90} V${r * 90 + 30} q50 -50 100 0 V${r * 90 + 90}`} fill="none" stroke={kind === 'abbey' ? '#28344a' : '#4a2a34'} strokeWidth="3" opacity={0.75 - r * 0.12} />))}
          <g>
            <path d={`M200 0 V${h * 0.45}`} stroke="#3a3040" strokeWidth="1.5" />
            <circle cx="200" cy={h * 0.45 + 6} r="20" fill={kind === 'abbey' ? '#8fd4ff' : '#ff9ab0'} opacity=".14" className="anim-glow" style={{ color: kind === 'abbey' ? '#8fd4ff' : '#ff9ab0' }} />
            {[-22, -8, 8, 22].map((dx) => <g key={dx}><rect x={200 + dx - 2} y={h * 0.45 - 4} width="4" height="12" fill="#e8dcc0" /><path d={`M${200 + dx} ${h * 0.45 - 4} q-3 -6 0 -10 q3 4 0 10z`} fill="#ffcf6a" className="anim-flame" /></g>)}
            <path d={`M175 ${h * 0.45 + 8} h50`} stroke="#c9a35a" strokeWidth="3" />
          </g>
        </>
      );
    case 'lab':
      return (
        <>
          {grad}
          {Array.from({ length: rows }, (_, r) => <path key={r} d={`M-200 ${r * 70 + 50} h800`} stroke="#1c1526" strokeWidth="6" opacity=".7" />)}
          {[40, 130, 240, 330].map((x, i) => <g key={x}><path d={`M${x} 0 V${30 + i * 22}`} stroke="#3a2f45" strokeWidth="1.5" /><path d={`M${x - 8} ${30 + i * 22} l8 26 l8 -26z`} fill={['#5a9a7a', '#8a5aa8', '#7a9a4a', '#5a7aa8'][i]} opacity=".7" /></g>)}
        </>
      );
    case 'fort':
      return (
        <>
          {grad}
          {Array.from({ length: rows }, (_, r) => Array.from({ length: 10 }, (_, c) => <rect key={`${r}${c}`} x={c * 42 + (r % 2) * 20 - 10} y={r * 24 + 10} width="40" height="22" fill="none" stroke="#1b1b22" strokeWidth="2" opacity=".8" />))}
          {[70, 330].map((x) => <g key={x}><path d={`M${x} 0 v${h * 0.55}`} stroke="#3a2a1a" strokeWidth="3" /><path d={`M${x - 20} ${h * 0.05} h40 v${h * 0.4} l-20 -14 l-20 14z`} fill="#7a2a2a" className="anim-wobble" /></g>)}
        </>
      );
    case 'tower':
    case 'road':
      return (
        <>
          {grad}
          <Stars n={Math.round(h / 6)} h={h} />
          {kind === 'road' && <><circle cx="300" cy={h * 0.3} r="24" fill="#f0e8c8" /><circle cx="300" cy={h * 0.3} r="38" fill="#f0e8c8" opacity=".1" /></>}
          {kind === 'tower' && [0, 1, 2].map((i) => <circle key={i} cx="200" cy={h * 0.5} r={40 + i * 46} fill="none" stroke="#7d6aa6" strokeWidth=".8" strokeDasharray="3 8" opacity={0.5 - i * 0.12} />)}
        </>
      );
    case 'forge':
      return (
        <>
          {grad}
          {Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${-40 + i * 28} 0 l${8 + (i % 4) * 4} ${20 + (i * 37) % 60} l${8 + (i % 3) * 3} ${-(20 + (i * 37) % 60)}z`} fill="#1a1010" />)}
          <ellipse cx="200" cy={h} rx="240" ry="30" fill="#e0561a" opacity=".16" className="anim-glow" style={{ color: '#e0561a' }} />
        </>
      );
    case 'maze':
      return (
        <>
          {grad}
          <Stars n={Math.round(h / 8)} h={h} />
          <circle cx="90" cy={h * 0.32} r="20" fill="#d8f5f0" opacity=".85" /><circle cx="90" cy={h * 0.32} r="34" fill="#6ff0e6" opacity=".08" />
          {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${i * 50 - 10} ${h} q${8 - (i % 3) * 8} -${18 + (i % 4) * 8} 12 -${30 + (i % 3) * 10}`} fill="none" stroke="#1f4a3c" strokeWidth="5" strokeLinecap="round" opacity=".8" />)}
        </>
      );
    default:
      return grad;
  }
};

export default function Backdrop({ kind = 'road', dim = false }) {
  const Scene = SCENES[kind] || SCENES.road;
  const ref = useRef(null);
  const [box, setBox] = useState(() => ({ w: typeof window !== 'undefined' ? window.innerWidth : 400, h: typeof window !== 'undefined' ? window.innerHeight * 0.6 : 500 }));
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // Tela mais alta que a arte (4:3): estende a cena para cima com teto/céu; senão, preenche cortando as bordas
  const extra = Math.max(0, Math.min(700, Math.round((400 * box.h) / Math.max(1, box.w) - 300)));
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" style={{ background: SKY[kind] || '#101830' }}>
      <svg viewBox={`0 0 400 ${300 + extra}`} preserveAspectRatio={extra > 0 ? 'xMidYMax slice' : 'xMidYMid slice'} className="w-full h-full" aria-hidden="true">
        {extra > 0 && <Top kind={kind} h={extra} />}
        <g transform={`translate(0 ${extra})`}><Scene /></g>
      </svg>
      <div className={`absolute inset-0 transition-colors duration-500 ${dim ? 'bg-black/25' : 'bg-transparent'}`} />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/45 to-transparent" />
    </div>
  );
}
