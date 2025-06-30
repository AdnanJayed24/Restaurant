import React, { useEffect } from 'react';
import { ChefHat } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchIngredients, fetchMealsByIngredient, setSelectedIngredient } from '../store/slices/mealsSlice';

const IngredientFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { ingredients, selectedIngredient, loading } = useAppSelector((state) => state.meals);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const handleIngredientClick = (ingredient: string) => {
    if (selectedIngredient === ingredient) {
      dispatch(setSelectedIngredient(''));
    } else {
      dispatch(setSelectedIngredient(ingredient));
      dispatch(fetchMealsByIngredient(ingredient));
    }
  };

  if (loading.ingredients) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="flex flex-wrap gap-3">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded-full w-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <ChefHat className="h-6 w-6 text-green-500" />
          <h3 className="text-xl font-bold text-gray-800">Find by Ingredient</h3>
        </div>
        <p className="text-gray-600">Search meals based on your favorite ingredients</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {ingredients.slice(0, 20).map((ingredient) => (
          <button
            key={ingredient.strIngredient}
            onClick={() => handleIngredientClick(ingredient.strIngredient)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedIngredient === ingredient.strIngredient
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:border-green-300 hover:text-green-600 hover:shadow-md'
            }`}
          >
            {ingredient.strIngredient}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IngredientFilter;