import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import { shuffle } from '../utils/rng';
import { parseNumber, sameNumber, fmt } from '../data/mathkit';
import MatrixDisplay, { ExprDisplay } from './MatrixDisplay';
import Character from './Character';
import { Button, cx } from './ui';

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const OPTION_TYPES = ['multiple_choice', 'true_false', 'fill_blank', 'matrix_dimension'];
const GRID_TYPES = ['numeric_input', 'matrix_fill'];

function NumberPad({ onKey, disabled }) {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '−', '0', '.', '/', '⌫', '→'];
  return (
    <div className="grid grid-cols-5 gap-1.5 w-full max-w-sm mx-auto mt-4">
      {keys.map((k) => (
        <motion.button
          key={k}
          whileTap={{ scale: 0.88 }}
          disabled={disabled}
          onClick={() => onKey(k)}
          className="py-2.5 rounded-lg border border-line bg-surface2 font-display font-black text-lg hover:border-accent hover:text-accent2 disabled:opacity-40"
        >
          {k}
        </motion.button>
      ))}
    </div>
  );
}

export default function ActivityView({ activity: a, mentor = 'sage', onAnswer, onNext, hintCount = 0, onUseHint, timeLimit = 0, nextLabel }) {
  const { t, l } = useT();
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(null);
  const [timedOut, setTimedOut] = useState(false);
  const [hinted, setHinted] = useState(false);
  const [hintText, setHintText] = useState(null);

  // Opções (embaralhadas, exceto verdadeiro/falso)
  const [options] = useState(() => (a.options && a.type !== 'true_false' ? shuffle(a.options) : a.options));
  const [selected, setSelected] = useState(null);
  const [eliminated, setEliminated] = useState([]);

  // Clique em célula
  const [cell, setCell] = useState(null);

  // Pares
  const [pairOrder] = useState(() => (a.pairs ? { left: shuffle(a.pairs.map((_, i) => i)), right: shuffle(a.pairs.map((_, i) => i)) } : null));
  const [pickL, setPickL] = useState(null);
  const [pickR, setPickR] = useState(null);
  const [matched, setMatched] = useState([]);
  const [slips, setSlips] = useState(0);
  const [flash, setFlash] = useState(false);

  // Passos
  const [stepOrder] = useState(() => (a.steps ? shuffle(a.steps.map((_, i) => i)) : null));
  const [chosen, setChosen] = useState([]);

  // Grade numérica
  const rows = a.type === 'numeric_input' ? 1 : a.rows;
  const cols = a.type === 'numeric_input' ? 1 : a.cols;
  const expected = useMemo(() => (a.type === 'numeric_input' ? [[a.answer]] : a.answerMatrix), [a]);
  const [vals, setVals] = useState(() => (GRID_TYPES.includes(a.type) ? Array.from({ length: rows }, () => Array(cols).fill('')) : null));
  const [active, setActive] = useState([0, 0]);
  const [cellState, setCellState] = useState(null); // matriz de booleans após verificar

  // Cronômetro (Arena)
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const resolved = useRef(false);
  const timeRef = useRef(timeLimit);
  useEffect(() => { timeRef.current = timeLeft; }, [timeLeft]);

  const finish = useCallback(
    (ok, opts = {}) => {
      if (resolved.current) return;
      resolved.current = true;
      setAnswered(true);
      setCorrect(ok);
      if (opts.timedOut) setTimedOut(true);
      onAnswer?.({ correct: ok, hinted, timeFrac: timeLimit ? Math.max(0, timeRef.current / timeLimit) : 0 });
    },
    [onAnswer, hinted, timeLimit],
  );

  useEffect(() => {
    if (!timeLimit || answered) return undefined;
    const id = setInterval(() => {
      setTimeLeft((tl) => {
        if (tl <= 0.1) {
          clearInterval(id);
          finish(false, { timedOut: true });
          return 0;
        }
        return tl - 0.1;
      });
    }, 100);
    return () => clearInterval(id);
  }, [timeLimit, answered, finish]);

  /* ───── verificação por tipo ───── */
  const check = () => {
    if (answered) return;
    if (OPTION_TYPES.includes(a.type)) {
      if (selected === null) return;
      finish(same(options[selected], a.correctAnswer));
    } else if (a.type === 'cell_click') {
      if (!cell) return;
      finish(cell.r === a.targetCell.r && cell.c === a.targetCell.c);
    } else if (GRID_TYPES.includes(a.type)) {
      if (vals.some((r) => r.some((v) => v === ''))) return;
      const st = vals.map((r, i) => r.map((v, j) => sameNumber(parseNumber(v), expected[i][j])));
      setCellState(st);
      finish(st.every((r) => r.every(Boolean)));
    } else if (a.type === 'order_steps') {
      if (chosen.length !== a.steps.length) return;
      finish(chosen.every((v, i) => v === i));
    }
  };

  const canCheck = () => {
    if (OPTION_TYPES.includes(a.type)) return selected !== null;
    if (a.type === 'cell_click') return !!cell;
    if (GRID_TYPES.includes(a.type)) return vals.every((r) => r.every((v) => v !== ''));
    if (a.type === 'order_steps') return chosen.length === a.steps.length;
    return false;
  };

  /* ───── entrada numérica ───── */
  const typeKey = useCallback(
    (k) => {
      if (answered || !vals) return;
      const [ar, ac] = active;
      const move = (dr, dc) => {
        let r = ar, c = ac + dc;
        if (c >= cols) { c = 0; r = ar + 1; }
        if (c < 0) { c = cols - 1; r = ar - 1; }
        if (dr) r = ar + dr;
        setActive([Math.max(0, Math.min(rows - 1, r)), Math.max(0, Math.min(cols - 1, c))]);
      };
      if (k === '→') { move(0, 1); sounds.click(); return; }
      setVals((v) => {
        const nv = v.map((row) => [...row]);
        const cur = nv[ar][ac];
        if (k === '⌫') nv[ar][ac] = cur.slice(0, -1);
        else if (k === '−' || k === '-') nv[ar][ac] = cur.startsWith('−') ? cur.slice(1) : `−${cur}`;
        else if ((k === '.' || k === ',') && !cur.includes('.') && !cur.includes('/')) nv[ar][ac] = `${cur || '0'}.`;
        else if (k === '/' && cur && !cur.includes('/') && !cur.includes('.')) nv[ar][ac] = `${cur}/`;
        else if (/^[0-9]$/.test(k) && cur.replace('−', '').length < 6) nv[ar][ac] = cur + k;
        return nv;
      });
      sounds.click();
    },
    [active, answered, cols, rows, vals],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (answered) {
        if (e.key === 'Enter') { e.preventDefault(); onNext?.(); }
        return;
      }
      if (GRID_TYPES.includes(a.type)) {
        if (/^[0-9]$/.test(e.key) || ['-', '.', ',', '/', 'Backspace'].includes(e.key)) { e.preventDefault(); typeKey(e.key === 'Backspace' ? '⌫' : e.key); }
        else if (e.key === 'Tab' || e.key === 'ArrowRight') { e.preventDefault(); typeKey('→'); }
        else if (e.key === 'Enter') { e.preventDefault(); if (canCheck()) check(); else typeKey('→'); }
      } else if (OPTION_TYPES.includes(a.type)) {
        const n = Number(e.key);
        if (n >= 1 && n <= (options?.length || 0) && !eliminated.includes(n - 1)) { sounds.select(); setSelected(n - 1); }
        else if (e.key === 'Enter') { e.preventDefault(); check(); }
      } else if (e.key === 'Enter') { e.preventDefault(); check(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  /* ───── pares ───── */
  useEffect(() => {
    if (pickL === null || pickR === null) return undefined;
    if (pickL === pickR) {
      sounds.correct();
      const nm = [...matched, pickL];
      setMatched(nm);
      setPickL(null); setPickR(null);
      if (nm.length === a.pairs.length) setTimeout(() => finish(slips <= 2), 350);
    } else {
      sounds.wrong();
      setSlips((s) => s + 1);
      setFlash(true);
      const id = setTimeout(() => { setPickL(null); setPickR(null); setFlash(false); }, 550);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [pickL, pickR]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ───── dica ───── */
  const applyHint = () => {
    if (answered || hinted || hintCount <= 0) return;
    if (!onUseHint?.()) return;
    setHinted(true);
    sounds.select();
    if (OPTION_TYPES.includes(a.type)) {
      const wrong = options.map((o, i) => i).filter((i) => !same(options[i], a.correctAnswer));
      setEliminated(shuffle(wrong).slice(0, Math.min(2, wrong.length - (a.type === 'true_false' ? 1 : 0))));
      if (a.type === 'true_false') setHintText(a.hint ? l(a.hint) : l(a.explanation));
    } else if (a.type === 'cell_click') {
      setHintText(`${t('hint_row')} ${a.targetCell.r + 1} · ${t('hint_col')} ${a.targetCell.c + 1}`);
    } else if (GRID_TYPES.includes(a.type)) {
      if (a.hint) setHintText(l(a.hint));
      const nv = vals.map((r) => [...r]);
      outer: for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) if (nv[i][j] === '') { nv[i][j] = fmt(expected[i][j]); break outer; }
      setVals(nv);
    } else if (a.type === 'match_pairs') {
      const next = a.pairs.map((_, i) => i).find((i) => !matched.includes(i));
      if (next !== undefined) {
        const nm = [...matched, next];
        setMatched(nm);
        if (nm.length === a.pairs.length) setTimeout(() => finish(slips <= 2), 350);
      }
    } else if (a.type === 'order_steps') {
      const nextIdx = chosen.length;
      if (nextIdx < a.steps.length) setChosen([...chosen, nextIdx]);
    }
  };

  const pct = timeLimit ? Math.max(0, timeLeft / timeLimit) : 0;
  const questionText = l(a.question);
  const showMatrix = a.display ? <ExprDisplay items={a.display} /> : a.matrix ? <MatrixDisplay data={a.matrix} selectedCell={cell} correctCell={answered && a.type === 'cell_click' ? a.targetCell : null} wrongCell={answered && a.type === 'cell_click' && !correct ? cell : null} onCellClick={a.type === 'cell_click' && !answered ? (r, c) => { sounds.select(); setCell({ r, c }); } : null} /> : null;

  const correctText = (() => {
    if (correct) return null;
    if (OPTION_TYPES.includes(a.type)) return l(a.correctAnswer);
    if (a.type === 'numeric_input') return fmt(a.answer);
    if (a.type === 'cell_click') return `a${a.targetCell.r + 1}${a.targetCell.c + 1} = ${a.matrix[a.targetCell.r][a.targetCell.c]}`;
    if (a.type === 'order_steps') return a.steps.map((s, i) => `${i + 1}. ${l(s)}`).join('  ');
    return null;
  })();

  return (
    <div className="w-full max-w-2xl mx-auto pb-44">
      {timeLimit > 0 && (
        <div className="h-2 rounded-full bg-black/40 border border-line overflow-hidden mb-3">
          <div className={cx('h-full transition-[width] duration-100', pct < 0.3 ? 'bg-bad' : 'bg-accent')} style={{ width: `${pct * 100}%` }} />
        </div>
      )}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="panel p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-14 h-16 overflow-hidden rounded-xl bg-black/30 border border-line">
            <div className="-mt-1 -ml-1"><Character id={mentor} size={64} animate={!answered} speaking={!answered} /></div>
          </div>
          <h2 className="font-display text-base sm:text-lg font-bold leading-snug pt-1">{questionText}</h2>
        </div>
        {showMatrix && <div className="mt-4 flex justify-center p-4 rounded-xl bg-black/25 border border-line overflow-x-auto">{showMatrix}</div>}
        {a.type === 'cell_click' && !answered && <p className="mt-2 text-center text-xs text-accent tracking-widest uppercase">👆 {t('tap_cell')}</p>}
        {hintText && <p className="mt-3 text-sm text-mana italic">💡 {hintText}</p>}
      </motion.div>

      {/* ── opções ── */}
      {OPTION_TYPES.includes(a.type) && (
        <div className={cx('mt-4 grid gap-2.5', a.type === 'true_false' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2')}>
          {options.map((o, i) => {
            const isSel = selected === i;
            const isRight = answered && same(o, a.correctAnswer);
            const isWrong = answered && isSel && !isRight;
            const gone = eliminated.includes(i);
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: gone ? 0.15 : 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={!answered && !gone ? { scale: 1.02 } : undefined}
                whileTap={!answered && !gone ? { scale: 0.97 } : undefined}
                disabled={answered || gone}
                onClick={() => { sounds.select(); setSelected(i); }}
                className={cx(
                  'p-3.5 rounded-2xl border-2 border-b-4 text-left flex items-center gap-3 font-display font-extrabold text-sm sm:text-base transition-colors',
                  isRight ? 'border-good bg-good/15 text-good' : isWrong ? 'border-bad bg-bad/15 text-bad anim-shake' : isSel ? 'border-accent bg-accent/15 text-accent2 shadow-[0_0_20px_-6px_rgb(var(--glow)/.7)]' : 'border-line bg-surface hover:border-accent/60',
                )}
              >
                <span className={cx('w-7 h-7 shrink-0 rounded-md flex items-center justify-center text-xs border', isSel ? 'bg-accent text-on-accent border-accent' : 'border-line text-dim')}>{a.type === 'true_false' ? (i === 0 ? '✓' : '✗') : i + 1}</span>
                <span className="leading-snug">{l(o)}</span>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* ── pares ── */}
      {a.type === 'match_pairs' && (
        <div className={cx('mt-4 grid grid-cols-2 gap-3', flash && 'anim-shake')}>
          {['left', 'right'].map((side) => (
            <div key={side} className="space-y-2.5">
              {pairOrder[side].map((idx, k) => {
                const item = side === 'left' ? a.pairs[idx].l : a.pairs[idx].r;
                const isMatched = matched.includes(idx);
                const isPick = (side === 'left' ? pickL : pickR) === idx;
                const bad = flash && isPick;
                return (
                  <motion.button
                    key={`${side}${k}`}
                    whileTap={!isMatched ? { scale: 0.95 } : undefined}
                    animate={{ opacity: isMatched ? 0.35 : 1, scale: isMatched ? 0.95 : 1 }}
                    disabled={isMatched || answered}
                    onClick={() => { sounds.select(); if (side === 'left') setPickL(idx); else setPickR(idx); }}
                    className={cx('w-full min-h-[64px] p-3 rounded-xl border-2 font-display font-bold text-xs sm:text-sm text-center', isMatched ? 'border-good bg-good/10 text-good' : bad ? 'border-bad bg-bad/15 text-bad' : isPick ? 'border-accent bg-accent/15 text-accent2' : 'border-line bg-surface hover:border-accent/60')}
                  >
                    {l(item)}
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* ── ordenar passos ── */}
      {a.type === 'order_steps' && (
        <div className="mt-4 space-y-3">
          <div className="space-y-2">
            {a.steps.map((_, slot) => {
              const idx = chosen[slot];
              return (
                <div key={slot} className={cx('min-h-[48px] rounded-xl border-2 border-dashed px-3 py-2 flex items-center gap-3', idx === undefined ? 'border-line text-dim' : answered ? (idx === slot ? 'border-good bg-good/10 text-good border-solid' : 'border-bad bg-bad/10 text-bad border-solid') : 'border-accent bg-accent/10 border-solid')}>
                  <span className="w-6 h-6 rounded-full bg-black/40 border border-line text-xs flex items-center justify-center font-display">{slot + 1}</span>
                  {idx !== undefined ? (
                    <button disabled={answered} className="text-left text-sm font-bold font-display flex-1" onClick={() => { sounds.click(); setChosen(chosen.filter((_, s) => s !== slot)); }}>{l(a.steps[idx])}</button>
                  ) : <span className="text-xs">…</span>}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {stepOrder.filter((i) => !chosen.includes(i)).map((i) => (
              <motion.button layout key={i} whileTap={{ scale: 0.94 }} disabled={answered} onClick={() => { sounds.select(); setChosen([...chosen, i]); }} className="px-3 py-2 rounded-lg border border-line bg-surface2 text-xs sm:text-sm font-display font-bold hover:border-accent">
                {l(a.steps[i])}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* ── grade numérica ── */}
      {GRID_TYPES.includes(a.type) && (
        <div className="mt-4">
          <div className="flex justify-center">
            <div className="relative inline-flex px-3 py-2">
              <span className="absolute left-0 inset-y-0 w-3 border-l-[3px] border-y-[3px] border-accent rounded-l-md" />
              <span className="absolute right-0 inset-y-0 w-3 border-r-[3px] border-y-[3px] border-accent rounded-r-md" />
              <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}>
                {vals.map((row, r) =>
                  row.map((v, c) => {
                    const isActive = !answered && active[0] === r && active[1] === c;
                    const st = cellState?.[r]?.[c];
                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => { sounds.select(); setActive([r, c]); }}
                        className={cx('w-16 h-14 rounded-lg border-2 font-display font-black text-xl flex items-center justify-center transition-colors', st === true ? 'border-good bg-good/20 text-good' : st === false ? 'border-bad bg-bad/20 text-bad' : isActive ? 'border-accent bg-accent/15 text-accent2 shadow-[0_0_16px_-4px_rgb(var(--glow)/.8)]' : 'border-line bg-black/25')}
                      >
                        {v || <span className="text-dim/50">{isActive ? '▏' : '?'}</span>}
                      </button>
                    );
                  }),
                )}
              </div>
            </div>
          </div>
          <NumberPad onKey={typeKey} disabled={answered} />
          <p className="text-center text-[11px] text-dim mt-2">{t('numpad_tip')}</p>
        </div>
      )}

      {/* ── ações ── */}
      {!answered && (
        <div className="mt-5 flex items-center gap-3">
          {hintCount > 0 || hinted ? (
            <Button variant="ghost" size="md" disabled={hinted || hintCount <= 0} onClick={applyHint} title={t('use_hint')}>
              📜 {hintCount}
            </Button>
          ) : null}
          <Button className="flex-1" size="lg" disabled={a.type === 'match_pairs' || !canCheck()} onClick={check}>
            {a.type === 'match_pairs' ? t('match_all') : t('check')}
          </Button>
        </div>
      )}

      {/* ── painel de feedback ── */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ y: 220, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 220, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className={cx('fixed inset-x-0 bottom-0 z-50 border-t-4 backdrop-blur-xl px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]', correct ? 'bg-emerald-950/95 border-good text-emerald-100' : 'bg-red-950/95 border-bad text-red-100')}
          >
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div className="flex items-start gap-3 min-w-0">
                <motion.div initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 10 }} className={cx('w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl font-black', correct ? 'bg-good text-black' : 'bg-bad text-white')}>
                  {correct ? '✓' : timedOut ? '⌛' : '✗'}
                </motion.div>
                <div className="min-w-0">
                  <h3 className="font-display font-black text-lg leading-tight">{correct ? t(hinted ? 'good_hinted' : 'good') : timedOut ? t('time_up') : t('bad')}</h3>
                  {a.explanation && <p className="text-sm opacity-90 leading-snug mt-0.5">{l(a.explanation)}</p>}
                  {correctText && <p className="text-sm font-bold mt-1 break-words">{t('correct_answer')}: {correctText}</p>}
                  {!correct && GRID_TYPES.includes(a.type) && a.type === 'matrix_fill' && (
                    <div className="mt-2 scale-75 origin-left"><MatrixDisplay data={a.answerMatrix} size="sm" animate={false} /></div>
                  )}
                </div>
              </div>
              <Button variant={correct ? 'primary' : 'danger'} size="lg" onClick={onNext} className="shrink-0">{nextLabel || t('continue')} →</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
