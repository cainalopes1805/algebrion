// Ícones dos feitiços (lucide), por nome.
import { Sparkles, Ruler, MapPin, ScrollText, Heart, Sword, ShieldCheck, Equal, Droplets, Eye, FlaskConical, Scale, Zap, WandSparkles, Layers, Merge, RotateCcw, FlipHorizontal, Gem, Moon, Infinity as InfinityIcon, Anvil, Hammer, Flame, Star, Lock, Sun, Compass, Puzzle, KeyRound, Sigma, Crown, Orbit, BookOpenCheck, Swords } from 'lucide-react';

const ICONS = { Sparkles, Ruler, MapPin, ScrollText, Heart, Sword, ShieldCheck, Equal, Droplets, Eye, FlaskConical, Scale, Zap, WandSparkles, Layers, Merge, RotateCcw, FlipHorizontal, Gem, Moon, Infinity: InfinityIcon, Anvil, Hammer, Flame, Star, Lock, Sun, Compass, Puzzle, KeyRound, Sigma, Crown, Orbit, BookOpenCheck, Swords };
export const spellIcon = (name) => ICONS[name] || Sparkles;

// cor de cada tipo de efeito
export const EFFECT_COLOR = { skip: '#e2704d', shield: '#5b9bd8', heal: '#4fbf7f', reveal: '#e6c67f' };
