import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useGame } from './store/useGame';
import { sounds } from './utils/audio';
import Layout from './components/Layout';
import ParticleField from './components/ParticleField';
import Toasts from './components/Toasts';
import Home from './pages/Home';
import Mission from './pages/Mission';
import Trail from './pages/Trail';
import Lesson from './pages/Lesson';
import Level from './pages/Level';
import Story from './pages/Story';
import ArenaPlay, { ArenaHub } from './pages/Arena';
import Ranking from './pages/Ranking';
import Shop from './pages/Shop';
import Quests from './pages/Quests';
import Glories from './pages/Glories';
import Settings from './pages/Settings';

// Aplica configurações globais (tema, acento, movimento, fonte, áudio) e ciclos de tempo
function GlobalEffects() {
  const s = useGame(useShallow((st) => st.settings));

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = s.theme;
    root.dataset.accent = s.accent;
    root.dataset.motion = s.motion;
    root.lang = s.language;
    root.style.setProperty('--font-scale', String(s.fontScale));
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = getComputedStyle(root).getPropertyValue('--c-bg').trim() || '#0a0807';
  }, [s.theme, s.accent, s.motion, s.language, s.fontScale]);

  useEffect(() => {
    sounds.configure({ enabled: s.sound, volume: s.volume, musicVolume: s.musicVolume, music: s.music });
  }, [s.sound, s.volume, s.music, s.musicVolume]);

  // Navegadores exigem um gesto do usuário para liberar o áudio
  useEffect(() => {
    const unlock = () => {
      sounds.init();
      const st = useGame.getState().settings;
      if (st.music && st.sound) sounds.startMusic();
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    return () => window.removeEventListener('pointerdown', unlock);
  }, []);

  useEffect(() => {
    const { touchDay, tickHearts } = useGame.getState();
    touchDay();
    tickHearts();
    const id = setInterval(() => { touchDay(); tickHearts(); }, 30000);
    const onVis = () => { if (!document.hidden) { touchDay(); tickHearts(); } };
    document.addEventListener('visibilitychange', onVis);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  return null;
}

function Ambience() {
  const { vignette, grain, torch } = useGame(useShallow((s) => ({ vignette: s.settings.vignette, grain: s.settings.grain, torch: s.settings.torch })));
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -10%, rgb(var(--glow-bg) / .55), transparent 60%), var(--c-bg)' }} />
      {torch && (
        <>
          <div className="torch-glow" style={{ left: '-20vmax', top: '10vh' }} />
          <div className="torch-glow" style={{ right: '-22vmax', top: '40vh', animationDelay: '-1.7s' }} />
        </>
      )}
      <ParticleField />
      {vignette && <div className="vignette" />}
      {grain && <div className="grain" />}
    </>
  );
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalEffects />
      <Ambience />
      <ScrollTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trail" element={<Trail />} />
          <Route path="mission/:id" element={<Mission />} />
          <Route path="quests" element={<Quests />} />
          <Route path="arena" element={<ArenaHub />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="shop" element={<Shop />} />
          <Route path="glories" element={<Glories />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="mission/:missionId/lesson/:lessonId" element={<Lesson />} />
        <Route path="mission/:missionId/level/:levelId" element={<Level />} />
        <Route path="arena/play/:diff" element={<ArenaPlay />} />
        <Route path="story/:sceneId" element={<Story />} />
        <Route path="*" element={<Layout />}>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
      <Toasts />
    </BrowserRouter>
  );
}
