import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export default function ActivityEngine({ activity, onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const { language, addCoins } = useAppStore();

  // Para o tipo match_pairs
  const [selectedPair, setSelectedPair] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  // Reseta estado local caso a atividade mude
  useEffect(() => {
    setSelectedOption(null);
    setIsCorrect(null);
    setSelectedPair([]);
    setMatchedPairs([]);
  }, [activity]);

  const handleVerify = () => {
    if (!selectedOption) return;
    
    if (selectedOption === activity.correctAnswer) {
      setIsCorrect(true);
      addCoins(activity.reward || 10);
      setTimeout(() => {
        onComplete(true);
      }, 1500);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(null);
        setSelectedOption(null);
      }, 1500);
    }
  };

  const handleMatchSelect = (item) => {
    if (matchedPairs.includes(item)) return;

    const newPair = [...selectedPair, item];
    setSelectedPair(newPair);

    if (newPair.length === 2) {
      // Verificar se o par está correto consultando pairs dict
      const [first, second] = newPair;
      const isMatch = activity.pairs[first] === second || activity.pairs[second] === first;

      if (isMatch) {
        setMatchedPairs([...matchedPairs, first, second]);
        setSelectedPair([]);
        
        // Verifica se terminou todos os pares
        if (matchedPairs.length + 2 === activity.items.length) {
          setIsCorrect(true);
          addCoins(activity.reward || 15);
          setTimeout(() => onComplete(true), 1500);
        }
      } else {
        // Errou o par
        setTimeout(() => setSelectedPair([]), 800);
      }
    }
  };

  const questionText = activity.question[language] || activity.question['pt'];

  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
    >
      <div className="p-6 bg-slate-800/50 border-b border-slate-800">
        <h3 className="text-xl md:text-2xl font-black text-slate-100 text-center leading-relaxed">
          {questionText}
        </h3>
      </div>

      <div className="p-6">
        {/* Renderiza Múltipla Escolha e V/F */}
        {(activity.type === 'multiple_choice' || activity.type === 'true_false') && (
          <div className="grid grid-cols-1 gap-3">
            {activity.options.map((option, idx) => (
              <motion.button
                whileHover={isCorrect === null ? { scale: 1.01 } : {}}
                whileTap={isCorrect === null ? { scale: 0.98 } : {}}
                key={idx}
                onClick={() => setSelectedOption(option)}
                className={`p-4 rounded-2xl text-left font-bold text-lg transition-all border-b-4 
                  ${selectedOption === option 
                    ? `border-amber-600 bg-amber-900/30 text-amber-400 ring-2 ring-amber-500` 
                    : `border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700`}
                  ${isCorrect === true && selectedOption === option ? 'bg-emerald-900/40 text-emerald-400 border-emerald-600 ring-emerald-500' : ''}
                  ${isCorrect === false && selectedOption === option ? 'bg-rose-900/40 text-rose-400 border-rose-600 ring-rose-500' : ''}
                `}
                disabled={isCorrect !== null}
              >
                {option}
              </motion.button>
            ))}
          </div>
        )}

        {/* Renderiza Combinar Pares */}
        {activity.type === 'match_pairs' && (
          <div className="grid grid-cols-2 gap-3">
            {activity.items.map((item, idx) => {
              const isSelected = selectedPair.includes(item);
              const isMatched = matchedPairs.includes(item);
              return (
                <motion.button
                  whileTap={!isMatched ? { scale: 0.95 } : {}}
                  key={idx}
                  onClick={() => handleMatchSelect(item)}
                  className={`p-4 rounded-2xl text-center font-bold text-sm md:text-base transition-all border-b-4 h-24 flex items-center justify-center
                    ${isMatched ? 'border-slate-800 bg-slate-800 text-slate-600 opacity-50 cursor-not-allowed shadow-inner' :
                      isSelected ? 'border-amber-600 bg-amber-900/30 text-amber-400 ring-2 ring-amber-500' :
                      'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }
                  `}
                  disabled={isMatched || isCorrect !== null}
                >
                  {item}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Botão Verificar (Apenas para múltipla escolha) */}
        {(activity.type === 'multiple_choice' || activity.type === 'true_false') && (
          <div className="mt-8">
            <motion.button
              whileTap={selectedOption && isCorrect === null ? { scale: 0.95 } : {}}
              onClick={handleVerify}
              disabled={!selectedOption || isCorrect !== null}
              className={`w-full py-4 rounded-2xl text-lg font-black uppercase tracking-wide border-b-4 transition-colors
                ${!selectedOption 
                  ? 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed' 
                  : 'bg-amber-500 border-amber-700 text-slate-900 hover:bg-amber-400'}
              `}
            >
              Lançar Magia
            </motion.button>
          </div>
        )}

        <div className="h-12 mt-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isCorrect === true && (
              <motion.div key="correct" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 font-black text-lg">
                Feitiço Correto! +{activity.reward} ouro
              </motion.div>
            )}
            {isCorrect === false && (
              <motion.div key="wrong" initial={{ x: -10, opacity: 0 }} animate={{ x: [0, -5, 5, -5, 5, 0], opacity: 1 }} exit={{ opacity: 0 }} className="text-rose-400 font-black text-lg">
                Magia Falhou. Tente novamente!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
