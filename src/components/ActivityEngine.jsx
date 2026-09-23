import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { sounds } from '../utils/audio';
import MatrixDisplay from './MatrixDisplay';
import { CheckCircle2, XCircle, Sparkles, HeartCrack, Volume2, ArrowRight } from 'lucide-react';

export default function ActivityEngine({ activity, onComplete, onMistake }) {
  const { language, addCoins, addXp, loseHeart } = useAppStore();

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  // Pair Matching state
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [shuffledLeft, setShuffledLeft] = useState([]);
  const [shuffledRight, setShuffledRight] = useState([]);

  // Reset when activity changes
  useEffect(() => {
    setSelectedOption(null);
    setSelectedCell(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setSelectedPairs([]);
    setMatchedPairs([]);

    if (activity.type === 'match_pairs' && activity.pairs) {
      const keys = Object.keys(activity.pairs);
      const values = Object.values(activity.pairs);
      setShuffledLeft([...keys].sort(() => Math.random() - 0.5));
      setShuffledRight([...values].sort(() => Math.random() - 0.5));
    }
  }, [activity]);

  const questionText = activity.question[language] || activity.question.pt;
  const explanationText = activity.explanation
    ? activity.explanation[language] || activity.explanation.pt
    : null;

  // Handle cell click in visual matrix
  const handleCellClick = (r, c, val) => {
    if (isAnswered) return;
    sounds.playClick();
    setSelectedCell({ r, c, val });
  };

  // Pair selection logic
  const handlePairClick = (item, side) => {
    if (isAnswered || matchedPairs.includes(item)) return;
    sounds.playClick();

    if (selectedPairs.length === 0) {
      setSelectedPairs([{ item, side }]);
    } else if (selectedPairs.length === 1) {
      const first = selectedPairs[0];
      if (first.side === side) {
        // Switch to new selection on same side
        setSelectedPairs([{ item, side }]);
        return;
      }

      // Check match
      const leftItem = first.side === 'left' ? first.item : item;
      const rightItem = first.side === 'right' ? first.item : item;

      if (activity.pairs[leftItem] === rightItem) {
        // Correct pair!
        sounds.playCorrect();
        const nextMatched = [...matchedPairs, leftItem, rightItem];
        setMatchedPairs(nextMatched);
        setSelectedPairs([]);

        if (nextMatched.length === Object.keys(activity.pairs).length * 2) {
          // All matched!
          handleVerification(true);
        }
      } else {
        // Wrong pair
        sounds.playWrong();
        setSelectedPairs([{ item, side }, first]);
        setTimeout(() => setSelectedPairs([]), 600);
      }
    }
  };

  const handleVerification = (overrideResult = null) => {
    let correct = false;

    if (overrideResult !== null) {
      correct = overrideResult;
    } else if (activity.type === 'cell_click') {
      if (!selectedCell) return;
      correct =
        selectedCell.r === activity.targetCell.r && selectedCell.c === activity.targetCell.c;
    } else {
      if (!selectedOption) return;
      correct = selectedOption === activity.correctAnswer;
    }

    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      addCoins(10);
      addXp(15);
    } else {
      sounds.playWrong();
      loseHeart();
      if (onMistake) onMistake();
    }
  };

  const handleContinue = () => {
    onComplete(isCorrect);
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-xl mx-auto pb-32">
      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md mb-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0 shadow-inner">
            🧙‍♂️
          </div>
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-black text-slate-100 leading-snug">
              {questionText}
            </h2>
          </div>
        </div>

        {/* Visual Matrix Display if available */}
        {activity.matrix && (
          <div className="mt-6 flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-slate-800/80 shadow-inner">
            <MatrixDisplay
              data={activity.matrix}
              selectedCell={selectedCell}
              onCellClick={activity.type === 'cell_click' ? handleCellClick : null}
              size="md"
            />
            {activity.type === 'cell_click' && (
              <p className="mt-3 text-xs text-amber-400/80 font-bold tracking-wide uppercase flex items-center gap-1">
                <span>👆</span> Toque em uma das células acima
              </p>
            )}
          </div>
        )}
      </motion.div>

      {/* Answer Options Container */}
      <div className="w-full">
        {/* TYPE: CELL CLICK - Just check button */}
        {activity.type === 'cell_click' && (
          <div className="flex justify-center mt-2">
            {!isAnswered && (
              <motion.button
                whileHover={selectedCell ? { scale: 1.02 } : {}}
                whileTap={selectedCell ? { scale: 0.98 } : {}}
                onClick={() => handleVerification()}
                disabled={!selectedCell}
                className={`w-full py-4 rounded-2xl font-black text-lg uppercase tracking-wider transition-all shadow-xl border-b-4 ${
                  selectedCell
                    ? 'bg-amber-500 border-amber-700 text-slate-950 hover:bg-amber-400 active:border-b-0 cursor-pointer'
                    : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                Confirmar Escolha
              </motion.button>
            )}
          </div>
        )}

        {/* TYPE: MULTIPLE CHOICE, MATRIX DIMENSION, TRUE FALSE, FILL BLANK */}
        {(activity.type === 'multiple_choice' ||
          activity.type === 'matrix_dimension' ||
          activity.type === 'true_false' ||
          activity.type === 'fill_blank') && (
          <div className="grid grid-cols-1 gap-3">
            {activity.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              return (
                <motion.button
                  key={idx}
                  whileHover={!isAnswered ? { scale: 1.01 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  disabled={isAnswered}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedOption(option);
                  }}
                  className={`p-4 rounded-2xl font-bold text-left transition-all border-b-4 flex items-center justify-between text-base md:text-lg shadow-md ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 ring-2 ring-amber-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-400">
                      {idx + 1}
                    </span>
                    <span>{option}</span>
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                  </div>
                </motion.button>
              );
            })}

            {!isAnswered && (
              <motion.button
                whileHover={selectedOption ? { scale: 1.02 } : {}}
                whileTap={selectedOption ? { scale: 0.98 } : {}}
                onClick={() => handleVerification()}
                disabled={!selectedOption}
                className={`mt-4 w-full py-4 rounded-2xl font-black text-lg uppercase tracking-wider transition-all shadow-xl border-b-4 ${
                  selectedOption
                    ? 'bg-amber-500 border-amber-700 text-slate-950 hover:bg-amber-400 active:border-b-0 cursor-pointer'
                    : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                Conjurador de Resposta
              </motion.button>
            )}
          </div>
        )}

        {/* TYPE: MATCH PAIRS */}
        {activity.type === 'match_pairs' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              {shuffledLeft.map((item, idx) => {
                const isMatched = matchedPairs.includes(item);
                const isSelected = selectedPairs.some((p) => p.item === item);
                return (
                  <motion.button
                    key={`l-${idx}`}
                    whileTap={!isMatched ? { scale: 0.96 } : {}}
                    disabled={isMatched || isAnswered}
                    onClick={() => handlePairClick(item, 'left')}
                    className={`w-full p-4 rounded-2xl font-bold text-sm md:text-base border-b-4 transition-all text-center min-h-[70px] flex items-center justify-center ${
                      isMatched
                        ? 'opacity-30 bg-slate-900 border-slate-800 text-slate-500 pointer-events-none'
                        : isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500'
                        : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {item}
                  </motion.button>
                );
              })}
            </div>

            <div className="space-y-3">
              {shuffledRight.map((item, idx) => {
                const isMatched = matchedPairs.includes(item);
                const isSelected = selectedPairs.some((p) => p.item === item);
                return (
                  <motion.button
                    key={`r-${idx}`}
                    whileTap={!isMatched ? { scale: 0.96 } : {}}
                    disabled={isMatched || isAnswered}
                    onClick={() => handlePairClick(item, 'right')}
                    className={`w-full p-4 rounded-2xl font-bold text-sm md:text-base border-b-4 transition-all text-center min-h-[70px] flex items-center justify-center ${
                      isMatched
                        ? 'opacity-30 bg-slate-900 border-slate-800 text-slate-500 pointer-events-none'
                        : isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500'
                        : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {item}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* DUOLINGO-STYLE SLIDE-UP BOTTOM DRAWER */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-0 left-0 right-0 z-50 p-6 border-t-4 backdrop-blur-xl shadow-2xl ${
              isCorrect
                ? 'bg-emerald-950/95 border-emerald-500 text-emerald-100'
                : 'bg-rose-950/95 border-rose-500 text-rose-100'
            }`}
          >
            <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg ${
                    isCorrect
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-rose-500 text-slate-950 animate-bounce'
                  }`}
                >
                  {isCorrect ? <CheckCircle2 size={36} /> : <XCircle size={36} />}
                </div>

                <div>
                  <h3 className="text-2xl font-black tracking-tight">
                    {isCorrect ? 'Excelente! Magia Efetuada!' : 'Não foi dessa vez!'}
                  </h3>
                  {explanationText && (
                    <p className="mt-1 text-sm font-medium opacity-90 max-w-md leading-relaxed">
                      {explanationText}
                    </p>
                  )}
                  {!isCorrect && activity.correctAnswer && (
                    <p className="mt-1 text-sm font-black text-rose-200">
                      Resposta Correta: {activity.correctAnswer}
                    </p>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className={`w-full md:w-auto px-10 py-4 rounded-2xl font-black text-lg uppercase tracking-wider transition-all shadow-xl border-b-4 flex items-center justify-center gap-2 ${
                  isCorrect
                    ? 'bg-emerald-500 border-emerald-700 text-slate-950 hover:bg-emerald-400'
                    : 'bg-rose-500 border-rose-700 text-white hover:bg-rose-400'
                }`}
              >
                <span>Avançar</span>
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
