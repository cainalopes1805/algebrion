import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  Heart,
  Eye,
  Coins,
  Shield,
  WandSparkles,
  Crosshair,
  FlaskConical,
  Music,
  Sparkles,
  Zap,
  Target,
  Award,
  ShieldCheck,
  Check,
  Lock,
  RotateCcw,
  Plus,
  Droplet,
  ChevronRight,
} from 'lucide-react';
import { useGame, useProfile } from '../store/useGame';
import {
  ATTRIBUTE_IDS,
  ATTRIBUTES,
  HERO_CLASSES,
  CLASS_TALENTS,
  CLASS_TALENT_BRANCHES,
  TALENT_BY_ID,
  calculateHeroBonuses,
  getAvailableAttributePoints,
  getAvailableTalentPoints,
  getSpentAttributePoints,
  getSpentTalentPoints,
  RESPEC_GOLD_COST,
} from '../data/classes';
import { maxManaFor } from '../data/spells';
import { levelProgress, rankFor } from '../data/characters';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import HeroPortrait from '../components/HeroPortrait';
import { Button, Modal, ProgressBar, SectionTitle, cx } from '../components/ui';

const ICON_MAP = {
  Brain,
  Heart,
  Eye,
  Coins,
  Shield,
  WandSparkles,
  Crosshair,
  FlaskConical,
  Music,
  Sparkles,
  Zap,
  Target,
  Award,
  ShieldCheck,
  Droplet,
};

function DynamicIcon({ name, fallback = Sparkles, ...props }) {
  const Comp = ICON_MAP[name] || fallback;
  return <Comp {...props} />;
}

export default function Hero() {
  const p = useProfile();
  const { spendAttribute, learnTalent, respec } = useGame.getState();
  const { t, l } = useT();

  const prog = levelProgress(p.xp);
  const heroClass = HERO_CLASSES[p.hero] || HERO_CLASSES.mage;

  const bonuses = useMemo(() => calculateHeroBonuses(p), [p]);
  const maxMana = useMemo(() => maxManaFor(p), [p]);

  const unspentAttr = getAvailableAttributePoints(prog.level, p.attributes);
  const unspentTalent = getAvailableTalentPoints(prog.level, p.talents, p.hero);
  const spentAttr = getSpentAttributePoints(p.attributes);
  const spentTalent = getSpentTalentPoints(p.talents, p.hero);

  const [confirmRespec, setConfirmRespec] = useState(false);
  const [respecMsg, setRespecMsg] = useState(null);

  const handleSpendAttribute = (attrId) => {
    spendAttribute(attrId);
  };

  const handleLearnTalent = (talentId) => {
    learnTalent(talentId);
  };

  const handleRespec = () => {
    const ok = respec();
    setConfirmRespec(false);
    if (ok) {
      setRespecMsg(t('respec_success'));
      setTimeout(() => setRespecMsg(null), 3000);
    }
  };

  const heroTalents = CLASS_TALENTS[p.hero] || [];
  const heroBranches = CLASS_TALENT_BRANCHES[p.hero] || [];
  const learnedTalents = p.talents?.[p.hero] || [];

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      {/* ── Retrato e Classe ── */}
      <section className="card-pro p-5 sm:p-6 relative overflow-hidden">
        <div
          className="absolute -right-16 -top-16 w-60 h-60 rounded-full pointer-events-none opacity-20"
          style={{ background: `radial-gradient(circle, ${heroClass.color}, transparent 70%)` }}
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative shrink-0">
            <HeroPortrait hero={p.hero} equipped={p.equipped} size={88} />
            <div
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg border flex items-center justify-center shadow"
              style={{
                background: `color-mix(in oklab, ${heroClass.color} 30%, #101820)`,
                borderColor: heroClass.color,
                color: heroClass.color,
              }}
              title={l(heroClass.name)}
            >
              <DynamicIcon name={heroClass.icon} fallback={WandSparkles} size={16} strokeWidth={2} />
            </div>
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="eyebrow text-accent2">{l(heroClass.role)}</span>
              <span className="text-dim text-xs">·</span>
              <span className="text-xs text-dim font-bold">{l(rankFor(prog.level))}</span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl text-ink leading-tight mt-1">
              {p.name}
            </h1>

            {/* Barra de XP */}
            <div className="mt-3 max-w-md">
              <div className="flex justify-between items-baseline text-xs mb-1">
                <span className="font-display font-black text-accent2">
                  {t('lvl')} {prog.level}
                </span>
                <span className="text-dim text-[11px] tabular-nums font-bold">
                  {prog.into} / {prog.needed} XP
                </span>
              </div>
              <ProgressBar pct={prog.pct} height="h-2" />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Link
                to="/settings"
                onClick={() => sounds.click()}
                className="text-xs font-bold text-accent2 hover:underline inline-flex items-center gap-1"
              >
                <span>{t('nav_settings')}</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Passivo de Classe */}
        <div className="mt-6 pt-5 border-t border-line">
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-line">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
              style={{
                background: `color-mix(in oklab, ${heroClass.color} 20%, transparent)`,
                borderColor: `color-mix(in oklab, ${heroClass.color} 60%, transparent)`,
                color: heroClass.color,
              }}
            >
              <DynamicIcon name={heroClass.icon} fallback={WandSparkles} size={20} strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="eyebrow text-dim">{t('class_passive')}</span>
                <span className="text-xs font-black text-accent2">· {l(heroClass.passiveName)}</span>
              </div>
              <p className="text-xs text-dim mt-0.5 leading-relaxed">{l(heroClass.passiveDesc)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Resumo dos Bônus Ativos ── */}
      <section>
        <SectionTitle icon={Sparkles} sub={t('hero_sub')}>
          {t('active_bonuses')}
        </SectionTitle>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <BonusPill
            icon={Heart}
            color="#e2554d"
            label={t('max_hearts')}
            value={`${p.maxHearts}`}
            sub={`Base 5 + ${bonuses.maxHearts}`}
          />
          <BonusPill
            icon={Droplet}
            color="#6fa8ff"
            label={t('max_mana')}
            value={`${maxMana}`}
            sub={`Base 6 + ${bonuses.maxMana}`}
          />
          <BonusPill
            icon={Zap}
            color="#e6c67f"
            label={t('start_mana')}
            value={`+${bonuses.startMana}`}
            sub={t('mana')}
          />
          <BonusPill
            icon={Eye}
            color="#93c9ab"
            label={t('bonus_hints')}
            value={`+${bonuses.hints}`}
            sub={t('guide')}
          />
          <BonusPill
            icon={Coins}
            color="#c79a46"
            label={t('gold_bonus')}
            value={`+${bonuses.goldBonus}%`}
            sub={t('gold')}
          />
          <BonusPill
            icon={Target}
            color="#e39a93"
            label={t('xp_bonus')}
            value={`+${bonuses.xpBonus}%`}
            sub="XP"
          />
          <BonusPill
            icon={Shield}
            color="#ffd27a"
            label={t('start_shield')}
            value={`+${bonuses.startShield}`}
            sub={t('spell_shield')}
          />
          <BonusPill
            icon={Heart}
            color="#4fbf7f"
            label={t('perk_compassion', { n: bonuses.winHeal || 0 })}
            value={`+${bonuses.winHeal}`}
            sub={t('stage')}
          />
        </div>
      </section>

      {/* ── Atributos ── */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <SectionTitle icon={Brain} sub={t('attributes_sub')}>
            {t('attributes_title')}
          </SectionTitle>

          <div className="flex items-center gap-3">
            <span
              className={cx(
                'px-3 py-1.5 rounded-full border text-xs font-black tracking-wide flex items-center gap-1.5',
                unspentAttr > 0
                  ? 'border-accent/80 bg-accent/20 text-accent2 shadow-[0_0_12px_-2px_rgb(var(--glow)/.6)]'
                  : 'border-line bg-black/20 text-dim'
              )}
            >
              <Sparkles size={13} />
              {unspentAttr > 0 ? t('pts_available', { n: unspentAttr }) : t('no_pts_available')}
            </span>

            {(spentAttr > 0 || spentTalent > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmRespec(true)}
                className="!text-[11px] !py-1.5 !px-3"
                title={t('respec_cost', { n: RESPEC_GOLD_COST })}
              >
                <RotateCcw size={13} />
                <span>{t('respec_btn')}</span>
                <span className="text-dim text-[10px]">({RESPEC_GOLD_COST}💰)</span>
              </Button>
            )}
          </div>
        </div>

        {respecMsg && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-good/15 border border-good/40 text-good text-xs font-bold text-center"
          >
            {respecMsg}
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {ATTRIBUTE_IDS.map((attrId) => {
            const attr = ATTRIBUTES[attrId];
            const curVal = p.attributes?.[attrId] || 0;
            const canSpend = unspentAttr > 0 && curVal < attr.max;

            return (
              <div
                key={attrId}
                className="card-pro p-4 flex flex-col justify-between transition-colors hover:border-accent/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center border"
                        style={{
                          background: `color-mix(in oklab, ${attr.color} 20%, transparent)`,
                          borderColor: `color-mix(in oklab, ${attr.color} 50%, transparent)`,
                          color: attr.color,
                        }}
                      >
                        <DynamicIcon name={attr.icon} size={18} strokeWidth={2} />
                      </div>
                      <div>
                        <div className="font-display font-extrabold text-[15px] text-ink leading-tight">
                          {l(attr.name)}
                        </div>
                        <div className="text-[11px] font-bold text-accent2">
                          {l(attr.statLabel)}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-display font-black text-lg text-ink tabular-nums">
                        {curVal}
                      </span>
                      <span className="text-dim text-xs">/{attr.max}</span>
                    </div>
                  </div>

                  <p className="text-xs text-dim mt-2.5 leading-relaxed line-clamp-2">
                    {l(attr.desc)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-line flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar pct={curVal / attr.max} height="h-1.5" />
                  </div>
                  <button
                    disabled={!canSpend}
                    onClick={() => handleSpendAttribute(attrId)}
                    className={cx(
                      'px-3 py-1.5 rounded-lg font-display text-xs font-black uppercase tracking-wider inline-flex items-center gap-1 border transition-all',
                      canSpend
                        ? 'bg-accent border-accent text-on-accent hover:brightness-110 active:scale-95 shadow'
                        : 'bg-surface2/60 border-line text-dim/50 cursor-not-allowed'
                    )}
                  >
                    <Plus size={13} strokeWidth={3} />
                    <span>+1</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Árvore de Talentos ── */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <SectionTitle icon={Sparkles} sub={t('talents_sub')}>
            {t('talents_title')}
          </SectionTitle>

          <span
            className={cx(
              'px-3 py-1.5 rounded-full border text-xs font-black tracking-wide flex items-center gap-1.5 self-start sm:self-auto',
              unspentTalent > 0
                ? 'border-mana/80 bg-mana/20 text-mana shadow-[0_0_12px_-2px_rgb(var(--color-mana)/.6)]'
                : 'border-line bg-black/20 text-dim'
            )}
          >
            <Sparkles size={13} />
            {unspentTalent > 0 ? t('pts_available', { n: unspentTalent }) : t('no_pts_available')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((branchIdx) => {
            const branchName = heroBranches[branchIdx] || `Ramo ${branchIdx + 1}`;
            const branchTalents = heroTalents
              .filter((t) => t.branch === branchIdx)
              .sort((a, b) => a.tier - b.tier);

            return (
              <div
                key={branchIdx}
                className="card-pro p-4 flex flex-col gap-3 border border-line bg-surface/60"
              >
                <div className="pb-2 border-b border-line flex items-center justify-between">
                  <span className="eyebrow text-accent2">{l(branchName)}</span>
                  <span className="text-[10px] text-dim font-bold">
                    {branchTalents.filter((t) => learnedTalents.includes(t.id)).length}/3
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {branchTalents.map((talent) => {
                    const isLearned = learnedTalents.includes(talent.id);
                    const prereqMet = !talent.requires || learnedTalents.includes(talent.requires);
                    const canLearn = !isLearned && prereqMet && unspentTalent > 0;
                    const isLocked = !isLearned && !prereqMet;
                    const reqTalent = talent.requires ? TALENT_BY_ID[talent.requires] : null;

                    return (
                      <div
                        key={talent.id}
                        className={cx(
                          'p-3 rounded-xl border transition-all flex flex-col justify-between gap-2.5',
                          isLearned
                            ? 'bg-accent/10 border-accent/60 shadow-[0_0_12px_-4px_rgb(var(--glow)/.5)]'
                            : isLocked
                            ? 'bg-black/20 border-line/50 opacity-60'
                            : 'bg-surface border-line hover:border-line/90'
                        )}
                      >
                        <div className="flex items-start gap-2.5">
                          <div
                            className={cx(
                              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border mt-0.5',
                              isLearned
                                ? 'bg-accent text-on-accent border-accent'
                                : isLocked
                                ? 'bg-black/40 text-dim border-line'
                                : 'bg-surface2 text-accent2 border-line'
                            )}
                          >
                            <DynamicIcon name={talent.icon} size={16} strokeWidth={2} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-display font-extrabold text-xs text-ink leading-tight truncate">
                                {l(talent.name)}
                              </span>
                              <span className="text-[10px] text-dim font-bold shrink-0">
                                T{talent.tier}
                              </span>
                            </div>
                            <p className="text-[11px] text-dim leading-snug mt-1">
                              {l(talent.desc)}
                            </p>
                          </div>
                        </div>

                        {/* Ação / Requisito */}
                        <div className="pt-2 border-t border-line/60 flex items-center justify-between text-[10px]">
                          {isLearned ? (
                            <span className="inline-flex items-center gap-1 text-good font-extrabold uppercase tracking-wider">
                              <Check size={12} strokeWidth={3} />
                              {t('learned_talent')}
                            </span>
                          ) : isLocked ? (
                            <span className="inline-flex items-center gap-1 text-dim font-bold">
                              <Lock size={11} />
                              {reqTalent ? t('requires_talent', { name: l(reqTalent.name) }) : t('locked_talent')}
                            </span>
                          ) : (
                            <button
                              disabled={!canLearn}
                              onClick={() => handleLearnTalent(talent.id)}
                              className="w-full py-1.5 rounded-lg bg-accent text-on-accent font-display font-black uppercase tracking-wider text-[11px] hover:brightness-110 active:scale-95 transition-all shadow"
                            >
                              {t('learn_talent')}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Modal de Confirmação de Redistribuição ── */}
      <Modal open={confirmRespec} onClose={() => setConfirmRespec(false)}>
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent flex items-center justify-center mx-auto text-accent2">
            <RotateCcw size={24} />
          </div>
          <h3 className="font-display font-black text-xl text-ink">
            {t('respec_btn')}
          </h3>
          <p className="text-xs text-dim leading-relaxed">
            {t('respec_confirm', { n: RESPEC_GOLD_COST })}
          </p>

          <div className="p-3 rounded-xl bg-black/25 border border-line text-xs flex justify-between font-bold">
            <span className="text-dim">{t('gold')}</span>
            <span className={cx(p.gold >= RESPEC_GOLD_COST ? 'text-accent2' : 'text-bad')}>
              {p.gold} / {RESPEC_GOLD_COST} 💰
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => setConfirmRespec(false)}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              disabled={p.gold < RESPEC_GOLD_COST}
              onClick={handleRespec}
            >
              {t('continue')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function BonusPill({ icon: Icon, color, label, value }) {
  return (
    <div className="card-pro p-3 flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
        style={{
          background: `color-mix(in oklab, ${color} 18%, transparent)`,
          borderColor: `color-mix(in oklab, ${color} 45%, transparent)`,
          color,
        }}
      >
        <Icon size={18} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <div className="font-display font-black text-base text-ink leading-tight">
          {value}
        </div>
        <div className="text-[10px] text-dim uppercase tracking-wider font-extrabold truncate">
          {label}
        </div>
      </div>
    </div>
  );
}
