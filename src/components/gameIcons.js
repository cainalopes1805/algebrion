// Ícones (lucide) compartilhados entre as telas: unidades, tipos de etapa e missões diárias.
import { Library, FlaskConical, Shield, ShieldPlus, Eye, Anvil, Waypoints, Crown, BookOpen, Swords, Skull, ScrollText, Sparkles, Castle, Target, Star, Flame, Gem, Heart, Bird, Cat, Footprints, Mountain, Crosshair, Sword, CalendarCheck, CalendarDays, Landmark, Trophy, Coins, Gift, Palette, Languages, Diamond, Orbit, HandHeart, Scale } from 'lucide-react';

export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
export const MISSION_ICON = { 1: Library, 2: FlaskConical, 3: Shield, 4: Eye, 5: Anvil, 6: Waypoints, 7: Crown };
export const missionIcon = (id) => MISSION_ICON[id] || Sparkles;
export const KIND_ICON = { concept: BookOpen, lesson: BookOpen, level: Swords, boss: Skull, story: ScrollText };
export const kindIcon = (kind) => KIND_ICON[kind] || Swords;
export const QUEST_ICON = { levels: Castle, correct: Target, xp: Star, lessons: BookOpen, arena: Swords, combo: Flame, perfect: Gem };

// Loja: consumíveis e companheiros
export const SHOP_ICON = { shield: ShieldPlus, hint: ScrollText, xpPotion: FlaskConical, heartRefill: Heart, pet_owl: Bird, pet_cat: Cat, pet_wisp: Sparkles, pet_dragon: Flame };

// Glórias (conquistas), por id
export const ACHIEVEMENT_ICON = {
  first_step: Footprints, scholar: BookOpen, bookworm: Library, flawless: Gem, combo5: Flame, combo12: Mountain,
  hundred: Target, fivehundred: Crosshair, slayer: Sword, slayer_all: Skull, streak3: CalendarCheck, streak7: CalendarDays,
  streak30: Landmark, arena10: Swords, arena50: Trophy, level5: Star, level10: Sparkles, stars: Star, rich: Coins,
  collector: Gift, stylist: Palette, polyglot: Languages, shard3: Diamond, great_matrix: Orbit, mercy: HandHeart,
  justice: Scale, grandmaster: Crown,
};
