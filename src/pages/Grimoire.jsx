import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookMarked, Sigma, Lock, Droplet, Check, Plus, BookOpen, Library } from 'lucide-react';
import { useGame, useProfile } from '../store/useGame';
import { MISSIONS } from '../data/content';
import { SPELLS, SPELL_BY_ID, MASTERY_GOAL, MAX_SLOTS, effectText, effectKind, isLearned, masteryOf } from '../data/spells';
import { biomeColor } from '../data/biomes';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import { spellIcon, EFFECT_COLOR } from '../components/spellIcons';
import { missionIcon, ROMAN } from '../components/gameIcons';
import { SectionTitle, cx } from '../components/ui';

function SpellCard({ spell, p, i }) {
  const { t, l } = useT();
  const equip = useGame((s) => s.equipSpell);
  const unequip = useGame((s) => s.unequipSpell);
  const learned = isLearned(p, spell);
  const equipped = p.skills.equipped.includes(spell.id);
  const m = masteryOf(p, spell);
  const c = EFFECT_COLOR[effectKind(spell.effect)];
  const Icon = spellIcon(spell.icon);
  const concept = MISSIONS.find((x) => x.id === spell.mission)?.lessons[spell.concept - 1];
  const full = p.skills.equipped.length >= MAX_SLOTS;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 10) * 0.04 }}>
      <div className={cx('card-pro p-3.5 h-full flex flex-col gap-3', equipped && '!border-mana/70', !learned && 'opacity-90')}>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border" style={learned ? { borderColor: `${c}aa`, background: `linear-gradient(150deg, ${c}44, ${c}12)`, color: c } : { borderColor: 'var(--c-line)', background: 'rgb(0 0 0 / .25)', color: 'var(--c-dim)' }}>
            {learned ? <Icon size={24} strokeWidth={1.7} /> : <Lock size={20} strokeWidth={1.7} />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display font-extrabold leading-tight">{l(spell.name)}</div>
            <div className="text-[11px] text-dim mt-0.5 leading-snug">{l(effectText(spell.effect))}</div>
          </div>
          <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 h-6 rounded-full bg-mana/15 border border-mana/50 text-mana text-[11px] font-black" title={t('spell_cost')}><Droplet size={11} className="fill-mana/50" />{spell.cost}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em]">
          {spell.formula
            ? <span className="inline-flex items-center gap-1 text-accent2"><Sigma size={12} strokeWidth={2.4} />{t('needs_formula')}</span>
            : <span className="text-dim">{t('spell_free')}</span>}
        </div>
        <div className="mt-auto">
          <div className="flex items-center justify-between text-[10px] font-bold text-dim mb-1"><span className="truncate pr-2">{concept ? l(concept.title) : ''}</span><span className="tabular-nums shrink-0">{m}/{MASTERY_GOAL}</span></div>
          <div className="h-1.5 rounded-full bg-black/40 overflow-hidden"><motion.div className="h-full rounded-full" style={{ background: learned ? c : 'linear-gradient(90deg, var(--c-accent), var(--c-accent2))' }} initial={{ width: 0 }} animate={{ width: `${(m / MASTERY_GOAL) * 100}%` }} transition={{ duration: 0.8 }} /></div>
        </div>
        <Link to={`/tome/${spell.mission}/${spell.concept}`} onClick={() => sounds.click()} className="w-full px-3 py-2 rounded-lg border border-line text-accent2 hover:border-accent text-[11px] font-black uppercase tracking-[0.12em] inline-flex items-center justify-center gap-1.5"><BookOpen size={13} strokeWidth={2} />{t('tome_open')}</Link>
        {learned ? (
          <button
            disabled={!equipped && full}
            onClick={() => { sounds.click(); if (equipped) unequip(spell.id); else equip(spell.id); }}
            className={cx('w-full px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-[0.12em] inline-flex items-center justify-center gap-1.5 transition-colors', equipped ? 'bg-mana/15 border border-mana/60 text-mana' : !full ? 'btn-ghost' : 'bg-black/25 border border-line text-dim')}
          >
            {equipped ? <><Check size={13} strokeWidth={3} />{t('unequip')}</> : <><Plus size={13} strokeWidth={3} />{t('equip')}</>}
          </button>
        ) : (
          <div className="text-[11px] text-dim">{t('spell_locked')}</div>
        )}
      </div>
    </motion.div>
  );
}

export default function Grimoire() {
  const { t, l } = useT();
  const p = useProfile();
  const unequip = useGame((s) => s.unequipSpell);
  const learnedCount = SPELLS.filter((s) => isLearned(p, s)).length;
  const slots = Array.from({ length: MAX_SLOTS }, (_, i) => SPELL_BY_ID[p.skills.equipped[i]]);

  return (
    <div className="space-y-8">
      <SectionTitle icon={BookMarked} sub={`${learnedCount}/${SPELLS.length} · ${t('grimoire_sub')}`}>{t('nav_grimoire')}</SectionTitle>
      <Link to="/library" onClick={() => sounds.click()} className="card-pro flex items-center gap-3 p-3.5 hover:border-accent/60 transition-colors"><span className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/40 flex items-center justify-center text-accent2"><Library size={20} strokeWidth={1.8} /></span><span className="flex-1 min-w-0"><span className="block font-display font-extrabold text-sm">{t('tome_library')}</span><span className="block text-xs text-dim">{t('tome_library_sub')}</span></span></Link>

      <div className="card-pro p-4">
        <div className="eyebrow !text-[10px] text-dim mb-3">{t('spell_slots')}</div>
        <div className="grid grid-cols-4 gap-2">
          {slots.map((sp, i) => {
            const Icon = sp ? spellIcon(sp.icon) : null;
            const c = sp ? EFFECT_COLOR[effectKind(sp.effect)] : null;
            return (
              <button key={i} disabled={!sp} onClick={() => sp && unequip(sp.id)} title={sp ? l(sp.name) : ''} className="aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 transition-colors" style={sp ? { borderColor: `${c}aa`, background: `linear-gradient(150deg, ${c}44, ${c}12)` } : { borderColor: 'var(--c-line)', borderStyle: 'dashed', background: 'rgb(0 0 0 / .18)' }}>
                {sp ? <><Icon size={24} strokeWidth={1.7} style={{ color: c }} /><span className="text-[9px] font-display font-extrabold px-1 text-center leading-tight line-clamp-2">{l(sp.name)}</span></> : <Plus size={18} className="text-dim/50" />}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-dim mt-3">{t('spell_slots_d')}</p>
      </div>

      {MISSIONS.map((m) => {
        const color = biomeColor(m.biome);
        const MIcon = missionIcon(m.id);
        const list = SPELLS.filter((s) => s.mission === m.id);
        return (
          <section key={m.id}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}30`, border: `1px solid ${color}88`, color: `color-mix(in oklab, ${color} 45%, white)` }}><MIcon size={16} strokeWidth={1.9} /></span>
              <h2 className="eyebrow text-dim">{t('unit')} {ROMAN[m.id - 1] || m.id} · {l(m.title)}</h2>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {list.map((s, i) => <SpellCard key={s.id} spell={s} p={p} i={i} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
