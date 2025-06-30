import React, { useEffect } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchRandomMeal } from '../store/slices/mealsSlice';
import MealCard from './MealCard';

const RandomMeal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { randomMeal, loading } = useAppSelector((state) => state.meals);

  useEffect(() => {
    dispatch(fetchRandomMeal());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchRandomMeal());
  };

  return (
    <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-500" />
            <h2 className="text-3xl font-bold text-gray-800">Meal of the Day</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover something new and exciting! Our chef's special recommendation just for you.
          </p>
          
          <button
            onClick={handleRefresh}
            disabled={loading.random}
            className="mt-4 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 ${loading.random ? 'animate-spin' : ''}`} />
            <span>{loading.random ? 'Finding...' : 'Discover New'}</span>
          </button>
        </div>

        {loading.random ? (
          <div className="flex justify-center">
            <div className="animate-pulse bg-gray-200 rounded-2xl h-96 w-full max-w-md"></div>
          </div>
        ) : randomMeal ? (
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <MealCard meal={randomMeal} />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Unable to load random meal. Please try again.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RandomMeal;