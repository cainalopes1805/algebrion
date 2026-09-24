import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame, useProfile } from '../store/useGame';
import { CONSUMABLES, COSMETICS } from '../data/economy';
import { CHARACTERS } from '../data/characters';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import HeroPortrait from '../components/HeroPortrait';
import { Button, Card, Segmented, SectionTitle, cx } from '../components/ui';

const TABS = ['items', 'frame', 'aura', 'pet', 'hero'];
const TAB_KEY = { items: 'shop_items', frame: 'shop_frames', aura: 'shop_auras', pet: 'shop_pets', hero: 'shop_heroes' };

export default function Shop() {
  const { t, l } = useT();
  const p = useProfile();
  const buyConsumable = useGame((s) => s.buyConsumable);
  const buyCosmetic = useGame((s) => s.buyCosmetic);
  const equip = useGame((s) => s.equip);
  const setHero = useGame((s) => s.setHero);
  const [tab, setTab] = useState('items');
  const [msg, setMsg] = useState(null);
  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(null), 1600); };

  const list = tab === 'items' ? [] : COSMETICS.filter((c) => c.slot === tab);

  return (
    <div className="space-y-6">
      <SectionTitle icon="🛒" sub={t('shop_sub')}>{t('nav_shop')}</SectionTitle>
      <div className="flex items-center gap-4 panel p-4">
        <HeroPortrait hero={p.hero} equipped={p.equipped} size={84} />
        <div className="flex-1 min-w-0">
          <div className="font-display font-black text-lg truncate">{p.name}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-dim">
            <span>💰 <b className="text-ink">{p.gold}</b></span>
            <span>🛡️ {p.items.shield}</span>
            <span>📜 {p.items.hint}</span>
            <span>🧪 {p.items.xpPotion}</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-1 px-1"><Segmented value={tab} onChange={setTab} options={TABS.map((x) => ({ value: x, label: t(TAB_KEY[x]) }))} /></div>

      {msg && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm font-display font-bold text-bad">{msg}</motion.div>}

      <div className="grid sm:grid-cols-2 gap-3">
        {tab === 'items' && CONSUMABLES.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="p-4 flex items-center gap-4">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-accent/15 border border-accent/40 flex items-center justify-center text-3xl anim-float">{c.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="font-display font-black leading-tight">{l(c.name)}</div>
                <div className="text-xs text-dim">{l(c.desc)}</div>
                {!c.instant && <div className="text-[11px] text-accent mt-0.5">{t('you_have')}: {p.items[c.id] || 0}</div>}
              </div>
              <Button size="sm" disabled={p.gold < c.price} onClick={() => { if (!buyConsumable(c.id)) { sounds.wrong(); flash(c.instant && p.hearts >= p.maxHearts ? t('hearts_full') : t('not_enough_gold')); } }}>
                {c.price} 💰
              </Button>
            </Card>
          </motion.div>
        ))}

        {list.map((c, i) => {
          const owned = c.slot === 'hero' ? c.hero === 'mage' || p.owned.includes(c.id) : p.owned.includes(c.id);
          const equipped = c.slot === 'hero' ? p.hero === c.hero : p.equipped[c.slot] === c.id;
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card gold={equipped} className="p-4 flex items-center gap-4">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-black/30 border border-line flex items-center justify-center overflow-hidden">
                  {c.slot === 'hero' ? <div className="mt-1"><HeroPortrait hero={c.hero} size={56} ring={false} /></div> : c.slot === 'frame' ? <HeroPortrait hero={p.hero} equipped={{ frame: c.id }} size={52} /> : c.slot === 'aura' ? <HeroPortrait hero={p.hero} equipped={{ aura: c.id }} size={48} ring={false} /> : <span className="text-4xl anim-float">{c.icon}</span>}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-black leading-tight">{l(c.name)}</div>
                  {c.slot === 'hero' && <div className="text-xs text-dim">{l(CHARACTERS[c.hero].role)}</div>}
                  {equipped && <div className="text-[11px] text-good font-display font-bold uppercase tracking-widest mt-0.5">✓ {t('equipped')}</div>}
                </div>
                {owned ? (
                  <Button size="sm" variant="ghost" onClick={() => (c.slot === 'hero' ? setHero(c.hero) : equip(c.slot, equipped ? null : c.id))}>{equipped && c.slot !== 'hero' ? t('unequip') : t('equip')}</Button>
                ) : (
                  <Button size="sm" disabled={p.gold < c.price} onClick={() => { if (!buyCosmetic(c.id)) { sounds.wrong(); flash(t('not_enough_gold')); } }}>{c.price} 💰</Button>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
      <p className={cx('text-center text-xs text-dim')}>{t('shop_tip')}</p>
    </div>
  );
}
