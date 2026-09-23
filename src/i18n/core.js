// Utilidades de idioma puras (sem React/estado) — usadas também pelos geradores de conteúdo.
export const L = (pt, en, es, fr) => ({ pt, en, es: es ?? en, fr: fr ?? en });

// Escolhe o texto no idioma; cai para inglês e depois português
export const loc = (obj, lang) => {
  if (obj == null) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] ?? obj.en ?? obj.pt ?? '';
};
