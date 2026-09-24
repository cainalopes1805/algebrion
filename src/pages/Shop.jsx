import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Coins, ShieldPlus, ScrollText, FlaskConical, Check, Sparkles } from 'lucide-react';
import { useGame, useProfile } from '../store/useGame';
import { CONSUMABLES, COSMETICS } from '../data/economy';
import { CHARACTERS } from '../data/characters';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import HeroPortrait from '../components/HeroPortrait';
import { SHOP_ICON } from '../components/gameIcons';
import { Segmented, SectionTitle, cx } from '../components/ui';

const TABS = ['items', 'frame', 'aura', 'pet', 'hero'];
const TAB_KEY = { items: 'shop_items', frame: 'shop_frames', aura: 'shop_auras', pet: 'shop_pets', hero: 'shop_heroes' };

// Botão de compra: preço com ícone de moedas; apagado quando o ouro não basta
const PriceButton = ({ price, disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={() => { sounds.click(); onClick(); }}
    className={cx('shrink-0 min-w-[84px] px-3.5 py-2.5 rounded-lg text-[12px] font-black tabular-nums inline-flex items-center justify-center gap-1.5 transition-all', disabled ? 'bg-black/25 border border-line text-dim' : 'btn-cta !gap-1.5 !tracking-normal')}
  >
    {price}<Coins size={14} strokeWidth={2.2} />
  </button>
);

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
      <SectionTitle icon={ShoppingBag} sub={t('shop_sub')}>{t('nav_shop')}</SectionTitle>

      {/* Carteira e inventário */}
      <div className="card-pro flex items-center gap-4 p-4">
        <div className="rounded-2xl p-0.5 bg-gradient-to-br from-accent2 to-accent/30"><div className="rounded-[14px] overflow-hidden bg-bg"><HeroPortrait hero={p.hero} equipped={p.equipped} size={76} /></div></div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-black text-lg truncate">{p.name}</div>
          <div className="flex items-center gap-1.5 mt-1 text-accent2 font-display font-black text-2xl leading-none tabular-nums"><Coins size={20} strokeWidth={2} />{p.gold}</div>
          <div className="flex flex-wrap gap-2 mt-2.5">
            {[[ShieldPlus, p.items.shield], [ScrollText, p.items.hint], [FlaskConical, p.items.xpPotion]].map(([Icon, n], i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/25 border border-line text-xs font-bold text-dim tabular-nums"><Icon size={13} strokeWidth={1.9} className="text-accent2" />{n}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-1 px-1"><Segmented value={tab} onChange={setTab} options={TABS.map((x) => ({ value: x, label: t(TAB_KEY[x]) }))} /></div>

      {msg && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm font-display font-bold text-bad">{msg}</motion.div>}

      <div className="grid sm:grid-cols-2 gap-3">
        {tab === 'items' && CONSUMABLES.map((c, i) => {
          const Icon = SHOP_ICON[c.id] || Sparkles;
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <div className="card-pro p-4 flex items-center gap-4 h-full">
                <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-accent/30 to-accent/5 border border-accent/50 text-accent2 flex items-center justify-center"><Icon size={26} strokeWidth={1.7} /></div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-extrabold leading-tight">{l(c.name)}</div>
                  <div className="text-xs text-dim mt-0.5">{l(c.desc)}</div>
                  {!c.instant && <div className="eyebrow !text-[9.5px] text-accent mt-1.5">{t('you_have')}: <span className="tabular-nums">{p.items[c.id] || 0}</span></div>}
                </div>
                <PriceButton price={c.price} disabled={p.gold < c.price} onClick={() => { if (!buyConsumable(c.id)) { sounds.wrong(); flash(c.instant && p.hearts >= p.maxHearts ? t('hearts_full') : t('not_enough_gold')); } }} />
              </div>
            </motion.div>
          );
        })}

        {list.map((c, i) => {
          const owned = c.slot === 'hero' ? c.hero === 'mage' || p.owned.includes(c.id) : p.owned.includes(c.id);
          const equipped = c.slot === 'hero' ? p.hero === c.hero : p.equipped[c.slot] === c.id;
          const PetIcon = SHOP_ICON[c.id] || Sparkles;
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <div className={cx('card-pro p-4 flex items-center gap-4 h-full', equipped && '!border-accent/70')}>
                <div className="w-16 h-16 shrink-0 rounded-xl bg-black/30 border border-line flex items-center justify-center overflow-hidden">
                  {c.slot === 'hero' ? <div className="mt-1"><HeroPortrait hero={c.hero} size={56} ring={false} /></div> : c.slot === 'frame' ? <HeroPortrait hero={p.hero} equipped={{ frame: c.id }} size={52} /> : c.slot === 'aura' ? <HeroPortrait hero={p.hero} equipped={{ aura: c.id }} size={48} ring={false} /> : <PetIcon size={30} strokeWidth={1.6} className="text-accent2 anim-float" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-extrabold leading-tight">{l(c.name)}</div>
                  {c.slot === 'hero' && <div className="text-xs text-dim mt-0.5">{l(CHARACTERS[c.hero].role)}</div>}
                  {equipped && <div className="eyebrow !text-[9.5px] text-good mt-1.5 inline-flex items-center gap-1"><Check size={12} strokeWidth={3} />{t('equipped')}</div>}
                </div>
                {owned ? (
                  <button onClick={() => { sounds.click(); if (c.slot === 'hero') setHero(c.hero); else equip(c.slot, equipped ? null : c.id); }} className="btn-ghost shrink-0 px-3.5 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-[0.12em]">{equipped && c.slot !== 'hero' ? t('unequip') : t('equip')}</button>
                ) : (
                  <PriceButton price={c.price} disabled={p.gold < c.price} onClick={() => { if (!buyCosmetic(c.id)) { sounds.wrong(); flash(t('not_enough_gold')); } }} />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="text-center text-xs text-dim">{t('shop_tip')}</p>
    </div>
  );
}
