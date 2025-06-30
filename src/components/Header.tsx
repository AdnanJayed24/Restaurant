import React from 'react';
import { ChefHat, Heart, Search } from 'lucide-react';
import { useAppSelector } from '../hooks/redux';

interface HeaderProps {
  onShowFavorites: () => void;
  onShowSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowFavorites, onShowSearch }) => {
  const favorites = useAppSelector((state) => state.meals.favorites);

  return (
    <header className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ChefHat className="h-8 w-8 text-white" />
            <h1 className="text-xl font-bold text-white">Flavor Quest</h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            <button
              onClick={onShowSearch}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
            
            <button
              onClick={onShowFavorites}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 relative"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;