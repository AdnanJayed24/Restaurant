import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { clearError } from '../store/slices/mealsSlice';

const ErrorMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.meals.error);

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
          <button
            onClick={() => dispatch(clearError())}
            className="p-1 text-red-400 hover:text-red-600 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;