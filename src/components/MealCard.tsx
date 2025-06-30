import React from 'react';
import { Heart, MapPin, Tag } from 'lucide-react';
import { Meal } from '../types/meal';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleFavorite, setSelectedMeal } from '../store/slices/mealsSlice';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.meals.favorites);
  const isFavorite = favorites.some(fav => fav.idMeal === meal.idMeal);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(meal));
  };

  const handleCardClick = () => {
    dispatch(setSelectedMeal(meal));
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2"
    >
      <div className="relative overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
        >
          <Heart
            className={`h-5 w-5 transition-colors duration-200 ${
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
          {meal.strMeal}
        </h3>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
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
          <div className="mt-3 flex flex-wrap gap-2">
            {meal.strTags.split(',').slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealCard;