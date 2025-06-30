import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCategories, fetchMealsByCategory, setSelectedCategory } from '../store/slices/mealsSlice';

const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory, loading } = useAppSelector((state) => state.meals);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      dispatch(setSelectedCategory(''));
    } else {
      dispatch(setSelectedCategory(category));
      dispatch(fetchMealsByCategory(category));
    }
  };

  if (loading.categories) {
    return (
      <div className="flex justify-center space-x-4 overflow-hidden">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-200 rounded-full h-12 w-24"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.slice(0, 8).map((category) => (
        <button
          key={category.idCategory}
          onClick={() => handleCategoryClick(category.strCategory)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
            selectedCategory === category.strCategory
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:shadow-md'
          }`}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;