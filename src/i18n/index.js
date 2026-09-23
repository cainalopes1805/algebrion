import { useGame } from '../store/useGame';
import { UI } from './ui';
import { loc } from './core';

export const LANGS = [
  { id: 'pt', label: 'Português', flag: '🇧🇷' },
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
];
const ORDER = ['pt', 'en', 'es', 'fr'];

export { L, loc } from './core';

// Traduz chave de UI com interpolação {nome}
export const translate = (lang, key, vars) => {
  const entry = UI[key];
  let text = entry ? entry[ORDER.indexOf(lang)] ?? entry[1] ?? entry[0] : key;
  if (vars) for (const k of Object.keys(vars)) text = text.replaceAll(`{${k}}`, vars[k]);
  return text;
};

export function useT() {
  const lang = useGame((s) => s.settings.language);
  const t = (key, vars) => translate(lang, key, vars);
  const l = (obj) => loc(obj, lang);
  return { t, l, lang };
}
