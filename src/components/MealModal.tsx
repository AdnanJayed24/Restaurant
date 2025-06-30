import React from 'react';
import { X, Heart, MapPin, Tag, Clock, Users, ExternalLink } from 'lucide-react';
import { Meal, Ingredient } from '../types/meal';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleFavorite, setSelectedMeal } from '../store/slices/mealsSlice';

interface MealModalProps {
  meal: Meal;
  isOpen: boolean;
  onClose: () => void;
}

const MealModal: React.FC<MealModalProps> = ({ meal, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.meals.favorites);
  const isFavorite = favorites.some(fav => fav.idMeal === meal.idMeal);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(meal));
  };

  const getIngredients = (): Ingredient[] => {
    const ingredients: Ingredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
      const measure = meal[`strMeasure${i}` as keyof Meal] as string;
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }
    return ingredients;
  };

  if (!isOpen) return null;

  const ingredients = getIngredients();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
                
                <button
                  onClick={handleFavoriteToggle}
                  className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
                >
                  <Heart
                    className={`h-6 w-6 transition-colors duration-200 ${
                      isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-6 overflow-y-auto max-h-[90vh]">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{meal.strMeal}</h2>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{meal.strArea}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="h-4 w-4" />
                    <span>{meal.strCategory}</span>
                  </div>
                </div>

                {meal.strTags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {meal.strTags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredients</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{ingredient.name}</span>
                      <span className="text-gray-500 text-sm">{ingredient.measure}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {meal.strInstructions}
                  </p>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {meal.strYoutube && (
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Watch Video</span>
                  </a>
                )}
                
                {meal.strSource && (
                  <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealModal;