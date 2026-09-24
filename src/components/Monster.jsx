import { MONSTERS } from '../data/characters';

// Chefes em SVG. `hit` faz o monstro piscar em vermelho; `defeated` o faz esmaecer.
export default function Monster({ id = 'ghost', size = 150, hit = false, defeated = false, attacking = false, className = '' }) {
  const col = MONSTERS[id]?.color || '#9fd8ff';
  const eye = '#fff5c2';
  const body = (() => {
    switch (id) {
      case 'ghost':
        return (
          <g>
            <path d="M25 130 V60 Q25 15 70 15 Q115 15 115 60 V130 L100 118 L85 132 L70 118 L55 132 L40 118Z" fill={col} opacity=".85" />
            <ellipse cx="55" cy="62" rx="8" ry="11" fill="#0b1a2a" /><ellipse cx="85" cy="62" rx="8" ry="11" fill="#0b1a2a" />
            <ellipse cx="70" cy="92" rx="10" ry="12" fill="#0b1a2a" />
            <circle cx="55" cy="60" r="3" fill={eye} /><circle cx="85" cy="60" r="3" fill={eye} />
          </g>
        );
      case 'slime':
        return (
          <g>
            <path d="M20 132 Q14 96 40 66 Q50 30 70 30 Q92 30 100 66 Q126 96 120 132Z" fill={col} opacity=".9" />
            <path d="M40 60 Q50 44 60 46" stroke="#fff" strokeWidth="5" fill="none" opacity=".5" strokeLinecap="round" />
            <circle cx="54" cy="84" r="9" fill="#fff" /><circle cx="88" cy="84" r="9" fill="#fff" />
            <circle cx="56" cy="86" r="4.5" fill="#12301a" /><circle cx="90" cy="86" r="4.5" fill="#12301a" />
            <path d="M58 106 Q71 118 84 106" stroke="#12301a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="98" cy="110" r="4" fill="#fff" opacity=".4" /><circle cx="32" cy="116" r="3" fill="#fff" opacity=".4" />
          </g>
        );
      case 'golem':
        return (
          <g>
            <rect x="34" y="20" width="72" height="56" rx="10" fill={col} stroke="#6b5a44" strokeWidth="3" />
            <rect x="22" y="70" width="96" height="64" rx="10" fill="#9d8a70" stroke="#6b5a44" strokeWidth="3" />
            <rect x="4" y="76" width="22" height="46" rx="8" fill="#8a785f" /><rect x="114" y="76" width="22" height="46" rx="8" fill="#8a785f" />
            <rect x="48" y="40" width="16" height="9" fill={eye} className="anim-glow" style={{ color: '#ffd27a' }} /><rect x="76" y="40" width="16" height="9" fill={eye} className="anim-glow" style={{ color: '#ffd27a' }} />
            <path d="M52 62 H88" stroke="#4a3a28" strokeWidth="4" />
            <text x="70" y="112" textAnchor="middle" fontSize="26" fill="#4a3a28" fontFamily="Cinzel" fontWeight="700">k·A</text>
          </g>
        );
      case 'bat':
        return (
          <g>
            <path d="M70 60 Q40 20 4 40 Q22 50 18 76 Q34 64 44 80 Q56 66 70 84Z" fill="#3b2a5a" className="anim-wobble" />
            <path d="M70 60 Q100 20 136 40 Q118 50 122 76 Q106 64 96 80 Q84 66 70 84Z" fill="#3b2a5a" className="anim-wobble" />
            <ellipse cx="70" cy="80" rx="24" ry="30" fill={col} />
            <path d="M52 56 L46 30 L62 50Z M88 56 L94 30 L78 50Z" fill={col} />
            <circle cx="61" cy="76" r="6" fill={eye} /><circle cx="79" cy="76" r="6" fill={eye} />
            <circle cx="61" cy="77" r="3" fill="#200a30" /><circle cx="79" cy="77" r="3" fill="#200a30" />
            <path d="M62 94 L66 100 L70 94 L74 100 L78 94" stroke="#fff" strokeWidth="2.5" fill="none" />
          </g>
        );
      case 'dragon':
        return (
          <g>
            <path d="M14 120 Q10 60 44 50 Q40 20 70 22 Q104 24 98 54 Q130 64 126 120 Z" fill={col} />
            <path d="M14 120 Q-6 80 10 46 Q30 70 36 96Z M126 120 Q146 80 130 46 Q110 70 104 96Z" fill="#a02a1a" className="anim-wobble" />
            <path d="M52 30 L44 6 L62 24Z M88 30 L96 6 L78 24Z" fill="#f2cf7a" />
            <ellipse cx="70" cy="84" rx="34" ry="24" fill="#f0a070" />
            <circle cx="56" cy="54" r="6" fill={eye} /><circle cx="84" cy="54" r="6" fill={eye} />
            <ellipse cx="56" cy="55" rx="2" ry="5" fill="#200" /><ellipse cx="84" cy="55" rx="2" ry="5" fill="#200" />
            <circle cx="62" cy="76" r="3" fill="#7a2a1a" /><circle cx="78" cy="76" r="3" fill="#7a2a1a" />
            <path d="M52 92 Q70 106 88 92" stroke="#5a1a10" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M60 100 q10 22 20 0 q-10 8 -20 0z" fill="#ffb676" className="anim-flame" />
          </g>
        );
      case 'spider':
        return (
          <g>
            {[-1, 1].map((s) => [0, 1, 2, 3].map((i) => (
              <path key={`${s}${i}`} d={`M70 84 Q${70 + s * (36 + i * 6)} ${40 + i * 18} ${70 + s * (56 + i * 4)} ${100 + i * 8}`} stroke="#1a2a2a" strokeWidth="4" fill="none" strokeLinecap="round" />
            )))}
            <ellipse cx="70" cy="98" rx="30" ry="26" fill="#12201f" />
            <ellipse cx="70" cy="62" rx="20" ry="18" fill="#1a2e2d" />
            {[[58, 56], [82, 56], [64, 48], [76, 48]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i < 2 ? 5 : 3.5} fill={col} className="anim-glow" style={{ color: col }} />)}
            <path d="M60 70 L64 78 M80 70 L76 78" stroke="#fff" strokeWidth="2.5" />
            <path d="M62 102 l8 -10 l8 10 l-8 10z" fill={col} opacity=".55" />
          </g>
        );
      case 'lich':
        return (
          <g>
            <path d="M28 138 Q30 78 70 74 Q110 78 112 138Z" fill="#20142e" />
            <path d="M46 138 Q48 100 70 96 Q92 100 94 138" fill="#2e1c44" />
            <ellipse cx="70" cy="50" rx="24" ry="28" fill="#e8e6d0" />
            <path d="M52 78 Q70 90 88 78 L84 66 H56Z" fill="#d6d3b8" />
            <ellipse cx="60" cy="48" rx="8" ry="10" fill="#150a20" /><ellipse cx="80" cy="48" rx="8" ry="10" fill="#150a20" />
            <circle cx="60" cy="49" r="3.5" fill={col} className="anim-glow" style={{ color: col }} /><circle cx="80" cy="49" r="3.5" fill={col} className="anim-glow" style={{ color: col }} />
            <path d="M68 60 L72 60 L70 68Z" fill="#150a20" />
            <path d="M54 74 V82 M62 76 V84 M70 77 V85 M78 76 V84 M86 74 V82" stroke="#150a20" strokeWidth="2" />
            <path d="M46 28 L52 6 L61 20 L70 2 L79 20 L88 6 L94 28Z" fill="#f2cf7a" stroke="#b9892c" />
            <circle cx="70" cy="14" r="3" fill="#d4453f" />
          </g>
        );
      default:
        return null;
    }
  })();
  return (
    <svg
      viewBox="0 0 140 150"
      width={size}
      height={(size * 150) / 140}
      className={className}
      style={{
        overflow: 'visible',
        transition: 'transform .25s, opacity .6s, filter .2s',
        transform: attacking ? 'translateX(-28px) scale(1.06)' : defeated ? 'translateY(20px) scale(.9)' : undefined,
        opacity: defeated ? 0.15 : 1,
        filter: hit ? 'brightness(2.2) saturate(2) drop-shadow(0 0 12px #f55)' : `drop-shadow(0 0 14px ${col}55)`,
      }}
      aria-hidden="true"
    >
      <ellipse cx="70" cy="144" rx="42" ry="5" fill="#000" opacity=".4" />
      <g className={defeated ? '' : 'anim-float'}>{body}</g>
    </svg>
  );
}
