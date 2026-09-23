import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Customization from './pages/Customization';
import Mission from './pages/Mission';
import Level from './pages/Level';

export default function App() {
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
