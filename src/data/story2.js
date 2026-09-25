// Cenas de cada passo do currículo: uma pequena cena antes de cada lição, com escolhas que mudam as virtudes
// da jornada (coragem, sabedoria, astúcia, compaixão), o vínculo com os aliados e o rumo do final.
// Os textos novos estão em PT e EN (ES/FR caem para EN). Tipos de passo: narr · say · choice · if · ifv · fx · summary.
import { L } from '../i18n/core';
import { MISSION_BG } from './biomes';

const N = (pt, en) => ({ t: 'narr', text: L(pt, en) });
// mood: happy | sad | surprised · em (balãozinho): alert | think | joy | love | sweat | anger · fx: flash | shake | thunder | sparks
const S = (who, pt, en, x = {}) => ({ t: 'say', who, text: L(pt, en), ...x });
const Y = (pt, en, x = {}) => S('hero', pt, en, x);
const IF = (flag, is, steps) => ({ t: 'if', flag, is, steps });
const IFV = (kind, key, min, steps) => ({ t: 'ifv', kind, key, min, steps });
const FX = (fx) => ({ t: 'fx', fx });
const OPT = (id, pt, en, extra = {}) => ({ id, text: L(pt, en), ...extra });
const CH = (key, options) => ({ t: 'choice', key, options });
const scene = (m, steps, reward = { xp: 10, gold: 5 }) => ({ bg: MISSION_BG[m], chapter: m, title: null, reward, steps });

export const CONCEPT_SCENES = {
  /* ═════════ I · Abadia dos Grimórios (Mestre Arcano) ═════════ */
  's1-1': scene(1, [
    N('Sob a Abadia dos Grimórios, o Mestre Arcano leva você a uma câmara circular. No centro, sobre um pedestal, repousa uma pequena tábua de argila cheia de runas que piscam como vaga-lumes.', 'Beneath the Abbey of Grimoires, the Arcane Master leads you to a round chamber. At its center, on a pedestal, rests a small clay tablet covered in runes that blink like fireflies.'),
    S('sage', 'Esta é a tábua mais antiga do reino, {name}. Dizem que todo feitiço, do mais humilde ao mais terrível, nasceu dela.', 'This is the oldest tablet in the realm, {name}. They say every spell, from the humblest to the most terrible, was born from it.', { em: 'think' }),
    S('sage', 'Ela não guarda palavras: guarda números, cada um em sua casinha. Antes de mexer em qualquer magia, você precisa aprender a ler esta tábua.', 'It holds no words: it holds numbers, each in its own cell. Before touching any magic, you must learn to read this tablet.'),
    CH('first_rune', [
      OPT('touch', 'Tocar uma das runas que piscam.', 'Touch one of the blinking runes.', { v: { courage: 1 }, reply: [FX('sparks'), S('sage', 'Ha! Sem medo. Mas cuidado: runa bem tratada obedece, mal tratada queima os dedos.', 'Ha! No fear. But beware: a well-treated rune obeys, a mistreated one burns fingers.', { em: 'joy' }), Y('Ai! Mas... é quentinha e faz cócegas.', 'Ouch! But... it is warm and it tickles.', { mood: 'surprised' })] }),
      OPT('watch', 'Observar a tábua em silêncio antes de tocar.', 'Watch the tablet in silence before touching.', { v: { wisdom: 1 }, b: { sage: 1 }, reply: [S('sage', 'Olhar antes de agir. É assim que se começa a ler, {name}. Poucos aprendem isso de primeira.', 'Look before acting. That is how one begins to read, {name}. Few learn that at first.', { em: 'joy' })] }),
    ]),
    S('sage', 'Primeiro segredo: cada runa mora numa casinha, e a casinha importa tanto quanto a runa. Vamos aprender a contá-las.', 'First secret: each rune lives in a cell, and the cell matters as much as the rune. Let us learn to count them.'),
  ]),
  's1-2': scene(1, [
    N('Uma corrente de ar frio atravessa o corredor. Uma página de grimório vira sozinha, e um sussurro rouco escorre pelas estantes.', 'A cold draft crosses the hall. A grimoire page turns by itself, and a hoarse whisper trickles across the shelves.'),
    S('m:ghost', 'M... N...? Quantas linhas... quantas colunas...?', 'M... N...? How many rows... how many columns...?', { fx: 'shake', em: 'alert' }),
    Y('Mestre... ouvi uma voz nas prateleiras.', 'Master... I heard a voice among the shelves.', { mood: 'surprised', em: 'alert' }),
    S('sage', 'Não se assuste. É o Espectro dos Índices. Ele esqueceu o próprio tamanho e murmura por aí, perdido na própria biblioteca.', 'Do not be afraid. It is the Specter of Indices. It forgot its own size and mutters around, lost in its own library.'),
    S('sage', 'Para ajudá-lo, precisamos dominar o selo de toda tábua: linhas por colunas. O “m por n”.', 'To help it, we must master every tablet’s seal: rows by columns. The “m by n”.'),
    IFV('virtue', 'compassion', 1, [Y('Coitado... deve ser terrível esquecer quem se é.', 'Poor thing... it must be terrible to forget who you are.', { mood: 'sad' })]),
  ]),
  's1-3': scene(1, [
    N('Nas estantes, cada livro traz uma etiqueta gravada com dois números: 1·3, 2·2, 3·1. O Mestre Arcano ajeita os óculos e aponta para a prateleira mais alta.', 'On the shelves, each book carries a label engraved with two numbers: 1·3, 2·2, 3·1. The Arcane Master adjusts his glasses and points to the highest shelf.'),
    S('sage', 'Um teste, {name}: onde mora o livro chamado a₂₃?', 'A test, {name}: where does the book called a₂₃ live?', { em: 'think' }),
    CH('address_test', [
      OPT('fast', 'Responder de imediato: “Linha 2, coluna 3!”', 'Answer at once: “Row 2, column 3!”', { v: { courage: 1 }, reply: [S('sage', 'Certeiro! Rápido e sem tremer. Só cuide para não confundir linha com coluna sob pressão.', 'Spot on! Quick and unflinching. Just do not mix up row and column under pressure.', { em: 'joy' })] }),
      OPT('ask', 'Pedir uma dica ao Mestre antes de responder.', 'Ask the Master for a hint before answering.', { v: { wisdom: 1 }, b: { sage: 1 }, reply: [S('sage', 'Perguntar não é fraqueza: é método. A dica é: linha primeiro, coluna depois.', 'Asking is not weakness: it is method. The hint: row first, column second.', { em: 'joy' })] }),
    ]),
    N('Entre duas obras, você encontra um bilhete amarelado: “a₂₃ — não me esqueçam”.', 'Between two volumes you find a yellowed note: “a₂₃ — do not forget me”.'),
  ]),
  's1-4': scene(1, [
    N('No jardim interno da Abadia, canteiros de runas crescem em fileiras perfeitas. Cada uma floresce de um jeito, segundo um padrão que só o Mestre parece enxergar.', 'In the Abbey’s inner garden, rune beds grow in perfect rows. Each blooms in its own way, following a pattern only the Master seems to see.'),
    S('sage', 'Há mil anos, uma aprendiz chamada Lina regou o jardim inteiro com uma única frase: uma lei de formação. “aᵢⱼ = i + j”.', 'A thousand years ago an apprentice named Lina watered the whole garden with a single sentence: a formation law. “aᵢⱼ = i + j”.', { em: 'joy' }),
    Y('Uma frase só... para um jardim inteiro?', 'One sentence... for an entire garden?', { mood: 'surprised' }),
    S('sage', 'Aí está o poder de uma boa fórmula: ela guarda mil respostas dentro de poucas letras.', 'There lies the power of a good formula: it holds a thousand answers inside a few letters.'),
    CH('lina', [
      OPT('copy', 'Copiar a fórmula de Lina com capricho no caderno.', 'Copy Lina’s formula carefully into the notebook.', { v: { wisdom: 1 }, reply: [S('sage', 'Letra bonita, ideia firme. Lina aprovaria.', 'Neat writing, firm idea. Lina would approve.', { em: 'love' })] }),
      OPT('play', 'Inventar variações da fórmula só de brincadeira.', 'Invent variations of the formula just for fun.', { v: { cunning: 1 }, reply: [FX('sparks'), S('sage', 'Ha! Uma cenoura brotou onde eu esperava uma rosa. Continue... mas anote o que fez!', 'Ha! A carrot sprouted where I expected a rose. Carry on... but write down what you did!', { em: 'joy' })] }),
    ]),
  ]),
  's1-5': scene(1, [
    N('A Sala das Formas guarda estátuas de pedra: uma fina e comprida, uma alta e estreita, uma de lados perfeitos, e uma retangular, esquecida num canto e coberta de pó.', 'The Hall of Shapes keeps stone statues: one thin and long, one tall and narrow, one with perfect sides, and a rectangular one, forgotten in a corner and covered in dust.'),
    S('sage', 'Linha, coluna e quadrada. Os antigos reverenciavam a quadrada como sagrada.', 'Row, column and square. The ancients revered the square one as sacred.'),
    CH('statue', [
      OPT('dust', 'Limpar o pó da estátua retangular esquecida.', 'Dust off the forgotten rectangular statue.', { v: { compassion: 1 }, b: { sage: 1 }, reply: [S('sage', 'Ninguém é esquecido numa biblioteca, {name}. Nem mesmo as retangulares.', 'Nobody is forgotten in a library, {name}. Not even the rectangular ones.', { em: 'love' })] }),
      OPT('go', 'Seguir direto para a lição, que o tempo é curto.', 'Go straight to the lesson, time is short.', { v: { cunning: 1 }, reply: [S('sage', 'Foco também é virtude. Mas guarde um cantinho da memória para as esquecidas.', 'Focus is a virtue too. But keep a corner of your memory for the forgotten ones.')] }),
    ]),
  ]),
  's1-6': scene(1, [
    N('O sol da tarde entra por dois vitrais e projeta duas trilhas de luz que se cruzam em X no piso da sala.', 'The afternoon sun enters through two stained-glass windows and casts two trails of light that cross in an X on the floor.'),
    S('sage', 'Duas diagonais. A que desce da esquerda para a direita é a principal. A que sobe, a secundária.', 'Two diagonals. The one descending left to right is the main one. The one rising is the secondary.', { em: 'think' }),
    S('m:ghost', 'Dia... go... nal...', 'Dia... go... nal...', { fx: 'flash' }),
    S('sage', 'Você ouviu? Ele está se lembrando! Cada conceito que você aprende devolve uma palavra ao Espectro.', 'Did you hear? It is remembering! Each concept you learn gives the Specter a word back.', { mood: 'happy', em: 'joy' }),
    Y('Então ele não é um inimigo... só alguém perdido.', 'So it is not an enemy... just someone lost.', { mood: 'sad' }),
    S('sage', 'Ainda assim, amanhã ele pode tentar te assustar. Perdidos podem ser perigosos.', 'Even so, tomorrow it may try to scare you. The lost can be dangerous.'),
  ]),
  's1-7': scene(1, [
    N('Numa parede, uma matriz de uns e zeros brilha em dourado: a identidade. Ao redor dela, as runas se acomodam como se estivessem em casa.', 'On a wall, a matrix of ones and zeros glows in gold: the identity. Around it, the runes settle as though they were home.'),
    S('sage', 'A identidade é o “1” das matrizes: nada altera. Foi a primeira coisa que sumiu quando Nullus quebrou a Grande Matriz.', 'The identity is the matrices’ “1”: it changes nothing. It was the first thing to vanish when Nullus broke the Great Matrix.', { mood: 'sad' }),
    CH('ask_nullus', [
      OPT('ask', 'Perguntar ao Mestre quem era Nullus antes do Zero.', 'Ask the Master who Nullus was before the Zero.', { v: { wisdom: 1 }, b: { sage: 1 }, set: { asked_nullus: true }, reply: [S('sage', 'Um jovem brilhante, {name}. Talvez o mais brilhante que já passou por aqui. É doloroso lembrar.', 'A brilliant young man, {name}. Perhaps the most brilliant to ever walk here. It hurts to remember.', { mood: 'sad' }), S('sage', 'Um dia lhe conto tudo. Hoje, foquemos em conhecer as triangulares.', 'One day I will tell you everything. Today, let us focus on the triangular ones.')] }),
      OPT('later', 'Guardar a pergunta para outro dia.', 'Save the question for another day.', { v: { cunning: 1 }, set: { asked_nullus: false }, reply: [S('sage', 'Prudente. Há perguntas que só fazem sentido quando já se tem algumas respostas.', 'Prudent. Some questions only make sense once you already have some answers.')] }),
    ]),
  ]),
  's1-8': scene(1, [
    N('Numa noite quieta, a lua ilumina o espelho d’água do claustro. Nele, uma silhueta trêmula de linhas e colunas toma forma: o Espectro dos Índices.', 'On a quiet night the moon lights the cloister’s pond. In it, a trembling silhouette of rows and columns takes shape: the Specter of Indices.'),
    S('m:ghost', 'Duas tábuas... só são iguais... se cada elemento... coincide. Como eu e meu reflexo...', 'Two tablets... are only equal... if every entry... matches. Like me and my reflection...', { em: 'think' }),
    S('sage', 'Ele está quase inteiro. Amanhã, você o enfrentará. E eu sinto que, no fundo, ele quer ser lembrado, não temido.', 'It is almost whole. Tomorrow you will face it. And I feel that, deep down, it wants to be remembered, not feared.'),
    CH('promise_ghost', [
      OPT('help', 'Prometer ao Espectro que ajudará a lembrar seu endereço.', 'Promise the Specter you will help it remember its address.', { v: { compassion: 1 }, set: { promised_ghost: true }, reply: [S('m:ghost', 'Eu... acredito. Obrigado, viajante.', 'I... believe you. Thank you, traveler.', { mood: 'happy', em: 'love' })] }),
      OPT('fight', 'Dizer que só o enfrentará se ele atacar primeiro.', 'Say you will only fight it if it strikes first.', { v: { courage: 1 }, set: { promised_ghost: false }, reply: [S('m:ghost', 'Justo... eu também tenho medo de mim.', 'Fair... I am afraid of myself too.', { em: 'sweat' })] }),
    ]),
  ]),

  /* ═════════ II · Vale da Alquimia Aditiva (Alquimista) ═════════ */
  's2-1': scene(2, [
    N('O laboratório do Vale cheira a ervas queimadas e açúcar caramelizado. Caldeirões borbulham em três cores, cada um com uma tábua de doses pendurada ao lado.', 'The Valley’s laboratory smells of burnt herbs and caramelized sugar. Cauldrons bubble in three colors, each with a dose tablet hanging beside it.'),
    S('alchemist', 'Bem-vindo, {name}! Toda poção é uma matriz de doses. Para misturar duas, somamos as doses de mesma posição. Simples e explosivo!', 'Welcome, {name}! Every potion is a matrix of doses. To mix two, we add the doses in the same position. Simple and explosive!', { em: 'joy' }),
    IF('temper', 'brave', [S('alchemist', 'Vejo coragem nesse olhar. Ótimo, vai precisar.', 'I see courage in that gaze. Good, you will need it.')]),
    CH('first_mix', [
      OPT('measure', 'Anotar cada dose antes de misturar.', 'Note every dose before mixing.', { v: { wisdom: 1 }, reply: [S('alchemist', 'Um método! A poção saiu perfeita. Raro num principiante.', 'A method! The potion came out perfect. Rare for a beginner.', { em: 'love' })] }),
      OPT('eye', 'Misturar “a olho”, confiando no instinto.', 'Mix “by eye”, trusting instinct.', { v: { courage: 1 }, b: { alchemist: 1 }, reply: [FX('shake'), S('alchemist', 'BUM! Ha ha! Sobrancelhas chamuscadas, mas espírito de alquimista. Eu adoro.', 'BOOM! Ha ha! Singed eyebrows, but an alchemist’s spirit. I love it.', { mood: 'surprised', em: 'joy' })] }),
    ]),
  ]),
  's2-2': scene(2, [
    N('Na porta do laboratório há uma placa rachada, gravada com letras chamuscadas: “SÓ SE SOMA O QUE TEM O MESMO TAMANHO”.', 'On the laboratory door hangs a cracked sign carved with singed letters: “ONLY EQUAL SIZES MAY BE ADDED”.'),
    Y('Essa placa parece ter uma história.', 'That sign looks like it has a story.', { em: 'think' }),
    S('alchemist', 'Tem. Um aprendiz somou uma tábua 2 × 3 com uma 3 × 2. Sobraram casinhas sem par. O lado esquerdo do laboratório ainda não voltou ao lugar.', 'It does. An apprentice added a 2 × 3 tablet to a 3 × 2. Cells were left without partners. The lab’s left wall still has not come back.', { fx: 'shake' }),
    Y('E o aprendiz?', 'And the apprentice?', { mood: 'surprised', em: 'alert' }),
    S('alchemist', 'Sou eu. Por isso hoje só somo o que tem o mesmo tamanho. Ha ha!', 'That is me. That is why today I only add what has the same size. Ha ha!', { em: 'joy' }),
  ]),
  's2-3': scene(2, [
    N('Numa prateleira alta há dois frascos idênticos, um rotulado “A” e outro “−A”. Entre eles, uma etiqueta: “nunca mexer, a menos que precise”.', 'On a high shelf sit two identical flasks, one labeled “A” and the other “−A”. Between them a tag: “never touch, unless you must”.'),
    S('alchemist', 'Todo veneno tem antídoto: a oposta. Some uma poção à sua oposta e obtém a poção nula, o silêncio. Guardo esse par para emergências.', 'Every poison has an antidote: the opposite. Add a potion to its opposite and you get the null potion, silence. I keep this pair for emergencies.'),
    S('m:slime', 'Glub... glub...', 'Glub... glub...', { em: 'alert' }),
    S('alchemist', 'Ah, a gosma do porão acordou. Tenho um antídoto de sobra, {name}. Fique com ele ou venda no mercado: é você quem decide.', 'Ah, the cellar slime woke up. I have a spare antidote, {name}. Keep it or sell it at the market: your call.'),
    CH('antidote', [
      OPT('keep', 'Guardar o antídoto para uma emergência.', 'Keep the antidote for an emergency.', { v: { wisdom: 1 }, reward: { items: { hint: 1 } }, reply: [S('alchemist', 'Sábio. Ele rende mais como pergaminho de dica do que como ouro.', 'Wise. It yields more as a hint scroll than as gold.')] }),
      OPT('sell', 'Vender o antídoto por umas moedas.', 'Sell the antidote for some coins.', { v: { cunning: 1 }, reward: { gold: 20 }, reply: [S('alchemist', 'Ha! Negociante. Tudo bem, o ouro também compra remédios.', 'Ha! A dealer. Fine, gold buys remedies too.', { em: 'joy' })] }),
    ]),
  ]),
  's2-4': scene(2, [
    N('Numa estante escondida, atrás de um caldeirão, o Vale guarda uma pedra lisa com quatro regras gravadas. É a Pedra dos Grão-Alquimistas.', 'On a hidden shelf behind a cauldron, the Valley keeps a smooth stone engraved with four rules. It is the Stone of the Grand Alchemists.'),
    S('alchemist', 'Trocar a ordem das poções não muda nada. Agrupá-las como quiser também não. A poção vazia não altera. E cada poção se anula com sua oposta.', 'Swapping the order of potions changes nothing. Grouping them as you please neither. The empty potion alters nothing. And each potion cancels with its opposite.'),
    Y('Parece que a soma de matrizes é bem comportada.', 'It seems matrix addition is well behaved.', { em: 'think' }),
    S('alchemist', 'A soma sim. Já a subtração... é como um gato: às vezes muda de lado e faz um estrago!', 'Addition, yes. Subtraction... is like a cat: sometimes it changes sides and makes a mess!', { em: 'joy' }),
  ]),
  's2-5': scene(2, [
    N('O alquimista revira frascos, gavetas e bolsos. A ponta do bigode faísca de nervosismo.', 'The alchemist rummages through flasks, drawers and pockets. The tip of his mustache sparks with nerves.'),
    S('alchemist', 'Perdi uma dose! Sei o total da poção e sei o que já pus, mas falta uma essência. Preciso descobrir X.', 'I lost a dose! I know the potion’s total and what I already added, but one essence is missing. I need to find X.', { mood: 'sad', em: 'sweat' }),
    Y('Se X + A = B, então X = B − A. Dá para descobrir sem procurar.', 'If X + A = B, then X = B − A. We can find it without searching.', { em: 'think' }),
    S('alchemist', 'Brilhante! Mas a essência de verdade custa dez moedas na loja do vale. Você ajuda um velho alquimista?', 'Brilliant! But the real essence costs ten coins at the Valley shop. Will you help an old alchemist?', { em: 'joy' }),
    CH('essence', [
      OPT('pay', 'Ajudar com dez moedas.', 'Help with ten coins.', { needGold: 10, v: { compassion: 1 }, b: { alchemist: 1 }, reward: { gold: -10 }, reply: [S('alchemist', 'Não esquecerei isso, {name}. Um alquimista paga suas dívidas... geralmente.', 'I will not forget this, {name}. An alchemist pays his debts... usually.', { em: 'love' })] }),
      OPT('teach', 'Ensinar o método e deixá-lo procurar sozinho.', 'Teach the method and let him search alone.', { v: { wisdom: 1 }, reply: [S('alchemist', 'Justo. Ensinar a pescar, hein? Vou anotar no meu caderno.', 'Fair. Teach how to fish, eh? I will write it in my notebook.')] }),
    ]),
  ]),

  /* ═════════ III · Forte dos Escalares (General Vetor) ═════════ */
  's3-1': scene(3, [
    N('No pátio do Forte, esquadrões marcham em fileiras tão retas que parecem desenhadas com régua. O General Vetor observa de braços cruzados, com uma cicatriz sob o olho esquerdo.', 'In the Stronghold’s courtyard squads march in rows so straight they look drawn with a ruler. General Vector watches with folded arms, a scar beneath his left eye.'),
    S('general', 'Recruta! Um escalar amplifica uma tropa sem mudar sua forma. Multiplique cada soldado por k e a tropa cresce em poder.', 'Recruit! A scalar amplifies a troop without changing its shape. Multiply every soldier by k and the troop grows in power.', { em: 'alert' }),
    CH('amplify', [
      OPT('double', 'Sugerir dobrar a guarda da muralha (k = 2).', 'Suggest doubling the wall guard (k = 2).', { v: { wisdom: 1 }, reply: [S('general', 'Cauteloso. Duas vezes mais olhos, duas vezes menos surpresas.', 'Cautious. Twice the eyes, half the surprises.')] }),
      OPT('triple', 'Sugerir triplicar a guarda da muralha (k = 3).', 'Suggest tripling the wall guard (k = 3).', { v: { courage: 1 }, b: { general: 1 }, reply: [S('general', 'Ha! Ousado! Sem meios-termos. Gosto disso.', 'Ha! Bold! No half-measures. I like that.', { em: 'joy' })] }),
    ]),
  ]),
  's3-2': scene(3, [
    N('Numa ala do Forte, o General para diante de uma fileira de armaduras vazias. O silêncio pesa.', 'In one wing of the Stronghold, the General stops before a row of empty armors. The silence weighs.'),
    S('general', 'Três escalares valem uma vida inteira de estudo: zero apaga, um mantém, menos um inverte.', 'Three scalars are worth a lifetime of study: zero erases, one keeps, minus one flips.', { em: 'think' }),
    S('general', 'Meus soldados foram multiplicados por zero. Só ficaram as sombras.', 'My soldiers were multiplied by zero. Only shadows remain.', { mood: 'sad', fx: 'shake' }),
    CH('shadows', [
      OPT('honor', 'Prestar homenagem às sombras dos soldados.', 'Pay tribute to the soldiers’ shadows.', { v: { compassion: 1 }, b: { general: 1 }, reply: [N('Você inclina a cabeça. As armaduras vazias rangem, como se agradecessem.', 'You bow your head. The empty armors creak, as if in thanks.'), S('general', 'Obrigado, {name}. Isso... isso significa muito.', 'Thank you, {name}. That... that means a lot.', { mood: 'sad', em: 'love' })] }),
      OPT('vow', 'Jurar que fará o Golem pagar por isso.', 'Vow to make the Golem pay for this.', { v: { courage: 1 }, reply: [S('general', 'Juramento aceito. Guarde a raiva para a hora certa: batalha com raiva erra as contas.', 'Vow accepted. Save the rage for the right time: fighting angry misses the sums.', { em: 'anger' })] }),
    ]),
  ]),
  's3-3': scene(3, [
    N('Na sala de estratégia, um mapa enorme está coberto por peças de madeira: infantaria, arqueiros, cavaleiros. O General mede tudo com uma vara.', 'In the strategy room a huge map is covered with wooden pieces: infantry, archers, knights. The General measures everything with a rod.'),
    S('general', 'Uma boa estratégia vale por duas: dá no mesmo amplificar duas tropas juntas ou amplificar cada uma e reuni-las. O escalar se distribui.', 'A good strategy is worth two: it makes no difference to amplify two troops together or to amplify each one and join them. The scalar distributes.'),
    Y('Então posso reorganizar antes ou depois de amplificar, e o resultado é o mesmo.', 'So I can reorganize before or after amplifying, and the result is the same.', { em: 'think' }),
    S('general', 'Exato! Isso economiza o tempo que a guerra não perdoa.', 'Exactly! That saves the time war never forgives.', { em: 'joy' }),
    IFV('virtue', 'wisdom', 2, [S('general', 'Você raciocina como estrategista. Está ficando perigoso.', 'You reason like a strategist. You are becoming dangerous.', { em: 'joy' })]),
  ]),
  's3-4': scene(3, [
    N('O treino do amanhecer: o General mistura esquadrões em proporções exatas, com o cuidado de um cozinheiro.', 'Dawn training: the General blends squads in exact proportions, with a cook’s care.'),
    S('general', 'Duas partes de A e três de B: uma combinação linear. Escolha a formação de hoje, recruta.', 'Two parts of A and three of B: a linear combination. Choose today’s formation, recruit.'),
    CH('formation', [
      OPT('balanced', 'Arqueiros e escudeiros em proporção 2:3, equilibrada.', 'Archers and shieldmen in a 2:3 ratio, balanced.', { v: { wisdom: 1 }, set: { formation: 'balanced' }, reply: [S('general', 'Defesa sólida com alcance. Um clássico.', 'Solid defense with reach. A classic.')] }),
      OPT('bold', 'Cavaleiros e magos em proporção 3:1, ousada.', 'Knights and mages in a 3:1 ratio, bold.', { v: { courage: 1 }, set: { formation: 'bold' }, reply: [S('general', 'Um golpe rápido e brilhante. Arriscado... mas eu já fui jovem também.', 'A swift, brilliant strike. Risky... but I was young once too.', { em: 'joy' })] }),
    ]),
  ]),
  's3-5': scene(3, [
    N('Um dos esquadrões foi amplificado por engano, e agora ninguém se lembra do tamanho original. Os soldados estão desconfortáveis, apertados nas armaduras.', 'One of the squads was amplified by mistake and now nobody remembers the original size. The soldiers are uncomfortable, squeezed into their armor.'),
    S('general', 'Se 2X = A e conheço A, basta dividir por 2 para devolver o esquadrão ao normal. Mas hoje não consigo fazer as contas. Minha cabeça está no Golem.', 'If 2X = A and I know A, dividing by 2 brings the squad back to normal. But today I cannot do the math. My head is on the Golem.', { mood: 'sad', em: 'sweat' }),
    CH('command', [
      OPT('lead', 'Assumir o comando do treino de hoje.', 'Take command of today’s training.', { v: { courage: 1 }, b: { general: 1 }, reply: [S('general', 'Recruta no comando? Ha! Vá em frente, {name}. Eu observo.', 'A recruit in command? Ha! Go ahead, {name}. I will watch.', { em: 'joy' })] }),
      OPT('follow', 'Pedir que o General lidere e observar com atenção.', 'Ask the General to lead and watch closely.', { v: { wisdom: 1 }, reply: [S('general', 'Boa. Aprender vendo também é treino.', 'Good. Learning by watching is training too.')] }),
    ]),
  ]),

  /* ═════════ IV · Torre dos Espelhos (Speculum) ═════════ */
  's4-1': scene(4, [
    N('A Torre dos Espelhos cintila por dentro: mil superfícies refletem mil versões de você, algumas sorrindo, outras sérias, uma ou duas de cabeça para baixo.', 'The Tower of Mirrors glitters inside: a thousand surfaces reflect a thousand versions of you, some smiling, some grave, one or two upside down.'),
    S('witch', 'Bem-vindo à minha torre, {name}. Cada reflexo é uma transposta: linhas viram colunas, e a ordem se inverte.', 'Welcome to my tower, {name}. Each reflection is a transpose: rows become columns, and the order flips.', { em: 'think' }),
    CH('mirror_gaze', [
      OPT('stare', 'Encarar o espelho central sem piscar.', 'Stare into the central mirror without blinking.', { v: { courage: 1 }, reply: [FX('flash'), S('witch', 'Poucos aguentam. Ele viu você por inteiro... e você continua aqui.', 'Few endure it. It saw all of you... and you are still here.', { em: 'joy' })] }),
      OPT('avert', 'Desviar o olhar e estudar as molduras.', 'Look away and study the frames.', { v: { wisdom: 1 }, reply: [S('witch', 'Modéstia útil: a moldura ensina tanto quanto o vidro.', 'Useful modesty: the frame teaches as much as the glass.')] }),
    ]),
  ]),
  's4-2': scene(4, [
    N('Os espelhos vibram baixinho. Nos reflexos, você vê os mesmos gestos, mas dispostos numa ordem diferente: o que era linha virou coluna.', 'The mirrors hum softly. In the reflections you see the same gestures, but arranged differently: what was a row became a column.'),
    S('witch', 'Trocar o endereço i por j: é só isso o segredo. Simples, e ao mesmo tempo muito poderoso.', 'Swapping the address i for j: that is the whole secret. Simple, and yet very powerful.'),
    S('witch', 'Meu antigo aprendiz dizia que um espelho mostrava a verdade. Ele estava certo... e esse foi o problema.', 'My former apprentice used to say a mirror showed the truth. He was right... and that was the problem.', { mood: 'sad', fx: 'shake' }),
    CH('apprentice', [
      OPT('ask', 'Perguntar delicadamente sobre esse aprendiz.', 'Gently ask about that apprentice.', { v: { compassion: 1 }, b: { witch: 1 }, reply: [S('witch', 'Um dia lhe conto. Hoje, saber que perguntou já me faz bem.', 'One day I will tell you. Today, knowing you asked already does me good.', { mood: 'sad', em: 'love' })] }),
      OPT('respect', 'Respeitar o silêncio e seguir com a lição.', 'Respect the silence and continue the lesson.', { v: { wisdom: 1 }, reply: [S('witch', 'Há uma sabedoria em não perguntar. Obrigada.', 'There is wisdom in not asking. Thank you.')] }),
    ]),
  ]),
  's4-3': scene(4, [
    N('No topo da torre, um morcego de vidro colorido pende do teto, batendo as asas devagar, refletindo a lua dos dois lados ao mesmo tempo.', 'At the tower’s top, a bat of colored glass hangs from the ceiling, flapping slowly, reflecting the moon on both sides at once.'),
    S('m:bat', 'Refletir... refletir... e refletir de novo...', 'Reflect... reflect... and reflect again...', { em: 'alert' }),
    S('witch', 'Não se preocupe. Ele repete as leis do espelho: refletir duas vezes devolve o original, a soma passa pelo reflexo, e o escalar também.', 'Do not worry. It recites the mirror’s laws: reflecting twice returns the original, the sum passes through the reflection, and so does the scalar.'),
    Y('Ele parece esperar que a gente repita junto.', 'It seems to expect us to chant along.', { em: 'think' }),
    S('witch', 'Repita junto, sim. Assim as leis ficam gravadas.', 'Chant along, yes. That is how the laws stay engraved.', { em: 'joy' }),
  ]),
  's4-4': scene(4, [
    N('Na sala mais silenciosa da torre, uma tábua simétrica paira no ar. Girada, refletida, virada: continua igual.', 'In the tower’s quietest room, a symmetrical tablet floats in the air. Turned, reflected, flipped: it stays the same.'),
    S('witch', 'A matriz simétrica é o equilíbrio perfeito: Aᵀ = A. Muitos feitiços de proteção se apoiam nela.', 'The symmetric matrix is perfect balance: Aᵀ = A. Many protective spells rely on it.'),
    S('witch', 'Quero lhe dar um presente, {name}: um pequeno orbe espelhado.', 'I want to give you a gift, {name}: a small mirrored orb.', { em: 'love' }),
    CH('orb', [
      OPT('accept', 'Aceitar o orbe espelhado.', 'Accept the mirrored orb.', { v: { wisdom: 1 }, reward: { items: { hint: 1 } }, reply: [S('witch', 'Que ele lhe mostre o que os olhos não veem.', 'May it show you what eyes cannot see.')] }),
      OPT('refuse', 'Recusar com humildade: ainda não merece.', 'Refuse humbly: you do not deserve it yet.', { v: { compassion: 1 }, b: { witch: 1 }, reply: [S('witch', 'Humildade rara. Guardarei o orbe até você merecer... e você vai merecer.', 'Rare humility. I will keep the orb until you deserve it... and you will.', { em: 'love' })] }),
    ]),
  ]),

  /* ═════════ V · Forja da Multiplicação (Brogar) ═════════ */
  's5-1': scene(5, [
    N('O calor da Forja bate no rosto como um punho. Fagulhas voam de uma bigorna gigante, e o Anão-Mestre Brogar ergue o martelo sem sequer olhar para você.', 'The Forge’s heat hits your face like a fist. Sparks fly from a giant anvil, and Master Brogar raises his hammer without even looking at you.'),
    S('dwarf', 'Só se malham dois metais se as bordas encaixam. Só se multiplicam duas tábuas se as colunas de A forem tantas quanto as linhas de B.', 'Two metals can only be hammered if their edges fit. Two tablets can only be multiplied if A’s columns equal B’s rows.', { em: 'alert' }),
    CH('first_strike', [
      OPT('hit', 'Bater no metal com toda a força.', 'Hit the metal with all your strength.', { v: { courage: 1 }, reply: [FX('sparks'), S('dwarf', 'Hah! Sem técnica, mas com vontade. Isso se corrige.', 'Hah! No technique, but plenty of will. That can be fixed.', { em: 'joy' })] }),
      OPT('measure', 'Medir o encaixe antes de golpear.', 'Measure the fit before striking.', { v: { wisdom: 1 }, b: { dwarf: 1 }, reply: [S('dwarf', 'Hm! Medir antes de bater. O martelo agradece.', 'Hm! Measure before striking. The hammer thanks you.', { em: 'love' })] }),
    ]),
  ]),
  's5-2': scene(5, [
    N('Um jovem aprendiz de ferreiro tenta erguer um balde de carvão. Está vermelho de esforço, e o balde ainda nem saiu do chão.', 'A young smith’s apprentice tries to lift a bucket of coal. He is red from effort, and the bucket has not left the floor.'),
    S('dwarf', 'Cada golpe do martelo bate uma linha de A contra uma coluna de B. Multiplica os pares e soma. Assim se forja cada elemento.', 'Each hammer blow strikes a row of A against a column of B. Multiply the pairs and add. That is how each entry is forged.'),
    CH('apprentice_coal', [
      OPT('help', 'Ajudar o aprendiz a carregar o carvão.', 'Help the apprentice carry the coal.', { v: { compassion: 1 }, b: { dwarf: 1 }, reply: [S('dwarf', 'Quem carrega carvão de um novato merece o meu respeito. E o meu jantar.', 'Whoever carries a novice’s coal earns my respect. And my dinner.', { em: 'joy' })] }),
      OPT('watch', 'Deixá-lo tentar sozinho: precisa aprender.', 'Let him try alone: he needs to learn.', { v: { cunning: 1 }, reply: [S('dwarf', 'Duro, mas justo. Foi assim que eu aprendi.', 'Harsh, but fair. That is how I learned.')] }),
    ]),
  ]),
  's5-3': scene(5, [
    N('Numa bancada, Brogar alinha um vetor de metal, fino como uma vareta, e o golpeia com uma matriz inteira de martelinhos.', 'On a workbench, Brogar lines up a metal vector, thin as a rod, and strikes it with a whole matrix of little hammers.'),
    S('dwarf', 'Matriz vezes vetor: cada linha bate na coluna uma vez, e sai uma coluna nova. Golpe em cadeia!', 'Matrix times vector: each row strikes the column once, and a new column comes out. A chain strike!', { fx: 'sparks' }),
    Y('Um golpe por linha. Faz sentido.', 'One strike per row. That makes sense.', { em: 'think' }),
    S('dwarf', 'Claro que faz. A Forja é a coisa mais lógica do mundo, garoto. Só o fogo é temperamental.', 'Of course it does. The Forge is the most logical thing in the world, lad. Only the fire is temperamental.', { em: 'joy' }),
  ]),
  's5-4': scene(5, [
    N('Numa prateleira, uma lâmina antiga brilha como se tivesse acabado de nascer. Cada fio dela parece feito de linhas e colunas trançadas.', 'On a shelf, an ancient blade shines as if it had just been born. Every strand of it seems made of interwoven rows and columns.'),
    S('dwarf', 'Essa foi minha obra-prima: um produto de matrizes completo, célula por célula. Levei três semanas.', 'That was my masterpiece: a full matrix product, cell by cell. It took me three weeks.', { em: 'love' }),
    S('dwarf', 'Quer uma lâmina sua? Simples, de graça. Ou com cabo ornamentado, por vinte moedas.', 'Want a blade of your own? Plain, free. Or with an ornate hilt, for twenty coins.'),
    CH('blade', [
      OPT('plain', 'Uma lâmina simples, sem enfeites.', 'A plain blade, no frills.', { v: { wisdom: 1 }, reply: [S('dwarf', 'Simples e certeira. O melhor aço é o que faz seu trabalho.', 'Plain and true. The best steel is the kind that does its job.')] }),
      OPT('ornate', 'Um cabo ornamentado, por vinte moedas.', 'An ornate hilt, for twenty coins.', { needGold: 20, v: { cunning: 1 }, b: { dwarf: 1 }, reward: { gold: -20, items: { xpPotion: 1 } }, reply: [S('dwarf', 'Bom gosto! E uma poção de brinde, porque hoje estou de bom humor.', 'Good taste! And a potion as a bonus, because I am in a good mood today.', { em: 'joy' })] }),
    ]),
  ]),
  's5-5': scene(5, [
    N('Nas paredes da Forja há dois martelos pendurados, um ao lado do outro: um de cabeça larga, outro de cabeça fina.', 'On the Forge’s walls two hammers hang side by side: one wide-headed, the other thin-headed.'),
    S('dwarf', 'Uma vez, dois aprendizes brigaram: um dizia que bater e depois limar era o mesmo que limar e depois bater. Adivinha quem tinha razão?', 'Once, two apprentices argued: one said striking then filing was the same as filing then striking. Guess who was right?'),
    Y('Nenhum dos dois. A ordem importa.', 'Neither. Order matters.', { em: 'think' }),
    S('dwarf', 'Hah! Como as matrizes: A·B quase nunca é B·A. A ordem do golpe é lei na Forja.', 'Hah! Like matrices: A·B is almost never B·A. The order of the blow is law in the Forge.', { em: 'joy' }),
  ]),
  's5-6': scene(5, [
    N('Um rugido grave atravessa as paredes. A bigorna treme. Do fundo da caverna, brasas vermelhas piscam como olhos.', 'A deep roar crosses the walls. The anvil trembles. From the cavern’s depth, red embers blink like eyes.'),
    S('dwarf', 'O Dragão da Forja. O Zero prometeu tesouros a ele se guardasse esta caverna. Ele acreditou.', 'The Forge Dragon. The Zero promised it treasure if it guarded this cavern. It believed.', { fx: 'shake', mood: 'sad' }),
    S('dwarf', 'A identidade é o metal neutro: não altera outro metal. Talvez, se ele fosse neutro comigo, eu o convencesse... mas duvido.', 'The identity is the neutral metal: it changes no other. Perhaps, if it were neutral to me, I could persuade it... but I doubt it.'),
    CH('dragon_plan', [
      OPT('mercy', 'Tentar poupar o dragão, se for possível.', 'Try to spare the dragon, if possible.', { v: { compassion: 1 }, set: { dragon_mercy: true }, reply: [S('dwarf', 'Gentil. Mas dragões não perdoam facilmente. Esteja pronto.', 'Kind. But dragons do not forgive easily. Be ready.')] }),
      OPT('fight', 'Preparar-se para o combate sem hesitar.', 'Prepare for battle without hesitation.', { v: { courage: 1 }, set: { dragon_mercy: false }, b: { dwarf: 1 }, reply: [S('dwarf', 'É o que se faz na Forja: encarar o fogo de frente.', 'That is what one does in the Forge: face the fire head on.', { em: 'joy' })] }),
    ]),
  ]),

  /* ═════════ VI · Labirinto dos Determinantes (Oráculo) ═════════ */
  's6-1': scene(6, [
    N('As paredes do Labirinto são feitas de números que mudam a cada passo. O ar cheira a poeira antiga e tinta fresca. Uma figura de capuz verde-água espera na entrada.', 'The Labyrinth’s walls are made of numbers that change with every step. The air smells of ancient dust and fresh ink. A figure in a sea-green hood waits at the entrance.'),
    S('oracle', 'Toda tábua quadrada esconde um número que revela sua alma: o determinante. Se a alma é nula, o caminho está fechado.', 'Every square tablet hides a number that reveals its soul: the determinant. If the soul is null, the path is shut.', { em: 'think' }),
    S('oracle', 'Posso lhe emprestar minha lente. Ela mostra o que o determinante fará, antes de você calcular. Mas quem depende dela esquece de pensar.', 'I can lend you my lens. It shows what the determinant will do before you compute it. But whoever relies on it forgets how to think.'),
    CH('lens', [
      OPT('lens', 'Aceitar a lente do oráculo.', 'Accept the oracle’s lens.', { v: { wisdom: 1 }, b: { oracle: 1 }, reply: [S('oracle', 'Use-a como apoio, não como muleta. Quem entende a fórmula enxerga mais longe.', 'Use it as support, not as a crutch. Whoever understands the formula sees further.')] }),
      OPT('instinct', 'Recusar e confiar no próprio instinto.', 'Refuse and trust your own instinct.', { v: { courage: 1 }, reply: [S('oracle', 'Corajoso. O Labirinto adora quem confia em si... até ele cobrar o preço.', 'Brave. The Labyrinth loves those who trust themselves... until it collects its price.', { em: 'joy' })] }),
    ]),
  ]),
  's6-2': scene(6, [
    N('Num corredor, três diagonais douradas descem pela parede e três outras sobem, cruzando-se. Alguém desenhou setas coloridas no chão para guiar os passos.', 'In a corridor, three golden diagonals descend the wall and three more rise, crossing. Someone drew colored arrows on the floor to guide the steps.'),
    S('oracle', 'Um estudioso chamado Sarrus desenhou este truque: repetir as duas primeiras colunas ao lado da matriz. Assim as diagonais surgem à vista.', 'A scholar named Sarrus drew this trick: repeat the first two columns beside the matrix. That way the diagonals appear in plain sight.'),
    Y('Três para baixo, somando. Três para cima, subtraindo.', 'Three down, adding. Three up, subtracting.', { em: 'think' }),
    S('oracle', 'Exato. Mas cuidado: as paredes do Labirinto não perdoam um sinal errado.', 'Exactly. But careful: the Labyrinth’s walls do not forgive a wrong sign.', { fx: 'shake' }),
  ]),
  's6-3': scene(6, [
    N('Fios de teia brilhante atravessam o corredor. Uma sombra de oito patas se move lentamente ao fundo, contando cada fio.', 'Threads of shining web cross the corridor. An eight-legged shadow moves slowly in the depths, counting every strand.'),
    S('oracle', 'As paredes obedecem a regras: linha nula mata o determinante, duas linhas iguais também, e trocar duas linhas inverte o sinal.', 'The walls obey rules: a null row kills the determinant, two equal rows too, and swapping two rows flips the sign.'),
    S('m:spider', 'Cada fio... um zero...', 'Each thread... a zero...', { em: 'alert' }),
    CH('webs', [
      OPT('cut', 'Cortar as teias que bloqueiam o caminho.', 'Cut the webs blocking the way.', { v: { courage: 1 }, reply: [FX('sparks'), S('oracle', 'Direto. As teias se refazem, mas o caminho está livre por hoje.', 'Direct. The webs regrow, but the path is clear for today.')] }),
      OPT('around', 'Contornar sem destruir nada.', 'Go around without destroying anything.', { v: { compassion: 1 }, reply: [S('oracle', 'Você poupa até as teias. Que cuidado raro.', 'You spare even the webs. What rare care.', { em: 'love' })] }),
    ]),
  ]),
  's6-4': scene(6, [
    N('O corredor termina em duas portas iguais, uma de ferro fosco e outra de madeira quente. Uma delas abre, a outra é só parede pintada.', 'The corridor ends in two identical doors, one of matte iron and another of warm wood. One opens, the other is only a painted wall.'),
    S('oracle', 'Determinante zero é parede. Diferente de zero é porta. Só quem calcula sabe o que é o quê.', 'Zero determinant is a wall. Nonzero is a door. Only those who compute know which is which.'),
    S('oracle', 'Nullus, Speculum e eu fomos três discípulos do mesmo mestre. Ele perdeu alguém por um erro impossível de desfazer. Desde então, só vê paredes.', 'Nullus, Speculum and I were three disciples of the same master. He lost someone to an error that could not be undone. Since then he sees only walls.', { mood: 'sad' }),
    CH('nullus_view', [
      OPT('understand', 'Dizer que a dor dele merece ser compreendida.', 'Say his pain deserves to be understood.', { v: { compassion: 1 }, b: { oracle: 1 }, reply: [S('oracle', 'Você fala como alguém que perdeu algo também. Ou como alguém que se importa.', 'You speak like someone who lost something too. Or like someone who cares.', { mood: 'sad', em: 'love' })] }),
      OPT('resolve', 'Dizer que a dor não justifica apagar o mundo.', 'Say that pain does not justify erasing the world.', { v: { courage: 1 }, reply: [S('oracle', 'Verdade dura. Talvez a única que ele ainda não ouviu de ninguém.', 'A hard truth. Perhaps the only one he has not yet heard from anyone.')] }),
    ]),
  ]),
  's6-5': scene(6, [
    N('No centro do Labirinto, uma matriz gigante paira no ar, com um x brilhando numa das casas. O x muda de cor a cada segundo.', 'At the Labyrinth’s center, a giant matrix floats in the air, with an x glowing in one of its cells. The x changes color every second.'),
    S('oracle', 'Para que valor de x a porta vira parede? Escreva o determinante em função de x e iguale a zero.', 'For which value of x does the door become a wall? Write the determinant in terms of x and set it to zero.', { em: 'think' }),
    CH('bet', [
      OPT('bet', 'Aceitar a aposta: responder sem dicas.', 'Accept the bet: answer without hints.', { v: { cunning: 1 }, b: { oracle: 1 }, set: { oracle_bet: true }, reply: [S('oracle', 'Ha! Gosto de quem aposta. O Labirinto também.', 'Ha! I like those who bet. So does the Labyrinth.', { em: 'joy' })] }),
      OPT('safe', 'Pedir a ajuda do caderno de dicas.', 'Ask for help from the hint notebook.', { v: { wisdom: 1 }, set: { oracle_bet: false }, reply: [S('oracle', 'Prudente. A pressa faz mais vítimas que qualquer monstro.', 'Prudent. Haste claims more victims than any monster.')] }),
    ]),
  ]),

  /* ═════════ VII · Trono da Inversa (Rainha Invera) ═════════ */
  's7-1': scene(7, [
    N('As portas do Trono se abrem sozinhas. Colunas de mármore refletem uma luz rosada, e no alto, uma sombra prateada observa em silêncio: Nullus, ou o que resta dele.', 'The Throne’s doors open by themselves. Marble columns reflect a rosy light, and above, a silvery shadow watches in silence: Nullus, or what remains of him.'),
    S('queen', 'Bem-vindo, {name}. A matriz inversa desfaz um feitiço: A · A⁻¹ = I. É o contra-feitiço definitivo. Mas só existe para quem merece ser desfeito.', 'Welcome, {name}. The inverse matrix undoes a spell: A · A⁻¹ = I. It is the ultimate counter-spell. But it exists only for those who deserve to be undone.', { em: 'think' }),
    CH('queen_past', [
      OPT('ask', 'Perguntar à Rainha sobre o passado dela com Nullus.', 'Ask the Queen about her past with Nullus.', { v: { compassion: 1 }, b: { queen: 1 }, set: { asked_queen: true }, reply: [S('queen', 'Ele foi meu mago da corte. E meu amigo. Nunca percebi o quanto sofria.', 'He was my court mage. And my friend. I never realized how much he suffered.', { mood: 'sad' })] }),
      OPT('focus', 'Focar na missão, sem desviar.', 'Focus on the mission, without straying.', { v: { courage: 1 }, set: { asked_queen: false }, reply: [S('queen', 'Foco. Então prossigamos, que o tempo é escasso.', 'Focus. Then let us continue, for time is short.')] }),
    ]),
  ]),
  's7-2': scene(7, [
    N('O salão do Trono se enche de passos. Alguém entra atrás de você, depois outro, depois mais um. Você não está sozinho.', 'The Throne hall fills with footsteps. Someone enters behind you, then another, then another. You are not alone.'),
    S('queen', 'A inversa só existe se o determinante for diferente de zero. Antes de tentar desfazer, saiba se é possível.', 'The inverse exists only if the determinant is nonzero. Before trying to undo, know whether it is possible.'),
    IFV('bond', 'sage', 2, [S('sage', 'Eu não perderia isso por nada, {name}. Continue: estou com você.', 'I would not miss this for anything, {name}. Carry on: I am with you.', { em: 'love' })]),
    IFV('bond', 'alchemist', 2, [S('alchemist', 'Trouxe poções de sobra. Quem sabe precisamos!', 'I brought spare potions. Who knows, we might need them!', { em: 'joy' })]),
    IFV('bond', 'general', 2, [S('general', 'Meus soldados também estão aqui, nas sombras. Não ficaremos de fora.', 'My soldiers are here too, in the shadows. We will not stay out of it.', { em: 'joy' })]),
    IFV('bond', 'witch', 2, [S('witch', 'Os espelhos me mostraram que você precisaria de nós.', 'The mirrors showed me you would need us.', { em: 'think' })]),
    IFV('bond', 'dwarf', 2, [S('dwarf', 'Forjei algo no caminho. Você vai precisar, garoto.', 'I forged something on the way. You will need it, lad.', { em: 'joy' })]),
    IFV('bond', 'oracle', 2, [S('oracle', 'Vim ver se minhas previsões estavam certas. Espero que não.', 'I came to see whether my predictions were right. I hope not.', { em: 'think' })]),
    N('Quem estiver do seu lado, é por escolha dele. Isso é o que as suas decisões construíram.', 'Whoever stands beside you does so by their own choice. That is what your decisions built.'),
  ]),
  's7-3': scene(7, [
    N('A Rainha traça no ar a fórmula da inversa 2 × 2: troca de lugar dois números, muda o sinal de outros dois, divide tudo pelo determinante.', 'The Queen traces the 2 × 2 inverse formula in the air: swap two numbers, flip the signs of two others, divide everything by the determinant.'),
    S('queen', 'Três gestos, um contra-feitiço perfeito. Mas cuidado com a divisão: o determinante precisa ser diferente de zero.', 'Three gestures, one perfect counter-spell. But mind the division: the determinant must be nonzero.'),
    CH('trust_queen', [
      OPT('trust', 'Confiar na Rainha e seguir a fórmula.', 'Trust the Queen and follow the formula.', { v: { compassion: 1 }, b: { queen: 1 }, reply: [S('queen', 'Confiança não é ingenuidade quando se confere o que se recebe. Mas obrigada.', 'Trust is not naivety when you verify what you are given. But thank you.', { em: 'love' })] }),
      OPT('verify', 'Pedir para verificar a fórmula por conta própria.', 'Ask to verify the formula on your own.', { v: { wisdom: 1 }, reply: [S('queen', 'Sensato. Verificar é o que separa mago de fanático.', 'Sensible. Verifying is what separates a mage from a fanatic.')] }),
    ]),
  ]),
  's7-4': scene(7, [
    N('Uma voz calma e fria ecoa do alto, sem fúria: é Nullus, observando as duas matrizes na mão da Rainha.', 'A calm, cold voice echoes from above, without fury: it is Nullus, watching the two matrices in the Queen’s hand.'),
    S('nullus', 'Vocês multiplicam A por B para conferir se a resposta é a identidade. Eu também conferia. Sempre errava uma casa.', 'You multiply A by B to check whether the answer is the identity. I used to check too. I always got one cell wrong.', { mood: 'sad' }),
    S('queen', 'Um erro numa casa e o produto inteiro deixa de ser a identidade. Foi isso que o consumiu, Nullus.', 'A single cell wrong and the whole product stops being the identity. That is what consumed you, Nullus.', { mood: 'sad' }),
    Y('Um erro não deveria custar um mundo.', 'A mistake should not cost a world.', { mood: 'sad', em: 'anger' }),
    S('nullus', 'Mas custou, jovem. Custou.', 'But it did, young one. It did.', { fx: 'shake' }),
  ]),
  's7-5': scene(7, [
    N('O Trono treme. A Grande Matriz, incompleta, ecoa sete notas desafinadas. É a hora do último feitiço: A · X = B.', 'The Throne trembles. The Great Matrix, incomplete, echoes seven out-of-tune notes. It is time for the final spell: A · X = B.'),
    S('queen', 'Se A tem inversa, multiplicamos por A⁻¹ dos dois lados e X aparece. A solução do sistema inteiro, de uma vez.', 'If A has an inverse, we multiply by A⁻¹ on both sides and X appears. The solution of the entire system, at once.', { em: 'think' }),
    S('queen', 'Antes do confronto final, {name}, diga: o que você espera fazer com Nullus?', 'Before the final confrontation, {name}, tell me: what do you hope to do with Nullus?'),
    CH('lean', [
      OPT('mercy', 'Devolvê-lo a quem foi, se houver um caminho.', 'Return him to who he was, if there is a way.', { v: { compassion: 1 }, set: { lean: 'mercy' }, reply: [S('queen', 'Um caminho existe, se o coração e a matemática concordarem.', 'A path exists, if the heart and the mathematics agree.', { em: 'love' })] }),
      OPT('justice', 'Detê-lo, custe o que custar, para proteger o reino.', 'Stop him, whatever it costs, to protect the realm.', { v: { courage: 1 }, set: { lean: 'justice' }, reply: [S('queen', 'Um dever pesado. Que a balança guie sua mão.', 'A heavy duty. May the scales guide your hand.')] }),
    ]),
  ]),
};

// Efeitos das escolhas já existentes na história (identificadas por "chave/opção")
export const RETROFIT = {
  'temper/brave': { v: { courage: 1 } },
  'temper/wise': { v: { wisdom: 1 } },
  'temper/cunning': { v: { cunning: 1 } },
  'ghost/librarian': { v: { compassion: 1 } },
  'ghost/free': { v: { courage: 1 } },
  'elden/pay': { v: { compassion: 1 }, b: { alchemist: 1 } },
  'elden/decline': { v: { cunning: 1 } },
  'speech/k2': { v: { courage: 1 }, b: { general: 1 } },
  'speech/k1': { v: { wisdom: 1 } },
  'speech/km1': { v: { compassion: 1 } },
  'mirror/look': { v: { compassion: 1 }, b: { witch: 1 } },
  'mirror/refuse': { v: { cunning: 1 } },
  'metal/iron': { v: { courage: 1 }, b: { dwarf: 1 } },
  'metal/silver': { v: { wisdom: 1 } },
  'metal/gold': { v: { cunning: 1 } },
  'pity/pity': { v: { compassion: 1 }, b: { oracle: 1 } },
  'pity/resolve': { v: { courage: 1 } },
  'ending/mercy': { v: { compassion: 2 } },
  'ending/justice': { v: { courage: 2 } },
};

// Final do livro: os aliados aparecem e a jornada é resumida (inserido no epílogo do capítulo 7)
export const CODA_STEPS = [
  N('Quando a luz se acalma, os passos que ecoaram no salão do Trono se aproximam. Cada um traz consigo um pedaço da sua jornada.', 'When the light calms, the footsteps that echoed in the Throne hall draw near. Each brings a piece of your journey.'),
  IFV('bond', 'sage', 2, [S('sage', 'Você começou como aprendiz, {name}, e nunca deixou de perguntar. É a melhor de todas as qualidades.', 'You began as an apprentice, {name}, and never stopped asking. It is the best of all qualities.', { em: 'love' })]),
  IFV('bond', 'alchemist', 2, [S('alchemist', 'Devo-lhe uma poção. Ou duas. Ou uma adega inteira!', 'I owe you a potion. Or two. Or a whole cellar!', { em: 'joy' })]),
  IFV('bond', 'general', 2, [S('general', 'Meus soldados voltaram a ter cor, recruta. Nunca vou esquecer isso.', 'My soldiers have color again, recruit. I will never forget this.', { em: 'love' })]),
  IFV('bond', 'witch', 2, [S('witch', 'Os espelhos mostram um reino inteiro, agora. Obrigada por não desviar o olhar.', 'The mirrors show a whole realm now. Thank you for not looking away.', { em: 'love' })]),
  IFV('bond', 'dwarf', 2, [S('dwarf', 'Forjei uma lâmina com o seu nome. Hah! Não diga que nunca lhe dei nada.', 'I forged a blade with your name on it. Hah! Do not say I never gave you anything.', { em: 'joy' })]),
  IFV('bond', 'oracle', 2, [S('oracle', 'Errei em uma previsão. Fico feliz em errar assim.', 'I was wrong about one prediction. I am glad to be wrong like this.', { em: 'love' })]),
  IFV('bond', 'queen', 2, [S('queen', 'O trono lhe deve um assento, {name}. Aceite quando quiser.', 'The throne owes you a seat, {name}. Take it whenever you wish.', { em: 'love' })]),
  { t: 'summary' },
];

export const CONCEPT_SCENE_IDS = Object.keys(CONCEPT_SCENES);
