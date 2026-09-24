import { CHARACTERS } from '../data/characters';

// Personagens desenhados em SVG, parametrizados por CHARACTERS. Idle: respira, pisca, flutua.
function Hat({ c }) {
  const h = c.hatColor;
  switch (c.hat) {
    case 'wizard':
      return (
        <g>
          <ellipse cx="60" cy="34" rx="30" ry="7" fill={h} />
          <path d="M38 34 Q52 6 70 -12 Q66 12 82 34 Z" fill={h} />
          <path d="M40 33 Q60 40 80 33 L82 34 Q60 42 38 34Z" fill={c.trim} opacity=".9" />
          <circle cx="66" cy="14" r="2.5" fill={c.trim} className="anim-twinkle" />
        </g>
      );
    case 'witch':
      return (
        <g>
          <ellipse cx="60" cy="34" rx="32" ry="6" fill={h} />
          <path d="M40 34 Q50 12 58 -6 Q66 -14 74 -4 Q66 4 74 34Z" fill={h} />
          <rect x="41" y="27" width="34" height="5" rx="2" fill={c.trim} />
        </g>
      );
    case 'helm':
      return (
        <g>
          <path d="M39 46 Q39 22 60 22 Q81 22 81 46 L81 50 L39 50Z" fill={h} />
          <rect x="57" y="22" width="6" height="26" fill="#0003" />
          <path d="M44 42 H76 V47 H44Z" fill="#111" opacity=".55" />
          {c.plume && <path d="M60 22 Q46 4 32 18 Q48 14 60 26Z" fill={c.plume} />}
          {c.short && <path d="M39 30 L30 22 L40 26Z M81 30 L90 22 L80 26Z" fill="#e8e0d0" />}
        </g>
      );
    case 'hood':
      return (
        <g>
          <path d="M36 52 Q34 20 60 20 Q86 20 84 52 Q76 36 60 36 Q44 36 36 52Z" fill={h} />
        </g>
      );
    case 'crown':
      return (
        <g>
          <path d="M42 30 L46 14 L54 26 L60 10 L66 26 L74 14 L78 30Z" fill={h} stroke="#b9892c" strokeWidth="1" />
          <circle cx="60" cy="14" r="2.5" fill="#d4453f" />
        </g>
      );
    case 'goggles':
      return (
        <g>
          <path d="M40 34 Q60 22 80 34 L80 38 Q60 30 40 38Z" fill={h} />
          <circle cx="50" cy="40" r="6" fill="#9be7ff" stroke={c.trim} strokeWidth="2" opacity=".9" />
          <circle cx="70" cy="40" r="6" fill="#9be7ff" stroke={c.trim} strokeWidth="2" opacity=".9" />
        </g>
      );
    case 'feather':
      return (
        <g>
          <path d="M40 34 Q60 14 80 34 Q60 30 40 34Z" fill={h} />
          <path d="M74 28 Q92 6 96 -6 Q84 8 72 24Z" fill="#e8d4a0" />
        </g>
      );
    default:
      return null;
  }
}

function Prop({ c }) {
  const g = c.glow;
  switch (c.prop) {
    case 'staff':
      return (
        <g className="anim-wobble">
          <rect x="94" y="52" width="4" height="96" rx="2" fill="#7a5230" />
          <circle cx="96" cy="48" r="9" fill={g} className="anim-glow" style={{ color: g }} opacity=".9" />
          <circle cx="96" cy="48" r="4" fill="#fff" opacity=".8" />
        </g>
      );
    case 'sword':
      return (
        <g>
          <rect x="95" y="60" width="5" height="62" rx="1" fill="#cfd6e0" />
          <rect x="88" y="120" width="19" height="4" rx="2" fill={c.trim} />
          <rect x="95" y="124" width="5" height="12" fill="#5a3a22" />
        </g>
      );
    case 'bow':
      return (
        <g>
          <path d="M92 50 Q114 96 92 142" stroke="#8a5a2b" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M92 50 L92 142" stroke="#e8e0d0" strokeWidth="1" />
        </g>
      );
    case 'flask':
      return (
        <g className="anim-float">
          <path d="M92 96 h10 v8 l6 14 a6 6 0 0 1 -5 8 h-12 a6 6 0 0 1 -5 -8 l6 -14z" fill="#3a2a4a" />
          <path d="M87 118 h20 a6 6 0 0 1 -5 8 h-10 a6 6 0 0 1 -5 -8z" fill={g} opacity=".95" className="anim-glow" style={{ color: g }} />
        </g>
      );
    case 'lute':
      return (
        <g>
          <ellipse cx="94" cy="112" rx="14" ry="17" fill="#b5722e" stroke="#7a4a1c" strokeWidth="2" transform="rotate(-20 94 112)" />
          <rect x="99" y="60" width="4" height="40" rx="2" fill="#7a4a1c" transform="rotate(-20 100 80)" />
          <circle cx="94" cy="112" r="4" fill="#3a2410" />
        </g>
      );
    case 'hammer':
      return (
        <g className="anim-wobble">
          <rect x="94" y="70" width="5" height="70" rx="2" fill="#7a5230" />
          <rect x="82" y="58" width="30" height="18" rx="3" fill="#8a8f9a" stroke="#555" />
        </g>
      );
    case 'book':
      return (
        <g className="anim-float">
          <rect x="84" y="102" width="26" height="20" rx="2" fill="#7a2f2f" stroke={c.trim} />
          <path d="M97 102 V122" stroke={c.trim} />
          <circle cx="97" cy="96" r="3" fill={g} className="anim-glow" style={{ color: g }} />
        </g>
      );
    case 'orb':
      return (
        <g className="anim-float">
          <circle cx="96" cy="104" r="11" fill={g} opacity=".9" className="anim-glow" style={{ color: g }} />
          <circle cx="92" cy="100" r="3.5" fill="#fff" opacity=".7" />
        </g>
      );
    case 'scepter':
      return (
        <g>
          <rect x="94" y="56" width="4" height="86" rx="2" fill={c.trim} />
          <circle cx="96" cy="52" r="8" fill="#d4453f" stroke={c.trim} strokeWidth="2" className="anim-glow" style={{ color: '#d4453f' }} />
        </g>
      );
    default:
      return null;
  }
}

export default function Character({ id = 'mage', size = 120, mood = 'happy', flip = false, animate = true, className = '', speaking = false }) {
  const c = CHARACTERS[id] || CHARACTERS.mage;
  const mouth =
    mood === 'sad' ? 'M53 63 Q60 57 67 63' : mood === 'surprised' ? 'M57 62 h6 v4 h-6z' : 'M53 60 Q60 68 67 60';
  return (
    <svg
      viewBox="0 -18 120 178"
      width={size}
      height={(size * 178) / 120}
      className={`${className}`}
      style={{ transform: flip ? 'scaleX(-1)' : undefined, overflow: 'visible' }}
      aria-hidden="true"
    >
      <ellipse cx="60" cy="154" rx="34" ry="5" fill="#000" opacity=".35" />
      <g className={animate ? 'anim-float' : ''} style={{ animationDuration: speaking ? '1.6s' : undefined }}>
        {c.cape && <path d="M38 70 Q60 62 82 70 L94 148 H26Z" fill={c.cape} />}
        {/* corpo */}
        <path d="M38 76 Q60 66 82 76 L90 150 H30Z" fill={c.robe} />
        <path d="M60 70 L60 150" stroke={c.robe2} strokeWidth="2" opacity=".6" />
        <path d="M30 150 H90 L88 140 H32Z" fill={c.robe2} />
        <rect x="42" y="100" width="36" height="6" rx="3" fill={c.trim} opacity=".95" />
        <rect x="56" y="98" width="8" height="10" rx="2" fill={c.trim} />
        <path d="M46 72 Q60 84 74 72" stroke={c.trim} strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* braços */}
        <path d="M38 78 Q26 96 34 112" stroke={c.robe2} strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M82 78 Q94 92 92 106" stroke={c.robe2} strokeWidth="10" fill="none" strokeLinecap="round" />
        <circle cx="34" cy="113" r="5" fill={c.skin} />
        <circle cx="92" cy="108" r="5" fill={c.skin} />
        <Prop c={c} />
        {/* cabeça */}
        <g className={animate ? 'anim-breathe' : ''}>
          {c.braid && <path d="M40 46 Q30 66 40 88" stroke={c.hair} strokeWidth="8" fill="none" strokeLinecap="round" />}
          <circle cx="60" cy="48" r="20" fill={c.skin} />
          <path d="M40 46 Q42 26 60 26 Q78 26 80 46 Q70 36 60 36 Q50 36 40 46Z" fill={c.hair} />
          {c.beard && (
            <path d={c.longBeard ? 'M42 54 Q44 96 60 100 Q76 96 78 54 Q70 70 60 68 Q50 70 42 54Z' : 'M42 54 Q46 76 60 76 Q74 76 78 54 Q70 64 60 62 Q50 64 42 54Z'} fill={c.beardColor} />
          )}
          <g className={animate ? 'anim-blink' : ''}>
            <ellipse cx="52" cy="50" rx="2.6" ry="3.2" fill={c.eyesGlow ? c.glow : '#1a1210'} />
            <ellipse cx="68" cy="50" rx="2.6" ry="3.2" fill={c.eyesGlow ? c.glow : '#1a1210'} />
          </g>
          <path d={mouth} stroke={c.beard ? '#0006' : '#7a3a2a'} strokeWidth="2" fill={mood === 'surprised' ? '#3a1a14' : 'none'} strokeLinecap="round" />
          <circle cx="47" cy="57" r="3" fill="#f08a80" opacity=".35" />
          <circle cx="73" cy="57" r="3" fill="#f08a80" opacity=".35" />
          <Hat c={c} />
        </g>
      </g>
    </svg>
  );
}
