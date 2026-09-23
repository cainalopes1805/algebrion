// Motor de áudio 100% procedural (Web Audio API) — sem arquivos, sem dependências.
const N = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, C6: 1046.5,
};

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = true;
    this.volume = 0.7;
    this.musicOn = false;
    this.musicVolume = 0.35;
    this._musicTimer = null;
    this._musicGain = null;
    this._step = 0;
  }

  configure({ enabled, volume, music, musicVolume }) {
    if (enabled !== undefined) this.enabled = enabled;
    if (volume !== undefined) this.volume = volume;
    if (musicVolume !== undefined) this.musicVolume = musicVolume;
    if (this.master) this.master.gain.value = this.volume;
    if (this._musicGain) this._musicGain.gain.value = this.musicVolume * 0.25;
    if (music !== undefined) {
      this.musicOn = music;
      if (music && this.enabled) this.startMusic();
      else this.stopMusic();
    }
    if (!this.enabled) this.stopMusic();
  }

  init() {
    if (typeof window === 'undefined') return false;
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return false;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.volume;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return true;
  }

  _tone({ freq, at = 0, dur = 0.3, type = 'triangle', gain = 0.15, slideTo = null, dest = null }) {
    const ctx = this.ctx;
    const t0 = ctx.currentTime + at;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(dest || this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  _noise({ at = 0, dur = 0.2, gain = 0.2, freq = 800 }) {
    const ctx = this.ctx;
    const t0 = ctx.currentTime + at;
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.value = gain;
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start(t0);
  }

  _play(fn) {
    if (!this.enabled || !this.init()) return;
    fn();
  }

  click() {
    this._play(() => this._tone({ freq: 620, slideTo: 260, dur: 0.06, type: 'sine', gain: 0.07 }));
  }
  hover() {
    this._play(() => this._tone({ freq: 900, dur: 0.03, type: 'sine', gain: 0.02 }));
  }
  select() {
    this._play(() => {
      this._tone({ freq: N.E5, dur: 0.08, type: 'triangle', gain: 0.08 });
      this._tone({ freq: N.A5, at: 0.05, dur: 0.1, type: 'triangle', gain: 0.06 });
    });
  }
  correct() {
    this._play(() => [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => this._tone({ freq: f, at: i * 0.075, dur: 0.35, gain: 0.13 })));
  }
  wrong() {
    this._play(() => {
      this._tone({ freq: 190, slideTo: 90, dur: 0.35, type: 'sawtooth', gain: 0.12 });
      this._noise({ dur: 0.18, gain: 0.08, freq: 300 });
    });
  }
  heartLost() {
    this._play(() => [N.A4, N.G4, N.F4, N.D4].forEach((f, i) => this._tone({ freq: f, at: i * 0.1, dur: 0.28, type: 'sine', gain: 0.12 })));
  }
  coin() {
    this._play(() => {
      this._tone({ freq: 1320, dur: 0.09, type: 'square', gain: 0.05 });
      this._tone({ freq: 1760, at: 0.07, dur: 0.22, type: 'square', gain: 0.05 });
    });
  }
  hit() {
    this._play(() => {
      this._noise({ dur: 0.16, gain: 0.25, freq: 1200 });
      this._tone({ freq: 160, slideTo: 60, dur: 0.18, type: 'square', gain: 0.1 });
    });
  }
  sword() {
    this._play(() => {
      this._noise({ dur: 0.22, gain: 0.14, freq: 3200 });
      this._tone({ freq: 900, slideTo: 200, dur: 0.18, type: 'sawtooth', gain: 0.05 });
    });
  }
  combo(n = 1) {
    this._play(() => {
      const base = N.C5 * Math.pow(1.0595, Math.min(n, 12));
      this._tone({ freq: base, dur: 0.1, gain: 0.09 });
      this._tone({ freq: base * 1.5, at: 0.06, dur: 0.16, gain: 0.09 });
    });
  }
  levelUp() {
    this._play(() => [N.C4, N.E4, N.G4, N.C5, N.E5, N.G5, N.C6].forEach((f, i) => this._tone({ freq: f, at: i * 0.09, dur: 0.5, gain: 0.11 })));
  }
  achievement() {
    this._play(() => {
      [N.G4, N.C5, N.E5, N.G5].forEach((f, i) => this._tone({ freq: f, at: i * 0.11, dur: 0.6, gain: 0.1 }));
      this._tone({ freq: N.C6, at: 0.5, dur: 1.0, type: 'sine', gain: 0.09 });
    });
  }
  victory() {
    this._play(() => {
      const chords = [
        { t: 0, f: [N.C4, N.E4, N.G4] }, { t: 0.18, f: [N.D4, N.F4, N.A4] },
        { t: 0.36, f: [N.E4, N.G4, N.B4] }, { t: 0.6, f: [N.C5, N.E5, N.G5, N.C6] },
      ];
      chords.forEach((c) => c.f.forEach((f) => this._tone({ freq: f, at: c.t, dur: c.t > 0.5 ? 1.2 : 0.35, gain: 0.08 })));
    });
  }
  defeat() {
    this._play(() => [N.A3, N.F3, N.D3, N.A3 / 2].forEach((f, i) => this._tone({ freq: f, at: i * 0.22, dur: 0.6, type: 'sawtooth', gain: 0.07 })));
  }
  buy() {
    this._play(() => {
      this._tone({ freq: 880, dur: 0.06, type: 'square', gain: 0.05 });
      this._tone({ freq: 1320, at: 0.06, dur: 0.06, type: 'square', gain: 0.05 });
      this._tone({ freq: 1760, at: 0.12, dur: 0.25, type: 'square', gain: 0.05 });
    });
  }
  page() {
    this._play(() => this._noise({ dur: 0.12, gain: 0.05, freq: 2000 }));
  }

  // ── Música ambiente: loop modal (Dórico) tipo alaúde, gerado ao vivo ──
  startMusic() {
    if (!this.enabled || !this.init() || this._musicTimer) return;
    this._musicGain = this.ctx.createGain();
    this._musicGain.gain.value = this.musicVolume * 0.25;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2200;
    this._musicGain.connect(lp);
    lp.connect(this.master);
    const melody = [N.D4, N.F4, N.A4, N.G4, N.F4, N.E4, N.D4, N.F4, N.G4, N.A4, N.C5, N.A4, N.G4, N.F4, N.E4, N.D4];
    const bass = [N.D3, N.D3, N.A3 / 2, N.A3 / 2, N.G3, N.G3, N.A3 / 2, N.D3];
    const tick = () => {
      if (!this.musicOn || !this.enabled) return;
      const s = this._step++;
      const m = melody[s % melody.length];
      if (s % 2 === 0 || s % 8 === 5) this._tone({ freq: m, dur: 0.9, type: 'triangle', gain: 0.6, dest: this._musicGain });
      if (s % 4 === 0) this._tone({ freq: bass[(s / 4) % bass.length], dur: 1.6, type: 'sine', gain: 0.8, dest: this._musicGain });
      if (s % 16 === 8) this._tone({ freq: m * 2, dur: 1.4, type: 'sine', gain: 0.25, dest: this._musicGain });
    };
    this._musicTimer = setInterval(tick, 480);
  }
  stopMusic() {
    if (this._musicTimer) clearInterval(this._musicTimer);
    this._musicTimer = null;
    if (this._musicGain) {
      try { this._musicGain.disconnect(); } catch { /* noop */ }
      this._musicGain = null;
    }
  }
}

export const sounds = new SoundEngine();
