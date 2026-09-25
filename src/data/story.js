// A história de Algebrion: cenas com diálogos, escolhas que mudam o rumo e enigmas de matrizes.
// Tipos de passo: narr · say · choice · if · puzzle · shard · fx
import { L } from '../i18n/core';
import { CONCEPT_SCENES, CODA_STEPS } from './story2';

const N = (pt, en, es, fr) => ({ t: 'narr', text: L(pt, en, es, fr) });
const S = (who, pt, en, es, fr) => ({ t: 'say', who, text: L(pt, en, es, fr) });
const Y = (pt, en, es, fr) => S('hero', pt, en, es, fr);
const IF = (flag, is, steps) => ({ t: 'if', flag, is, steps });
const FX = (fx) => ({ t: 'fx', fx });
const SH = (n, name) => ({ t: 'shard', n, name });
const PZ = (gen, ok, fail) => ({ t: 'puzzle', gen, ok, fail });
const OPT = (id, text, extra = {}) => ({ id, text, ...extra });
const CH = (key, options) => ({ t: 'choice', key, options });

export const SCENES = {
  /* ═══════════════ PRÓLOGO — A Taverna do Javali Dourado ═══════════════ */
  prologue: {
    bg: 'tavern', chapter: 0,
    title: L('Prólogo — A Noite em que o Céu Rachou', 'Prologue — The Night the Sky Cracked', 'Prólogo — La Noche en que el Cielo se Rompió', 'Prologue — La Nuit où le Ciel s’est Fendu'),
    reward: { xp: 20, gold: 30 },
    steps: [
      N('Uma noite de tempestade. Na Taverna do Javali Dourado, à beira da Estrada Real, viajantes assustados se amontoam junto à lareira. Faz três dias que o céu rachou, e a Grande Matriz — a tábua de runas que mantém o reino em ordem — se estilhaçou em sete Fragmentos.',
        'A stormy night. In the Golden Boar Tavern by the King’s Road, frightened travelers huddle around the hearth. Three days ago the sky cracked, and the Great Matrix — the tablet of runes that keeps the realm in order — shattered into seven Shards.',
        'Una noche de tormenta. En la Taberna del Jabalí Dorado, junto al Camino Real, los viajeros asustados se apiñan ante la chimenea. Hace tres días el cielo se rompió, y la Gran Matriz —la tabla de runas que mantiene el orden del reino— se hizo añicos en siete Fragmentos.',
        'Une nuit d’orage. À l’auberge du Sanglier Doré, au bord de la Route Royale, des voyageurs effrayés se serrent près de l’âtre. Il y a trois jours, le ciel s’est fendu, et la Grande Matrice — la tablette de runes qui maintient l’ordre du royaume — s’est brisée en sept Fragments.'),
      S('innkeeper', 'Ei, {name}! Entre, entre, você está ensopado! Sente-se perto do fogo. Já ouviu as notícias?', 'Hey, {name}! Come in, you’re soaked! Sit by the fire. Have you heard the news?', '¡Eh, {name}! Pasa, ¡estás empapado! Siéntate junto al fuego. ¿Has oído las noticias?', 'Hé, {name} ! Entrez, vous êtes trempé ! Asseyez-vous près du feu. Vous avez appris la nouvelle ?'),
      Y('Vim de longe. Só sei que os números estão sumindo dos livros e das ruas.', 'I came from afar. I only know numbers are vanishing from books and streets.', 'Vengo de lejos. Solo sé que los números desaparecen de los libros y de las calles.', 'Je viens de loin. Je sais seulement que les nombres disparaissent des livres et des rues.'),
      S('innkeeper', 'Não só somem. Onde o Zero toca, tudo vira nada. A vila de Linhas amanheceu em branco... casas, gente, tudo.', 'They don’t just vanish. Where the Zero touches, everything becomes nothing. The village of Lines woke up blank... houses, people, everything.', 'No solo desaparecen. Donde el Cero toca, todo se vuelve nada. La aldea de Líneas amaneció en blanco... casas, gente, todo.', 'Ils ne font pas que disparaître. Là où le Zéro touche, tout devient néant. Le village de Lignes s’est réveillé blanc… maisons, gens, tout.'),
      FX('thunder'),
      N('Um trovão estremece as vigas. Da mesa mais escura, um velho de barba branca ergue os olhos de um livro flutuante.', 'Thunder shakes the rafters. From the darkest table, an old man with a white beard looks up from a floating book.', 'Un trueno sacude las vigas. Desde la mesa más oscura, un anciano de barba blanca alza la vista de un libro flotante.', 'Le tonnerre ébranle les poutres. De la table la plus sombre, un vieil homme à barbe blanche lève les yeux d’un livre flottant.'),
      S('sage', 'Uma voz nova... Um aprendiz, talvez? Os deuses têm senso de humor. Sou o Mestre Arcano, guardião da Abadia dos Grimórios.', 'A new voice... An apprentice, perhaps? The gods have a sense of humor. I am the Arcane Master, keeper of the Abbey of Grimoires.', 'Una voz nueva... ¿Un aprendiz, quizá? Los dioses tienen sentido del humor. Soy el Maestro Arcano, guardián de la Abadía de los Grimorios.', 'Une voix nouvelle… Un apprenti, peut-être ? Les dieux ont de l’humour. Je suis le Maître Arcane, gardien de l’Abbaye des Grimoires.'),
      S('sage', 'Ouça bem. Um feiticeiro chamado Nullus, o Senhor do Zero, quebrou a Grande Matriz. Enquanto os Fragmentos estiverem espalhados, o Zero se alastra.', 'Listen well. A sorcerer named Nullus, Lord of Zero, broke the Great Matrix. As long as the Shards stay scattered, the Zero spreads.', 'Escucha bien. Un hechicero llamado Nullus, el Señor del Cero, rompió la Gran Matriz. Mientras los Fragmentos estén dispersos, el Cero se extiende.', 'Écoutez bien. Un sorcier nommé Nullus, Seigneur du Zéro, a brisé la Grande Matrice. Tant que les Fragments seront dispersés, le Zéro s’étendra.'),
      S('sage', 'Só quem dominar a arte das matrizes poderá religá-los. Etapa por etapa: ler, somar, escalar, refletir, multiplicar, medir... e por fim, inverter.', 'Only one who masters the art of matrices can rejoin them. Step by step: read, add, scale, reflect, multiply, measure... and finally, invert.', 'Solo quien domine el arte de las matrices podrá reunirlos. Paso a paso: leer, sumar, escalar, reflejar, multiplicar, medir... y por fin, invertir.', 'Seul celui qui maîtrise l’art des matrices pourra les réunir. Pas à pas : lire, additionner, mettre à l’échelle, refléter, multiplier, mesurer… et enfin, inverser.'),
      CH('temper', [
        OPT('brave', L('“Alguém precisa enfrentar o Zero. Eu vou.”', '“Someone must face the Zero. I will.”', '“Alguien debe enfrentar el Cero. Iré yo.”', '« Quelqu’un doit affronter le Zéro. J’irai. »'), {
          set: { temper: 'brave' },
          reply: [S('sage', 'Coragem! Rara e perigosa. Vou lhe ensinar a torná-la útil.', 'Courage! Rare and dangerous. I shall teach you to make it useful.', '¡Coraje! Raro y peligroso. Te enseñaré a volverlo útil.', 'Du courage ! Rare et dangereux. Je vous apprendrai à le rendre utile.')],
        }),
        OPT('wise', L('“Quero entender o que são, de verdade, as matrizes.”', '“I want to truly understand what matrices are.”', '“Quiero entender de verdad qué son las matrices.”', '« Je veux vraiment comprendre ce que sont les matrices. »'), {
          set: { temper: 'wise' },
          reply: [S('sage', 'A curiosidade é a chave de todas as portas. Você e eu vamos nos entender.', 'Curiosity is the key to every door. You and I shall get along.', 'La curiosidad es la llave de todas las puertas. Tú y yo nos entenderemos.', 'La curiosité est la clé de toutes les portes. Nous allons nous entendre.')],
        }),
        OPT('cunning', L('“Há recompensa? E conheço um ou dois atalhos.”', '“Is there a reward? And I know a shortcut or two.”', '“¿Hay recompensa? Y conozco un par de atajos.”', '« Y a-t-il une récompense ? Et je connais un raccourci ou deux. »'), {
          set: { temper: 'cunning' }, reward: { gold: 15 },
          reply: [S('sage', 'Ha! Honesto ao menos. Tome uma moeda de adiantamento... mas em matrizes, atalho errado vira beco sem saída.', 'Ha! At least you’re honest. Take a coin in advance... but in matrices, a wrong shortcut is a dead end.', '¡Ja! Al menos eres sincero. Toma una moneda de adelanto... pero en matrices, un atajo equivocado es un callejón sin salida.', 'Ha ! Au moins vous êtes honnête. Prenez une pièce d’avance… mais en matrices, un mauvais raccourci est une impasse.')],
        }),
      ]),
      S('innkeeper', 'Tome, leve estas rações. Ninguém enfrenta o Zero de barriga vazia! E cuidado na estrada, {name}.', 'Here, take these rations. Nobody faces the Zero on an empty stomach! And mind the road, {name}.', 'Toma, lleva estas raciones. ¡Nadie enfrenta el Cero con el estómago vacío! Y cuidado en el camino, {name}.', 'Tenez, prenez ces vivres. Personne n’affronte le Zéro le ventre vide ! Et prudence sur la route, {name}.'),
      S('sage', 'Ao amanhecer, siga a Estrada Real até a Abadia dos Grimórios. Sua primeira lição o espera.', 'At dawn, follow the King’s Road to the Abbey of Grimoires. Your first lesson awaits.', 'Al amanecer, sigue el Camino Real hasta la Abadía de los Grimorios. Tu primera lección te espera.', 'À l’aube, suivez la Route Royale jusqu’à l’Abbaye des Grimoires. Votre première leçon vous attend.'),
    ],
  },

  /* ═══════════════ CAPÍTULO 1 — Abadia dos Grimórios ═══════════════ */
  'c1-intro': {
    bg: 'abbey', chapter: 1,
    title: L('Capítulo 1 — A Abadia dos Grimórios', 'Chapter 1 — The Abbey of Grimoires', 'Capítulo 1 — La Abadía de los Grimorios', 'Chapitre 1 — L’Abbaye des Grimoires'),
    reward: { xp: 10, gold: 5 },
    steps: [
      N('A Abadia ergue-se entre névoa e pinheiros. Dentro, as estantes gemem: as letras fogem dos livros, linhas viram colunas, colunas viram linhas. Tudo está fora do lugar.', 'The Abbey rises among mist and pines. Inside, the shelves groan: letters flee the books, rows turn into columns, columns into rows. Everything is out of place.', 'La Abadía se alza entre niebla y pinos. Dentro, las estanterías gimen: las letras huyen de los libros, las filas se vuelven columnas y las columnas, filas. Todo está fuera de lugar.', 'L’Abbaye se dresse parmi la brume et les pins. À l’intérieur, les étagères gémissent : les lettres fuient les livres, les lignes deviennent colonnes, les colonnes deviennent lignes. Tout est de travers.'),
      S('sage', 'Bem-vindo à minha casa, {name}. Como vê, o Espectro dos Índices bagunçou tudo: ninguém mais sabe onde fica cada elemento.', 'Welcome to my home, {name}. As you see, the Specter of Indices has scrambled everything: nobody knows where each element lives anymore.', 'Bienvenido a mi casa, {name}. Como ves, el Espectro de los Índices lo ha revuelto todo: ya nadie sabe dónde vive cada elemento.', 'Bienvenue chez moi, {name}. Comme vous voyez, le Spectre des Indices a tout brouillé : plus personne ne sait où loge chaque élément.'),
      Y('Um espectro... causado pelo Zero?', 'A specter... caused by the Zero?', '¿Un espectro... causado por el Cero?', 'Un spectre… causé par le Zéro ?'),
      S('sage', 'Sim. Antes de enfrentá-lo você precisa aprender a ler uma matriz: linhas, colunas e o endereço a_ij de cada elemento.', 'Yes. Before facing him you must learn to read a matrix: rows, columns, and the address a_ij of each element.', 'Sí. Antes de enfrentarlo debes aprender a leer una matriz: filas, columnas y la dirección a_ij de cada elemento.', 'Oui. Avant de l’affronter, vous devez savoir lire une matrice : lignes, colonnes et l’adresse a_ij de chaque élément.'),
      IF('temper', 'brave', [S('sage', 'Vejo coragem em você. Mas coragem sem método vira só barulho.', 'I see courage in you. But courage without method is only noise.', 'Veo coraje en ti. Pero el coraje sin método es solo ruido.', 'Je vois du courage en vous. Mais le courage sans méthode n’est que du bruit.')]),
      IF('temper', 'wise', [S('sage', 'Sua curiosidade será sua melhor arma. Faça perguntas — os livros adoram responder.', 'Your curiosity will be your best weapon. Ask questions — books love to answer.', 'Tu curiosidad será tu mejor arma. Haz preguntas: a los libros les encanta responder.', 'Votre curiosité sera votre meilleure arme. Posez des questions — les livres adorent répondre.')]),
      IF('temper', 'cunning', [S('sage', 'E nada de atalhos com os índices, hein? Linha primeiro, coluna depois. Sempre.', 'And no shortcuts with indices, hm? Row first, column second. Always.', 'Y nada de atajos con los índices, ¿eh? Fila primero, columna después. Siempre.', 'Et pas de raccourcis avec les indices, hein ? Ligne d’abord, colonne ensuite. Toujours.')]),
      S('sage', 'Comece pela lição do pergaminho. Depois, mostre-me o que aprendeu.', 'Begin with the scroll lesson. Then show me what you have learned.', 'Empieza por la lección del pergamino. Luego muéstrame lo que aprendiste.', 'Commencez par la leçon du parchemin. Puis montrez-moi ce que vous avez appris.'),
    ],
  },
  'c1-mid': {
    bg: 'abbey', chapter: 1, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      N('Ao fundo do salão, uma porta rúnica bloqueia a Seção Proibida. Símbolos pulsam na madeira.', 'At the back of the hall, a runic door blocks the Forbidden Section. Symbols pulse on the wood.', 'Al fondo del salón, una puerta rúnica bloquea la Sección Prohibida. Los símbolos laten en la madera.', 'Au fond de la salle, une porte runique ferme la Section Interdite. Des symboles palpitent sur le bois.'),
      S('sage', 'A fechadura exige o valor de um elemento. Erre, e os livros voarão em você.', 'The lock demands the value of an element. Get it wrong and the books will fly at you.', 'La cerradura exige el valor de un elemento. Si fallas, los libros volarán hacia ti.', 'La serrure exige la valeur d’un élément. Si vous vous trompez, les livres vous voleront dessus.'),
      PZ('elemValue',
        [N('A porta se abre com um suspiro de poeira e luz.', 'The door opens with a sigh of dust and light.', 'La puerta se abre con un suspiro de polvo y luz.', 'La porte s’ouvre dans un soupir de poussière et de lumière.'), S('sage', 'Excelente! Você tem o olho do índice.', 'Excellent! You have the eye for indices.', '¡Excelente! Tienes ojo para los índices.', 'Excellent ! Vous avez l’œil des indices.')],
        [N('Os livros disparam pelo ar! O Mestre Arcano os detém com um estalar de dedos.', 'The books shoot through the air! The Arcane Master stops them with a snap of his fingers.', '¡Los libros salen disparados! El Maestro Arcano los detiene con un chasquido.', 'Les livres fusent ! Le Maître Arcane les arrête d’un claquement de doigts.'), S('sage', 'Ha ha! Estamos vivos. Da próxima vez, lembre: linha primeiro, coluna depois.', 'Ha ha! We’re alive. Next time remember: row first, column second.', '¡Ja, ja! Seguimos vivos. La próxima vez recuerda: fila primero, columna después.', 'Ha ha ! Nous sommes vivants. La prochaine fois, souvenez-vous : ligne d’abord, colonne ensuite.')]),
      N('Dentro, sobre uma mesa, um bilhete rabiscado em tinta cinzenta.', 'Inside, on a table, a note scrawled in gray ink.', 'Dentro, sobre una mesa, una nota garabateada con tinta gris.', 'À l’intérieur, sur une table, un billet griffonné à l’encre grise.'),
      S('sage', '“Tudo será Zero. Só assim ninguém mais sofrerá.” Assinado: Nullus... Ele não age por maldade comum. Isso me preocupa.', '“All will be Zero. Only then will no one suffer.” Signed: Nullus... He does not act from common malice. That worries me.', '“Todo será Cero. Solo así nadie sufrirá más.” Firmado: Nullus... No actúa por maldad común. Eso me preocupa.', '« Tout sera Zéro. Ainsi plus personne ne souffrira. » Signé : Nullus… Il n’agit pas par simple méchanceté. Cela m’inquiète.'),
    ],
  },
  'c1-boss': {
    bg: 'abbey', chapter: 1, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      FX('flash'),
      N('As estantes tremem. Do centro do salão, um vulto azul se ergue, sussurrando.', 'The shelves tremble. From the center of the hall a blue shape rises, whispering.', 'Las estanterías tiemblan. Del centro del salón se alza una silueta azul, susurrando.', 'Les étagères tremblent. Du centre de la salle, une forme bleue se dresse en chuchotant.'),
      S('m:ghost', 'Onde... onde estou? Linha ou coluna? Eu... esqueci o meu endereço!', 'Where... where am I? Row or column? I... I forgot my address!', '¿Dónde... dónde estoy? ¿Fila o columna? ¡Olvidé mi dirección!', 'Où… où suis-je ? Ligne ou colonne ? J’ai… j’ai oublié mon adresse !'),
      S('sage', 'Ele é só uma alma perdida, presa pelo feitiço do Zero. Ajude-o a se lembrar, {name}!', 'He is only a lost soul, trapped by the Zero’s curse. Help him remember, {name}!', 'Es solo un alma perdida, atrapada por el hechizo del Cero. ¡Ayúdalo a recordar, {name}!', 'Ce n’est qu’une âme perdue, prisonnière du sort du Zéro. Aidez-le à se souvenir, {name} !'),
      Y('Vou devolver cada elemento ao seu lugar!', 'I’ll return every element to its place!', '¡Devolveré cada elemento a su lugar!', 'Je vais remettre chaque élément à sa place !'),
    ],
  },
  'c1-end': {
    bg: 'abbey', chapter: 1, title: null, reward: { xp: 25, gold: 20 },
    steps: [
      N('O espectro se dissolve em partículas de luz. No ar, um cristal azul-pálido gira devagar e pousa nas mãos de {name}.', 'The specter dissolves into particles of light. In the air a pale-blue crystal turns slowly and settles into {name}’s hands.', 'El espectro se disuelve en partículas de luz. En el aire, un cristal azul pálido gira despacio y se posa en las manos de {name}.', 'Le spectre se dissout en particules de lumière. Dans l’air, un cristal bleu pâle tourne lentement et se pose dans les mains de {name}.'),
      SH(1, L('Fragmento do Índice', 'Shard of the Index', 'Fragmento del Índice', 'Fragment de l’Indice')),
      S('m:ghost', 'Obrigado... eu me lembro agora: sou a_23. Segunda linha, terceira coluna. Que alívio!', 'Thank you... I remember now: I am a_23. Second row, third column. What a relief!', 'Gracias... ahora lo recuerdo: soy a_23. Segunda fila, tercera columna. ¡Qué alivio!', 'Merci… je me souviens : je suis a_23. Deuxième ligne, troisième colonne. Quel soulagement !'),
      CH('ghost', [
        OPT('librarian', L('“Fique aqui, na Abadia, como bibliotecário.”', '“Stay here in the Abbey as librarian.”', '“Quédate aquí, en la Abadía, como bibliotecario.”', '« Restez à l’Abbaye comme bibliothécaire. »'), {
          set: { spared_ghost: true },
          reply: [S('m:ghost', 'Ninguém nunca me pediu para ficar... Vou cuidar de cada índice como se fosse meu filho.', 'Nobody ever asked me to stay... I shall tend every index like my own child.', 'Nadie me pidió nunca que me quedara... Cuidaré cada índice como a un hijo.', 'Personne ne m’a jamais demandé de rester… Je veillerai sur chaque indice comme sur mon enfant.')],
        }),
        OPT('free', L('“Vá em paz, alma livre.”', '“Go in peace, free soul.”', '“Ve en paz, alma libre.”', '« Allez en paix, âme libre. »'), {
          set: { spared_ghost: false }, reward: { xp: 10 },
          reply: [S('m:ghost', 'Livre... que palavra bonita. Adeus, viajante.', 'Free... what a lovely word. Farewell, traveler.', 'Libre... qué palabra tan hermosa. Adiós, viajero.', 'Libre… quel joli mot. Adieu, voyageur.')],
        }),
      ]),
      S('sage', 'Um Fragmento! Sinto a Grande Matriz vibrar de esperança. Mas a carta de Nullus fala de outras regiões já tocadas pelo Zero.', 'A Shard! I feel the Great Matrix hum with hope. But Nullus’s letter speaks of other regions already touched by the Zero.', '¡Un Fragmento! Siento a la Gran Matriz vibrar de esperanza. Pero la carta de Nullus habla de otras regiones ya tocadas por el Cero.', 'Un Fragment ! Je sens la Grande Matrice vibrer d’espoir. Mais la lettre de Nullus parle d’autres régions déjà touchées par le Zéro.'),
      S('sage', 'Siga para o Vale da Alquimia. Meu velho amigo Elden anda desesperado: suas poções desaparecem ao serem misturadas.', 'Head to the Valley of Alchemy. My old friend Elden is desperate: his potions vanish when mixed.', 'Ve al Valle de la Alquimia. Mi viejo amigo Elden anda desesperado: sus pociones desaparecen al mezclarlas.', 'Rendez-vous à la Vallée de l’Alchimie. Mon vieil ami Elden est désespéré : ses potions disparaissent quand on les mélange.'),
    ],
  },

  /* ═══════════════ CAPÍTULO 2 — Vale da Alquimia ═══════════════ */
  'c2-intro': {
    bg: 'lab', chapter: 2,
    title: L('Capítulo 2 — O Vale da Alquimia Aditiva', 'Chapter 2 — The Valley of Additive Alchemy', 'Capítulo 2 — El Valle de la Alquimia Aditiva', 'Chapitre 2 — La Vallée de l’Alchimie Additive'),
    reward: { xp: 10, gold: 5 },
    steps: [
      N('Fumaça violeta escorre pelas janelas da cabana. Lá dentro, caldeirões borbulham e frascos tilintam sozinhos.', 'Violet smoke pours from the cabin windows. Inside, cauldrons bubble and flasks clink by themselves.', 'Humo violeta se derrama por las ventanas de la cabaña. Dentro, los calderos burbujean y los frascos tintinean solos.', 'De la fumée violette s’échappe des fenêtres de la cabane. Dedans, les chaudrons bouillonnent et les fioles tintent toutes seules.'),
      S('alchemist', 'Você! É o aprendiz do Arcano? Ótimo! Toda vez que misturo duas poções, UMA DELAS SOME!', 'You! Are you the Arcane’s apprentice? Wonderful! Every time I mix two potions, ONE OF THEM VANISHES!', '¡Tú! ¿Eres el aprendiz del Arcano? ¡Estupendo! Cada vez que mezclo dos pociones, ¡UNA DESAPARECE!', 'Vous ! Vous êtes l’apprenti de l’Arcane ? Parfait ! Chaque fois que je mélange deux potions, L’UNE DISPARAÎT !'),
      Y('Talvez você esteja misturando frascos de tamanhos diferentes?', 'Maybe you are mixing flasks of different sizes?', '¿Quizá estás mezclando frascos de tamaños diferentes?', 'Peut-être mélangez-vous des fioles de tailles différentes ?'),
      S('alchemist', 'Tamanhos... ORDENS! Claro! Só se somam matrizes de mesma ordem, elemento a elemento! Você é um gênio... ou um sortudo.', 'Sizes... ORDERS! Of course! Only matrices of the same order can be added, entry by entry! You’re a genius... or a lucky one.', '¡Tamaños... ÓRDENES! ¡Claro! ¡Solo se suman matrices del mismo orden, elemento a elemento! Eres un genio... o un suertudo.', 'Tailles… ORDRES ! Bien sûr ! On n’additionne que des matrices de même ordre, terme à terme ! Vous êtes un génie… ou un chanceux.'),
      S('alchemist', 'Preciso de reagentes raros para refazer o estoque. Trinta moedas de ouro ajudariam. O que me diz?', 'I need rare reagents to restock. Thirty gold coins would help. What do you say?', 'Necesito reactivos raros para reponer el stock. Treinta monedas de oro ayudarían. ¿Qué dices?', 'Il me faut des réactifs rares pour refaire mon stock. Trente pièces d’or aideraient. Qu’en dites-vous ?'),
      CH('elden', [
        OPT('pay', L('Dar 30 moedas ao Elden.', 'Give Elden 30 coins.', 'Darle 30 monedas a Elden.', 'Donner 30 pièces à Elden.'), {
          needGold: 30, set: { helped_elden: true }, reward: { gold: -30, items: { xpPotion: 1 } },
          reply: [S('alchemist', 'Generoso! Leve esta Poção de XP: ela dobra... bem, aumenta em metade, o brilho do seu aprendizado.', 'Generous! Take this XP Potion: it doubles... well, boosts by half, the glow of your learning.', '¡Generoso! Toma esta Poción de XP: duplica... bueno, aumenta a la mitad, el brillo de tu aprendizaje.', 'Généreux ! Prenez cette Potion d’XP : elle double… enfin, augmente de moitié, l’éclat de votre apprentissage.')],
        }),
        OPT('decline', L('“Sinto muito, preciso do meu ouro.”', '“Sorry, I need my gold.”', '“Lo siento, necesito mi oro.”', '« Désolé, j’ai besoin de mon or. »'), {
          set: { helped_elden: false },
          reply: [S('alchemist', 'Hm. Sensato, suponho. Vou improvisar com lodo e esperança.', 'Hm. Sensible, I suppose. I’ll improvise with mud and hope.', 'Hm. Sensato, supongo. Improvisaré con barro y esperanza.', 'Hm. Raisonnable, je suppose. J’improviserai avec de la boue et de l’espoir.')],
        }),
      ]),
    ],
  },
  'c2-mid': {
    bg: 'lab', chapter: 2, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      N('Elden aponta para dois frascos gêmeos sobre a bancada. Um está rachado e vaza névoa.', 'Elden points at two twin flasks on the bench. One is cracked and leaking mist.', 'Elden señala dos frascos gemelos sobre la mesa. Uno está agrietado y deja escapar niebla.', 'Elden désigne deux fioles jumelles sur l’établi. L’une est fêlée et laisse fuir de la brume.'),
      S('alchemist', 'Antes de misturar, o Código do Alquimista exige a pergunta certa. Responda e eu misturo. Erre, e... bem, use este escudo.', 'Before mixing, the Alchemist’s Code demands the right question. Answer and I mix. Get it wrong and... well, use this shield.', 'Antes de mezclar, el Código del Alquimista exige la pregunta correcta. Responde y mezclo. Si fallas y... bueno, usa este escudo.', 'Avant de mélanger, le Code de l’Alchimiste exige la bonne question. Répondez et je mélange. Sinon… eh bien, servez-vous de ce bouclier.'),
      PZ('sumPossible',
        [N('As duas poções se fundem numa luz dourada, sem perder uma gota.', 'The two potions merge in a golden light, losing not a drop.', 'Las dos pociones se funden en una luz dorada, sin perder una gota.', 'Les deux potions fusionnent en une lumière dorée, sans perdre une goutte.'), S('alchemist', 'Perfeito! A soma nunca falha quando a Lei da Harmonia é respeitada.', 'Perfect! Addition never fails when the Law of Harmony is respected.', '¡Perfecto! La suma nunca falla cuando se respeta la Ley de la Armonía.', 'Parfait ! L’addition n’échoue jamais quand la Loi de l’Harmonie est respectée.')],
        [N('BOOM! Uma nuvem de fumaça verde cobre o laboratório.', 'BOOM! A cloud of green smoke covers the lab.', '¡BUM! Una nube de humo verde cubre el laboratorio.', 'BOUM ! Un nuage de fumée verte envahit le laboratoire.'), S('alchemist', '*tosse* Ordens diferentes, meu jovem. Sempre, SEMPRE confira as ordens!', '*cough* Different orders, young one. Always, ALWAYS check the orders!', '*tos* Órdenes distintos, joven. ¡Siempre, SIEMPRE comprueba los órdenes!', '*tousse* Ordres différents, jeune. Toujours, TOUJOURS vérifiez les ordres !')]),
    ],
  },
  'c2-boss': {
    bg: 'lab', chapter: 2, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      FX('shake'),
      N('O maior caldeirão transborda. Dele, algo grande, gelatinoso e muito ofendido se ergue.', 'The biggest cauldron overflows. From it, something large, gelatinous and very offended rises.', 'El caldero más grande se desborda. De él se alza algo grande, gelatinoso y muy ofendido.', 'Le plus grand chaudron déborde. Il en surgit quelque chose de gros, gélatineux et très vexé.'),
      S('alchemist', 'É a minha Poção de Duplicar! Ficou VIVA por causa do Zero!', 'It’s my Duplicating Potion! It came ALIVE because of the Zero!', '¡Es mi Poción de Duplicar! ¡Cobró VIDA por culpa del Cero!', 'C’est ma Potion de Duplication ! Elle est devenue VIVANTE à cause du Zéro !'),
      S('m:slime', 'Glub... glub... somar... somar... SOMAR TUDO!', 'Glub... glub... add... add... ADD EVERYTHING!', 'Glub... glub... sumar... sumar... ¡SUMAR TODO!', 'Glub… glub… additionner… additionner… TOUT ADDITIONNER !'),
      Y('Vamos dissolvê-la com contas certas!', 'Let’s dissolve it with the right sums!', '¡Vamos a disolverla con las cuentas correctas!', 'Dissolvons-la avec les bons calculs !'),
    ],
  },
  'c2-end': {
    bg: 'lab', chapter: 2, title: null, reward: { xp: 25, gold: 25 },
    steps: [
      N('A gosma se desfaz numa poça brilhante. No fundo, um cristal verde-água pulsa em ritmo lento.', 'The slime collapses into a shining puddle. At the bottom a sea-green crystal pulses slowly.', 'La baba se deshace en un charco brillante. En el fondo, un cristal verde agua late lentamente.', 'La gelée s’effondre en une flaque luisante. Au fond, un cristal vert d’eau palpite lentement.'),
      SH(2, L('Fragmento da Soma', 'Shard of Sum', 'Fragmento de la Suma', 'Fragment de la Somme')),
      IF('helped_elden', true, [S('alchemist', 'Você me ajudou quando eu precisava. Um alquimista não esquece. Vou com você!', 'You helped me when I needed it. An alchemist never forgets. I’m coming with you!', 'Me ayudaste cuando lo necesitaba. Un alquimista no olvida. ¡Voy contigo!', 'Vous m’avez aidé quand j’en avais besoin. Un alchimiste n’oublie pas. Je viens avec vous !')]),
      IF('helped_elden', false, [S('alchemist', 'Mesmo sem o ouro, você venceu a gosma. Considero a dívida... adiada. Vou com você!', 'Even without the gold you beat the slime. I consider the debt... postponed. I’m coming with you!', 'Aun sin el oro venciste a la baba. Considero la deuda... aplazada. ¡Voy contigo!', 'Même sans or, vous avez vaincu la gelée. Je considère la dette… reportée. Je viens avec vous !')]),
      S('alchemist', 'Uma notícia ruim: um corvo trouxe um recado do General Vetor. O Forte dos Escalares está sitiado. As tropas dele foram... multiplicadas por zero.', 'Bad news: a raven brought a message from General Vector. The Scalar Fort is under siege. His troops were... multiplied by zero.', 'Una mala noticia: un cuervo trajo un mensaje del General Vector. El Fuerte de los Escalares está sitiado. Sus tropas fueron... multiplicadas por cero.', 'Mauvaise nouvelle : un corbeau a apporté un message du Général Vecteur. Le Fort des Scalaires est assiégé. Ses troupes ont été… multipliées par zéro.'),
      Y('Então vamos ao Forte. Sem demora.', 'Then to the Fort. Without delay.', 'Entonces al Fuerte. Sin demora.', 'Alors au Fort. Sans tarder.'),
    ],
  },

  /* ═══════════════ CAPÍTULO 3 — Forte dos Escalares ═══════════════ */
  'c3-intro': {
    bg: 'fort', chapter: 3,
    title: L('Capítulo 3 — O Forte dos Escalares', 'Chapter 3 — The Scalar Stronghold', 'Capítulo 3 — El Fuerte de los Escalares', 'Chapitre 3 — Le Fort des Scalaires'),
    reward: { xp: 10, gold: 5 },
    steps: [
      N('Os portões de ferro rangem. Nas muralhas, soldados translúcidos, quase sombras, empunham lanças que já não pesam nada.', 'The iron gates creak. On the walls, translucent soldiers, almost shadows, hold spears that weigh nothing anymore.', 'Las puertas de hierro chirrían. En las murallas, soldados translúcidos, casi sombras, empuñan lanzas que ya no pesan nada.', 'Les portes de fer grincent. Sur les remparts, des soldats translucides, presque des ombres, brandissent des lances qui ne pèsent plus rien.'),
      S('general', 'Alto! Quem... ah, o aprendiz do Arcano. Entre, e não toque em nada que brilhe.', 'Halt! Who... ah, the Arcane’s apprentice. Enter, and touch nothing that glows.', '¡Alto! Quién... ah, el aprendiz del Arcano. Entra, y no toques nada que brille.', 'Halte ! Qui… ah, l’apprenti de l’Arcane. Entrez, et ne touchez à rien qui brille.'),
      S('general', 'O Zero multiplicou meus homens por 0. Sobraram as sombras. Um escalar k mexe em TODOS os elementos: k = 2 dobra, k = 1 mantém, k = −1 inverte... e k = 0 apaga.', 'The Zero multiplied my men by 0. Only shadows remain. A scalar k acts on EVERY element: k = 2 doubles, k = 1 keeps, k = −1 flips... and k = 0 erases.', 'El Cero multiplicó a mis hombres por 0. Solo quedaron sombras. Un escalar k actúa sobre TODOS los elementos: k = 2 duplica, k = 1 mantiene, k = −1 invierte... y k = 0 borra.', 'Le Zéro a multiplié mes hommes par 0. Il ne reste que des ombres. Un scalaire k agit sur TOUS les éléments : k = 2 double, k = 1 conserve, k = −1 inverse… et k = 0 efface.'),
      S('general', 'Preciso que eles voltem a acreditar em si mesmos. Como você animaria a tropa?', 'I need them to believe in themselves again. How would you rally the troops?', 'Necesito que vuelvan a creer en sí mismos. ¿Cómo animarías a la tropa?', 'Il faut qu’ils croient de nouveau en eux. Comment galvaniseriez-vous la troupe ?'),
      CH('speech', [
        OPT('k2', L('Um discurso inspirador: k = 2, dobre a coragem!', 'An inspiring speech: k = 2, double the courage!', 'Un discurso inspirador: k = 2, ¡duplica el coraje!', 'Un discours inspirant : k = 2, doublez le courage !'), {
          reply: [N('Os soldados se endireitam. Seus contornos ganham cor, como se cada um fosse duas vezes mais real.', 'The soldiers straighten. Their outlines gain color, as if each were twice as real.', 'Los soldados se yerguen. Sus contornos ganan color, como si cada uno fuera el doble de real.', 'Les soldats se redressent. Leurs contours se colorent, comme si chacun était deux fois plus réel.'), S('general', 'Ha! k = 2. Você fala como um verdadeiro comandante.', 'Ha! k = 2. You speak like a true commander.', '¡Ja! k = 2. Hablas como un verdadero comandante.', 'Ha ! k = 2. Vous parlez comme un vrai commandant.')],
          reward: { xp: 10 },
        }),
        OPT('k1', L('Uma ordem firme: k = 1, disciplina que não muda!', 'A firm order: k = 1, discipline that never changes!', 'Una orden firme: k = 1, ¡disciplina que no cambia!', 'Un ordre ferme : k = 1, une discipline inchangée !'), {
          reply: [N('Os soldados batem os calcanhares. Não brilham mais, mas ficam firmes como pedra.', 'The soldiers click their heels. They do not glow more, but stand firm as stone.', 'Los soldados chocan los talones. No brillan más, pero quedan firmes como piedra.', 'Les soldats claquent des talons. Ils ne brillent pas plus, mais tiennent bon comme la pierre.'), S('general', 'k = 1: a identidade dos soldados. Ninguém perde nada. Sólido.', 'k = 1: the soldiers’ identity. Nobody loses anything. Solid.', 'k = 1: la identidad de los soldados. Nadie pierde nada. Sólido.', 'k = 1 : l’identité des soldats. Personne ne perd rien. Solide.')],
          reward: { gold: 15 },
        }),
        OPT('km1', L('Uma piada: k = −1, vire o desânimo do avesso!', 'A joke: k = −1, turn the gloom inside out!', 'Un chiste: k = −1, ¡dale la vuelta al desánimo!', 'Une blague : k = −1, retournez le découragement !'), {
          reply: [N('Alguém ri. Depois todos riem. O riso inverte os sinais: onde havia medo, sobra coragem.', 'Someone laughs. Then everyone laughs. Laughter flips the signs: where there was fear, courage remains.', 'Alguien ríe. Luego todos ríen. La risa invierte los signos: donde había miedo, queda coraje.', 'Quelqu’un rit. Puis tous rient. Le rire inverse les signes : où il y avait de la peur, il reste du courage.'), S('general', 'k = −1! Ninguém me tinha feito rir em semanas. Gostei de você.', 'k = −1! Nobody has made me laugh in weeks. I like you.', '¡k = −1! Nadie me hacía reír desde hacía semanas. Me caes bien.', 'k = −1 ! Personne ne m’avait fait rire depuis des semaines. Je vous aime bien.')],
          reward: { xp: 15 },
        }),
      ]),
    ],
  },
  'c3-mid': {
    bg: 'fort', chapter: 3, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      N('O General leva você ao arsenal. As armas estão pesadas de runas: cada uma traz um multiplicador gravado.', 'The General leads you to the armory. The weapons are heavy with runes: each has a multiplier engraved.', 'El General te lleva al arsenal. Las armas pesan de runas: cada una lleva grabado un multiplicador.', 'Le Général vous conduit à l’arsenal. Les armes sont lourdes de runes : chacune porte un multiplicateur gravé.'),
      S('general', 'Para reforçar a escolta, cada elemento da lâmina precisa ser multiplicado pelo escalar. Acerte o valor e a arma se reforça!', 'To reinforce the escort, each element of the blade must be multiplied by the scalar. Get the value right and the weapon is strengthened!', 'Para reforzar la escolta, cada elemento de la hoja debe multiplicarse por el escalar. ¡Acierta el valor y el arma se refuerza!', 'Pour renforcer l’escorte, chaque élément de la lame doit être multiplié par le scalaire. Trouvez la bonne valeur et l’arme se renforce !'),
      PZ('scalarCell',
        [N('As lâminas reluzem. Um tinir de metal enche o arsenal.', 'The blades gleam. A ring of metal fills the armory.', 'Las hojas relucen. Un tañido de metal llena el arsenal.', 'Les lames étincellent. Un tintement de métal emplit l’arsenal.'), S('general', 'Aço afiado! Você tem mão para escalares.', 'Sharp steel! You have a hand for scalars.', '¡Acero afilado! Tienes mano para los escalares.', 'De l’acier affûté ! Vous avez la main pour les scalaires.')],
        [N('A lâmina estala e cai no chão, apagada.', 'The blade snaps and falls to the floor, dimmed.', 'La hoja se quiebra y cae al suelo, apagada.', 'La lame se brise et tombe à terre, éteinte.'), S('general', 'Multiplicou errado, e o aço sentiu. Multiplique TODOS os elementos, sem esquecer sinais negativos.', 'Wrong multiplication, and the steel felt it. Multiply EVERY element, and mind negative signs.', 'Multiplicaste mal y el acero lo notó. Multiplica TODOS los elementos, sin olvidar los signos negativos.', 'Mauvaise multiplication, et l’acier l’a senti. Multipliez TOUS les éléments, sans oublier les signes négatifs.')]),
    ],
  },
  'c3-boss': {
    bg: 'fort', chapter: 3, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      FX('shake'),
      N('O chão treme. Do pátio, uma torre de pedra ergue-se sobre pernas: um golem coberto de runas de multiplicação.', 'The ground shakes. From the courtyard a tower of stone rises on legs: a golem covered in multiplication runes.', 'El suelo tiembla. Desde el patio se alza una torre de piedra sobre piernas: un gólem cubierto de runas de multiplicación.', 'Le sol tremble. Dans la cour, une tour de pierre se dresse sur des jambes : un golem couvert de runes de multiplication.'),
      S('general', 'O Golem Escalar! Ele multiplica tudo o que toca, e me multiplicou por zero uma vez. NÃO o deixe encostar em você!', 'The Scalar Golem! He multiplies everything he touches, and once multiplied me by zero. DON’T let him touch you!', '¡El Gólem Escalar! Multiplica todo lo que toca, y una vez me multiplicó por cero. ¡NO dejes que te toque!', 'Le Golem Scalaire ! Il multiplie tout ce qu’il touche et m’a multiplié par zéro une fois. NE le laissez PAS vous toucher !'),
      S('m:golem', 'K... K... KA... MULTIPLICAR... TUDO... POR... ZERO...', 'K... K... KA... MULTIPLY... EVERYTHING... BY... ZERO...', 'K... K... KA... MULTIPLICAR... TODO... POR... CERO...', 'K… K… KA… MULTIPLIER… TOUT… PAR… ZÉRO…'),
      Y('Então vou responder com escalares melhores!', 'Then I’ll answer with better scalars!', '¡Entonces responderé con mejores escalares!', 'Alors je répondrai avec de meilleurs scalaires !'),
    ],
  },
  'c3-end': {
    bg: 'fort', chapter: 3, title: null, reward: { xp: 30, gold: 30 },
    steps: [
      N('O golem desmorona em blocos de pedra. No centro do escombro, um cristal âmbar arde como brasa.', 'The golem crumbles into blocks of stone. In the center of the rubble an amber crystal glows like an ember.', 'El gólem se desmorona en bloques de piedra. En el centro del escombro, un cristal ámbar arde como una brasa.', 'Le golem s’effondre en blocs de pierre. Au centre des décombres, un cristal ambré rougeoie comme une braise.'),
      SH(3, L('Fragmento da Escala', 'Shard of Scale', 'Fragmento de la Escala', 'Fragment de l’Échelle')),
      N('Ao redor, os soldados-sombra recuperam cor e peso, um a um. Alguém chora de alegria.', 'Around you, the shadow-soldiers regain color and weight, one by one. Someone weeps with joy.', 'A tu alrededor, los soldados sombra recuperan color y peso, uno a uno. Alguien llora de alegría.', 'Autour de vous, les soldats-ombres retrouvent couleur et poids, un à un. Quelqu’un pleure de joie.'),
      S('general', 'Meu forte está de pé. Devo isto a você, {name}. Leve meu estandarte. Onde ele flamula, meus homens o seguirão.', 'My fort stands. I owe you for this, {name}. Take my banner. Where it flies, my men will follow you.', 'Mi fuerte sigue en pie. Te lo debo, {name}. Toma mi estandarte. Donde ondee, mis hombres te seguirán.', 'Mon fort tient debout. Je vous le dois, {name}. Prenez mon étendard. Là où il flotte, mes hommes vous suivront.'),
      S('general', 'Uma coisa mais: Nullus já foi mago da corte da Rainha Invera. Ninguém sabe por que ele mudou. Quem sabe é a Feiticeira Speculum, na Torre dos Espelhos.', 'One more thing: Nullus was once court mage to Queen Inversa. No one knows why he changed. Sorceress Speculum, in the Tower of Mirrors, might.', 'Una cosa más: Nullus fue mago de la corte de la Reina Inversa. Nadie sabe por qué cambió. La Hechicera Speculum, en la Torre de los Espejos, quizá lo sepa.', 'Encore une chose : Nullus fut mage de cour de la Reine Inversa. Nul ne sait pourquoi il a changé. La Sorcière Speculum, dans la Tour des Miroirs, le sait peut-être.'),
    ],
  },

  /* ═══════════════ CAPÍTULO 4 — Torre dos Espelhos ═══════════════ */
  'c4-intro': {
    bg: 'tower', chapter: 4,
    title: L('Capítulo 4 — A Torre dos Espelhos', 'Chapter 4 — The Tower of Mirrors', 'Capítulo 4 — La Torre de los Espejos', 'Chapitre 4 — La Tour des Miroirs'),
    reward: { xp: 10, gold: 5 },
    steps: [
      N('Centenas de espelhos revestem a escadaria em espiral. Em cada um, {name} vê a si mesmo — mas o reflexo nunca faz o mesmo gesto.', 'Hundreds of mirrors line the spiral staircase. In each, {name} sees themselves — but the reflection never makes the same gesture.', 'Cientos de espejos revisten la escalera de caracol. En cada uno, {name} se ve a sí mismo, pero el reflejo nunca hace el mismo gesto.', 'Des centaines de miroirs tapissent l’escalier en colimaçon. Dans chacun, {name} se voit — mais le reflet ne fait jamais le même geste.'),
      S('witch', 'Não se assuste. O reflexo é só você... transposto. Linhas viram colunas; colunas viram linhas. A diagonal fica no lugar.', 'Do not be afraid. The reflection is just you... transposed. Rows become columns; columns become rows. The diagonal stays put.', 'No te asustes. El reflejo eres solo tú... transpuesto. Las filas se vuelven columnas; las columnas, filas. La diagonal se queda en su sitio.', 'N’ayez pas peur. Le reflet, c’est vous… transposé. Les lignes deviennent colonnes ; les colonnes deviennent lignes. La diagonale reste en place.'),
      S('witch', 'Sou Speculum, senhora desta torre. O General Vetor me avisou da sua chegada. Você quer saber sobre Nullus, não é?', 'I am Speculum, mistress of this tower. General Vector warned me of your coming. You want to know about Nullus, don’t you?', 'Soy Speculum, señora de esta torre. El General Vector me avisó de tu llegada. Quieres saber sobre Nullus, ¿verdad?', 'Je suis Speculum, maîtresse de cette tour. Le Général Vecteur m’a prévenue de votre venue. Vous voulez en savoir plus sur Nullus, n’est-ce pas ?'),
      S('alchemist', 'Speculum! Ainda tem aquele chá horrível de violetas?', 'Speculum! Do you still have that horrible violet tea?', '¡Speculum! ¿Todavía tienes ese horrible té de violetas?', 'Speculum ! Vous avez toujours cet affreux thé de violettes ?'),
      S('witch', 'Primeiro, as lições do espelho. Quem não entende o reflexo não entende a simetria — e sem simetria, não se vence o que Nullus se tornou.', 'First, the mirror’s lessons. Who does not understand reflection does not understand symmetry — and without symmetry you cannot defeat what Nullus has become.', 'Primero, las lecciones del espejo. Quien no entiende el reflejo no entiende la simetría, y sin simetría no se vence a lo que Nullus se ha vuelto.', 'D’abord, les leçons du miroir. Qui ne comprend pas le reflet ne comprend pas la symétrie — et sans symétrie, on ne vainc pas ce que Nullus est devenu.'),
    ],
  },
  'c4-mid': {
    bg: 'tower', chapter: 4, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      N('No topo da escada, um espelho maior que os outros mostra... outra cena. Um jovem de olhar triste, de capa cinzenta, num campo coberto de cinzas.', 'At the top of the stairs a mirror larger than the rest shows... another scene. A young man with sad eyes in a gray cloak, on a field covered in ash.', 'En lo alto de la escalera, un espejo mayor que los demás muestra... otra escena. Un joven de mirada triste, con capa gris, en un campo cubierto de cenizas.', 'En haut de l’escalier, un miroir plus grand que les autres montre… une autre scène. Un jeune homme au regard triste, cape grise, dans un champ couvert de cendres.'),
      S('witch', 'Este é Nullus, antes da queda. Era meu aprendiz. Eu, o Oráculo do Labirinto e ele fomos os três discípulos do antigo mestre da Rainha.', 'This is Nullus before the fall. He was my apprentice. The Oracle of the Labyrinth, he and I were the three disciples of the Queen’s old master.', 'Este es Nullus antes de la caída. Era mi aprendiz. El Oráculo del Laberinto, él y yo fuimos los tres discípulos del antiguo maestro de la Reina.', 'Voici Nullus avant la chute. C’était mon apprenti. L’Oracle du Labyrinthe, lui et moi étions les trois disciples de l’ancien maître de la Reine.'),
      CH('mirror', [
        OPT('look', L('Mergulhar na visão do espelho.', 'Dive into the mirror’s vision.', 'Sumergirse en la visión del espejo.', 'Plonger dans la vision du miroir.'), {
          set: { saw_vision: true },
          reply: [N('O espelho engole você. Uma vila em chamas: erros que não podiam ser desfeitos. Uma criança chorando, um jovem prometendo: “Nunca mais ninguém vai perder nada.”', 'The mirror swallows you. A village burning: mistakes that could not be undone. A child weeping, a young man promising: “Never again will anyone lose anything.”', 'El espejo te traga. Una aldea en llamas: errores que no se podían deshacer. Un niño llorando, un joven prometiendo: “Nunca más nadie perderá nada.”', 'Le miroir vous avale. Un village en flammes : des erreurs irréparables. Un enfant en pleurs, un jeune homme qui promet : « Plus jamais personne ne perdra rien. »'), Y('Ele não queria destruir... queria impedir a dor.', 'He did not want to destroy... he wanted to stop the pain.', 'No quería destruir... quería evitar el dolor.', 'Il ne voulait pas détruire… il voulait empêcher la douleur.')],
        }),
        OPT('refuse', L('Recusar. Ouvir apenas Speculum.', 'Refuse. Listen only to Speculum.', 'Rechazar. Escuchar solo a Speculum.', 'Refuser. Écouter seulement Speculum.'), {
          set: { saw_vision: false },
          reply: [S('witch', 'Prudente. Direi o essencial: ele perdeu alguém por um erro impossível de desfazer, e jurou apagar todo erro apagando tudo. Zero não erra.', 'Prudent. I’ll say the essentials: he lost someone through an error that could not be undone, and swore to erase every error by erasing everything. Zero makes no mistakes.', 'Prudente. Diré lo esencial: perdió a alguien por un error imposible de deshacer, y juró borrar todo error borrándolo todo. El cero no se equivoca.', 'Prudent. Je vous dirai l’essentiel : il a perdu quelqu’un à cause d’une erreur irréparable et a juré d’effacer toute erreur en effaçant tout. Le zéro ne se trompe pas.')],
        }),
      ]),
      S('witch', 'Antes de subir ao topo, um teste do espelho: se A tem certa ordem, qual a ordem do reflexo?', 'Before ascending to the top, a mirror test: if A has a certain order, what is the order of its reflection?', 'Antes de subir a la cima, una prueba del espejo: si A tiene cierto orden, ¿cuál es el orden de su reflejo?', 'Avant de monter au sommet, un test du miroir : si A a un certain ordre, quel est l’ordre de son reflet ?'),
      PZ('transposeDim',
        [S('witch', 'Isso mesmo. O reflexo inverte linhas e colunas. Suba.', 'Exactly. The reflection swaps rows and columns. Go up.', 'Exacto. El reflejo invierte filas y columnas. Sube.', 'Exactement. Le reflet échange lignes et colonnes. Montez.')],
        [S('witch', 'O espelho trincou de leve. Lembre: m × n vira n × m. Suba mesmo assim.', 'The mirror cracked slightly. Remember: m × n becomes n × m. Go up anyway.', 'El espejo se agrietó un poco. Recuerda: m × n pasa a n × m. Sube igualmente.', 'Le miroir s’est un peu fêlé. Rappelez-vous : m × n devient n × m. Montez quand même.')]),
    ],
  },
  'c4-boss': {
    bg: 'tower', chapter: 4, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      FX('flash'),
      N('No topo, todos os espelhos estilhaçam ao mesmo tempo. Das lascas, um bando de asas roxas ganha forma.', 'At the top, all the mirrors shatter at once. From the shards a swarm of purple wings takes shape.', 'En lo alto, todos los espejos estallan a la vez. De las esquirlas cobra forma una bandada de alas moradas.', 'Au sommet, tous les miroirs éclatent en même temps. Des éclats prend forme une nuée d’ailes violettes.'),
      S('m:bat', 'Sou o reflexo de tudo que você teme... e você é o reflexo do meu medo!', 'I am the reflection of all you fear... and you are the reflection of my fear!', '¡Soy el reflejo de todo lo que temes... y tú eres el reflejo de mi miedo!', 'Je suis le reflet de tout ce que vous craignez… et vous êtes le reflet de ma peur !'),
      S('witch', 'Ele imita todos os seus golpes, transpostos. Pense antes de agir, {name}: (Aᵀ)ᵀ = A. Reflita o reflexo!', 'He mimics all your blows, transposed. Think before you act, {name}: (Aᵀ)ᵀ = A. Reflect the reflection!', 'Imita todos tus golpes, traspuestos. Piensa antes de actuar, {name}: (Aᵀ)ᵀ = A. ¡Refleja el reflejo!', 'Il imite tous vos coups, transposés. Réfléchissez avant d’agir, {name} : (Aᵀ)ᵀ = A. Reflétez le reflet !'),
    ],
  },
  'c4-end': {
    bg: 'tower', chapter: 4, title: null, reward: { xp: 30, gold: 30 },
    steps: [
      N('O morcego se despedaça em faíscas roxas. Um cristal violeta, perfeitamente simétrico, paira no ar.', 'The bat shatters into purple sparks. A violet crystal, perfectly symmetrical, hovers in the air.', 'El murciélago se hace añicos en chispas moradas. Un cristal violeta, perfectamente simétrico, flota en el aire.', 'La chauve-souris éclate en étincelles violettes. Un cristal violet, parfaitement symétrique, flotte dans l’air.'),
      SH(4, L('Fragmento do Espelho', 'Shard of the Mirror', 'Fragmento del Espejo', 'Fragment du Miroir')),
      S('witch', 'Quatro Fragmentos... Sinto a Grande Matriz recuperar simetria. Leve também este espelho de bolso: ele mostra o que os olhos não veem.', 'Four Shards... I feel the Great Matrix regain symmetry. Take this pocket mirror too: it shows what eyes cannot see.', 'Cuatro Fragmentos... Siento que la Gran Matriz recupera la simetría. Lleva también este espejo de bolsillo: muestra lo que los ojos no ven.', 'Quatre Fragments… Je sens la Grande Matrice retrouver sa symétrie. Prenez aussi ce miroir de poche : il montre ce que les yeux ne voient pas.'),
      IF('saw_vision', true, [S('witch', 'Você viu a dor dele e não fugiu. Guarde isso: no fim, isso pode valer mais do que qualquer feitiço.', 'You saw his pain and did not flee. Keep that: in the end it may be worth more than any spell.', 'Viste su dolor y no huiste. Guárdalo: al final puede valer más que cualquier hechizo.', 'Vous avez vu sa douleur sans fuir. Gardez cela : à la fin, cela pourrait valoir plus que n’importe quel sort.')]),
      S('witch', 'Agora vá à Forja de Brogar, nas Montanhas de Ferro. Para chegar ao Labirinto é preciso uma chave forjada por um PRODUTO de matrizes.', 'Now go to Brogar’s Forge in the Iron Mountains. To reach the Labyrinth you need a key forged by a PRODUCT of matrices.', 'Ahora ve a la Forja de Brogar, en las Montañas de Hierro. Para llegar al Laberinto hace falta una llave forjada por un PRODUCTO de matrices.', 'Maintenant rendez-vous à la Forge de Brogar, dans les Monts de Fer. Pour atteindre le Labyrinthe, il faut une clé forgée par un PRODUIT de matrices.'),
    ],
  },

  /* ═══════════════ CAPÍTULO 5 — Forja da Multiplicação ═══════════════ */
  'c5-intro': {
    bg: 'forge', chapter: 5,
    title: L('Capítulo 5 — A Forja da Multiplicação', 'Chapter 5 — The Forge of Multiplication', 'Capítulo 5 — La Forja de la Multiplicación', 'Chapitre 5 — La Forge de la Multiplication'),
    reward: { xp: 10, gold: 5 },
    steps: [
      N('Dentro da montanha, rios de lava iluminam uma forja colossal. Marteladas ecoam como trovões.', 'Inside the mountain, rivers of lava light a colossal forge. Hammer blows echo like thunder.', 'Dentro de la montaña, ríos de lava iluminan una forja colosal. Los martillazos retumban como truenos.', 'Dans la montagne, des rivières de lave éclairent une forge colossale. Les coups de marteau résonnent comme le tonnerre.'),
      S('dwarf', 'BAH! Mais um aprendiz magricela! Diga: sabe multiplicar matrizes? Não é elemento por elemento, moleque. É LINHA de A contra COLUNA de B!', 'BAH! Another scrawny apprentice! Tell me: can you multiply matrices? It’s not entry by entry, lad. It’s ROW of A against COLUMN of B!', '¡BAH! ¡Otro aprendiz flacucho! Dime: ¿sabes multiplicar matrices? No es elemento por elemento, muchacho. ¡Es FILA de A contra COLUMNA de B!', 'BAH ! Encore un apprenti maigrichon ! Dites : savez-vous multiplier des matrices ? Ce n’est pas terme à terme, gamin. C’est LIGNE de A contre COLONNE de B !'),
      IF('temper', 'brave', [S('dwarf', 'Hm. Olhar firme. Talvez você aguente o calor.', 'Hm. Steady eyes. Perhaps you can take the heat.', 'Hm. Mirada firme. Quizá aguantes el calor.', 'Hm. Regard ferme. Peut-être supporterez-vous la chaleur.')]),
      IF('temper', 'cunning', [S('dwarf', 'Esse sorriso de quem procura atalho não vai funcionar na minha forja, garoto.', 'That smile of someone hunting shortcuts won’t work in my forge, boy.', 'Esa sonrisa de quien busca atajos no funcionará en mi forja, chico.', 'Ce sourire de celui qui cherche des raccourcis ne marchera pas dans ma forge, gamin.')]),
      S('dwarf', 'Forjo uma chave para o Labirinto. Ela precisa de um Fragmento moldado por um produto. Mas o Dragão da Forja acordou e roubou meu carvão. Cuide dele e eu cuido do aço!', 'I forge a key for the Labyrinth. It needs a Shard shaped by a product. But the Forge Dragon woke up and stole my coal. Deal with him and I’ll deal with the steel!', 'Forjo una llave para el Laberinto. Necesita un Fragmento moldeado por un producto. Pero el Dragón de la Forja despertó y robó mi carbón. ¡Encárgate de él y yo me encargo del acero!', 'Je forge une clé pour le Labyrinthe. Il lui faut un Fragment façonné par un produit. Mais le Dragon de la Forge s’est réveillé et a volé mon charbon. Occupez-vous de lui, je m’occupe de l’acier !'),
    ],
  },
  'c5-mid': {
    bg: 'forge', chapter: 5, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      FX('sparks'),
      N('Brogar puxa uma barra incandescente da fornalha e a apoia na bigorna.', 'Brogar pulls a glowing bar from the furnace and lays it on the anvil.', 'Brogar saca una barra incandescente del horno y la apoya en el yunque.', 'Brogar tire une barre incandescente de la fournaise et la pose sur l’enclume.'),
      S('dwarf', 'Que metal usaremos para a lâmina que vai enfrentar o Zero?', 'What metal shall we use for the blade that will face the Zero?', '¿Qué metal usaremos para la hoja que enfrentará al Cero?', 'Quel métal utiliserons-nous pour la lame qui affrontera le Zéro ?'),
      CH('metal', [
        OPT('iron', L('Ferro: firme e confiável.', 'Iron: sturdy and reliable.', 'Hierro: firme y confiable.', 'Fer : robuste et fiable.'), { reward: { items: { shield: 1 } }, reply: [S('dwarf', 'Ferro honesto! Toma, um escudo extra de brinde.', 'Honest iron! Here, a spare shield as a gift.', '¡Hierro honesto! Toma, un escudo extra de regalo.', 'Du fer honnête ! Tenez, un bouclier de plus en cadeau.')] }),
        OPT('silver', L('Prata: cara ao que é arcano.', 'Silver: dear to the arcane.', 'Plata: querida a lo arcano.', 'Argent : cher à l’arcane.'), { reward: { items: { hint: 2 } }, reply: [S('dwarf', 'Prata! Ela guarda o eco das runas. Duas dicas gravadas no cabo.', 'Silver! It keeps the echo of runes. Two hints engraved on the hilt.', '¡Plata! Guarda el eco de las runas. Dos pistas grabadas en la empuñadura.', 'De l’argent ! Il garde l’écho des runes. Deux indices gravés sur la garde.')] }),
        OPT('gold', L('Ouro: vale muito.', 'Gold: worth a lot.', 'Oro: vale mucho.', 'Or : de grande valeur.'), { reward: { gold: 40 }, reply: [S('dwarf', 'Ouro! Mole demais para lâmina, mas eu o derreto e vendo o resto. 40 moedas para você!', 'Gold! Too soft for a blade, but I’ll melt it and sell the rest. 40 coins for you!', '¡Oro! Demasiado blando para una hoja, pero lo fundo y vendo el resto. ¡40 monedas para ti!', 'De l’or ! Trop mou pour une lame, mais je le fonds et je vends le reste. 40 pièces pour vous !')] }),
      ]),
      S('dwarf', 'Agora, teste de forjador: o produto A·B existe se... e tem que ordem? Responda!', 'Now a smith’s test: the product A·B exists if... and has what order? Answer!', 'Ahora, prueba de herrero: el producto A·B existe si... ¿y qué orden tiene? ¡Responde!', 'Maintenant, épreuve de forgeron : le produit A·B existe si… et il a quel ordre ? Répondez !'),
      PZ('mulOrder',
        [S('dwarf', 'Martelo certeiro! O “miolo” n encaixou. Sabe medir aço, garoto.', 'A true hammer-blow! The “inner” n fit. You know how to measure steel, lad.', '¡Martillazo certero! El “interior” n encajó. Sabes medir el acero, muchacho.', 'Coup de marteau précis ! Le « milieu » n s’emboîte. Vous savez mesurer l’acier, gamin.')],
        [S('dwarf', 'Bah! Colunas de A precisam igualar linhas de B. Sempre! Aprenda antes de tocar meu martelo.', 'Bah! Columns of A must equal rows of B. Always! Learn before you touch my hammer.', '¡Bah! Las columnas de A deben igualar las filas de B. ¡Siempre! Aprende antes de tocar mi martillo.', 'Bah ! Les colonnes de A doivent égaler les lignes de B. Toujours ! Apprenez avant de toucher mon marteau.')]),
    ],
  },
  'c5-boss': {
    bg: 'forge', chapter: 5, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      FX('shake'),
      N('A lava se agita. Do fundo da fornalha, dois olhos dourados se abrem: um dragão de escamas rubras, mastigando carvão.', 'The lava stirs. From the depths of the furnace two golden eyes open: a red-scaled dragon, chewing coal.', 'La lava se agita. Del fondo del horno se abren dos ojos dorados: un dragón de escamas rojas, masticando carbón.', 'La lave s’agite. Au fond de la fournaise, deux yeux dorés s’ouvrent : un dragon aux écailles rouges, mâchant du charbon.'),
      S('m:dragon', 'Quem ousa perturbar meu sono? O Zero me prometeu tesouros se eu guardasse esta forja... Ele mentiu, mas agora tenho fome.', 'Who dares disturb my sleep? The Zero promised me treasure if I guarded this forge... He lied, but now I’m hungry.', '¿Quién osa perturbar mi sueño? El Cero me prometió tesoros si guardaba esta forja... Mintió, pero ahora tengo hambre.', 'Qui ose troubler mon sommeil ? Le Zéro m’a promis des trésors si je gardais cette forge… Il a menti, mais j’ai faim maintenant.'),
      S('dwarf', 'Não dá para razoar com dragão faminto. Faça o produto certo e o feitiço quebra!', 'You can’t reason with a hungry dragon. Do the product right and the spell breaks!', 'No se puede razonar con un dragón hambriento. ¡Haz el producto correcto y el hechizo se rompe!', 'On ne raisonne pas avec un dragon affamé. Faites le bon produit et le sort se brise !'),
    ],
  },
  'c5-end': {
    bg: 'forge', chapter: 5, title: null, reward: { xp: 35, gold: 35 },
    steps: [
      N('O dragão encolhe até caber na palma da mão de Brogar. Da fornalha, um cristal alaranjado emerge, vivo como fogo.', 'The dragon shrinks until it fits in Brogar’s palm. From the furnace an orange crystal emerges, alive as fire.', 'El dragón se encoge hasta caber en la palma de Brogar. Del horno emerge un cristal anaranjado, vivo como el fuego.', 'Le dragon rétrécit jusqu’à tenir dans la paume de Brogar. De la fournaise émerge un cristal orangé, vivant comme le feu.'),
      SH(5, L('Fragmento do Produto', 'Shard of the Product', 'Fragmento del Producto', 'Fragment du Produit')),
      S('dwarf', 'Ha! Um dragão de estimação! Vou chamá-lo de A·B... e nunca de B·A, que não é a mesma coisa!', 'Ha! A pet dragon! I’ll call him A·B... and never B·A, which isn’t the same thing!', '¡Ja! ¡Un dragón mascota! Lo llamaré A·B... y nunca B·A, que no es lo mismo.', 'Ha ! Un dragon de compagnie ! Je l’appellerai A·B… et jamais B·A, ce n’est pas la même chose !'),
      S('dwarf', 'Aqui está sua Lâmina de Produto e a chave do Labirinto. Que o aço cumpra o prometido... e que você também, garoto.', 'Here is your Blade of Product and the key to the Labyrinth. May the steel keep its promise... and may you.', 'Aquí tienes tu Hoja de Producto y la llave del Laberinto. Que el acero cumpla lo prometido... y tú también.', 'Voici votre Lame de Produit et la clé du Labyrinthe. Que l’acier tienne sa promesse… et vous aussi, gamin.'),
      S('dwarf', 'Cuidado lá dentro: o Labirinto é feito de paredes de determinantes. Zero é parede; diferente de zero é porta.', 'Careful in there: the Labyrinth is made of determinant walls. Zero is a wall; nonzero is a door.', 'Cuidado allí dentro: el Laberinto está hecho de muros de determinantes. Cero es muro; distinto de cero es puerta.', 'Prudence là-dedans : le Labyrinthe est fait de murs de déterminants. Zéro, c’est un mur ; non nul, c’est une porte.'),
    ],
  },

  /* ═══════════════ CAPÍTULO 6 — Labirinto dos Determinantes ═══════════════ */
  'c6-intro': {
    bg: 'maze', chapter: 6,
    title: L('Capítulo 6 — O Labirinto dos Determinantes', 'Chapter 6 — The Labyrinth of Determinants', 'Capítulo 6 — El Laberinto de los Determinantes', 'Chapitre 6 — Le Labyrinthe des Déterminants'),
    reward: { xp: 10, gold: 5 },
    steps: [
      N('A chave gira e os portões de pedra se abrem. Dentro, corredores verdes e azuis se dobram sobre si mesmos, e uma névoa fria cheira a números.', 'The key turns and the stone gates open. Inside, green and blue corridors fold over themselves, and a cold mist smells of numbers.', 'La llave gira y las puertas de piedra se abren. Dentro, pasillos verdes y azules se pliegan sobre sí mismos, y una niebla fría huele a números.', 'La clé tourne et les portes de pierre s’ouvrent. À l’intérieur, des couloirs verts et bleus se replient sur eux-mêmes, et une brume froide sent les nombres.'),
      S('oracle', 'Eu já sabia que viria. Vi seu determinante muito antes de você nascer. Sou Determinus.', 'I knew you would come. I saw your determinant long before you were born. I am Determinus.', 'Ya sabía que vendrías. Vi tu determinante mucho antes de que nacieras. Soy Determinus.', 'Je savais que vous viendriez. J’ai vu votre déterminant bien avant votre naissance. Je suis Determinus.'),
      S('oracle', 'Cada parede aqui é um determinante. Igual a zero: parede, sem volta. Diferente de zero: porta, com inversa. Aprenda a medir, ou vagará para sempre.', 'Every wall here is a determinant. Equal to zero: wall, no way back. Nonzero: door, with an inverse. Learn to measure, or wander forever.', 'Cada muro aquí es un determinante. Igual a cero: muro, sin retorno. Distinto de cero: puerta, con inversa. Aprende a medir o vagarás para siempre.', 'Chaque mur ici est un déterminant. Égal à zéro : mur, sans retour. Non nul : porte, avec inverse. Apprenez à mesurer, ou vous errerez pour toujours.'),
    ],
  },
  'c6-mid': {
    bg: 'maze', chapter: 6, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      N('Na encruzilhada do meio, o Oráculo se senta num banco de pedra. Seus olhos brilham em ciano.', 'At the central crossroads the Oracle sits on a stone bench. His eyes glow cyan.', 'En la encrucijada central, el Oráculo se sienta en un banco de piedra. Sus ojos brillan en cian.', 'Au carrefour central, l’Oracle s’assoit sur un banc de pierre. Ses yeux brillent en cyan.'),
      S('oracle', 'Nullus, Speculum e eu fomos irmãos de mestre. Ele perdeu alguém por um erro que não pôde ser refeito, e concluiu que um mundo Zero não pode ser ferido.', 'Nullus, Speculum and I were siblings in mastery. He lost someone to an error that could not be redone, and concluded that a Zero world cannot be hurt.', 'Nullus, Speculum y yo fuimos hermanos de maestro. Perdió a alguien por un error que no pudo rehacerse, y concluyó que un mundo Cero no puede ser herido.', 'Nullus, Speculum et moi étions frères de maître. Il a perdu quelqu’un à cause d’une erreur irréparable et en a conclu qu’un monde Zéro ne peut être blessé.'),
      CH('pity', [
        OPT('pity', L('“Ele sofreu. Merece ser ouvido.”', '“He suffered. He deserves to be heard.”', '“Sufrió. Merece ser escuchado.”', '« Il a souffert. Il mérite d’être écouté. »'), { set: { pity_nullus: true }, reply: [S('oracle', 'Compaixão... o único determinante que nunca vale zero.', 'Compassion... the only determinant that is never zero.', 'Compasión... el único determinante que nunca vale cero.', 'La compassion… le seul déterminant qui ne vaut jamais zéro.')] }),
        OPT('resolve', L('“Dor não justifica apagar o mundo.”', '“Pain does not justify erasing the world.”', '“El dolor no justifica borrar el mundo.”', '« La douleur ne justifie pas d’effacer le monde. »'), { set: { pity_nullus: false }, reply: [S('oracle', 'Firme como um determinante unitário. Que assim seja.', 'Firm as a unit determinant. So be it.', 'Firme como un determinante unitario. Que así sea.', 'Ferme comme un déterminant unitaire. Qu’il en soit ainsi.')] }),
      ]),
      S('oracle', 'Agora prove que sabe medir. Uma parede à frente: será porta ou parede?', 'Now prove you can measure. A wall ahead: will it be door or wall?', 'Ahora demuestra que sabes medir. Un muro adelante: ¿será puerta o muro?', 'Prouvez maintenant que vous savez mesurer. Un mur devant vous : sera-t-il porte ou mur ?'),
      PZ('det2',
        [N('A parede se dissolve em fumaça azul. Um corredor novo se abre.', 'The wall dissolves into blue smoke. A new corridor opens.', 'El muro se disuelve en humo azul. Se abre un pasillo nuevo.', 'Le mur se dissout en fumée bleue. Un nouveau couloir s’ouvre.')],
        [N('A parede se fecha com um estrondo, mas o Oráculo abre uma passagem lateral.', 'The wall slams shut, but the Oracle opens a side passage.', 'El muro se cierra con estruendo, pero el Oráculo abre un pasaje lateral.', 'Le mur se referme avec fracas, mais l’Oracle ouvre un passage latéral.'), S('oracle', 'Refaça a conta: ad − bc. Nunca o contrário.', 'Redo the computation: ad − bc. Never the reverse.', 'Rehaz la cuenta: ad − bc. Nunca al revés.', 'Refaites le calcul : ad − bc. Jamais l’inverse.')]),
    ],
  },
  'c6-boss': {
    bg: 'maze', chapter: 6, title: null, reward: { xp: 10, gold: 5 },
    steps: [
      FX('flash'),
      N('No coração do Labirinto, teias prateadas cobrem o teto. Oito olhos ciano se acendem.', 'In the heart of the Labyrinth, silver webs cover the ceiling. Eight cyan eyes light up.', 'En el corazón del Laberinto, telarañas plateadas cubren el techo. Se encienden ocho ojos cian.', 'Au cœur du Labyrinthe, des toiles d’argent couvrent le plafond. Huit yeux cyan s’allument.'),
      S('m:spider', 'Cada fio da minha teia é um zero. Cada passo seu... uma linha nula.', 'Each thread of my web is a zero. Each step of yours... a null row.', 'Cada hilo de mi telaraña es un cero. Cada paso tuyo... una fila nula.', 'Chaque fil de ma toile est un zéro. Chacun de vos pas… une ligne nulle.'),
      S('oracle', 'Linha nula, determinante zero. Mas você tem a Sarrus e as propriedades. Vá, {name}: mostre a ela um determinante que sobrevive.', 'Null row, zero determinant. But you have Sarrus and the properties. Go, {name}: show her a determinant that survives.', 'Fila nula, determinante cero. Pero tienes Sarrus y las propiedades. Ve, {name}: muéstrale un determinante que sobrevive.', 'Ligne nulle, déterminant zéro. Mais vous avez Sarrus et les propriétés. Allez, {name} : montrez-lui un déterminant qui survit.'),
    ],
  },
  'c6-end': {
    bg: 'maze', chapter: 6, title: null, reward: { xp: 40, gold: 40 },
    steps: [
      N('A aranha se desfaz em fios de luz. No centro do labirinto, um cristal turquesa gira em silêncio.', 'The spider unravels into threads of light. At the center of the labyrinth a turquoise crystal spins in silence.', 'La araña se deshace en hilos de luz. En el centro del laberinto, un cristal turquesa gira en silencio.', 'L’araignée se défait en fils de lumière. Au centre du labyrinthe, un cristal turquoise tourne en silence.'),
      SH(6, L('Fragmento do Determinante', 'Shard of the Determinant', 'Fragmento del Determinante', 'Fragment du Déterminant')),
      S('oracle', 'Seis Fragmentos. A Grande Matriz quase respira de novo. Mas o Zero já cercou o Trono.', 'Six Shards. The Great Matrix almost breathes again. But the Zero has already surrounded the Throne.', 'Seis Fragmentos. La Gran Matriz casi respira otra vez. Pero el Cero ya ha rodeado el Trono.', 'Six Fragments. La Grande Matrice respire presque de nouveau. Mais le Zéro a déjà encerclé le Trône.'),
      S('oracle', 'Ouça, {name}: um determinante zero não tem volta. A única forma de desfazer o Zero é a Inversa: só ela desfaz um feitiço, desde que o determinante seja diferente de zero.', 'Listen, {name}: a zero determinant has no way back. The only way to undo the Zero is the Inverse: it alone undoes a spell, provided the determinant is nonzero.', 'Escucha, {name}: un determinante cero no tiene retorno. La única forma de deshacer el Cero es la Inversa: solo ella deshace un hechizo, siempre que el determinante sea distinto de cero.', 'Écoutez, {name} : un déterminant nul n’a pas de retour. La seule façon de défaire le Zéro est l’Inverse : elle seule défait un sort, pourvu que le déterminant soit non nul.'),
      S('oracle', 'Vá à Rainha Invera. Ela guarda o último Fragmento... e o segredo de Nullus.', 'Go to Queen Inversa. She keeps the last Shard... and Nullus’s secret.', 'Ve con la Reina Inversa. Ella guarda el último Fragmento... y el secreto de Nullus.', 'Allez auprès de la Reine Inversa. Elle garde le dernier Fragment… et le secret de Nullus.'),
    ],
  },

  /* ═══════════════ CAPÍTULO 7 — O Trono da Inversa ═══════════════ */
  'c7-intro': {
    bg: 'throne', chapter: 7,
    title: L('Capítulo 7 — O Trono da Inversa', 'Chapter 7 — The Throne of the Inverse', 'Capítulo 7 — El Trono de la Inversa', 'Chapitre 7 — Le Trône de l’Inverse'),
    reward: { xp: 10, gold: 10 },
    steps: [
      N('O grande salão do castelo está quase vazio. Colunas se dissolvem em névoa cinza. No trono, uma rainha translúcida ergue os olhos.', 'The castle’s great hall is nearly empty. Columns dissolve into gray mist. On the throne a translucent queen raises her eyes.', 'El gran salón del castillo está casi vacío. Las columnas se disuelven en niebla gris. En el trono, una reina translúcida alza la mirada.', 'La grande salle du château est presque vide. Les colonnes se dissolvent en brume grise. Sur le trône, une reine translucide lève les yeux.'),
      S('queen', 'Você conseguiu... Sou a Rainha Invera. Cada momento que passa, eu me apago um pouco mais. Nullus me tocou com o Zero, mas ainda resisto.', 'You made it... I am Queen Inversa. With every passing moment I fade a little more. Nullus touched me with the Zero, but I still resist.', 'Lo lograste... Soy la Reina Inversa. Con cada momento que pasa me apago un poco más. Nullus me tocó con el Cero, pero aún resisto.', 'Vous y êtes arrivé… Je suis la Reine Inversa. À chaque instant je m’efface un peu plus. Nullus m’a touchée du Zéro, mais je résiste encore.'),
      S('alchemist', 'Vossa Majestade! Trouxe minhas poções mais estáveis. Ainda não explodiram... hoje.', 'Your Majesty! I brought my most stable potions. They haven’t exploded yet... today.', '¡Majestad! Traje mis pociones más estables. Aún no han explotado... hoy.', 'Votre Majesté ! J’ai apporté mes potions les plus stables. Elles n’ont pas encore explosé… aujourd’hui.'),
      S('queen', 'Para desfazer o Zero é preciso a Inversa: A · A⁻¹ = I. Só existe se o determinante for diferente de zero. É uma esperança... e uma condição.', 'To undo the Zero you need the Inverse: A · A⁻¹ = I. It exists only if the determinant is nonzero. A hope... and a condition.', 'Para deshacer el Cero hace falta la Inversa: A · A⁻¹ = I. Solo existe si el determinante es distinto de cero. Una esperanza... y una condición.', 'Pour défaire le Zéro, il faut l’Inverse : A · A⁻¹ = I. Elle n’existe que si le déterminant est non nul. Un espoir… et une condition.'),
      S('queen', 'Estude comigo a última arte. Depois, reúna os Fragmentos. Ele virá.', 'Study the final art with me. Then gather the Shards. He will come.', 'Estudia conmigo el último arte. Luego reúne los Fragmentos. Él vendrá.', 'Étudiez avec moi l’ultime art. Ensuite, réunissez les Fragments. Il viendra.'),
    ],
  },
  'c7-mid': {
    bg: 'throne', chapter: 7, title: null, reward: { xp: 15, gold: 10 },
    steps: [
      FX('thunder'),
      N('As portas do salão se abrem sozinhas. Uma silhueta cinzenta entra flutuando, sem tocar o chão.', 'The hall doors open by themselves. A gray silhouette drifts in without touching the floor.', 'Las puertas del salón se abren solas. Una silueta gris entra flotando sin tocar el suelo.', 'Les portes de la salle s’ouvrent seules. Une silhouette grise entre en flottant sans toucher le sol.'),
      S('nullus', 'Então você é o aprendiz que vem colecionando meus Fragmentos. Interessante. Diga: por que insiste em consertar o mundo?', 'So you are the apprentice collecting my Shards. Interesting. Tell me: why do you insist on fixing the world?', 'Así que eres el aprendiz que colecciona mis Fragmentos. Interesante. Dime: ¿por qué insistes en arreglar el mundo?', 'Ainsi vous êtes l’apprenti qui collectionne mes Fragments. Intéressant. Dites : pourquoi insistez-vous à réparer le monde ?'),
      IF('temper', 'brave', [Y('Porque alguém precisa detê-lo.', 'Because someone must stop you.', 'Porque alguien debe detenerte.', 'Parce que quelqu’un doit vous arrêter.')]),
      IF('temper', 'wise', [Y('Porque quero entender o que você não entendeu: que erros podem ser corrigidos.', 'Because I want to understand what you did not: that mistakes can be corrected.', 'Porque quiero entender lo que tú no entendiste: que los errores pueden corregirse.', 'Parce que je veux comprendre ce que vous n’avez pas compris : les erreurs peuvent se corriger.')]),
      IF('temper', 'cunning', [Y('Porque um mundo Zero é um péssimo negócio. Ninguém compra nada.', 'Because a Zero world is a terrible business. Nobody buys anything.', 'Porque un mundo Cero es un pésimo negocio. Nadie compra nada.', 'Parce qu’un monde Zéro est un très mauvais commerce. Personne n’achète rien.')]),
      S('nullus', 'Errar dói. Perder dói. O Zero é a única matriz que não perde nada, porque não tem nada a perder. É a paz, criança!', 'Erring hurts. Losing hurts. Zero is the only matrix that loses nothing, because it has nothing to lose. It is peace, child!', 'Errar duele. Perder duele. El Cero es la única matriz que no pierde nada, porque no tiene nada que perder. ¡Es la paz, niño!', 'Se tromper fait mal. Perdre fait mal. Le Zéro est la seule matrice qui ne perd rien, car elle n’a rien à perdre. C’est la paix, enfant !'),
      IF('saw_vision', true, [Y('Eu vi o que você viu, Nullus. A vila em chamas. Sinto muito pela criança.', 'I saw what you saw, Nullus. The burning village. I am sorry for the child.', 'Vi lo que tú viste, Nullus. La aldea en llamas. Lamento lo del niño.', 'J’ai vu ce que vous avez vu, Nullus. Le village en flammes. Je suis désolé pour l’enfant.'), S('nullus', '... Você... viu? Ninguém nunca quis ver. Ninguém...', '... You... saw? Nobody ever wanted to see. Nobody...', '... ¿Tú... viste? Nadie quiso ver jamás. Nadie...', '… Vous… avez vu ? Personne n’a jamais voulu voir. Personne…')]),
      S('nullus', 'Não importa. Aqui, prove o seu valor: complete esta inversa e eu talvez ouça o seu argumento.', 'It does not matter. Here, prove your worth: complete this inverse and perhaps I will hear your argument.', 'No importa. Aquí, demuestra tu valor: completa esta inversa y quizá escuche tu argumento.', 'Peu importe. Voici, prouvez votre valeur : complétez cette inverse et j’écouterai peut-être votre argument.'),
      PZ('inv2',
        [S('nullus', 'Você sabe desfazer. Como eu queria ter sabido... há muito tempo.', 'You know how to undo. How I wish I had known... long ago.', 'Sabes deshacer. Cuánto quisiera haberlo sabido... hace mucho.', 'Vous savez défaire. Comme j’aurais aimé le savoir… il y a longtemps.')],
        [S('nullus', 'Errou. Viu? Erros doem. Por isso o Zero é melhor.', 'You erred. See? Mistakes hurt. That’s why Zero is better.', 'Fallaste. ¿Ves? Los errores duelen. Por eso el Cero es mejor.', 'Vous vous êtes trompé. Voyez ? Les erreurs font mal. C’est pourquoi le Zéro est mieux.'), Y('Errar é como aprendemos. Vou provar isso.', 'Erring is how we learn. I’ll prove it.', 'Errar es como se aprende. Voy a demostrarlo.', 'Se tromper, c’est ainsi qu’on apprend. Je vais le prouver.')]),
    ],
  },
  'c7-boss': {
    bg: 'throne', chapter: 7, title: null, reward: { xp: 15, gold: 10 },
    steps: [
      FX('flash'),
      N('Os seis Fragmentos flutuam até o centro do salão e formam uma tábua de runas incompleta. Falta o sétimo, guardado pela Rainha. Ela o entrega a {name}.', 'The six Shards float to the center of the hall and form an incomplete tablet of runes. The seventh is missing, kept by the Queen. She hands it to {name}.', 'Los seis Fragmentos flotan hasta el centro del salón y forman una tabla de runas incompleta. Falta el séptimo, guardado por la Reina. Ella se lo entrega a {name}.', 'Les six Fragments flottent au centre de la salle et forment une tablette de runes incomplète. Il manque le septième, gardé par la Reine. Elle le remet à {name}.'),
      SH(7, L('Fragmento da Inversa', 'Shard of the Inverse', 'Fragmento de la Inversa', 'Fragment de l’Inverse')),
      FX('shake'),
      N('A Grande Matriz se reforma, brilhando. Nullus grita. O Zero se contorce dentro dele, e seu corpo se transforma no Lich Inverso.', 'The Great Matrix re-forms, shining. Nullus screams. The Zero writhes within him and his body becomes the Inverse Lich.', 'La Gran Matriz se recompone, brillante. Nullus grita. El Cero se retuerce dentro de él y su cuerpo se transforma en el Lich Inverso.', 'La Grande Matrice se reforme, éclatante. Nullus hurle. Le Zéro se tord en lui et son corps devient le Liche Inverse.'),
      S('m:lich', 'NADA... SERÁ... DESFEITO! ZERO... ZERO... ZERO!', 'NOTHING... WILL BE... UNDONE! ZERO... ZERO... ZERO!', '¡NADA... SERÁ... DESHECHO! ¡CERO... CERO... CERO!', 'RIEN… NE SERA… DÉFAIT ! ZÉRO… ZÉRO… ZÉRO !'),
      S('queen', 'Agora, {name}! Use tudo o que aprendeu: somas, escalares, reflexos, produtos, determinantes... e a Inversa!', 'Now, {name}! Use everything you learned: sums, scalars, reflections, products, determinants... and the Inverse!', '¡Ahora, {name}! Usa todo lo que aprendiste: sumas, escalares, reflejos, productos, determinantes... ¡y la Inversa!', 'Maintenant, {name} ! Utilisez tout ce que vous avez appris : sommes, scalaires, reflets, produits, déterminants… et l’Inverse !'),
    ],
  },
  'c7-end': {
    bg: 'throne', chapter: 7,
    title: L('Epílogo — A Grande Matriz', 'Epilogue — The Great Matrix', 'Epílogo — La Gran Matriz', 'Épilogue — La Grande Matrice'),
    reward: { xp: 100, gold: 120 },
    steps: [
      N('O Lich cai de joelhos. A Grande Matriz, agora completa, paira acima dele, pulsando em sete cores. Cada elemento está no lugar, cada linha alinhada a cada coluna.', 'The Lich falls to his knees. The Great Matrix, now whole, hovers above him, pulsing in seven colors. Every element in its place, every row aligned with every column.', 'El Lich cae de rodillas. La Gran Matriz, ya completa, flota sobre él, latiendo en siete colores. Cada elemento en su lugar, cada fila alineada con cada columna.', 'Le Liche tombe à genoux. La Grande Matrice, désormais entière, flotte au-dessus de lui, palpitant en sept couleurs. Chaque élément à sa place, chaque ligne alignée sur chaque colonne.'),
      S('queen', 'A escolha agora é sua, {name}. A Inversa pode apagar o feitiço... de duas formas.', 'The choice is yours now, {name}. The Inverse can undo the curse... in two ways.', 'La elección es tuya ahora, {name}. La Inversa puede deshacer el hechizo... de dos maneras.', 'Le choix est à vous maintenant, {name}. L’Inverse peut défaire le sort… de deux manières.'),
      IF('pity_nullus', true, [S('oracle', 'Você o entendeu, {name}. Talvez ele mereça uma segunda chance.', 'You understood him, {name}. Perhaps he deserves a second chance.', 'Lo entendiste, {name}. Quizá merezca una segunda oportunidad.', 'Vous l’avez compris, {name}. Peut-être mérite-t-il une seconde chance.')]),
      CH('ending', [
        OPT('mercy', L('Misericórdia: aplicar a Inversa em Nullus e devolvê-lo a quem foi.', 'Mercy: apply the Inverse to Nullus and return him to who he was.', 'Misericordia: aplicar la Inversa a Nullus y devolverlo a quien fue.', 'Miséricorde : appliquer l’Inverse à Nullus et lui rendre ce qu’il était.'), {
          set: { ending: 'mercy' },
          reply: [
            N('A luz da Inversa envolve o Lich. As garras se desfazem, o manto cinza clareia. Um jovem trêmulo, de cabelo prateado, chora no chão de mármore.', 'The Inverse’s light envelops the Lich. The claws unravel, the gray cloak lightens. A trembling young man with silver hair weeps on the marble floor.', 'La luz de la Inversa envuelve al Lich. Las garras se deshacen, la capa gris se aclara. Un joven tembloroso, de cabello plateado, llora sobre el mármol.', 'La lumière de l’Inverse enveloppe le Liche. Les griffes se défont, la cape grise s’éclaircit. Un jeune homme tremblant aux cheveux argentés pleure sur le marbre.'),
            S('nullus', 'Eu... queria apenas que a dor parasse. Perdoem-me. Perdoem... o que eu fiz.', 'I... only wanted the pain to stop. Forgive me. Forgive... what I did.', 'Yo... solo quería que el dolor parara. Perdónenme. Perdonen... lo que hice.', 'Je… voulais seulement que la douleur cesse. Pardonnez-moi. Pardonnez… ce que j’ai fait.'),
            S('oracle', 'Bem-vindo de volta, irmão.', 'Welcome back, brother.', 'Bienvenido de vuelta, hermano.', 'Bon retour, mon frère.'),
          ],
        }),
        OPT('justice', L('Justiça: banir o Zero e Nullus para além do reino.', 'Justice: banish the Zero and Nullus beyond the realm.', 'Justicia: desterrar al Cero y a Nullus más allá del reino.', 'Justice : bannir le Zéro et Nullus au-delà du royaume.'), {
          set: { ending: 'justice' },
          reply: [
            N('A Grande Matriz lança um raio branco. O Lich é sugado por um portal de números negativos, gritando um último “Zero...” que se dissolve no vento.', 'The Great Matrix hurls a white beam. The Lich is sucked into a portal of negative numbers, crying a final “Zero...” that fades into the wind.', 'La Gran Matriz lanza un rayo blanco. El Lich es succionado por un portal de números negativos, gritando un último “Cero...” que se disuelve en el viento.', 'La Grande Matrice lance un rayon blanc. Le Liche est aspiré par un portail de nombres négatifs, criant un dernier « Zéro… » qui se dissout dans le vent.'),
            S('queen', 'O reino está a salvo. Que jamais precisemos de outro julgamento assim.', 'The realm is safe. May we never need such a judgment again.', 'El reino está a salvo. Que nunca necesitemos otro juicio así.', 'Le royaume est sauf. Puissions-nous ne plus jamais avoir besoin d’un tel jugement.'),
          ],
        }),
      ]),
      IF('spared_ghost', true, [N('Uma voz fraca ecoa da Abadia, trazida pelo vento: “Endereço... encontrado.”', 'A faint voice echoes from the Abbey, carried by the wind: “Address... found.”', 'Una voz débil resuena desde la Abadía, traída por el viento: “Dirección... encontrada.”', 'Une voix ténue résonne depuis l’Abbaye, portée par le vent : « Adresse… trouvée. »')]),
      N('Ao amanhecer, o sol nasce sobre um reino de números renovados. Linhas, colunas e elementos voltam aos seus lugares. Nas ruas, crianças recitam: “Linha primeiro, coluna depois.”', 'At dawn the sun rises over a realm of renewed numbers. Rows, columns and entries return to their places. In the streets children chant: “Row first, column second.”', 'Al amanecer, el sol sale sobre un reino de números renovados. Filas, columnas y elementos vuelven a su lugar. En las calles, los niños recitan: “Fila primero, columna después.”', 'À l’aube, le soleil se lève sur un royaume aux nombres renouvelés. Lignes, colonnes et éléments retrouvent leur place. Dans les rues, les enfants récitent : « Ligne d’abord, colonne ensuite. »'),
      S('sage', 'Você começou como aprendiz, {name}. Hoje, o reino o proclama Arquimago de Algebrion. Mas as matrizes são infinitas... e há sempre novas ordens a descobrir.', 'You began as an apprentice, {name}. Today the realm proclaims you Archmage of Algebrion. But matrices are endless... and there are always new orders to discover.', 'Empezaste como aprendiz, {name}. Hoy el reino te proclama Archimago de Algebrion. Pero las matrices son infinitas... y siempre hay nuevos órdenes por descubrir.', 'Vous avez commencé comme apprenti, {name}. Aujourd’hui, le royaume vous proclame Archimage d’Algebrion. Mais les matrices sont infinies… et il y a toujours de nouveaux ordres à découvrir.'),
      N('FIM DO LIVRO I. — Continue treinando na Arena e refazendo as fases para dominar cada arte por completo.', 'END OF BOOK I. — Keep training in the Arena and replaying stages to master every art completely.', 'FIN DEL LIBRO I. — Sigue entrenando en la Arena y repitiendo las fases para dominar cada arte por completo.', 'FIN DU LIVRE I. — Continuez à vous entraîner dans l’Arène et à rejouer les étapes pour maîtriser chaque art.'),
    ],
  },
};

// cenas de cada passo do currículo + o encerramento com os aliados no epílogo do capítulo 7
Object.assign(SCENES, CONCEPT_SCENES);
SCENES['c7-end'].steps.splice(SCENES['c7-end'].steps.length - 1, 0, ...CODA_STEPS);

export const SCENE_TITLES = Object.fromEntries(
  Object.entries(SCENES).map(([id, s]) => [id, s.title]),
);
