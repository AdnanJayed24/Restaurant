import React from 'react';
import { Sparkles, Search, Utensils } from 'lucide-react';
import SearchBar from './SearchBar';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[60vh] bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white rounded-full animate-float-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Utensils className="h-12 w-12 text-white" />
            <Sparkles className="h-8 w-8 text-white animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Your Next
            <br />
            <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Favorite Meal
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Explore thousands of delicious recipes from around the world. Find inspiration, 
            save your favorites, and embark on a culinary adventure.
          </p>

          <div className="mb-8">
            <SearchBar />
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Recipes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Discover Random</span>
            </div>
            <div className="flex items-center space-x-2">
              <Utensils className="h-5 w-5" />
              <span>Save Favorites</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;