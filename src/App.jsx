import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';

import Home from './pages/Home';
import Customization from './pages/Customization';
import Mission from './pages/Mission';
import Level from './pages/Level';

export default function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/mission/:id" element={<Mission />} />
        <Route path="/mission/:missionId/level/:levelId" element={<Level />} />
      </Routes>
    </BrowserRouter>
  );
}
