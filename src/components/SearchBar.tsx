import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { searchMeals, setSearchQuery, clearSearchResults } from '../store/slices/mealsSlice';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { searchQuery, loading } = useAppSelector((state) => state.meals);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      dispatch(setSearchQuery(localQuery));
      dispatch(searchMeals(localQuery));
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
    dispatch(clearSearchResults());
  };

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search for delicious meals..."
            className="w-full pl-12 pr-20 py-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-200"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {localQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={loading.search}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 disabled:opacity-50"
            >
              {loading.search ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>
      
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors duration-200"
        >
          <X className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;