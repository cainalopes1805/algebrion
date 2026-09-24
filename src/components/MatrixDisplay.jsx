import { motion } from 'framer-motion';
import { fmt } from '../data/mathkit';
import { cx } from './ui';

const norm = (hl) => {
  if (!hl) return [];
  return Array.isArray(hl[0]) ? hl : [hl];
};
const show = (v) => (typeof v === 'number' ? fmt(v) : v);

// Matriz com colchetes desenhados; suporta células clicáveis, destaque e rótulo
export default function MatrixDisplay({ data, label, size = 'md', selectedCell, correctCell, wrongCell, onCellClick, hl, animate = true }) {
  const cells = norm(hl);
  const dim = { sm: 'w-9 h-9 text-base', md: 'w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl', lg: 'w-16 h-16 text-2xl' }[size];
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <div className="relative inline-flex items-stretch px-2.5 py-1.5">
        <span className="absolute left-0 inset-y-0 w-2.5 border-l-[3px] border-y-[3px] border-accent rounded-l-md" />
        <span className="absolute right-0 inset-y-0 w-2.5 border-r-[3px] border-y-[3px] border-accent rounded-r-md" />
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${data[0].length}, minmax(0, auto))` }}>
          {data.map((row, r) =>
            row.map((v, c) => {
              const isSel = selectedCell && selectedCell.r === r && selectedCell.c === c;
              const isHl = cells.some(([hr, hc]) => hr === r && hc === c);
              const isOk = correctCell && correctCell.r === r && correctCell.c === c;
              const isBad = wrongCell && wrongCell.r === r && wrongCell.c === c;
              const Tag = onCellClick ? motion.button : motion.div;
              return (
                <Tag
                  key={`${r}-${c}`}
                  initial={animate ? { opacity: 0, scale: 0.6 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: animate ? (r * data[0].length + c) * 0.03 : 0, type: 'spring', stiffness: 300, damping: 20 }}
                  whileHover={onCellClick ? { scale: 1.1 } : undefined}
                  whileTap={onCellClick ? { scale: 0.92 } : undefined}
                  onClick={onCellClick ? () => onCellClick(r, c, v) : undefined}
                  className={cx(
                    dim,
                    'rounded-lg flex items-center justify-center font-display font-black border select-none',
                    isOk ? 'bg-good/25 border-good text-good' : isBad ? 'bg-bad/25 border-bad text-bad' : isSel ? 'bg-accent text-on-accent border-accent shadow-[0_0_18px_rgb(var(--glow)/.6)]' : isHl ? 'bg-accent/20 border-accent text-accent2 anim-glow' : 'bg-black/25 border-line text-ink',
                    onCellClick && 'cursor-pointer hover:border-accent',
                  )}
                >
                  {show(v)}
                </Tag>
              );
            }),
          )}
        </div>
      </div>
      {label && <span className="font-display text-xs text-dim tracking-widest">{label}</span>}
    </div>
  );
}

// Expressão: [{m,label,hl}, {op}, {text}] → linha de matrizes e operadores
export function ExprDisplay({ items, size = 'md', animate = true }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
      {items.map((it, i) =>
        it.m ? (
          <MatrixDisplay key={i} data={it.m} label={it.label} hl={it.hl} size={size} animate={animate} />
        ) : (
          <span key={i} className="font-display text-2xl sm:text-3xl font-black text-accent px-0.5">
            {it.op ?? it.text}
          </span>
        ),
      )}
    </div>
  );
}
