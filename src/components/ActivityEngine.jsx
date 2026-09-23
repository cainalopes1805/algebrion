import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export default function ActivityEngine({ activity, onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const { language, theme, primaryColor, addCoins } = useAppStore();

  const handleVerify = () => {
    if (!selectedOption) return;
    
    if (selectedOption === activity.correctAnswer) {
      setIsCorrect(true);
      addCoins(activity.reward || 10);
      setTimeout(() => {
        onComplete(true); // Sucesso
      }, 1500);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(null);
        setSelectedOption(null);
      }, 1500);
    }
  };

  const questionText = activity.question[language] || activity.question['pt'];

  return (
    <div className={`p-6 rounded-sm shadow-2xl border-4 ${theme === 'dark' ? 'bg-stone-800 border-stone-600 text-stone-200' : 'bg-amber-50 border-amber-900 text-amber-950 font-serif'}`}>
      <h3 className="text-2xl font-bold mb-6 text-center border-b-2 border-dotted border-current pb-2">{questionText}</h3>

      {activity.type === 'multiple_choice' || activity.type === 'true_false' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activity.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(option)}
              className={`p-4 rounded-lg text-lg font-medium transition-all border-2
                ${selectedOption === option 
                  ? `border-${primaryColor}-500 bg-${primaryColor}-100 dark:bg-${primaryColor}-900` 
                  : `border-gray-200 dark:border-gray-600 hover:border-${primaryColor}-300`}
                ${isCorrect === true && selectedOption === option ? 'bg-green-500 text-white border-green-600' : ''}
                ${isCorrect === false && selectedOption === option ? 'bg-red-500 text-white border-red-600' : ''}
              `}
              disabled={isCorrect !== null}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleVerify}
          disabled={!selectedOption || isCorrect !== null}
          className={`px-8 py-3 rounded-full text-xl font-bold text-white transition-transform transform hover:scale-105
            ${!selectedOption ? 'bg-gray-400 cursor-not-allowed' : `bg-${primaryColor}-500 hover:bg-${primaryColor}-600`}
          `}
        >
          Verificar
        </button>
      </div>

      {isCorrect === true && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-center text-green-500 font-bold text-xl">
          Correto! +{activity.reward} moedas
        </motion.div>
      )}
      {isCorrect === false && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-center text-red-500 font-bold text-xl">
          Incorreto. Tente novamente!
        </motion.div>
      )}
    </div>
  );
}
