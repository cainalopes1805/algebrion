// Arte do mapa medieval: terreno, moldura, rosa dos ventos e os marcos de cada região (tudo SVG, sem imagens).
import { MAP_H } from '../data/mapGeometry';

export const INK = '#8f7d58';

/* ───────────── Terreno ───────────── */
export function Decor({ d }) {
  const s = d.s;
  const g = { transform: `translate(${d.x} ${d.y}) scale(${s})` };
  switch (d.kind) {
    case 'mountain':
      return (
        <g transform={g.transform}>
          <path d="M-26 0 L-8 -36 L2 -18 L14 -44 L36 0Z" fill="#40392a" stroke={INK} strokeWidth=".8" />
          <path d="M14 -44 L36 0 L20 0 L12 -22Z" fill="#000" opacity=".22" />
          <path d="M14 -44 l-6 12 l5 -3 l3 5 l4 -6z M-8 -36 l-5 10 l5 -3 l4 4z" fill="#c9c5b0" opacity=".85" />
        </g>
      );
    case 'forest':
      return (
        <g transform={g.transform}>
          {[[-14, 0], [0, -4], [14, 0], [-6, 8], [8, 8]].slice(0, 3 + (d.v % 3)).map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect x="-1.5" y="-2" width="3" height="6" fill="#1b140c" />
              <path d="M0 -26 L-9 -12 h4 L-11 0 h22 L5 -12 h4z" fill="#2c4032" stroke="#1a2a20" strokeWidth=".7" />
            </g>
          ))}
        </g>
      );
    case 'hill':
      return <path transform={g.transform} d="M-20 0 q20 -24 40 0" fill="#302a1c" stroke={INK} strokeWidth=".7" opacity=".8" />;
    case 'lake':
      return (
        <g transform={g.transform} opacity=".95">
          <ellipse cx="0" cy="0" rx="44" ry="20" fill="#1f3a44" stroke="#33606b" strokeWidth="1.2" />
          <path d="M-20 -4 q6 -3 12 0 M0 4 q7 -3 14 0 M12 -7 q6 -3 12 0" stroke="#6fa3b0" strokeWidth=".8" fill="none" opacity=".6" />
        </g>
      );
    case 'house':
      return (
        <g transform={g.transform}>
          <rect x="-8" y="-10" width="16" height="10" fill="#5a4630" stroke="#2a1d10" strokeWidth=".6" />
          <path d="M-11 -10 L0 -20 L11 -10z" fill="#7a3a30" />
          <rect x="-2" y="-6" width="4" height="6" fill="#1a1008" />
          <rect x="3.5" y="-8.5" width="3" height="3" fill="#ffcf6a" opacity=".85" />
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
          <path d="M0 -18 v-6 l7 2 -7 2" fill="#a83a3a" className="anim-wobble" />
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
      {/* mar nas bordas */}
      {[0, 1].map((side) => (
        <g key={side} transform={side ? `translate(${x1} 0) scale(-1 1)` : `translate(${x0} 0)`}>
          <path d={`M0 0 H26 ${Array.from({ length: 60 }, (_, i) => `q10 ${20 + (i % 3) * 3} 0 50`).join(' ')} H0z`} fill="#15303a" opacity=".85" />
          {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M4 ${60 + i * 96} q8 -4 16 0 q-8 4 -16 0`} stroke="#4c7f8b" strokeWidth=".8" fill="none" opacity=".5" />)}
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
          <path d="M-40 -34 h-10" stroke="#3a2515" strokeWidth="2" /><rect x="-58" y="-38" width="11" height="9" rx="1" fill="#c9a35a" /><text x="-52.5" y="-31" fontSize="7" textAnchor="middle">🐗</text>
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
