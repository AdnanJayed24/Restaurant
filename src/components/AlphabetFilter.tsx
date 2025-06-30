import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { searchMealsByLetter } from '../store/slices/mealsSlice';

const AlphabetFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.meals);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleLetterClick = (letter: string) => {
    dispatch(searchMealsByLetter(letter.toLowerCase()));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Browse by First Letter</h3>
        <p className="text-gray-600">Click any letter to discover meals starting with that letter</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            disabled={loading.search}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 disabled:opacity-50 transform hover:scale-110"
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetFilter;