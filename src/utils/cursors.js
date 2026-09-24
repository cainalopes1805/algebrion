// Cursores medievais desenhados em SVG (sem imagens): espada, manopla, ampulheta, escudo, pergaminho…
// Cada variação do cursor do sistema recebe um desenho próprio; o estilo é injetado uma única vez.

const D = '#140d05'; // contorno escuro
const G = '#e6c67f'; // ouro claro
const G2 = '#c79a46'; // ouro médio
const G3 = '#8a6a26'; // ouro escuro (sombras)
const STEEL = '#dfe6ee';
const STEEL2 = '#9aa7b6';
const LEATHER = '#6b4a22';
const RED = '#e2554d';

// Cada forma leva contorno escuro por baixo (camada 'o') e a cor real por cima
const attrs = (s) => Object.entries(s).filter(([k]) => !['t', 'fill', 'stroke', 'sw', 'flat'].includes(k)).map(([k, v]) => `${k}='${v}'`).join(' ');
const layer = (s, pass) => {
  const { t, fill = 'none', stroke = 'none', sw = 0 } = s;
  if (pass === 'o') return s.flat ? '' : `<${t} ${attrs(s)} fill='${fill === 'none' ? 'none' : D}' stroke='${D}' stroke-width='${sw + 3}' stroke-linejoin='round' stroke-linecap='round'/>`;
  return `<${t} ${attrs(s)} fill='${fill}' stroke='${stroke}' stroke-width='${sw}' stroke-linejoin='round' stroke-linecap='round'/>`;
};
const draw = (shapes) => shapes.map((s) => layer(s, 'o')).join('') + shapes.map((s) => layer(s, 'f')).join('');
const cursor = (shapes, x, y) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>${draw(shapes)}</svg>`)}") ${x} ${y}`;

/* ───── peças reutilizáveis ───── */
// Espada apontando para o canto superior esquerdo (a ponta é o "hotspot")
const sword = () => [
  { t: 'path', d: 'M2 2 L18.8 15.2 L15.2 18.8Z', fill: STEEL, stroke: STEEL2, sw: 0.6 },
  { t: 'path', d: 'M2 2 L17 17', stroke: '#ffffff', sw: 0.9, flat: true },
  { t: 'path', d: 'M14.6 23.4 L23.4 14.6', stroke: G, sw: 3 },
  { t: 'path', d: 'M19.6 19.6 L26 26', stroke: LEATHER, sw: 3 },
  { t: 'circle', cx: 27.6, cy: 27.6, r: 2.4, fill: G2, stroke: G3, sw: 0.6 },
];
const gauntletCuff = (y = 24) => [
  { t: 'rect', x: 8, y, width: 16, height: 6, rx: 2, fill: G2, stroke: G3, sw: 0.6 },
  { t: 'path', d: `M8 ${y + 3} H24`, stroke: G3, sw: 0.8, flat: true },
];
const arrowHead = (x, y, rot) => ({ t: 'path', d: 'M0 -5 L4.5 1 H-4.5Z', transform: `translate(${x} ${y}) rotate(${rot})`, fill: G, stroke: G3, sw: 0.5 });
const doubleArrow = (rot) => [
  { t: 'path', d: 'M16 9 V23', stroke: G2, sw: 2.6, transform: `rotate(${rot} 16 16)` },
  { ...arrowHead(16, 6, 0), transform: `rotate(${rot} 16 16) translate(16 6)` },
  { ...arrowHead(16, 26, 180), transform: `rotate(${rot} 16 16) translate(16 26) rotate(180)` },
];
const hourglass = (ox = 0, oy = 0, k = 1) => {
  const T = `translate(${ox} ${oy}) scale(${k})`;
  return [
    { t: 'path', d: 'M9 5 H23 M9 27 H23', stroke: G2, sw: 3, transform: T },
    { t: 'path', d: 'M11 6 H21 C21 12 17.5 14 17.5 16 C17.5 18 21 20 21 26 H11 C11 20 14.5 18 14.5 16 C14.5 14 11 12 11 6Z', fill: '#fff4d2', stroke: G3, sw: 0.7, transform: T },
    { t: 'path', d: 'M13 24.5 H19 L16.6 20.5 H15.4Z M14 8 H18 L16 11Z', fill: G2, flat: true, transform: T },
  ];
};

/* ───── os cursores ───── */
const CURSORS = {
  // seta padrão: espada
  default: cursor(sword(), 2, 2),

  // clicável: manopla apontando com o dedo indicador
  pointer: cursor([
    { t: 'rect', x: 11.5, y: 2, width: 6, height: 15, rx: 3, fill: G, stroke: G3, sw: 0.7 },
    { t: 'path', d: 'M7 15 H26 V24 H9 Q7 24 7 22Z', fill: G2, stroke: G3, sw: 0.7 },
    { t: 'ellipse', cx: 7, cy: 19, rx: 3, ry: 4.2, fill: G, stroke: G3, sw: 0.7, transform: 'rotate(-18 7 19)' },
    { t: 'path', d: 'M14.5 16 V21 M19 16 V21 M23 16 V21', stroke: G3, sw: 0.9, flat: true },
    { t: 'circle', cx: 14.5, cy: 5, r: 0.9, fill: G3, flat: true },
    ...gauntletCuff(24),
  ], 14, 2),

  // pressionado: punho fechado
  pressed: cursor([
    { t: 'rect', x: 6, y: 9, width: 20, height: 15, rx: 5, fill: G2, stroke: G3, sw: 0.7 },
    { t: 'path', d: 'M11 9 V15 M16 9 V15 M21 9 V15', stroke: G3, sw: 0.9, flat: true },
    { t: 'circle', cx: 8.5, cy: 12, r: 1, fill: G, flat: true }, { t: 'circle', cx: 23.5, cy: 12, r: 1, fill: G, flat: true },
    ...gauntletCuff(24),
  ], 16, 14),

  // texto: viga em I com serifas e um losango
  text: cursor([
    { t: 'path', d: 'M16 6 V26', stroke: G, sw: 2.4 },
    { t: 'path', d: 'M11 6 H21 M11 26 H21', stroke: G, sw: 2.4 },
    { t: 'path', d: 'M16 13.5 L18 16 L16 18.5 L14 16Z', fill: G2, stroke: G3, sw: 0.5, flat: true },
  ], 16, 16),

  // proibido: brasão com faixa vermelha
  'not-allowed': cursor([
    { t: 'path', d: 'M6 4 H26 V14 C26 22 21 27 16 29 C11 27 6 22 6 14Z', fill: '#4a161b', stroke: G2, sw: 1.4 },
    { t: 'path', d: 'M9 8 L23 23', stroke: RED, sw: 3.2, flat: true },
    { t: 'path', d: 'M8.5 6.5 L23.5 24', stroke: '#ff9a90', sw: 0.8, flat: true },
  ], 16, 16),

  // aguardando: ampulheta
  wait: cursor(hourglass(), 16, 16),

  // em andamento: espada com uma pequena ampulheta no canto
  progress: cursor([...sword(), ...hourglass(17, -1, 0.5)], 2, 2),

  // ajuda: espada com um pergaminho de interrogação
  help: cursor([
    ...sword(),
    { t: 'circle', cx: 25, cy: 8, r: 6, fill: '#2a1d0d', stroke: G, sw: 1.2 },
    { t: 'path', d: 'M22.7 6.3 a2.4 2.4 0 1 1 3.4 2.2 c-.9 .5 -1.1 1 -1.1 1.8', stroke: G, sw: 1.4, flat: true },
    { t: 'circle', cx: 25, cy: 12, r: 0.9, fill: G, flat: true },
  ], 2, 2),

  // mira: coroa de anel e losango central
  crosshair: cursor([
    { t: 'circle', cx: 16, cy: 16, r: 8, stroke: G, sw: 1.8 },
    { t: 'path', d: 'M16 3 V10 M16 22 V29 M3 16 H10 M22 16 H29', stroke: G, sw: 2 },
    { t: 'path', d: 'M16 13 L19 16 L16 19 L13 16Z', fill: RED, stroke: G3, sw: 0.5 },
  ], 16, 16),

  // arrastar: mão aberta / mão fechada
  grab: cursor([
    { t: 'rect', x: 7, y: 4, width: 3.6, height: 12, rx: 1.8, fill: G },
    { t: 'rect', x: 11.6, y: 2, width: 3.6, height: 14, rx: 1.8, fill: G },
    { t: 'rect', x: 16.2, y: 3, width: 3.6, height: 13, rx: 1.8, fill: G },
    { t: 'rect', x: 20.8, y: 6, width: 3.6, height: 11, rx: 1.8, fill: G },
    { t: 'path', d: 'M6 14 H26 V23 H9 Q6 23 6 20Z', fill: G2, stroke: G3, sw: 0.7 },
    { t: 'ellipse', cx: 6.5, cy: 17, rx: 2.8, ry: 4, fill: G, stroke: G3, sw: 0.6, transform: 'rotate(-25 6.5 17)' },
    ...gauntletCuff(24),
  ], 16, 14),
  grabbing: null, // = pressed (definido abaixo)

  // mover: quatro setas
  move: cursor([
    { t: 'path', d: 'M16 6 V26 M6 16 H26', stroke: G2, sw: 2.6 },
    { ...arrowHead(16, 5, 0), transform: 'translate(16 5)' }, { ...arrowHead(16, 27, 180), transform: 'translate(16 27) rotate(180)' },
    { ...arrowHead(5, 16, 270), transform: 'translate(5 16) rotate(-90)' }, { ...arrowHead(27, 16, 90), transform: 'translate(27 16) rotate(90)' },
  ], 16, 16),

  // redimensionar
  'ns-resize': cursor(doubleArrow(0), 16, 16),
  'ew-resize': cursor(doubleArrow(90), 16, 16),
  'nesw-resize': cursor(doubleArrow(45), 16, 16),
  'nwse-resize': cursor(doubleArrow(-45), 16, 16),
};
CURSORS.grabbing = CURSORS.pressed;

const c = (name, fallback) => `${CURSORS[name]}, ${fallback}`;

const CSS = `
html, body, #root, * { cursor: ${c('default', 'default')}; }

/* clicável */
a[href], button, summary, select, label[for], [role="button"], [role="switch"], [role="tab"], [role="link"],
input[type="checkbox"], input[type="radio"], input[type="range"], input[type="file"], input[type="submit"],
.cursor-pointer, [style*="cursor: pointer"], [style*="cursor:pointer"] { cursor: ${c('pointer', 'pointer')} !important; }

/* pressionado */
a[href]:active, button:active:not(:disabled), [role="button"]:active, [role="switch"]:active,
input[type="range"]:active { cursor: ${c('pressed', 'pointer')} !important; }

/* texto */
input:not([type]), input[type="text"], input[type="search"], input[type="email"], input[type="password"], input[type="number"],
textarea, [contenteditable="true"], .cursor-text { cursor: ${c('text', 'text')} !important; }

/* indisponível */
button:disabled, input:disabled, select:disabled, textarea:disabled, [aria-disabled="true"], .cursor-not-allowed { cursor: ${c('not-allowed', 'not-allowed')} !important; }

/* espera, ajuda, mira, arrasto */
.cursor-wait { cursor: ${c('wait', 'wait')} !important; }
.cursor-progress { cursor: ${c('progress', 'progress')} !important; }
.cursor-help, [title][data-help] { cursor: ${c('help', 'help')} !important; }
.cursor-crosshair { cursor: ${c('crosshair', 'crosshair')} !important; }
.cursor-grab, [draggable="true"] { cursor: ${c('grab', 'grab')} !important; }
.cursor-grabbing, .cursor-grab:active, [draggable="true"]:active { cursor: ${c('grabbing', 'grabbing')} !important; }
.cursor-move { cursor: ${c('move', 'move')} !important; }
.cursor-ns-resize, .cursor-row-resize { cursor: ${c('ns-resize', 'ns-resize')} !important; }
.cursor-ew-resize, .cursor-col-resize { cursor: ${c('ew-resize', 'ew-resize')} !important; }
.cursor-nesw-resize { cursor: ${c('nesw-resize', 'nesw-resize')} !important; }
.cursor-nwse-resize { cursor: ${c('nwse-resize', 'nwse-resize')} !important; }
`;

if (typeof document !== 'undefined' && !document.getElementById('medieval-cursors')) {
  const style = document.createElement('style');
  style.id = 'medieval-cursors';
  style.textContent = CSS;
  document.head.appendChild(style);
}
