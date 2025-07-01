import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import AlphabetFilter from './components/AlphabetFilter';
import AreaFilter from './components/AreaFilter';
import IngredientFilter from './components/IngredientFilter';
import MealGrid from './components/MealGrid';
import RandomMeal from './components/RandomMeal';
import FavoritesModal from './components/FavoritesModal';
import MealModal from './components/MealModal';
import ErrorMessage from './components/ErrorMessage';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { clearSearchResults, setSelectedMeal } from './store/slices/mealsSlice'; 

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();  
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSearchSection, setShowSearchSection] = useState(false);
  const selectedMeal = useAppSelector((state) => state.meals.selectedMeal);
  const { searchResults, searchQuery, selectedCategory, selectedArea, selectedIngredient } = useAppSelector((state) => state.meals);

  const handleShowFavorites = () => {
    setShowFavorites(true);
  };

  const handleShowSearch = () => {
    setShowSearchSection(true);
  };

  const handleCloseMealModal = () => {
    dispatch(setSelectedMeal(null));  
  };

  const showResults = searchResults.length > 0 || searchQuery || selectedCategory || selectedArea || selectedIngredient;

  const handleBack = () => {
      dispatch(clearSearchResults());
      setShowSearchSection(false);
    };

  const getResultsTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (selectedCategory) return `${selectedCategory} Meals`;
    if (selectedArea) return `${selectedArea} Cuisine`;
    if (selectedIngredient) return `Meals with ${selectedIngredient}`;
    return 'Meals';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onShowFavorites={handleShowFavorites} onShowSearch={handleShowSearch} />
      
      {!showResults && <Hero />}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Sections */}
        {!showResults && (
          <>
            <section className="mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Explore by Category</h2>
                <p className="text-gray-600">Choose a category to discover amazing meals</p>
              </div>
              <CategoryFilter />
            </section>

            <AlphabetFilter />
            <AreaFilter />
            <IngredientFilter />
          </>
        )}

        {/* Search Results */}
        {showResults && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 disabled:opacity-50"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                {getResultsTitle()}
              </h2>
              <span className="text-gray-500">
                {searchResults.length} meal{searchResults.length !== 1 ? 's' : ''} found
              </span>
            </div>
            <MealGrid />
          </section>
        )}

        {/* Random Meal Section */}
        {!showResults && <RandomMeal />}
      </main>

      {/* Modals */}
      <FavoritesModal isOpen={showFavorites} onClose={() => setShowFavorites(false)} />
      
      {selectedMeal && (
        <MealModal
          meal={selectedMeal}
          isOpen={!!selectedMeal}
          onClose={handleCloseMealModal}
        />
      )}

      <ErrorMessage />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;