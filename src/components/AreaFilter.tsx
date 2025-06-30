import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAreas, fetchMealsByArea, setSelectedArea } from '../store/slices/mealsSlice';

const AreaFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { areas, selectedArea, loading } = useAppSelector((state) => state.meals);

  useEffect(() => {
    if (areas.length === 0) {
      dispatch(fetchAreas());
    }
  }, [dispatch, areas.length]);

  const handleAreaClick = (area: string) => {
    if (selectedArea === area) {
      dispatch(setSelectedArea(''));
    } else {
      dispatch(setSelectedArea(area));
      dispatch(fetchMealsByArea(area));
    }
  };

  if (loading.areas) {
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
          <Globe className="h-6 w-6 text-blue-500" />
          <h3 className="text-xl font-bold text-gray-800">Explore by Country</h3>
        </div>
        <p className="text-gray-600">Discover authentic cuisines from around the world</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {areas.slice(0, 15).map((area) => (
          <button
            key={area.strArea}
            onClick={() => handleAreaClick(area.strArea)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedArea === area.strArea
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'
            }`}
          >
            {area.strArea}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AreaFilter;