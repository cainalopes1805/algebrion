// Camada viva do mapa: água correndo, moinhos, animais, aves, luzes e sombras de nuvens.
// Fica num SVG separado (acima do terreno estático) para que a animação não repinte o fundo texturizado.
import { RIVERS, SEGS, LOCS, ZERO } from '../data/mapGeometry';
import { segPath } from '../data/mapGeometry';
import { Rotor } from './MapArt';

const num = (v) => Number(v.toFixed(1));

/* ───────────── Defs ───────────── */
export const LifeDefs = () => (
  <defs>
    <radialGradient id="ffGlow"><stop offset="0" stopColor="#e4ff9a" stopOpacity=".95" /><stop offset=".3" stopColor="#c8f070" stopOpacity=".35" /><stop offset="1" stopColor="#b8e860" stopOpacity="0" /></radialGradient>
    <radialGradient id="cloudShade"><stop offset="0" stopColor="#000" stopOpacity=".2" /><stop offset=".6" stopColor="#000" stopOpacity=".1" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
  </defs>
);

/* ───────────── Animais (vistos de lado, virados para a direita, base no chão) ───────────── */
const Leg = ({ x, h = 5, w = 1.1, c = '#2a2622', odd, hoof }) => (
  <g className="leg" style={{ animationDelay: odd ? '-0.55s' : '0s' }}>
    <rect x={x - w / 2} y={-h} width={w} height={h} fill={c} />
    {hoof && <rect x={x - w / 2} y={-1} width={w} height="1" fill={hoof} />}
  </g>
);
const Shadow = ({ rx }) => <ellipse cy=".6" rx={rx} ry={rx * 0.22} fill="#000" opacity=".28" />;

function Sheep() {
  return (
    <g>
      <Shadow rx={9} />
      <Leg x={-4.5} odd /><Leg x={-2} /><Leg x={3.5} odd /><Leg x={5.8} />
      <ellipse cy="-8" rx="8" ry="5.2" fill="#d6d0c0" />
      <g fill="#e6e0d2"><circle cx="-5" cy="-10.4" r="3.3" /><circle cx="-1" cy="-12.2" r="3.5" /><circle cx="3.2" cy="-11.4" r="3.3" /><circle cx="6.2" cy="-8.4" r="3" /><circle cx="-6.4" cy="-6.6" r="3" /></g>
      <ellipse cy="-4.4" rx="7" ry="1.8" fill="#8f8874" opacity=".5" />
      <g className="graze" style={{ animationDelay: '-2s' }}>
        <ellipse cx="9.6" cy="-8.4" rx="2.7" ry="2.3" fill="#2b2622" />
        <ellipse cx="8.2" cy="-10.2" rx="1.6" ry=".8" fill="#1d1916" transform="rotate(-30 8.2 -10.2)" />
      </g>
    </g>
  );
}
function Cow() {
  return (
    <g>
      <Shadow rx={12} />
      <Leg x={-7} h={6.5} c="#4a3220" hoof="#1c130b" odd /><Leg x={-4.6} h={6.5} c="#4a3220" hoof="#1c130b" /><Leg x={5} h={6.5} c="#4a3220" hoof="#1c130b" odd /><Leg x={7.4} h={6.5} c="#4a3220" hoof="#1c130b" />
      <path d="M-10.5 -12.5 Q-11 -6 -8 -5.6 H8 Q11 -6 10.4 -12 Q10 -15 4 -15 H-6 Q-10 -15 -10.5 -12.5Z" fill="#6d4a30" />
      <ellipse cx="-3.5" cy="-11.6" rx="3.2" ry="2.5" fill="#e6dfd0" /><ellipse cx="4.6" cy="-9.4" rx="2.6" ry="2" fill="#e6dfd0" />
      <ellipse cy="-6.6" rx="7" ry="1.4" fill="#000" opacity=".16" />
      <path d="M-10.4 -13 Q-13 -10 -12.4 -5" fill="none" stroke="#4a3220" strokeWidth="1.1" strokeLinecap="round" className="tail" /><circle cx="-12.4" cy="-4.6" r="1.1" fill="#2a1a0e" />
      <g className="graze">
        <path d="M9 -14 L13.4 -12 Q15 -9 13.4 -7.4 Q11 -6.8 9.6 -8Z" fill="#6d4a30" />
        <ellipse cx="14" cy="-8" rx="1.9" ry="1.5" fill="#d9b9a0" /><path d="M10 -14.6 l-1.4 -2.2 M12 -14 l1.2 -2.2" stroke="#e6dfd0" strokeWidth=".9" strokeLinecap="round" />
      </g>
    </g>
  );
}
function Horse() {
  return (
    <g>
      <Shadow rx={13} />
      <Leg x={-7} h={9} w={1.3} c="#3c2618" hoof="#141008" odd /><Leg x={-4.6} h={9} w={1.3} c="#3c2618" hoof="#141008" /><Leg x={5.4} h={9} w={1.3} c="#3c2618" hoof="#141008" odd /><Leg x={7.8} h={9} w={1.3} c="#3c2618" hoof="#141008" />
      <ellipse cy="-12.5" rx="10" ry="4.6" fill="#6a4530" />
      <ellipse cy="-9.6" rx="8" ry="1.6" fill="#000" opacity=".16" />
      <path d="M6 -15 L9.5 -22 L13 -21 L11 -13Z" fill="#6a4530" />
      <g className="graze"><ellipse cx="13.6" cy="-21.6" rx="3.8" ry="2" fill="#6a4530" transform="rotate(28 13.6 -21.6)" /><ellipse cx="16.4" cy="-19.8" rx="1.3" ry="1" fill="#3c2618" /></g>
      <path d="M8.6 -22 Q6 -19 7.4 -14" fill="none" stroke="#1d130b" strokeWidth="2" strokeLinecap="round" />
      <path d="M-9.6 -14 Q-14 -11 -12.4 -3" fill="none" stroke="#1d130b" strokeWidth="2" strokeLinecap="round" className="tail" />
    </g>
  );
}
function Deer() {
  return (
    <g>
      <Shadow rx={10} />
      <Leg x={-5.4} h={10} w={.9} c="#5c4028" odd /><Leg x={-3.4} h={10} w={.9} c="#5c4028" /><Leg x={4.2} h={10} w={.9} c="#5c4028" odd /><Leg x={6.2} h={10} w={.9} c="#5c4028" />
      <ellipse cy="-12.6" rx="8" ry="3.7" fill="#9a7350" />
      <ellipse cy="-10.6" rx="6.6" ry="1.4" fill="#d8c3a0" opacity=".8" />
      <ellipse cx="-7.4" cy="-13.4" rx="1.8" ry="2.4" fill="#f0e8d8" />
      <path d="M5 -14 L8.6 -21 L11.2 -20.2 L8.8 -12.6Z" fill="#9a7350" />
      <g className="graze"><ellipse cx="11.6" cy="-21" rx="3" ry="1.7" fill="#9a7350" transform="rotate(24 11.6 -21)" /><circle cx="13.6" cy="-19.8" r=".8" fill="#2a1a10" />
        <path d="M10 -22.6 l-1 -5 m1 2.4 l-2.4 -1.4 m3.4 -.4 l1 -4 m-1 2 l2 -1.2" stroke="#5c4630" strokeWidth=".8" strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}
const ANIMALS = { sheep: Sheep, cow: Cow, horse: Horse, deer: Deer };

/* ───────────── Aves ───────────── */
const WING_UP = 'M-6 0 Q-3 -4.2 0 0 Q3 -4.2 6 0';
const WING_DN = 'M-6 -3.4 Q-3 -.4 0 0 Q3 -.4 6 -3.4';
const Bird = ({ x = 0, y = 0, k = 1, c = '#15110d', dur = 0.9, begin = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}>
    <path d={WING_UP} fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity=".8">
      <animate attributeName="d" values={`${WING_UP};${WING_DN};${WING_UP}`} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
    </path>
  </g>
);
const FLOCKS = [
  { y: 520, dy: 90, dur: 84, begin: -14, n: 5, k: 1.1 },
  { y: 1240, dy: -120, dur: 96, begin: -60, n: 4, k: 1 },
  { y: 1900, dy: 70, dur: 78, begin: -30, n: 6, k: 1.15 },
  { y: 2420, dy: -80, dur: 90, begin: -5, n: 3, k: 1 },
  { y: 2780, dy: 60, dur: 70, begin: -44, n: 4, k: 1.1 },
];
const V = [[0, 0], [-9, 5], [9, 6], [-19, 11], [19, 12], [-28, 17]];

function Birds({ x0, w }) {
  return (
    <g>
      {FLOCKS.map((f, i) => {
        const xs = i % 2 ? x0 + w + 80 : x0 - 80, xe = i % 2 ? x0 - 80 : x0 + w + 80;
        const path = `M${xs} ${f.y} C${num(xs + (xe - xs) * 0.3)} ${f.y - 60} ${num(xs + (xe - xs) * 0.6)} ${f.y + 50} ${xe} ${f.y + f.dy}`;
        return (
          <g key={i}>
            <animateMotion path={path} dur={`${f.dur}s`} begin={`${f.begin}s`} repeatCount="indefinite" />
            {V.slice(0, f.n).map(([dx, dy], j) => <Bird key={j} x={dx} y={dy} k={f.k} dur={0.85 + j * 0.07} begin={-j * 0.21} />)}
          </g>
        );
      })}
    </g>
  );
}
function Crows({ ruins }) {
  return (
    <g>
      {ruins.map((r, i) => (
        <g key={i} transform={`translate(${r.x} ${r.y - 34})`}>
          {[0, 1].map((j) => (
            <g key={j}>
              <animateMotion path="M-28 0 a28 9 0 1 1 56 0 a28 9 0 1 1 -56 0" dur={`${34 + i * 6}s`} begin={`${-j * 15 - i * 5}s`} repeatCount="indefinite" />
              <Bird k={1.4} c="#0b0907" dur={0.6} begin={-j * 0.3} />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

/* ───────────── Borboletas e vaga-lumes ───────────── */
const BF_COL = ['#e9e1c8', '#d9aa42', '#9fb4de'];
function Butterfly({ b }) {
  const r = b.r, path = `M0 0 C${r} ${-r} ${2 * r} ${-r * 0.4} ${2 * r} 0 S${r} ${r * 0.8} 0 0Z`;
  return (
    <g transform={`translate(${b.x} ${b.y})`}>
      <g>
        <animateMotion path={path} dur={`${b.dur}s`} begin={`${b.delay}s`} repeatCount="indefinite" />
        <g className="flap" fill={BF_COL[b.hue]}><ellipse cx="-1.7" cy="-.8" rx="2.3" ry="1.7" /><ellipse cx="1.7" cy="-.8" rx="2.3" ry="1.7" /></g>
        <path d="M0 -1.6 V1.6" stroke="#2a2016" strokeWidth=".7" />
      </g>
    </g>
  );
}
const Firefly = ({ f }) => (
  <g transform={`translate(${f.x} ${f.y})`}>
    <g style={{ '--fx': `${num(f.dx)}px`, '--fy': `${num(f.dy)}px`, animation: `ffdrift ${f.dur}s ease-in-out infinite alternate`, animationDelay: `${f.delay}s` }}>
      <g style={{ animation: `ffpulse ${f.ph}s ease-in-out infinite`, animationDelay: `${f.delay}s` }}>
        <circle r="6" fill="url(#ffGlow)" style={{ mixBlendMode: 'screen' }} /><circle r=".9" fill="#f6ffc8" />
      </g>
    </g>
  </g>
);

/* ───────────── Fogueira, casas e fumaça (as luzes ficam na camada do céu) ───────────── */
function Campfire({ t }) {
  return (
    <g transform={`translate(${t.x + 14 * t.s} ${t.y + 3}) scale(${t.s})`}>
      <ellipse cy="1" rx="6" ry="1.6" fill="#000" opacity=".4" />
      <path d="M-4.4 .4 L4.4 -1.4 M-4.4 -1.4 L4.4 .4" stroke="#4a3018" strokeWidth="1.6" strokeLinecap="round" />
      <g className="anim-flame"><path d="M0 -1 Q-3.4 -4 -.4 -9.4 Q.8 -6 2.6 -5 Q3.6 -8.4 1.2 -11 Q5.6 -6 3.2 -1Z" fill="#ff8a2a" /><path d="M0 -1 Q-1.6 -3 0 -6 Q1.6 -3.4 1.4 -1Z" fill="#ffd97a" /></g>
      {[0, 1, 2].map((i) => <circle key={i} cx={i - 1} cy="-8" r=".55" fill="#ffb84a" style={{ '--sx': `${(i - 1) * 4}px`, animation: `spark ${2 + i * 0.5}s ease-out infinite`, animationDelay: `${-i * 0.7}s` }} />)}
    </g>
  );
}
const HouseSmoke = ({ d, i }) => (
  <g transform={`translate(${d.x} ${d.y}) scale(${d.s})`}>
    {[0, 1, 2].map((k) => <circle key={k} cx="6" cy="-20" r="2" fill="#cfc9b8" style={{ animation: 'smoke 6s ease-out infinite', animationDelay: `${-k * 2 - i}s` }} />)}
  </g>
);

/* ───────────── Gente ───────────── */
const SKIN = '#d6ae86';
const LOOK = {
  villager: { tunic: '#7a5a3c', pants: '#3a2f26', hair: '#3a2a1a' },
  farmer: { tunic: '#5c6b3c', pants: '#4a3a2a', hair: '#5a4020', hat: '#c9b072' },
  child: { tunic: '#8a4a3a', pants: '#3a2f26', hair: '#6a4a2a', k: 0.72 },
  monk: { tunic: '#3b3029', pants: '#3b3029', hood: '#3b3029' },
  merchant: { tunic: '#5a3a6a', pants: '#2f2620', hair: '#2a1a10', hat: '#8a3a2e', pack: true },
  guard: { tunic: '#7c8592', pants: '#4a4e58', helm: '#9aa3ad', spear: true },
  smith: { tunic: '#4a4038', pants: '#2a221c', hair: '#2a1a10', apron: '#2a221c' },
  fisher: { tunic: '#4a5a6a', pants: '#3a3a30', hat: '#6a5a3a' },
  woodcutter: { tunic: '#8a5a2c', pants: '#3a2f26', hair: '#4a3020' },
};
// Figura vista de lado/de frente, com os pés na origem (14 de altura)
function Person({ kind, pose = 'stand' }) {
  const L = LOOK[kind] || LOOK.villager;
  const moving = pose === 'walk' || pose === 'wander';
  const sit = pose === 'sit' || pose === 'fish';
  return (
    <g transform={L.k ? `scale(${L.k})` : undefined}>
      <ellipse cy=".4" rx="3.4" ry=".9" fill="#000" opacity=".3" />
      <g className={moving ? 'stepbob' : pose === 'stand' ? 'idlesway' : undefined}>
        {sit ? (
          <g transform="translate(0 3.4)">
            <rect x="-1.6" y="-1.8" width="5.2" height="1.5" rx=".7" fill={L.pants} />
            <path d="M-2.4 -1.8 L-2 -7 H2 L2.4 -1.8Z" fill={L.tunic} />
          </g>
        ) : (
          <g>
            <g className={moving ? 'stepleg' : undefined}><rect x="-1.9" y="-4.6" width="1.5" height="4.6" fill={L.pants} /></g>
            <g className={moving ? 'stepleg' : undefined} style={{ animationDelay: '-.28s' }}><rect x=".4" y="-4.6" width="1.5" height="4.6" fill={L.pants} /></g>
            <path d="M-2.8 -4.4 L-2.3 -10.2 H2.3 L2.8 -4.4Z" fill={L.tunic} />
            {L.apron && <path d="M-1.8 -4.2 L-1.6 -9 H1.6 L1.8 -4.2Z" fill={L.apron} />}
            {L.pack && <rect x="-4" y="-10" width="2.4" height="4.4" rx=".8" fill="#6a4a2a" />}
          </g>
        )}
        <g transform={sit ? 'translate(0 3.4)' : undefined}>
          {pose === 'chop' || pose === 'hammer' ? null : <path d="M-2.6 -9.4 L-3.6 -5.8 M2.6 -9.4 L3.6 -5.8" stroke={L.tunic} strokeWidth="1.2" strokeLinecap="round" />}
          <circle cy="-12.3" r="2.1" fill={SKIN} />
          {L.hood ? <path d="M-2.6 -11.6 Q0 -16.4 2.6 -11.6 L2 -10 H-2 Z" fill={L.hood} /> : L.helm ? <path d="M-2.3 -12.6 Q0 -16 2.3 -12.6 V-11.4 H-2.3Z" fill={L.helm} /> : L.hat ? <g><ellipse cy="-13.6" rx="3.6" ry="1" fill={L.hat} /><path d="M-1.8 -13.6 Q0 -16.2 1.8 -13.6Z" fill={L.hat} /></g> : <path d="M-2.2 -12.6 Q0 -15.2 2.2 -12.6 Q0 -13.4 -2.2 -12.6Z" fill={L.hair} />}
          {L.helm && <path d="M0 -15.8 q1.6 -1.4 1 -3" stroke="#a83a3a" strokeWidth="1.1" fill="none" strokeLinecap="round" />}
        </g>
        {L.spear && <path d="M4.2 0 V-17" stroke="#5a4630" strokeWidth=".7" />}
        {L.spear && <path d="M4.2 -17 l-.9 2.4 h1.8z" fill="#c8ced6" />}
      </g>
      {pose === 'fish' && (
        <g>
          <path d="M2 -7 L15 -15" stroke="#5a4630" strokeWidth=".6" />
          <path d="M15 -15 L17 -1" stroke="#ddd" strokeWidth=".25" />
          <circle cx="17" cy="-1" r=".9" fill="#c94a3a" style={{ animation: 'floatbob 2.6s ease-in-out infinite' }} />
        </g>
      )}
      {(pose === 'chop' || pose === 'hammer') && (
        <g>
          <path d="M-2.6 -9.4 L-3.6 -5.8" stroke={L.tunic} strokeWidth="1.2" strokeLinecap="round" />
          <g className="swing">
            <path d="M2 -9 L7 -12" stroke={L.tunic} strokeWidth="1.2" strokeLinecap="round" />
            <path d="M6.6 -11.4 L10 -16" stroke="#5a4630" strokeWidth=".8" />
            {pose === 'chop' ? <path d="M9 -17 L12 -15 L10.6 -13.6Z" fill="#aeb6bf" /> : <rect x="9" y="-18" width="4" height="2.6" fill="#8b939b" transform="rotate(-10 11 -17)" />}
          </g>
        </g>
      )}
      {pose === 'chop' && <g><ellipse cx="-9" cy="-1.4" rx="2.6" ry="1.2" fill="#6a4a2a" /><ellipse cx="-9" cy="-2.4" rx="2.6" ry="1" fill="#8a6a44" /><rect x="-16" y="-2" width="5" height="1.8" rx=".9" fill="#7a5a34" /><rect x="-15" y="-3.6" width="5" height="1.8" rx=".9" fill="#6a4a2a" /></g>}
      {pose === 'hammer' && <g><rect x="8" y="-5.4" width="7" height="2.4" fill="#2d2a30" /><rect x="10" y="-3" width="3" height="3" fill="#3a3238" /><circle cx="12" cy="-6.6" r=".6" fill="#ffb84a" style={{ animation: 'spark 1s ease-out infinite' }} /></g>}
    </g>
  );
}
const PoseFrame = ({ p }) => {
  const inner = <Person kind={p.type} pose={p.pose === 'sit' ? 'sit' : p.pose === 'idle' ? 'stand' : p.pose} />;
  const at = { transform: `translate(${p.x} ${p.y})` };
  if (p.pose === 'wander') return <g {...at}><g style={{ '--dx': `${p.dx}px`, animation: `wander ${p.dur}s linear infinite` }}>{inner}</g></g>;
  return <g {...at}>{inner}</g>;
};

// caminho de um trecho da estrada, no sentido de ida ou de volta
const segD = (s, rev) => (rev ? `M${s.p1[0]} ${s.p1[1]} C${s.c2[0]} ${s.c2[1]} ${s.c1[0]} ${s.c1[1]} ${s.p0[0]} ${s.p0[1]}` : segPath(s));
const fadeEnds = (dur, delay) => <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.06;.94;1" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />;
function Walker({ w }) {
  const s = SEGS[w.seg];
  return (
    <g>
      <animateMotion path={segD(s, w.rev)} dur={`${w.dur}s`} begin={`${w.delay}s`} repeatCount="indefinite" />
      {fadeEnds(w.dur, w.delay)}
      <Person kind={w.type} pose="walk" />
    </g>
  );
}
function Cart({ c }) {
  const s = SEGS[c.seg];
  const sx = (c.rev ? s.p0[0] - s.p1[0] : s.p1[0] - s.p0[0]) < 0 ? -1 : 1;
  return (
    <g>
      <animateMotion path={segD(s, c.rev)} dur={`${c.dur}s`} begin={`${c.delay}s`} repeatCount="indefinite" />
      {fadeEnds(c.dur, c.delay)}
      <g transform={`scale(${sx} 1)`}>
        <g transform="scale(.62)"><Horse /></g>
        <g transform="translate(-16 0)">
          <ellipse cy=".6" rx="10" ry="2" fill="#000" opacity=".3" />
          <path d="M-9 -5 H8 V-8.6 H-9Z" fill="#7a5a34" stroke="#3a2a16" strokeWidth=".5" />
          <path d="M-8 -8.6 Q0 -17 8 -8.6Z" fill="#cbbf9a" stroke="#6a5a3a" strokeWidth=".4" />
          <path d="M8 -6 L14 -4.4" stroke="#4a3822" strokeWidth=".8" />
          {[-5, 5].map((x) => <g key={x} transform={`translate(${x} -2.4)`}><g className="anim-spin" style={{ animationDuration: '1.6s' }}><circle r="2.6" fill="#5a4630" stroke="#2a1d10" strokeWidth=".5" /><path d="M-2.6 0 H2.6 M0 -2.6 V2.6" stroke="#2a1d10" strokeWidth=".4" /></g></g>)}
          <g transform="translate(2 -4.6) scale(.8)"><Person kind="merchant" pose="sit" /></g>
        </g>
      </g>
    </g>
  );
}

/* ───────────── O Zero na camada viva ───────────── */
function ZeroLife({ vis }) {
  return (
    <g>
      {/* sombras dos soldados do General Vetor: "multiplicados por zero, sobraram as sombras" */}
      {ZERO.soldiers.filter(vis).map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y})`} style={{ animation: 'shade 6s ease-in-out infinite alternate', animationDelay: `${-s.d}s` }}>
          <ellipse cy=".6" rx="4" ry="1" fill="#000" opacity=".4" />
          <path d="M-2.6 0 L-2.2 -9 H2.2 L2.6 0Z" fill="#0a0610" stroke="#6a4cb0" strokeWidth=".3" />
          <circle cy="-11.2" r="2.2" fill="#0a0610" stroke="#6a4cb0" strokeWidth=".3" /><path d="M4 0 V-16" stroke="#0a0610" strokeWidth=".8" />
        </g>
      ))}
      {ZERO.glyphs.filter(vis).map((g, i) => (
        <text key={i} x={g.x} y={g.y} fontSize={g.s * (g.big ? 1.6 : 1)} fontFamily="Cinzel Decorative, serif" fontWeight="900" fill="#d4ccff" textAnchor="middle" style={{ animation: `zeroRise ${g.dur}s ease-in-out infinite`, animationDelay: `${g.delay}s` }}>0</text>
      ))}
    </g>
  );
}

/* ───────────── Céu: luzes da noite e nuvens (acima do tom do dia) ───────────── */
const GLOW_COL = { 0: '#ffb14a', 1: '#8fd4ff', 2: '#7be08a', 3: '#ffcf6a', 4: '#b9a7e6', 5: '#ff7a2a', 6: '#6ff0e6', 7: '#ff5a8a' };
const Glow = ({ r = 14, delay = 0, dur = 2.6 }) => <circle r={r} fill="url(#glowWarm)" style={{ mixBlendMode: 'screen', animation: `flicker ${dur}s ease-in-out infinite`, animationDelay: `${delay}s` }} />;
const CLOUDS = [
  { y: 260, dur: 240, d: -40, k: 1.3, o: 0.5 }, { y: 620, dur: 190, d: -120, k: 0.9, o: 0.42 }, { y: 980, dur: 280, d: -10, k: 1.5, o: 0.5 },
  { y: 1320, dur: 210, d: -170, k: 1, o: 0.4 }, { y: 1700, dur: 250, d: -60, k: 1.4, o: 0.5 }, { y: 2050, dur: 200, d: -100, k: 0.85, o: 0.38 },
  { y: 2380, dur: 270, d: -200, k: 1.2, o: 0.46 }, { y: 2700, dur: 220, d: -30, k: 1.05, o: 0.4 }, { y: 1500, dur: 300, d: -250, k: 1.6, o: 0.36 },
];
const PUFFS = [[0, 0, 92, 30], [-74, 12, 66, 24], [64, -8, 78, 26], [-28, -18, 56, 20], [108, 14, 56, 18], [-118, -6, 50, 16]];
export function MapSky({ x0, w, decor, life, sky, calm }) {
  const x1 = x0 + w;
  const vis = (o) => o.x > x0 - 60 && o.x < x1 + 60;
  const li = Math.min(1, sky.night * 1.25 + sky.warm * 0.3);
  const D = decor.filter(vis);
  const tents = D.filter((d) => d.kind === 'tent' && !d.cold);
  const houses = D.filter((d) => d.kind === 'house' && !d.burnt);
  return (
    <g style={{ pointerEvents: 'none' }}>
      <defs>
        <radialGradient id="glowWarm"><stop offset="0" stopColor="#ffd58a" stopOpacity=".85" /><stop offset=".35" stopColor="#ff9f3f" stopOpacity=".3" /><stop offset="1" stopColor="#ff8a20" stopOpacity="0" /></radialGradient>
        <radialGradient id="cloudBody"><stop offset="0" style={{ stopColor: sky.cloud, transition: 'stop-color 2s' }} stopOpacity=".9" /><stop offset=".55" style={{ stopColor: sky.cloud, transition: 'stop-color 2s' }} stopOpacity=".38" /><stop offset="1" style={{ stopColor: sky.cloud }} stopOpacity="0" /></radialGradient>
        {LOCS.map((l) => <radialGradient key={l.id} id={`lg${l.id}`}><stop offset="0" stopColor={GLOW_COL[l.id]} stopOpacity=".55" /><stop offset="1" stopColor={GLOW_COL[l.id]} stopOpacity="0" /></radialGradient>)}
      </defs>
      <g style={{ opacity: li, transition: 'opacity 2.5s' }}>
        {LOCS.filter(vis).map((l) => <circle key={l.id} cx={l.x} cy={l.y - 34} r="82" fill={`url(#lg${l.id})`} style={{ mixBlendMode: 'screen', animation: 'flicker 5s ease-in-out infinite', animationDelay: `${-l.id}s` }} />)}
        {life.lanterns.filter(vis).map((l) => <g key={l.id} transform={`translate(${l.x} ${l.y - 13.4})`}><Glow r={17} delay={l.delay} /></g>)}
        {houses.map((d, i) => (
          <g key={i} transform={`translate(${d.x} ${d.y}) scale(${d.s})`}>
            <rect x="3.3" y="-8.7" width="3.4" height="3.4" fill="#ffd27a" style={{ animation: 'flicker 3.4s ease-in-out infinite', animationDelay: `${-i * 0.7}s` }} />
            <g transform="translate(5 -7)"><Glow r={12} delay={-i * 0.5} dur={3.4} /></g>
          </g>
        ))}
        {tents.map((t, i) => <g key={i} transform={`translate(${t.x + 14 * t.s} ${t.y + 2})`}><Glow r={30} delay={-i} /></g>)}
        {life.people.filter((p) => vis(p) && p.pose === 'hammer').map((p, i) => <g key={i} transform={`translate(${p.x + 12} ${p.y - 6})`}><Glow r={16} dur={1.4} /></g>)}
        {ZERO.cracks.filter((c) => vis({ x: c[0][0] })).map((c, i) => <path key={i} d={c.map(([x, y], k) => `${k ? 'L' : 'M'}${x} ${y}`).join(' ')} fill="none" stroke="#9a78ff" strokeWidth="1.3" strokeLinecap="round" style={{ mixBlendMode: 'screen', animation: 'flicker 4s ease-in-out infinite', animationDelay: `${-i * 0.6}s` }} />)}
      </g>
      {!calm && CLOUDS.map((c, i) => (
        <g key={i} transform={`translate(0 ${c.y})`} style={{ opacity: c.o * (sky.night > 0.5 ? 0.7 : 1) }}>
          <g style={{ '--from': `${x0 - 300 * c.k}px`, '--to': `${x1 + 300 * c.k}px`, animation: `cloudmove ${c.dur}s linear infinite`, animationDelay: `${c.d}s` }}>
            {PUFFS.map(([px, py, rx, ry], j) => <ellipse key={j} cx={px * c.k} cy={py * c.k} rx={rx * c.k} ry={ry * c.k} fill="url(#cloudBody)" />)}
          </g>
        </g>
      ))}
    </g>
  );
}

/* ───────────── Água ───────────── */
const flowStyle = (dur, period, delay = 0) => ({ '--period': -period, animation: `flow ${dur}s linear infinite`, animationDelay: `${delay}s` });
function Rivers() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {RIVERS.map((r, i) => (
        <g key={i}>
          <path d={r.d} stroke="#b7dbe0" strokeWidth="1.2" strokeDasharray="7 21" opacity=".55" style={flowStyle(3.2, 28)} transform="translate(-2.6 0)" />
          <path d={r.d} stroke="#dff2f2" strokeWidth="1" strokeDasharray="3 30" opacity=".5" style={flowStyle(2.2, 33, -1)} transform="translate(2.4 1)" />
          <path d={r.d} stroke="#8fc0cc" strokeWidth="2.4" strokeDasharray="10 40" opacity=".3" style={flowStyle(4.4, 50, -2)} />
          <path d={r.d} stroke="#e8f6f6" strokeWidth=".7" strokeDasharray="2 14" opacity=".45" style={flowStyle(1.8, 16, -.4)} transform="translate(0 -4)" />
        </g>
      ))}
    </g>
  );
}
function Lake({ d, i }) {
  const rip = [[-14, -3], [10, 4], [-2, 6]];
  return (
    <g transform={`translate(${d.x} ${d.y}) scale(${d.s})`}>
      {rip.map(([cx, cy], k) => <ellipse key={k} cx={cx} cy={cy} rx="14" ry="5" fill="none" stroke="#c6e4e6" strokeWidth=".6" className="ripple" style={{ animationDelay: `${-(k * 2.4 + i * 1.3)}s` }} />)}
      {[[-26, -5], [-8, -8], [14, -6], [26, 3], [-18, 7], [4, 9], [20, 8]].map(([x, y], k) => <path key={k} d={`M${x} ${y} h${3 + (k % 3)}`} stroke="#eaf7f7" strokeWidth=".9" strokeLinecap="round" style={{ animation: 'glint 3.6s ease-in-out infinite', animationDelay: `${-(k * 0.7 + i)}s` }} />)}
      {/* peixe saltando de tempos em tempos */}
      <g transform={`translate(${-6 + (i % 3) * 8} 2)`}>
        <circle r="1" fill="none" stroke="#e2f3f3" strokeWidth=".7" style={{ animation: 'splash 11s ease-out infinite', animationDelay: `${-i * 2.7}s` }} />
        <g style={{ animation: 'fishjump 11s linear infinite', animationDelay: `${-i * 2.7}s` }}><path d="M-2.4 0 Q0 -1.5 2.4 0 Q0 1.5 -2.4 0Z M2.2 0 L4 -1.3 L4 1.3Z" fill="#c9d6d8" /></g>
      </g>
    </g>
  );
}
const Duck = ({ d }) => (
  <g transform={`translate(${d.x} ${d.y})`}>
    <g style={{ '--dx': `${d.dx}px`, animation: `wander ${d.dur}s linear infinite`, animationDelay: `${d.delay}s` }}>
      <path d="M-4 .6 Q-9 2 -14 4 M-4 .6 Q-9 -.8 -14 -2.6" stroke="#dff2f2" strokeWidth=".5" fill="none" opacity=".5" />
      <ellipse cy="-1.2" rx="3.4" ry="2" fill="#7a6544" /><path d="M-3.4 -1.4 L-5 -2.2 L-3 -.4Z" fill="#4a3a22" />
      <circle cx="3.2" cy="-3.6" r="1.5" fill="#1f5a44" /><path d="M4.4 -3.6 l2 .5 l-2 .6Z" fill="#d9a83a" />
    </g>
  </g>
);

/* ───────────── Morcegos (à noite) ───────────── */
const BAT_UP = 'M-7 0 L-4 -3.4 L-2 -1 L0 -2.4 L2 -1 L4 -3.4 L7 0';
const BAT_DN = 'M-7 -3 L-4 0 L-2 1.6 L0 0 L2 1.6 L4 0 L7 -3';
function Bats({ x0, w }) {
  const flocks = [{ y: 700, dur: 46, begin: -8, n: 3 }, { y: 1500, dur: 58, begin: -30, n: 4 }, { y: 2350, dur: 52, begin: -18, n: 3 }];
  return (
    <g>
      {flocks.map((f, i) => {
        const xs = i % 2 ? x0 + w + 60 : x0 - 60, xe = i % 2 ? x0 - 60 : x0 + w + 60;
        const path = `M${xs} ${f.y} C${num(xs + (xe - xs) * 0.25)} ${f.y - 90} ${num(xs + (xe - xs) * 0.5)} ${f.y + 80} ${num(xs + (xe - xs) * 0.75)} ${f.y - 50} S${xe} ${f.y + 30} ${xe} ${f.y}`;
        return (
          <g key={i}>
            <animateMotion path={path} dur={`${f.dur}s`} begin={`${f.begin}s`} repeatCount="indefinite" />
            {Array.from({ length: f.n }, (_, j) => (
              <g key={j} transform={`translate(${j * 14 - 14} ${(j % 2) * 9})`}>
                <path d={BAT_UP} fill="#0b0810" stroke="#0b0810" strokeWidth="1" strokeLinejoin="round">
                  <animate attributeName="d" values={`${BAT_UP};${BAT_DN};${BAT_UP}`} dur={`${0.3 + j * 0.04}s`} repeatCount="indefinite" />
                </path>
              </g>
            ))}
          </g>
        );
      })}
    </g>
  );
}

/* ───────────── Composição ───────────── */
// Sombras das nuvens sobre o terreno (os corpos das nuvens vêm na camada do céu)
function CloudShadows({ x0, w, night }) {
  const clouds = [{ y: 780, dur: 210, d: -60 }, { y: 1760, dur: 260, d: -140 }, { y: 2560, dur: 230, d: -20 }, { y: 1200, dur: 290, d: -190 }];
  return (
    <g style={{ pointerEvents: 'none', opacity: 1 - night * 0.6 }}>
      {clouds.map((c, i) => (
        <g key={i} transform={`translate(0 ${c.y + 46})`}>
          <g style={{ '--from': `${x0 - 380}px`, '--to': `${x0 + w + 380}px`, animation: `cloudmove ${c.dur}s linear infinite`, animationDelay: `${c.d}s` }}>
            <ellipse cx="34" cy="0" rx="220" ry="80" fill="url(#cloudShade)" /><ellipse cx="-96" cy="40" rx="150" ry="55" fill="url(#cloudShade)" /><ellipse cx="154" cy="-30" rx="170" ry="60" fill="url(#cloudShade)" />
          </g>
        </g>
      ))}
    </g>
  );
}

export default function MapLife({ x0, w, decor, life, sky, calm }) {
  const x1 = x0 + w;
  const vis = (o) => o.x > x0 - 60 && o.x < x1 + 60;
  const D = decor.filter(vis);
  const windmills = D.filter((d) => d.kind === 'windmill' && !d.broken);
  const houses = D.filter((d) => d.kind === 'house' && !d.burnt && d.v !== 1);
  const tents = D.filter((d) => d.kind === 'tent' && !d.cold);
  const lakes = D.filter((d) => d.kind === 'lake');
  const dayOp = { opacity: 1 - sky.night, transition: 'opacity 2.5s' };
  const nightOp = { opacity: Math.min(1, sky.night * 1.5), transition: 'opacity 2.5s' };
  return (
    <g style={{ pointerEvents: 'none' }}>
      <LifeDefs />
      <Rivers />
      {lakes.map((d, i) => <Lake key={i} d={d} i={i} />)}
      {life.ducks.filter(vis).map((d, i) => <Duck key={i} d={d} />)}

      {windmills.map((d, i) => (
        <g key={i} transform={`translate(${d.x} ${d.y}) scale(${d.s})`}>
          <g transform="translate(0 -22)"><g className="anim-spin" style={{ animationDuration: `${8 + (i % 4) * 3.5}s` }}><Rotor /></g></g>
        </g>
      ))}
      {houses.map((d, i) => <HouseSmoke key={i} d={d} i={i} />)}
      {tents.map((t, i) => <Campfire key={i} t={t} />)}
      {life.lanterns.filter(vis).map((l) => (
        <g key={l.id} transform={`translate(${l.x} ${l.y})`}>
          <ellipse cy="1" rx="3" ry=".8" fill="#000" opacity=".35" />
          <rect x="-.7" y="-12" width="1.4" height="12" fill="#2a1d10" />
          <path d="M-2 -12 H2 V-15 L0 -17 L-2 -15Z" fill="#1c130a" /><rect x="-1.2" y="-14.6" width="2.4" height="2.6" fill="#e8c27a" />
        </g>
      ))}

      {life.animals.filter(vis).map((a, i) => {
        const A = ANIMALS[a.kind];
        return (
          <g key={i} transform={`translate(${a.x} ${a.y}) scale(${a.s})`}>
            <g style={{ '--dx': `${a.dx}px`, animation: `wander ${a.dur}s linear infinite`, animationDelay: `${a.delay}s` }}><A /></g>
          </g>
        );
      })}

      {/* gente vivendo no mapa */}
      {life.people.filter(vis).map((p, i) => <PoseFrame key={i} p={p} />)}
      {life.walkers.filter((wk) => vis(SEGS[wk.seg].p0) || vis(SEGS[wk.seg].p1)).map((wk, i) => <Walker key={i} w={wk} />)}
      {life.carts.filter((c) => vis(SEGS[c.seg].p0) || vis(SEGS[c.seg].p1)).map((c, i) => <Cart key={i} c={c} />)}

      <ZeroLife vis={vis} />

      <g style={nightOp}>
        {life.fireflies.filter(vis).map((f, i) => <Firefly key={i} f={f} />)}
        {!calm && <Bats x0={x0} w={w} />}
      </g>
      <g style={dayOp}>
        {!calm && life.butterflies.filter(vis).map((b, i) => <Butterfly key={i} b={b} />)}
        {!calm && <Birds x0={x0} w={w} />}
      </g>
      {!calm && <Crows ruins={life.ruins.filter(vis)} />}
      {!calm && <CloudShadows x0={x0} w={w} night={sky.night} />}
    </g>
  );
}
