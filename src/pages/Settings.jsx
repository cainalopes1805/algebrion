import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame, useProfile, DEFAULT_SETTINGS } from '../store/useGame';
import { LANGS, useT } from '../i18n';
import { CHARACTERS, HERO_IDS, levelProgress, rankFor } from '../data/characters';
import { COSMETICS } from '../data/economy';
import { sounds } from '../utils/audio';
import HeroPortrait from '../components/HeroPortrait';
import Character from '../components/Character';
import { UserRound, Palette, Sparkles, Languages, Volume2, Database, BedDouble, Lock, Trash2, Plus, RotateCcw, Play, Download, Upload, Check } from 'lucide-react';
import { Button, Modal, SectionTitle, Segmented, Slider, Toggle, cx } from '../components/ui';
import { SHOP_ICON } from '../components/gameIcons';

// Superfície e título de bloco usados em todas as abas
const Card = ({ className = '', gold = false, children }) => <div className={cx('card-pro', gold && '!border-accent/60', className)}>{children}</div>;
const Heading = ({ children, className = '' }) => <h3 className={cx('eyebrow text-dim mb-3', className)}>{children}</h3>;

const THEMES = [
  { id: 'slate', key: 'theme_slate', swatch: ['#101820', '#33454f'] },
  { id: 'crypt', key: 'theme_crypt', swatch: ['#0a0807', '#362b21'] },
  { id: 'tavern', key: 'theme_tavern', swatch: ['#120b07', '#4a2f1c'] },
  { id: 'forest', key: 'theme_forest', swatch: ['#060b08', '#24402f'] },
  { id: 'cathedral', key: 'theme_cathedral', swatch: ['#07080f', '#2a3050'] },
  { id: 'parchment', key: 'theme_parchment', swatch: ['#e8d9b5', '#b9a37a'] },
];
const ACCENTS = [
  { id: 'gold', key: 'acc_gold', color: '#c79a46' },
  { id: 'crimson', key: 'acc_crimson', color: '#b5504b' },
  { id: 'emerald', key: 'acc_emerald', color: '#52906f' },
  { id: 'arcane', key: 'acc_arcane', color: '#8067c4' },
  { id: 'frost', key: 'acc_frost', color: '#4b93b8' },
  { id: 'ember', key: 'acc_ember', color: '#c0692f' },
];
const PARTICLES = ['embers', 'fireflies', 'snow', 'runes', 'none'];
const TABS = [
  { v: 'hero', k: 'tab_hero', Icon: UserRound },
  { v: 'look', k: 'tab_look', Icon: Palette },
  { v: 'motion', k: 'tab_motion', Icon: Sparkles },
  { v: 'lang', k: 'tab_lang', Icon: Languages },
  { v: 'sound', k: 'tab_sound', Icon: Volume2 },
  { v: 'data', k: 'tab_data', Icon: Database },
];

export default function Settings() {
  const { t, l } = useT();
  const [tab, setTab] = useState('hero');
  return (
    <div className="space-y-6">
      <SectionTitle icon={BedDouble} sub={t('settings_sub')}>{t('nav_settings')}</SectionTitle>
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {TABS.map((x) => (
          <button key={x.v} onClick={() => { sounds.click(); setTab(x.v); }} className={cx('shrink-0 px-3.5 py-2 rounded-lg border font-display text-[11px] font-extrabold uppercase tracking-[0.12em] inline-flex items-center gap-2 transition-colors', tab === x.v ? 'bg-accent/15 text-accent2 border-accent/60' : 'border-line bg-surface text-dim hover:text-ink hover:border-accent/40')}>
            <x.Icon size={15} strokeWidth={1.9} />{t(x.k)}
          </button>
        ))}
      </div>
      <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        {tab === 'hero' && <HeroTab />}
        {tab === 'look' && <LookTab />}
        {tab === 'motion' && <MotionTab />}
        {tab === 'lang' && <LangTab />}
        {tab === 'sound' && <SoundTab />}
        {tab === 'data' && <DataTab />}
      </motion.div>
      <span className="hidden">{l({ pt: '', en: '' })}</span>
    </div>
  );
}

/* ───── Herói + perfis ───── */
function HeroTab() {
  const { t, l } = useT();
  const p = useProfile();
  const profiles = useGame((s) => s.profiles);
  const setHero = useGame((s) => s.setHero);
  const rename = useGame((s) => s.renameProfile);
  const create = useGame((s) => s.createProfile);
  const switchP = useGame((s) => s.switchProfile);
  const del = useGame((s) => s.deleteProfile);
  const equip = useGame((s) => s.equip);
  const [name, setName] = useState(p.name);
  const [newName, setNewName] = useState('');
  const [confirmDel, setConfirmDel] = useState(null);
  const prog = levelProgress(p.xp);
  const ownedSlot = (slot) => COSMETICS.filter((c) => c.slot === slot && p.owned.includes(c.id));

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Card gold className="p-5 flex flex-col items-center text-center">
        <HeroPortrait hero={p.hero} equipped={p.equipped} size={140} />
        <input value={name} onChange={(e) => setName(e.target.value)} onBlur={() => rename(name)} maxLength={24} className="mt-4 bg-black/30 border border-line rounded-xl px-4 py-2 text-center font-display font-black text-xl w-full max-w-xs focus:outline-none focus:border-accent" aria-label={t('hero_name')} />
        <div className="text-accent text-sm mt-1">{l(rankFor(prog.level))} · {t('lvl')} {prog.level}</div>
        <div className="text-xs text-dim">{l(CHARACTERS[p.hero].role)}</div>
      </Card>

      <Card className="p-5">
        <Heading>{t('choose_hero')}</Heading>
        <div className="grid grid-cols-5 gap-2">
          {HERO_IDS.map((h) => {
            const unlocked = h === 'mage' || p.owned.includes(`hero_${h}`);
            return (
              <button key={h} disabled={!unlocked} onClick={() => setHero(h)} className={cx('relative rounded-xl border overflow-hidden pt-1 aspect-[3/4] flex flex-col items-center bg-black/25 transition-all', p.hero === h ? 'border-accent shadow-[0_0_18px_-4px_rgb(var(--glow)/.8)]' : 'border-line', unlocked ? 'hover:border-accent/70' : 'opacity-40 grayscale')} title={l(CHARACTERS[h].name)}>
                <Character id={h} size={56} animate={false} />
                <span className="text-[9px] font-display uppercase tracking-wide mt-auto pb-1 truncate w-full">{unlocked ? l(CHARACTERS[h].name) : <Lock size={11} className="mx-auto" />}</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-dim mt-2">{t('heroes_unlock_hint')}</p>

        {['frame', 'aura', 'pet'].map((slot) => (
          <div key={slot} className="mt-4">
            <div className="eyebrow !text-[10px] text-dim mb-2">{t(`slot_${slot}`)}</div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => equip(slot, null)} className={cx('px-3 py-1.5 rounded-lg border text-xs font-display', !p.equipped[slot] ? 'border-accent text-accent2 bg-accent/10' : 'border-line text-dim')}>{t('none')}</button>
              {ownedSlot(slot).map((c) => (
                <button key={c.id} onClick={() => equip(slot, c.id)} className={cx('px-3 py-1.5 rounded-lg border text-xs font-display flex items-center gap-1', p.equipped[slot] === c.id ? 'border-accent text-accent2 bg-accent/10' : 'border-line text-dim hover:text-ink')}>
                  {slot === 'pet' && SHOP_ICON[c.id] ? (() => { const PI = SHOP_ICON[c.id]; return <PI size={13} />; })() : slot === 'aura' && c.color ? <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} /> : null}{l(c.name)}
                </button>
              ))}
              {ownedSlot(slot).length === 0 && <span className="text-xs text-dim self-center">— {t('buy_in_shop')}</span>}
            </div>
          </div>
        ))}
      </Card>

      <Card className="p-5 lg:col-span-2">
        <Heading>{t('profiles')}</Heading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.values(profiles).map((pr) => (
            <div key={pr.id} className={cx('flex items-center gap-3 p-2.5 rounded-xl border', pr.id === p.id ? 'border-accent bg-accent/10' : 'border-line bg-black/20')}>
              <div className="w-10 h-10 rounded-full overflow-hidden bg-black/30 border border-line shrink-0"><div className="-mt-1 ml-[-6px]"><Character id={pr.hero} size={54} animate={false} /></div></div>
              <button onClick={() => switchP(pr.id)} className="flex-1 min-w-0 text-left">
                <div className="font-display font-bold truncate text-sm">{pr.name}</div>
                <div className="text-[11px] text-dim">{t('lvl')} {levelProgress(pr.xp).level} · {pr.xp} XP</div>
              </button>
              {Object.keys(profiles).length > 1 && <button onClick={() => setConfirmDel(pr)} className="text-dim hover:text-bad px-1.5" aria-label={t('delete')}><Trash2 size={16} /></button>}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t('new_hero_name')} maxLength={24} className="flex-1 bg-black/30 border border-line rounded-xl px-3 py-2 focus:outline-none focus:border-accent" />
          <Button disabled={!newName.trim()} onClick={() => { create(newName); setNewName(''); }}><Plus size={16} />{t('create')}</Button>
        </div>
      </Card>

      <Modal open={!!confirmDel} onClose={() => setConfirmDel(null)}>
        <h3 className="font-display text-xl font-black">{t('delete_profile')}</h3>
        <p className="text-dim my-3">{t('delete_profile_msg', { name: confirmDel?.name })}</p>
        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={() => setConfirmDel(null)}>{t('cancel')}</Button>
          <Button variant="danger" className="flex-1" onClick={() => { del(confirmDel.id); setConfirmDel(null); }}>{t('delete')}</Button>
        </div>
      </Modal>
    </div>
  );
}

/* ───── Aparência ───── */
function LookTab() {
  const { t } = useT();
  const s = useGame((x) => x.settings);
  const set = useGame((x) => x.setSetting);
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Card className="p-5">
        <Heading>{t('theme')}</Heading>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {THEMES.map((th) => (
            <button key={th.id} onClick={() => { sounds.click(); set('theme', th.id); }} className={cx('rounded-xl border p-2 text-left transition-all', s.theme === th.id ? 'border-accent shadow-[0_0_18px_-6px_rgb(var(--glow)/.8)]' : 'border-line hover:border-accent/50')}>
              <div className="h-10 rounded-lg mb-1.5 border border-black/40" style={{ background: `linear-gradient(135deg, ${th.swatch[0]} 55%, ${th.swatch[1]})` }} />
              <div className="font-display text-xs font-bold">{t(th.key)}</div>
            </button>
          ))}
        </div>
        <Heading className="mt-6">{t('accent')}</Heading>
        <div className="flex flex-wrap gap-3">
          {ACCENTS.map((a) => (
            <button key={a.id} onClick={() => { sounds.click(); set('accent', a.id); }} title={t(a.key)} className={cx('w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center', s.accent === a.id ? 'border-ink scale-110' : 'border-transparent')} style={{ background: a.color, boxShadow: `0 0 14px ${a.color}77` }} aria-label={t(a.key)}>{s.accent === a.id && <Check size={16} strokeWidth={3} className="text-white drop-shadow" />}</button>
          ))}
        </div>
        <Heading className="mt-6 !mb-2">{t('font_size')}</Heading>
        <Segmented value={s.fontScale} onChange={(v) => set('fontScale', v)} options={[{ value: 0.9, label: 'A−' }, { value: 1, label: 'A' }, { value: 1.15, label: 'A+' }, { value: 1.3, label: 'A++' }]} />
      </Card>

      <Card className="p-5 divide-y divide-line/50">
        <div className="pb-3">
          <Heading>{t('particles')}</Heading>
          <Segmented value={s.particles} onChange={(v) => set('particles', v)} options={PARTICLES.map((x) => ({ value: x, label: t(`part_${x}`) }))} />
          <Slider label={t('density')} value={s.particleDensity} min={0.3} max={2.5} step={0.1} onChange={(v) => set('particleDensity', v)} format={(v) => `${Math.round(v * 100)}%`} />
        </div>
        <div className="py-3">
          <Heading>{t('map_time')}</Heading>
          <Segmented value={s.mapTime} onChange={(v) => set('mapTime', v)} options={['auto', 'day', 'dusk', 'night'].map((x) => ({ value: x, label: t(`map_${x}`) }))} />
          <p className="text-xs text-dim mt-2">{t('map_time_d')}</p>
        </div>
        <Toggle label={t('vignette')} desc={t('vignette_d')} checked={s.vignette} onChange={(v) => set('vignette', v)} />
        <Toggle label={t('grain')} desc={t('grain_d')} checked={s.grain} onChange={(v) => set('grain', v)} />
        <Toggle label={t('torch')} desc={t('torch_d')} checked={s.torch} onChange={(v) => set('torch', v)} />
        <div className="pt-3"><Button variant="ghost" size="sm" onClick={() => useGame.getState().resetSettings()}><RotateCcw size={13} />{t('reset_settings')}</Button></div>
      </Card>
    </div>
  );
}

/* ───── Movimento ───── */
function MotionTab() {
  const { t } = useT();
  const s = useGame((x) => x.settings);
  const set = useGame((x) => x.setSetting);
  return (
    <Card className="p-5 max-w-2xl">
      <Heading className="!mb-1">{t('motion')}</Heading>
      <p className="text-xs text-dim mb-3">{t('motion_d')}</p>
      <Segmented value={s.motion} onChange={(v) => set('motion', v)} options={[{ value: 'full', label: t('motion_full') }, { value: 'reduced', label: t('motion_reduced') }, { value: 'off', label: t('motion_off') }]} />
      <div className="flex justify-center my-5 gap-6 h-[100px]">
        <Character id="mage" size={70} />
        <Character id="knight" size={70} />
        <Character id="ranger" size={70} />
      </div>
      <div className="divide-y divide-line/50">
        <Toggle label={t('confetti')} desc={t('confetti_d')} checked={s.confetti} onChange={(v) => set('confetti', v)} />
        <Toggle label={t('shake')} desc={t('shake_d')} checked={s.screenShake} onChange={(v) => set('screenShake', v)} />
      </div>
    </Card>
  );
}

/* ───── Idioma ───── */
function LangTab() {
  const { t } = useT();
  const lang = useGame((x) => x.settings.language);
  const set = useGame((x) => x.setSetting);
  return (
    <Card className="p-5 max-w-2xl">
      <Heading>{t('language')}</Heading>
      <div className="grid sm:grid-cols-2 gap-2">
        {LANGS.map((g) => (
          <button key={g.id} onClick={() => { sounds.click(); set('language', g.id); }} className={cx('flex items-center gap-3 p-3 rounded-xl border transition-all', lang === g.id ? 'border-accent/70 bg-accent/10' : 'border-line hover:border-accent/40')}>
            <span className={cx('w-10 h-10 rounded-lg border flex items-center justify-center font-display font-black text-sm tracking-wider', lang === g.id ? 'border-accent/60 bg-accent/15 text-accent2' : 'border-line bg-black/25 text-dim')}>{g.id.toUpperCase()}</span>
            <span className="font-display font-extrabold">{g.label}</span>
            {lang === g.id && <Check size={18} strokeWidth={2.6} className="ml-auto text-accent2" />}
          </button>
        ))}
      </div>
      <p className="text-xs text-dim mt-3">{t('lang_note')}</p>
    </Card>
  );
}

/* ───── Som ───── */
function SoundTab() {
  const { t } = useT();
  const s = useGame((x) => x.settings);
  const set = useGame((x) => x.setSetting);
  return (
    <Card className="p-5 max-w-2xl divide-y divide-line/50">
      <Toggle label={t('sfx')} desc={t('sfx_d')} checked={s.sound} onChange={(v) => set('sound', v)} />
      <div className="py-2"><Slider label={t('volume')} value={s.volume} onChange={(v) => set('volume', v)} format={(v) => `${Math.round(v * 100)}%`} /></div>
      <Toggle label={t('music')} desc={t('music_d')} checked={s.music} onChange={(v) => set('music', v)} />
      <div className="py-2"><Slider label={t('music_volume')} value={s.musicVolume} onChange={(v) => set('musicVolume', v)} format={(v) => `${Math.round(v * 100)}%`} /></div>
      <div className="pt-3 flex gap-2 flex-wrap">
        {['correct', 'wrong', 'coin', 'levelUp', 'achievement', 'victory'].map((f) => (
          <Button key={f} size="sm" variant="ghost" onClick={() => sounds[f]()}><Play size={11} className="fill-current" />{f}</Button>
        ))}
      </div>
    </Card>
  );
}

/* ───── Dados ───── */
function DataTab() {
  const { t } = useT();
  const exp = useGame((x) => x.exportData);
  const imp = useGame((x) => x.importData);
  const reset = useGame((x) => x.resetProgress);
  const fileRef = useRef(null);
  const [msg, setMsg] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const download = () => {
    const blob = new Blob([exp()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `algebrion-save-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const ok = imp(await f.text());
    setMsg(ok ? t('import_ok') : t('import_fail'));
    e.target.value = '';
  };

  return (
    <Card className="p-5 max-w-2xl space-y-4">
      <p className="text-sm text-dim">{t('data_note')}</p>
      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" onClick={download}><Download size={15} />{t('export')}</Button>
        <Button variant="ghost" onClick={() => fileRef.current?.click()}><Upload size={15} />{t('import')}</Button>
        <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={onFile} />
        <Button variant="danger" onClick={() => setConfirm(true)}><Trash2 size={15} />{t('reset_progress')}</Button>
      </div>
      {msg && <p className="text-sm font-display font-bold text-accent">{msg}</p>}
      <Modal open={confirm} onClose={() => setConfirm(false)}>
        <h3 className="font-display text-xl font-black">{t('reset_progress')}</h3>
        <p className="text-dim my-3">{t('reset_msg')}</p>
        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={() => setConfirm(false)}>{t('cancel')}</Button>
          <Button variant="danger" className="flex-1" onClick={() => { reset(); setConfirm(false); }}>{t('reset_progress')}</Button>
        </div>
      </Modal>
    </Card>
  );
}

export { DEFAULT_SETTINGS };
