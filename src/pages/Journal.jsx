// Diário da Jornada: virtudes, bênçãos, vínculos com os aliados, escolhas feitas e finais alcançados.
import { motion } from 'framer-motion';
import { BookText, Flame, BookOpen, Eye, Heart, Sparkles, Scale } from 'lucide-react';
import { useProfile } from '../store/useGame';
import { CHARACTERS } from '../data/characters';
import { L } from '../i18n/core';
import { useT } from '../i18n';
import Character from '../components/Character';
import { SectionTitle, cx } from '../components/ui';

const VIRTUES = [
  { id: 'courage', Icon: Flame, color: '#e2704d' },
  { id: 'wisdom', Icon: BookOpen, color: '#5b9bd8' },
  { id: 'cunning', Icon: Eye, color: '#b48adf' },
  { id: 'compassion', Icon: Heart, color: '#e2708f' },
];
const ALLIES = ['sage', 'alchemist', 'general', 'witch', 'dwarf', 'oracle', 'queen'];
const T = (pt, en) => L(pt, en);

// decisões da história, na ordem em que aparecem: [bandeira, valor, capítulo, texto]
const CHOICES = [
  ['temper', 'brave', 0, T('Você se apresentou ao Mestre Arcano como alguém corajoso.', 'You introduced yourself to the Arcane Master as someone brave.')],
  ['temper', 'wise', 0, T('Você se apresentou ao Mestre Arcano como alguém curioso.', 'You introduced yourself to the Arcane Master as someone curious.')],
  ['temper', 'cunning', 0, T('Você se apresentou ao Mestre Arcano como alguém astuto.', 'You introduced yourself to the Arcane Master as someone cunning.')],
  ['asked_nullus', true, 1, T('Você perguntou ao Mestre quem Nullus era antes do Zero.', 'You asked the Master who Nullus was before the Zero.')],
  ['promised_ghost', true, 1, T('Você prometeu ajudar o Espectro dos Índices a lembrar o próprio endereço.', 'You promised to help the Specter of Indices remember its address.')],
  ['promised_ghost', false, 1, T('Você só enfrentaria o Espectro se ele atacasse primeiro.', 'You would only fight the Specter if it struck first.')],
  ['spared_ghost', true, 1, T('Você convidou o Espectro a ficar como bibliotecário da Abadia.', 'You invited the Specter to stay as the Abbey’s librarian.')],
  ['spared_ghost', false, 1, T('Você libertou o Espectro para que seguisse seu caminho.', 'You freed the Specter to go its own way.')],
  ['helped_elden', true, 2, T('Você ajudou o alquimista com o ouro que ele precisava.', 'You helped the alchemist with the gold he needed.')],
  ['helped_elden', false, 2, T('Você recusou o pedido de ouro do alquimista.', 'You declined the alchemist’s request for gold.')],
  ['formation', 'balanced', 3, T('Você montou uma formação equilibrada com o General Vetor.', 'You built a balanced formation with General Vector.')],
  ['formation', 'bold', 3, T('Você montou uma formação ousada com o General Vetor.', 'You built a bold formation with General Vector.')],
  ['saw_vision', true, 4, T('Você encarou a visão do passado de Nullus no espelho.', 'You faced the vision of Nullus’s past in the mirror.')],
  ['saw_vision', false, 4, T('Você se recusou a olhar a visão de Nullus.', 'You refused to look at Nullus’s vision.')],
  ['dragon_mercy', true, 5, T('Você decidiu tentar poupar o Dragão da Forja.', 'You decided to try to spare the Forge Dragon.')],
  ['dragon_mercy', false, 5, T('Você se preparou para lutar contra o Dragão da Forja sem hesitar.', 'You prepared to fight the Forge Dragon without hesitation.')],
  ['pity_nullus', true, 6, T('Você acha que Nullus merece ser ouvido.', 'You believe Nullus deserves to be heard.')],
  ['pity_nullus', false, 6, T('Você acha que a dor de Nullus não justifica apagar o mundo.', 'You believe Nullus’s pain does not justify erasing the world.')],
  ['oracle_bet', true, 6, T('Você aceitou a aposta do Oráculo e resolveu sem dicas.', 'You accepted the Oracle’s bet and solved it without hints.')],
  ['oracle_bet', false, 6, T('Você preferiu resolver o enigma do Oráculo com apoio.', 'You chose to solve the Oracle’s riddle with support.')],
  ['asked_queen', true, 7, T('Você perguntou à Rainha sobre o passado dela com Nullus.', 'You asked the Queen about her past with Nullus.')],
  ['lean', 'mercy', 7, T('Antes do confronto, você desejava devolver Nullus a quem foi.', 'Before the confrontation, you hoped to return Nullus to who he was.')],
  ['lean', 'justice', 7, T('Antes do confronto, você desejava detê-lo para proteger o reino.', 'Before the confrontation, you wished to stop him to protect the realm.')],
  ['ending', 'mercy', 7, T('Final: você aplicou a Inversa em Nullus e o devolveu a quem foi.', 'Ending: you applied the Inverse to Nullus and returned him to who he was.')],
  ['ending', 'justice', 7, T('Final: você baniu o Zero e Nullus para além do reino.', 'Ending: you banished the Zero and Nullus beyond the realm.')],
];


export default function Journal() {
  const { t, l } = useT();
  const p = useProfile();
  const v = p.story.virtues, b = p.story.bonds, flags = p.story.flags;
  const perks = [
    { id: 'courage', n: Math.min(2, Math.floor(v.courage / 2)) },
    { id: 'wisdom', n: Math.min(2, Math.floor(v.wisdom / 2)) },
    { id: 'cunning', n: Math.min(20, Math.floor(v.cunning / 2) * 10) },
    { id: 'compassion', n: Math.min(2, Math.floor(v.compassion / 2)) },
  ].filter((x) => x.n > 0);
  const done = CHOICES.filter(([flag, val]) => flags[flag] === val);
  const endings = p.story.endings || [];

  return (
    <div className="space-y-8">
      <SectionTitle icon={BookText} sub={t('journal_sub')}>{t('nav_journal')}</SectionTitle>

      <section>
        <h2 className="eyebrow text-dim mb-3">{t('journal_virtues')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {VIRTUES.map(({ id, Icon, color }, i) => (
            <motion.div key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-pro p-3.5 text-center">
              <div className="w-11 h-11 mx-auto rounded-xl flex items-center justify-center border" style={{ borderColor: `${color}99`, background: `${color}22`, color }}><Icon size={22} strokeWidth={1.8} /></div>
              <div className="font-display font-black text-2xl mt-2 tabular-nums leading-none">{v[id] || 0}</div>
              <div className="eyebrow !text-[9.5px] text-dim mt-1.5">{t(`virtue_${id}`)}</div>
              <div className="h-1 rounded-full bg-black/40 mt-2.5 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${Math.min(100, (v[id] || 0) * 12)}%`, background: color }} /></div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 card-pro !rounded-xl p-3.5">
          <div className="eyebrow !text-[10px] text-dim mb-2">{t('journal_blessings')}</div>
          {perks.length === 0 ? <p className="text-xs text-dim">{t('journal_none')}</p> : (
            <ul className="space-y-1.5">{perks.map((k) => <li key={k.id} className="flex items-center gap-2 text-[13px] font-bold text-amber-100"><Sparkles size={13} className="text-amber-300 shrink-0" />{t(`perk_${k.id}`, { n: k.n })}</li>)}</ul>
          )}
        </div>
      </section>

      <section>
        <h2 className="eyebrow text-dim mb-3">{t('journal_allies')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {ALLIES.map((k) => {
            const n = b[k] || 0;
            return (
              <div key={k} className={cx('card-pro p-3 flex flex-col items-center text-center', n === 0 && 'opacity-55')}>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-black/30 border border-line"><div className="-mt-1 ml-[-5px]"><Character id={k} size={72} animate={false} /></div></div>
                <div className="font-display font-extrabold text-[12.5px] leading-tight mt-2">{l(CHARACTERS[k].name).split(',')[0]}</div>
                <div className="flex gap-0.5 mt-1.5">{Array.from({ length: 5 }, (_, i) => <Heart key={i} size={11} className={i < n ? 'text-rose-400 fill-rose-400' : 'text-dim/40'} />)}</div>
                {n >= 3 && <div className="text-[10px] text-rose-200 font-bold mt-1.5">{t('bond')}: +1 {t('mana')}</div>}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="eyebrow text-dim mb-3">{t('journal_choices')}</h2>
        {done.length === 0 ? <p className="text-sm text-dim">{t('journal_none')}</p> : (
          <div className="card-pro divide-y divide-line/60">
            {done.map(([flag, val, ch, text], i) => (
              <div key={`${flag}${val}${i}`} className="flex items-start gap-3 px-4 py-3">
                <span className="mt-0.5 w-6 h-6 shrink-0 rounded-md border border-line bg-black/25 text-[11px] font-black text-accent2 flex items-center justify-center">{ch === 0 ? '·' : ch}</span>
                <p className="text-[13.5px] leading-snug">{l(text)}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="eyebrow text-dim mb-3">{t('journal_endings')}</h2>
        {endings.length === 0 ? <p className="text-sm text-dim">{t('journal_none')}</p> : (
          <div className="flex flex-wrap gap-2.5">
            {endings.map((e) => (
              <div key={e} className="card-pro !border-accent/50 px-4 py-3 flex items-center gap-3">
                {e === 'justice' ? <Scale size={20} className="text-accent2" /> : <Heart size={20} className="text-rose-400" />}
                <span className="font-display font-extrabold text-sm">{e === 'justice' ? t('title_justice') : t('title_mercy')}</span>
              </div>
            ))}
            
          </div>
        )}
      </section>
    </div>
  );
}
