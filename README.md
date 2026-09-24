# Algebrion — Reino das Matrizes

App web (React + Vite + Tailwind 4 + Framer Motion + Zustand) para aprender matrizes de forma interativa, em estilo Duolingo com tema medieval escuro.

## Rodar
```
npm install
npm run dev      # desenvolvimento
npm run build    # produção
```

## O que tem
- **Mapa medieval ilustrado** (tela Trilha): estrada com paradas, 8 locais (taverna, abadia, laboratório, forte, torre, caverna da forja, labirinto, castelo) e o herói viajando de um ponto ao outro.
- **História RPG** em 7 capítulos + prólogo: diálogos, escolhas que mudam falas e finais, enigmas de matrizes dentro das cenas, 7 Fragmentos da Grande Matriz e o vilão Nullus (`src/data/story.js`).
- **Lições interativas** (explica, você resolve na hora) e fases com chefes.
- 8 tipos de desafio: múltipla escolha, V/F, clicar na célula, ligar pares, ordenar passos, resposta numérica e preencher matriz (teclado numérico).
- Geradores procedurais de exercícios (nunca repetem números) usados em fases, chefes e na **Arena** infinita.
- Corações com regeneração, combo, XP/níveis, ouro, sequência diária, missões diárias, 23 glórias, loja (poções, molduras, auras, companheiros, heróis).
- **Ranking** (liga semanal, Salão da Fama, Arena) — rivais simulados + perfis locais (não há servidor).
- Personalização: 6 temas, 6 cores, tamanho de texto, partículas, movimento (completo/reduzido/desligado), 4 idiomas (pt/en/es/fr), sons e música procedurais, múltiplos perfis, exportar/importar save.

## Estrutura
`src/data` conteúdo e regras · `src/store` estado/persistência · `src/i18n` idiomas · `src/components` UI · `src/pages` telas.
