import { motion } from 'framer-motion';
import { sounds } from '../utils/audio';

export const cx = (...a) => a.filter(Boolean).join(' ');

export function Button({ variant = 'primary', size = 'md', className = '', onClick, children, sound = true, ...rest }) {
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-5 py-3 text-sm', lg: 'px-8 py-4 text-base' };
  const v = { primary: 'btn-primary', ghost: 'btn-ghost', danger: 'btn-danger' }[variant];
  return (
    <motion.button
      whileHover={rest.disabled ? undefined : { scale: 1.03 }}
      whileTap={rest.disabled ? undefined : { scale: 0.97 }}
      className={cx('rounded-xl font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-colors', sizes[size], v, className)}
      onClick={(e) => {
        if (sound) sounds.click();
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export function Card({ className = '', gold = false, children, ...rest }) {
  return (
    <div className={cx('panel', gold && 'panel-gold', className)} {...rest}>
      {children}
    </div>
  );
}

export function SectionTitle({ icon, children, sub }) {
  return (
    <div className="mb-4">
      <h2 className="font-display text-xl sm:text-2xl font-black text-gold-grad flex items-center gap-2">
        {icon && <span className="text-2xl">{icon}</span>}
        {children}
      </h2>
      {sub && <p className="text-dim text-sm mt-0.5">{sub}</p>}
      <div className="mt-2 h-px bg-gradient-to-r from-accent/70 via-line to-transparent" />
    </div>
  );
}

export function ProgressBar({ pct, color = 'accent', height = 'h-2.5', className = '' }) {
  const bg = { accent: 'bg-gradient-to-r from-accent to-accent2', bad: 'bg-gradient-to-r from-bad to-orange-400', good: 'bg-gradient-to-r from-good to-emerald-300', mana: 'bg-gradient-to-r from-mana to-cyan-300' }[color];
  return (
    <div className={cx('w-full rounded-full bg-black/40 border border-line overflow-hidden', height, className)}>
      <motion.div className={cx('h-full rounded-full', bg)} initial={false} animate={{ width: `${Math.max(0, Math.min(100, pct * 100))}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
    </div>
  );
}

export function Segmented({ value, onChange, options, className = '' }) {
  return (
    <div className={cx('inline-flex flex-wrap gap-1 p-1 rounded-xl bg-black/30 border border-line', className)}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => { sounds.click(); onChange(o.value); }}
          className={cx('px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-colors', value === o.value ? 'bg-accent text-on-accent' : 'text-dim hover:text-ink')}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Toggle({ checked, onChange, label, desc }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => { sounds.click(); onChange(!checked); }}
      className="w-full flex items-center justify-between gap-4 py-3 text-left"
    >
      <span>
        <span className="block font-display text-sm font-bold text-ink">{label}</span>
        {desc && <span className="block text-xs text-dim mt-0.5 font-body normal-case tracking-normal">{desc}</span>}
      </span>
      <span className={cx('shrink-0 w-12 h-7 rounded-full border transition-colors relative', checked ? 'bg-accent border-accent' : 'bg-black/40 border-line')}>
        <motion.span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow" animate={{ left: checked ? 24 : 3 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
      </span>
    </button>
  );
}

export function Slider({ value, onChange, min = 0, max = 1, step = 0.05, label, format }) {
  return (
    <label className="block py-2">
      <span className="flex justify-between font-display text-sm font-bold">
        <span>{label}</span>
        <span className="text-accent">{format ? format(value) : value}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full mt-2 accent-[var(--c-accent)]" />
    </label>
  );
}

export function Modal({ open, onClose, children, className = '' }) {
  if (!open) return null;
  return (
    <motion.div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}>
      <motion.div
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className={cx('panel panel-gold w-full max-w-md p-6 max-h-[90vh] overflow-y-auto', className)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export const Stat = ({ icon, value, label, className = '' }) => (
  <div className={cx('flex flex-col items-center px-3 py-2 rounded-xl bg-black/25 border border-line', className)}>
    <span className="text-xl leading-none">{icon}</span>
    <span className="font-display font-black text-lg text-ink mt-1">{value}</span>
    <span className="text-[10px] uppercase tracking-widest text-dim">{label}</span>
  </div>
);
