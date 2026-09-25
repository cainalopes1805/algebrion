// Interface dos feitiços de batalha: mana, barra de feitiços, efeito visual e a "fórmula mágica".
import { AnimatePresence, motion } from 'framer-motion';
import { Droplet, Sigma } from 'lucide-react';
import { MAX_MANA, effectKind, effectText } from '../data/spells';
import { spellIcon, EFFECT_COLOR } from './spellIcons';
import { useT } from '../i18n';
import ActivityView from './ActivityView';
import { cx } from './ui';

export function ManaBar({ mana, max = MAX_MANA }) {
  const { t } = useT();
  const total = Math.max(1, max);
  return (
    <div className="flex items-center gap-2" title={t('mana')}>
      <span className="eyebrow !text-[10px] text-mana">{t('mana')}</span>
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: total }, (_, i) => (
          <motion.span key={i} animate={{ scale: i < mana ? 1 : 0.8, opacity: i < mana ? 1 : 0.3 }} className="flex">
            <Droplet size={16} strokeWidth={2} className={cx(i < mana ? 'text-mana fill-mana/50' : 'text-dim')} />
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export function SpellBar({ spells, mana, maxMana = MAX_MANA, shield, hints, disabled, onCast, costDiscount = 0 }) {
  const { t, l } = useT();
  return (
    <div className="card-pro !rounded-xl px-3 py-2.5 mb-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <ManaBar mana={mana} max={maxMana} />
        <div className="flex items-center gap-3 text-[11px] text-dim font-bold">
          {shield > 0 && <span className="inline-flex items-center gap-1 text-[#8fc0f0]">{t('spell_shield')} ×{shield}</span>}
          {hints > 0 && <span className="inline-flex items-center gap-1 text-accent2">{t('spell_clue')} ×{hints}</span>}
        </div>
      </div>
      {spells.length === 0 ? (
        <p className="text-xs text-dim mt-2">{t('no_spells_hint')}</p>
      ) : (
        <div className="flex gap-2 mt-2.5 flex-wrap">
          {spells.map((s) => {
            const Icon = spellIcon(s.icon);
            const c = EFFECT_COLOR[effectKind(s.effect)];
            const effectiveCost = Math.max(1, s.cost - costDiscount);
            const can = !disabled && mana >= effectiveCost;
            return (
              <button
                key={s.id}
                disabled={!can}
                onClick={() => onCast(s)}
                title={`${l(s.name)} — ${l(effectText(s.effect))}${s.formula ? ` (${t('needs_formula')})` : ''}`}
                className={cx('relative w-[74px] rounded-xl border px-1.5 pt-2 pb-1.5 flex flex-col items-center gap-1 transition-all', can ? 'hover:-translate-y-0.5 hover:brightness-110' : 'opacity-40')}
                style={{ borderColor: `${c}99`, background: `linear-gradient(160deg, ${c}33, ${c}0d)` }}
              >
                <Icon size={22} strokeWidth={1.8} style={{ color: c }} />
                <span className="text-[9.5px] font-display font-extrabold leading-tight text-center line-clamp-2 min-h-[2.2em]">{l(s.name)}</span>
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-mana/90 text-[#06121f] text-[10px] font-black flex items-center justify-center shadow">
                  {effectiveCost}
                </span>
                {s.formula && <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-accent text-on-accent flex items-center justify-center shadow" title={t('needs_formula')}><Sigma size={11} strokeWidth={2.6} /></span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const ANGLES = Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2);

// Explosão de magia: brilho, anéis, fagulhas e o ícone do feitiço
export function SpellFx({ fx }) {
  const { l } = useT();
  return (
    <AnimatePresence>
      {fx && (() => {
        const c = EFFECT_COLOR[effectKind(fx.spell.effect)];
        const Icon = spellIcon(fx.spell.icon);
        return (
          <motion.div key={fx.k} className="fixed inset-0 z-[66] pointer-events-none flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1.6, times: [0, 0.12, 0.72, 1] }}>
            <motion.div className="absolute w-[80vmin] h-[80vmin] rounded-full" style={{ background: `radial-gradient(circle, ${c}77, transparent 62%)` }} initial={{ scale: 0.2 }} animate={{ scale: 1.15 }} transition={{ duration: 1.2, ease: 'easeOut' }} />
            {[0, 1, 2].map((i) => <motion.div key={i} className="absolute rounded-full border-2" style={{ borderColor: c, width: 120, height: 120 }} initial={{ scale: 0.3, opacity: 0.9 }} animate={{ scale: 3.4 + i, opacity: 0 }} transition={{ duration: 1.2, delay: i * 0.16, ease: 'easeOut' }} />)}
            {ANGLES.map((a, i) => <motion.span key={i} className="absolute w-2 h-2 rounded-full" style={{ background: c, boxShadow: `0 0 10px ${c}` }} initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos(a) * (140 + (i % 3) * 40), y: Math.sin(a) * (140 + (i % 3) * 40), opacity: 0, scale: 0.3 }} transition={{ duration: 1.1, ease: 'easeOut' }} />)}
            <motion.div className="relative flex flex-col items-center" initial={{ scale: 0.3, rotate: -20 }} animate={{ scale: [0.3, 1.25, 1], rotate: [-20, 6, 0] }} transition={{ duration: 0.7 }}>
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center border-2" style={{ borderColor: c, background: `${c}33`, boxShadow: `0 0 48px ${c}aa` }}><Icon size={52} strokeWidth={1.6} style={{ color: c }} /></div>
              <div className="mt-3 font-fancy text-2xl font-black text-white tracking-wide" style={{ textShadow: `0 0 18px ${c}, 0 2px 6px #000` }}>{l(fx.spell.name)}</div>
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
}

// A "fórmula mágica": exercício do conceito que libera o feitiço
export function FormulaModal({ cast, mentor, onAnswer, onNext }) {
  const { t, l } = useT();
  if (!cast) return null;
  const Icon = spellIcon(cast.spell.icon);
  const c = EFFECT_COLOR[effectKind(cast.spell.effect)];
  return (
    <div className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm overflow-y-auto px-4 pt-6 pb-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center border" style={{ borderColor: c, background: `${c}26` }}><Icon size={22} style={{ color: c }} /></div>
          <div>
            <div className="eyebrow !text-[10px] text-accent">{t('magic_formula')}</div>
            <div className="font-fancy text-lg font-black">{l(cast.spell.name)}</div>
          </div>
        </div>
        <p className="text-center text-xs text-dim mb-3">{t('magic_formula_d')}</p>
        <ActivityView key={cast.k} activity={cast.activity} mentor={mentor} onAnswer={onAnswer} onNext={onNext} hintCount={0} />
      </div>
    </div>
  );
}
