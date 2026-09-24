// Arte do mapa medieval: terreno, moldura, rosa dos ventos e os marcos de cada região (tudo SVG, sem imagens).
import { MAP_H, ZERO } from '../data/mapGeometry';

export const INK = '#8f7d58';
export const SEA_W = 46; // largura do mar em cada lado

/* ───────────── Terreno ───────────── */
export function Decor({ d }) {
  const s = d.s;
  const g = { transform: `translate(${d.x} ${d.y}) scale(${s})` };
  switch (d.kind) {
    case 'mountain':
      return (
        <g transform={g.transform}>
          <ellipse cx="4" cy="2" rx="34" ry="5" fill="#000" opacity=".28" />
          <path d="M-26 0 L-8 -36 L2 -18 L14 -44 L36 0Z" fill="#40392a" stroke={INK} strokeWidth=".8" strokeLinejoin="round" />
          <path d="M-8 -36 L-2 0 L-26 0Z" fill="#584d38" opacity=".7" />
          <path d="M14 -44 L36 0 L20 0 L12 -22Z" fill="#000" opacity=".26" />
          <path d="M14 -44 l-6 12 l5 -3 l3 5 l4 -6z M-8 -36 l-5 10 l5 -3 l4 4z" fill="#c9c5b0" opacity=".9" />
          <path d="M-2 -8 l3 8 M6 -12 l4 12 M22 -14 l3 8 M-16 -10 l-2 8 M28 -6 l-3 6" stroke={INK} strokeWidth=".6" opacity=".7" fill="none" />
        </g>
      );
    case 'forest':
      return (
        <g transform={g.transform}>
          {[[-14, 0], [0, -4], [14, 0], [-6, 8], [8, 8]].slice(0, 3 + (d.v % 3)).map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <ellipse cx="1" cy="4" rx="9" ry="2.4" fill="#000" opacity=".3" />
              <rect x="-1.5" y="-2" width="3" height="6" fill="#1b140c" />
              {d.dead ? (
                <g fill="none" stroke="#2a2118" strokeLinecap="round"><path d="M0 4 V-15" strokeWidth="1.8" /><path d="M0 -5 L-6 -12 M0 -8 L6 -15 M0 -11 L-3 -19 M-6 -12 l-2 -3 M6 -15 l2 -3" strokeWidth="1.1" /></g>
              ) : (d.v + i) % 3 === 0 ? (
                <g><circle cy="-13" r="10" fill="#38553a" stroke="#1a2a20" strokeWidth=".7" /><circle cx="-4" cy="-16" r="4" fill="#4d7048" opacity=".7" /><circle cx="4" cy="-11" r="3" fill="#25392a" opacity=".6" /></g>
              ) : (
                <g><path d="M0 -26 L-9 -12 h4 L-11 0 h22 L5 -12 h4z" fill="#2c4032" stroke="#1a2a20" strokeWidth=".7" strokeLinejoin="round" /><path d="M0 -26 L9 -12 h-4 L11 0 h-9z" fill="#000" opacity=".22" /></g>
              )}
            </g>
          ))}
        </g>
      );
    case 'deadtree':
      return (
        <g transform={g.transform}>
          <ellipse cy="2" rx="7" ry="1.8" fill="#000" opacity=".3" />
          <g fill="none" stroke="#2a2118" strokeLinecap="round"><path d="M0 2 V-18" strokeWidth="2" /><path d="M0 -6 L-7 -13 M0 -10 L7 -17 M0 -14 L-4 -22 M-7 -13 l-3 -2 M7 -17 l3 -3" strokeWidth="1.2" /></g>
        </g>
      );
    case 'ash':
      return <ellipse transform={g.transform} rx="10" ry="4" fill="#0e0a07" opacity=".42" />;
    case 'pine':
      if (d.dead) {
        return (
          <g transform={g.transform}>
            <ellipse cy="2" rx="7" ry="1.8" fill="#000" opacity=".3" />
            <g fill="none" stroke="#2a2118" strokeLinecap="round"><path d="M0 2 V-24" strokeWidth="1.8" /><path d="M0 -8 L-5 -13 M0 -12 L5 -17 M0 -17 L-4 -21 M0 -20 L3 -24" strokeWidth="1" /></g>
          </g>
        );
      }
      return (
        <g transform={g.transform}>
          <ellipse cy="2" rx="8" ry="2" fill="#000" opacity=".3" />
          <rect x="-1.2" y="-4" width="2.4" height="6" fill="#1b140c" />
          <path d="M0 -30 L-8 -16 h4 L-10 -6 h20 L4 -16 h4z" fill="#2a4038" stroke="#16241f" strokeWidth=".6" strokeLinejoin="round" />
          <path d="M0 -30 l-4 8 h8z M-5 -16 l-2 4 h4z M5 -16 l2 4 h-4z" fill="#dfe6e2" opacity=".85" />
        </g>
      );
    case 'hill':
      return (
        <g transform={g.transform} opacity=".85">
          <path d="M-20 0 q20 -24 40 0z" fill="#332d1e" stroke={INK} strokeWidth=".7" />
          <path d="M-12 -4 q4 -8 10 -10 M-6 -2 l2 -6 M2 -3 l2 -8 M8 -2 l2 -5" stroke={INK} strokeWidth=".55" fill="none" opacity=".7" />
        </g>
      );
    case 'tuft':
      return <path transform={g.transform} d="M-4 0 l1 -5 l1.5 4 l1.5 -6 l1.5 6 l1.5 -4 l1 5" stroke="#5f7a48" strokeWidth=".9" fill="none" strokeLinecap="round" opacity=".75" />;
    case 'rock':
      return (
        <g transform={g.transform}>
          <path d="M-7 0 L-5 -6 L0 -8 L6 -5 L7 0z" fill="#5d574a" stroke="#2a251c" strokeWidth=".6" />
          <path d="M0 -8 L6 -5 L7 0 L1 0z" fill="#000" opacity=".25" /><path d="M-5 -6 L0 -8 L-1 -4z" fill="#a39d88" opacity=".6" />
        </g>
      );
    case 'bush':
      return (
        <g transform={g.transform}>
          <ellipse cx="0" cy="1" rx="9" ry="2" fill="#000" opacity=".28" />
          <circle cx="-4" cy="-3" r="4.5" fill="#3d5a3a" /><circle cx="3" cy="-4" r="5" fill="#46663f" /><circle cx="7" cy="-1.5" r="3.2" fill="#345034" />
          {d.v === 0 && <g fill="#c94a4a"><circle cx="-2" cy="-4" r=".9" /><circle cx="4" cy="-6" r=".9" /><circle cx="6" cy="-2" r=".9" /></g>}
        </g>
      );
    case 'flowers':
      return (
        <g transform={g.transform}>
          {[[-6, 0], [0, -3], [6, 1], [2, 3]].map(([x, y], i) => (
            <g key={i}><path d={`M${x} ${y} v4`} stroke="#4c6b3a" strokeWidth=".7" /><circle cx={x} cy={y} r="1.5" fill={['#e0b84a', '#d98aa8', '#e8e0c8', '#9c8ad6'][(d.v + i) % 4]} /></g>
          ))}
        </g>
      );
    case 'windmill':
      return (
        <g transform={g.transform}>
          <ellipse cy="2" rx="14" ry="3" fill="#000" opacity=".3" />
          <path d="M-8 0 L-5 -24 h10 L8 0z" fill="#6f5a3e" stroke="#2a1d10" strokeWidth=".7" />
          <path d="M-7 -24 L0 -32 L7 -24z" fill="#7a3a30" stroke="#2a1d10" strokeWidth=".6" />
          <rect x="-2" y="-8" width="4" height="8" rx="2" fill="#1a1008" />
          <circle cy="-22" r="2.2" fill="#3a2a18" />
          {d.broken && <path d="M0 0 L-2.6 -12 L2.6 -12z M0 0 L12 -2.6 L12 2.6z" transform="translate(0 -22) rotate(-24)" fill="#8f8462" stroke="#2a1d10" strokeWidth=".4" />}
        </g>
      );
    case 'lake':
      return (
        <g transform={g.transform} opacity=".95">
          <ellipse cx="0" cy="0" rx="48" ry="23" fill="#3a5a4a" opacity=".5" />
          <ellipse cx="0" cy="0" rx="44" ry="20" fill="#1f3a44" stroke="#33606b" strokeWidth="1.2" />
          <ellipse cx="-6" cy="-5" rx="30" ry="10" fill="#2a5060" opacity=".55" />
          <path d="M-20 -4 q6 -3 12 0 M0 4 q7 -3 14 0 M12 -7 q6 -3 12 0 M-30 6 q5 -2 10 0" stroke="#6fa3b0" strokeWidth=".8" fill="none" opacity=".6" />
          <path d="M-46 8 v-9 M-43 9 v-11 M46 -6 v-9 M49 -4 v-8" stroke="#5f7a48" strokeWidth="1" strokeLinecap="round" />
        </g>
      );
    case 'house':
      if (d.burnt) {
        return (
          <g transform={g.transform}>
            <rect x="-8" y="-6" width="16" height="6" fill="#2b221a" stroke="#120c07" strokeWidth=".6" />
            <path d="M-8 -6 V-11 L-5 -8 M8 -6 V-13 L5 -9" stroke="#1a130c" strokeWidth="1.6" fill="none" />
            <path d="M-11 -9 L-4 -14 L-1 -9 Z M2 -8 L8 -12 L11 -8 Z" fill="#3a2a20" stroke="#120c07" strokeWidth=".6" />
            <path d="M-3 -3 l2 -6 M4 -2 l-1 -7" stroke="#0f0a06" strokeWidth="1.2" />
            <rect x="-2" y="-4" width="4" height="4" fill="#0d0805" />
          </g>
        );
      }
      return (
        <g transform={g.transform}>
          <rect x="-8" y="-10" width="16" height="10" fill="#5a4630" stroke="#2a1d10" strokeWidth=".6" />
          <path d="M-11 -10 L0 -20 L11 -10z" fill="#7a3a30" />
          <rect x="-2" y="-6" width="4" height="6" fill="#1a1008" />
          <rect x="3.5" y="-8.5" width="3" height="3" fill="#d8b25a" opacity=".55" />
        </g>
      );
    case 'ruin':
      return (
        <g transform={g.transform}>
          <rect x="-12" y="-16" width="5" height="16" fill="#6b6555" /><rect x="-2" y="-10" width="5" height="10" fill="#5a5547" /><rect x="8" y="-20" width="5" height="20" fill="#6b6555" />
          <path d="M-14 -16 h9 M6 -20 h9" stroke="#8a8470" strokeWidth="2" />
        </g>
      );
    case 'tent':
      return (
        <g transform={g.transform}>
          <path d="M-12 0 L0 -18 L12 0z" fill="#7a5a3a" stroke="#2a1d10" strokeWidth=".6" />
          <path d="M0 -18 L-3 0 h6z" fill="#1a1008" />
          {!d.cold && <path d="M0 -18 v-6 l7 2 -7 2" fill="#a83a3a" />}
        </g>
      );
    default:
      return null;
  }
}

export function MapFrame({ x0 = 0, w = 400 }) {
  const x1 = x0 + w;
  return (
    <g>
      <rect x={x0 + 6} y="6" width={w - 12} height={MAP_H - 12} fill="none" stroke={INK} strokeWidth="2" />
      <rect x={x0 + 12} y="12" width={w - 24} height={MAP_H - 24} fill="none" stroke={INK} strokeWidth=".8" opacity=".7" />
      {[[x0 + 12, 12], [x1 - 12, 12], [x0 + 12, MAP_H - 12], [x1 - 12, MAP_H - 12]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}><circle r="6" fill="none" stroke={INK} strokeWidth="1.2" /><circle r="2" fill={INK} /></g>
      ))}
      {/* mar nas bordas: águas rasas junto à costa, mais fundas para fora */}
      <defs>
        <linearGradient id="seaG" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor="#3a7a80" /><stop offset=".35" stopColor="#1f4d5a" /><stop offset="1" stopColor="#0d2530" /></linearGradient>
      </defs>
      {[0, 1].map((side) => (
        <g key={side} transform={side ? `translate(${x1} 0) scale(-1 1)` : `translate(${x0} 0)`}>
          <path d={`M0 0 H${SEA_W} ${Array.from({ length: 60 }, (_, i) => `q9 ${22 + (i % 3) * 3} 0 50`).join(' ')} H0z`} fill="url(#seaG)" />
          <path d={`M${SEA_W} 0 ${Array.from({ length: 60 }, (_, i) => `q9 ${22 + (i % 3) * 3} 0 50`).join(' ')}`} fill="none" stroke="#8fb8b0" strokeWidth="1.2" opacity=".35" />
        </g>
      ))}
    </g>
  );
}

export function Compass({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity=".9">
      <circle r="36" fill="none" stroke={INK} strokeWidth="1" /><circle r="30" fill="none" stroke={INK} strokeWidth=".6" strokeDasharray="2 3" />
      <path d="M0 -44 L7 -7 L0 0 L-7 -7z M0 44 L7 7 L0 0 L-7 7z M-44 0 L-7 -7 L0 0 L-7 7z M44 0 L7 -7 L0 0 L7 7z" fill={INK} opacity=".55" />
      <path d="M0 -44 L7 -7 L0 0z M-44 0 L-7 7 L0 0z" fill="#c9b07a" />
      <path d="M-24 -24 L-4 -4 M24 -24 L4 -4 M-24 24 L-4 4 M24 24 L4 4" stroke={INK} strokeWidth="1.2" />
      <text y="-50" textAnchor="middle" fill="#c9b07a" fontSize="12" fontFamily="Cinzel Decorative, serif" fontWeight="900">N</text>
    </g>
  );
}

export function Ship({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} className="anim-float">
      <path d="M-14 0 h28 l-5 8 h-18z" fill="#4a3220" stroke="#1a1008" strokeWidth=".8" />
      <rect x="-1" y="-22" width="2" height="22" fill="#2a1a0c" />
      <path d="M1 -22 q12 8 0 18z" fill="#c9c0a4" /><path d="M-1 -19 q-8 6 0 14z" fill="#b0a78c" />
    </g>
  );
}

export function Serpent({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity=".85">
      <path d="M-30 4 q6 -16 14 0 q6 -16 14 0 q6 -16 14 0" fill="none" stroke="#3f7a72" strokeWidth="5" strokeLinecap="round" className="anim-float" />
      <circle cx="26" cy="-10" r="6" fill="#3f7a72" /><circle cx="28" cy="-11" r="1.2" fill="#fff" />
    </g>
  );
}

/* ───────────── Marcos ───────────── */
const Smoke = ({ x, y, c = '#c9c5b0' }) => (
  <g fill={c} opacity=".35">
    {[0, 1, 2].map((i) => <circle key={i} cx={x + i * 3} cy={y - i * 10} r={3 + i * 1.8} className="anim-float" style={{ animationDelay: `${i * 0.5}s` }} />)}
  </g>
);
const Window = ({ x, y, w = 5, h = 8, c = '#ffcf6a' }) => <rect x={x} y={y} width={w} height={h} rx={w / 2} fill={c} opacity=".9" />;
const Battlements = ({ x, y, w, n = 5, c = '#5a5a66' }) => (
  <g fill={c}>{Array.from({ length: n }, (_, i) => <rect key={i} x={x + (i * w) / n} y={y} width={w / n - 2} height="5" />)}</g>
);

export function Landmark({ kind }) {
  switch (kind) {
    case 'village':
      return (
        <g>
          <ellipse cx="0" cy="2" rx="60" ry="9" fill="#000" opacity=".35" />
          {/* casas */}
          <g><rect x="34" y="-22" width="22" height="22" fill="#5a4630" stroke="#2a1d10" /><path d="M31 -22 L45 -36 L59 -22z" fill="#6d3d34" /><Window x={41} y={-16} /></g>
          <g><rect x="-62" y="-18" width="20" height="18" fill="#5a4630" stroke="#2a1d10" /><path d="M-65 -18 L-52 -30 L-39 -18z" fill="#6d3d34" /><Window x={-55} y={-13} /></g>
          {/* taverna */}
          <rect x="-32" y="-46" width="62" height="46" fill="#6b4a2e" stroke="#2a1d10" strokeWidth="1.2" />
          {[-24, -8, 8, 24].map((x) => <path key={x} d={`M${x} -46 V0`} stroke="#3a2515" strokeWidth="1.5" />)}
          <path d="M-38 -46 L0 -78 L38 -46z" fill="#7a2e2a" stroke="#2a1d10" strokeWidth="1.2" />
          <rect x="14" y="-74" width="9" height="20" fill="#4a3a30" />
          <Smoke x={18} y={-78} />
          <rect x="-8" y="-24" width="16" height="24" rx="8" fill="#1e0f06" />
          <Window x={-26} y={-36} w={8} h={10} /><Window x={16} y={-36} w={8} h={10} />
          <circle cx="0" cy="-22" r="34" fill="#ffb14a" opacity=".07" className="anim-glow" style={{ color: '#ffb14a' }} />
          <path d="M-40 -34 h-10" stroke="#3a2515" strokeWidth="2" /><rect x="-58" y="-38" width="11" height="9" rx="1" fill="#c9a35a" stroke="#6a4f16" strokeWidth=".5" /><path d="M-56 -32 q1 -4 4 -4 q3 0 4 2 l-2 1 q-1 3 -3 3 h-3z" fill="#3a2515" />
        </g>
      );
    case 'abbey':
      return (
        <g>
          <ellipse cx="0" cy="2" rx="58" ry="8" fill="#000" opacity=".35" />
          <rect x="-46" y="-46" width="66" height="46" fill="#4b5468" stroke="#232a38" strokeWidth="1.2" />
          <path d="M-52 -46 L-13 -74 L26 -46z" fill="#2f3648" stroke="#232a38" strokeWidth="1.2" />
          {[-38, -22, -6].map((x) => <path key={x} d={`M${x} -12 V-30 q6 -10 12 0 V-12z`} fill="#8fd4ff" opacity=".65" />)}
          <circle cx="-13" cy="-58" r="6" fill="#8fd4ff" opacity=".5" stroke="#232a38" />
          <rect x="22" y="-88" width="22" height="88" fill="#414a5e" stroke="#232a38" strokeWidth="1.2" />
          <path d="M19 -88 L33 -112 L47 -88z" fill="#2f3648" stroke="#232a38" /><path d="M33 -112 v-9 M29 -118 h8" stroke="#c9b07a" strokeWidth="1.6" />
          <path d="M28 -74 v-10 q5 -8 10 0 v10z" fill="#0d1119" /><circle cx="33" cy="-78" r="2" fill="#f2cf7a" className="anim-glow" style={{ color: '#f2cf7a' }} />
          <path d="M-6 0 v-16 q6 -8 12 0 v16z" fill="#0d1119" />
          {['A', '∑'].map((g, i) => <text key={g} x={-46 + i * 74} y={-92 - i * 6} fill="#8fd4ff" fontSize="9" fontWeight="800" opacity=".6" className="anim-float" style={{ animationDelay: `${i}s` }}>{g}</text>)}
        </g>
      );
    case 'lab':
      return (
        <g>
          <ellipse cx="0" cy="2" rx="56" ry="8" fill="#000" opacity=".35" />
          <path d="M-22 0 V-62 h44 V0z" fill="#4a4a5a" stroke="#22222c" strokeWidth="1.2" />
          {[-50, -38, -26, -14, -2].map((y) => <path key={y} d={`M-22 ${y} h44`} stroke="#33333f" strokeWidth=".8" />)}
          <path d="M-30 -62 L4 -110 L30 -62z" fill="#5a3a7a" stroke="#22222c" strokeWidth="1.2" style={{ transform: 'rotate(-4deg)', transformOrigin: '0 -62px' }} />
          <Smoke x={8} y={-100} c="#9a6ac0" />
          <rect x="-8" y="-22" width="16" height="22" rx="8" fill="#1a1020" />
          <Window x={-4} y={-52} w={8} h={10} c="#b8f5c0" />
          {/* caldeirão */}
          <path d="M28 0 q-4 -20 14 -22 h22 q18 2 14 22z" fill="#2b2b34" stroke="#111" />
          <ellipse cx="53" cy="-22" rx="21" ry="6" fill="#7be08a" className="anim-glow" style={{ color: '#7be08a' }} />
          {[0, 1, 2].map((i) => <circle key={i} cx={44 + i * 9} cy={-30 - (i % 2) * 6} r="2.6" fill="#b8f5c0" className="anim-float" style={{ animationDelay: `${i * 0.4}s` }} />)}
          {[[-34, -40, '#8a5aa8'], [-40, -28, '#5a9a7a']].map(([x, y, c], i) => <g key={i}><rect x={x} y={y} width="8" height="11" rx="3" fill={c} opacity=".85" /><rect x={x + 2} y={y - 4} width="4" height="4" fill="#3a2f45" /></g>)}
        </g>
      );
    case 'fort':
      return (
        <g>
          <ellipse cx="0" cy="2" rx="62" ry="9" fill="#000" opacity=".35" />
          <rect x="-56" y="-36" width="112" height="36" fill="#5a5a66" stroke="#2a2a33" strokeWidth="1.2" />
          <Battlements x={-56} y={-41} w={112} n={9} />
          {[-56, 42].map((x) => <g key={x}><rect x={x} y="-66" width="16" height="66" fill="#64646f" stroke="#2a2a33" strokeWidth="1.2" /><Battlements x={x} y={-71} w={16} n={3} c="#64646f" /></g>)}
          <rect x="-20" y="-64" width="40" height="30" fill="#6a6a76" stroke="#2a2a33" strokeWidth="1.2" /><Battlements x={-20} y={-69} w={40} n={4} c="#6a6a76" />
          <path d="M-12 0 v-20 q12 -16 24 0 v20z" fill="#0d0d12" />
          {[-8, 0, 8].map((x) => <path key={x} d={`M${x} -18 V0`} stroke="#3a3a44" strokeWidth="1" />)}
          {[-48, 48].map((x, i) => <g key={x}><path d={`M${x} -71 v-14`} stroke="#3a2a1a" strokeWidth="1.5" /><path d={`M${x} -85 h${i ? -14 : 14} l${i ? 3 : -3} 5 l${i ? -3 : 3} 5 h${i ? 14 : -14}z`} fill="#a83a3a" className="anim-wobble" /></g>)}
          <Window x={-2} y={-55} w={4} h={7} />
        </g>
      );
    case 'tower':
      return (
        <g>
          <ellipse cx="0" cy="2" rx="46" ry="8" fill="#000" opacity=".35" />
          <path d="M-18 0 V-104 h36 V0z" fill="#3d3560" stroke="#1d1833" strokeWidth="1.2" />
          <path d="M-26 -104 L0 -146 L26 -104z" fill="#2c2548" stroke="#1d1833" strokeWidth="1.2" />
          <path d="M0 -146 v-12" stroke="#c9b0ff" strokeWidth="1.5" /><path d="M0 -158 a5 5 0 1 0 4 -6 a4 4 0 1 1 -4 6z" fill="#c9b0ff" />
          {[-84, -60, -36].map((y) => <ellipse key={y} cx="0" cy={y} rx="6" ry="10" fill="#b9a7e6" opacity=".7" className="anim-twinkle" style={{ animationDelay: `${-y / 40}s` }} />)}
          <path d="M-8 0 v-16 q8 -12 16 0 v16z" fill="#0d0a1a" />
          {[[-44, -60], [44, -80], [-40, -100]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="7" ry="11" fill="#1d1833" stroke="#b9a7e6" strokeWidth="1.5" className="anim-float" style={{ animationDelay: `${i * 0.6}s` }} />)}
        </g>
      );
    case 'forge':
      return (
        <g>
          <ellipse cx="0" cy="2" rx="66" ry="9" fill="#000" opacity=".35" />
          <path d="M-70 0 L-38 -62 L-22 -46 L0 -96 L28 -40 L44 -60 L72 0z" fill="#4a4436" stroke="#221e14" strokeWidth="1.4" />
          <path d="M0 -96 L28 -40 L44 -60 L72 0 H40 L18 -44z" fill="#000" opacity=".22" />
          <path d="M0 -96 l-8 18 l7 -4 l4 6 l5 -9z" fill="#d0ccb8" />
          <path d="M-28 0 V-24 q28 -34 56 0 V0z" fill="#0a0604" stroke="#221e14" strokeWidth="1.2" />
          <ellipse cx="0" cy="-6" rx="24" ry="14" fill="#e0561a" opacity=".55" className="anim-glow" style={{ color: '#e0561a' }} />
          <path d="M-12 -2 q-8 -10 0 -22 q6 8 4 14 q8 -8 4 -16 q14 12 0 24z" fill="#ff8a30" className="anim-flame" />
          <circle cx="-8" cy="-16" r="2" fill="#ffd27a" className="anim-twinkle" /><circle cx="10" cy="-16" r="2" fill="#ffd27a" className="anim-twinkle" style={{ animationDelay: '.6s' }} />
          <path d="M-52 0 h16 l4 -6 h-24z" fill="#3a3c44" />
          <Smoke x={2} y={-100} c="#8a8578" />
        </g>
      );
    case 'maze':
      return (
        <g>
          <ellipse cx="0" cy="2" rx="62" ry="12" fill="#000" opacity=".35" />
          <ellipse cx="0" cy="-14" rx="62" ry="28" fill="#1c3a30" stroke="#0e1f19" strokeWidth="1.5" />
          {[[50, 22], [36, 16], [22, 11], [9, 6]].map(([rx, ry], i) => (
            <ellipse key={i} cx="0" cy="-14" rx={rx} ry={ry} fill="none" stroke="#2f6b56" strokeWidth="4.5" strokeDasharray={`${40 - i * 8} ${8 + i * 2}`} strokeDashoffset={i * 9} />
          ))}
          <ellipse cx="0" cy="-14" rx="6" ry="3.5" fill="#6ff0e6" className="anim-glow" style={{ color: '#6ff0e6' }} />
          <path d="M-10 6 v-22 q10 -14 20 0 v22z" fill="#0d1a17" stroke="#2f6b56" strokeWidth="2" />
          <path d="M-16 -14 v-30 h6 v30 M10 -14 v-30 h6 v30" stroke="#2f6b56" strokeWidth="3" opacity=".8" />
          <path d="M-14 -48 h30" stroke="#2f6b56" strokeWidth="3" />
          {['0', '≠0'].map((g, i) => <text key={g} x={i ? 24 : -30} y={-48 - i * 4} fill="#6ff0e6" fontSize="9" fontWeight="800" opacity=".7" className="anim-twinkle" style={{ animationDelay: `${i * .7}s` }}>{g}</text>)}
        </g>
      );
    case 'castle':
      return (
        <g>
          <ellipse cx="0" cy="2" rx="80" ry="10" fill="#000" opacity=".4" />
          <ellipse cx="0" cy="-60" rx="90" ry="60" fill="#8e1f3a" opacity=".16" className="anim-glow" style={{ color: '#8e1f3a' }} />
          <rect x="-70" y="-40" width="140" height="40" fill="#5c5560" stroke="#2a2530" strokeWidth="1.2" /><Battlements x={-70} y={-45} w={140} n={11} c="#5c5560" />
          {[-70, 54].map((x) => <g key={x}><rect x={x} y="-80" width="16" height="80" fill="#6a6370" stroke="#2a2530" strokeWidth="1.2" /><path d={`M${x - 3} -80 L${x + 8} -104 L${x + 19} -80z`} fill="#8e1f3a" stroke="#2a2530" /></g>)}
          {[-32, 16].map((x) => <g key={x}><rect x={x} y="-100" width="16" height="100" fill="#6a6370" stroke="#2a2530" strokeWidth="1.2" /><path d={`M${x - 3} -100 L${x + 8} -126 L${x + 19} -100z`} fill="#8e1f3a" stroke="#2a2530" /></g>)}
          <rect x="-16" y="-90" width="32" height="90" fill="#746c7a" stroke="#2a2530" strokeWidth="1.2" />
          <path d="M-22 -90 L0 -140 L22 -90z" fill="#7a1a30" stroke="#2a2530" strokeWidth="1.2" />
          <path d="M0 -140 v-14" stroke="#3a2a1a" strokeWidth="1.5" /><path d="M0 -154 h16 l-3 5 l3 5 h-16z" fill="#c9a35a" className="anim-wobble" />
          <path d="M-11 0 v-24 q11 -18 22 0 v24z" fill="#0d0508" />
          {[[-4, -70], [-4, -50], [-62, -60], [62, -60], [-24, -76], [24, -76]].map(([x, y], i) => <Window key={i} x={x} y={y} w={5} h={9} c="#ff9ab0" />)}
        </g>
      );
    default:
      return null;
  }
}

/* ───────────── Trilhas, pontes e rotor ───────────── */
export const Track = ({ d }) => (d.track ? (
  <g fill="none" strokeLinecap="round">
    <path d={d.track} stroke="#1d160a" strokeWidth="3.6" opacity=".45" />
    <path d={d.track} stroke="#6b583a" strokeWidth="2.2" opacity=".85" />
    <path d={d.track} stroke="#8f7c58" strokeWidth=".7" strokeDasharray="1 5" opacity=".7" />
  </g>
) : null);

export const Rotor = () => <path d="M0 0 L-2.6 -19 L2.6 -19z M0 0 L19 -2.6 L19 2.6z M0 0 L2.6 19 L-2.6 19z M0 0 L-19 2.6 L-19 -2.6z" fill="#cdbf94" stroke="#2a1d10" strokeWidth=".5" />;

export function Bridge({ b }) {
  return (
    <g transform={`translate(${b.x} ${b.y}) rotate(${b.ang})`}>
      <rect x="-19" y="-8.5" width="38" height="17" rx="1.5" fill="#0d0a05" opacity=".55" />
      <rect x="-18" y="-7" width="36" height="14" fill="#6b5236" stroke="#2a1d10" strokeWidth=".8" />
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${-15 + i * 4} -7 V7`} stroke="#3a2a17" strokeWidth=".8" />)}
      <path d="M-18 -7.4 H18 M-18 7.4 H18" stroke="#8a6c44" strokeWidth="1.6" />
      {[-17, -6, 6, 17].map((x) => <g key={x}><rect x={x - 1} y="-9" width="2" height="4" fill="#4a3822" /><rect x={x - 1} y="5" width="2" height="4" fill="#4a3822" /></g>)}
    </g>
  );
}

// Leito, margens e água do rio (parada); o movimento fica na camada viva
export const River = ({ r }) => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d={r.d} stroke="#56683f" strokeWidth="34" opacity=".18" />
    <path d={r.d} stroke="#3a3120" strokeWidth="25" opacity=".8" />
    <path d={r.d} stroke="#2b5262" strokeWidth="17" />
    <path d={r.d} stroke="#1f4350" strokeWidth="9" opacity=".8" />
    <path d={r.d} stroke="#5f95a3" strokeWidth=".8" strokeDasharray="14 9" opacity=".35" transform="translate(-4 0)" />
  </g>
);

/* ───────────── O Zero: terreno apagado e rachaduras ───────────── */
export function ZeroGround() {
  return (
    <g>
      <defs>
        <pattern id="zeroGrid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M8 0 H0 V8" fill="none" stroke="#7d7358" strokeWidth=".4" opacity=".8" /></pattern>
      </defs>
      {ZERO.erased.map((e) => (
        <g key={e.id}>
          {e.dust.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#cfc6a8" opacity=".35" />)}
          <path d={e.path} fill="#0e0b07" opacity=".5" transform={`translate(${e.x} ${e.y}) scale(1.1) translate(${-e.x} ${-e.y})`} />
          <path d={e.path} fill="#a99f82" />
          <path d={e.path} fill="url(#zeroGrid)" />
          <path d={e.path} fill="none" stroke="#6b6146" strokeWidth="1" strokeDasharray="5 3" opacity=".8" />
          {e.ghosts.map((h, i) => (
            <g key={i} transform={`translate(${h.x} ${h.y}) scale(${h.s})`} fill="none" stroke="#5e563f" strokeWidth=".8" strokeDasharray="2 2">
              <rect x="-8" y="-9" width="16" height="9" /><path d="M-11 -9 L0 -19 L11 -9" /><rect x="-2" y="-5" width="4" height="5" />
            </g>
          ))}
        </g>
      ))}
      {ZERO.cracks.map((c, i) => {
        const d = c.map(([x, y], k) => `${k ? 'L' : 'M'}${x} ${y}`).join(' ');
        return (
          <g key={i} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={d} stroke="#06030a" strokeWidth="3.4" opacity=".9" />
            <path d={d} stroke="#4a3382" strokeWidth=".9" opacity=".75" />
          </g>
        );
      })}
    </g>
  );
}
