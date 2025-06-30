import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Meal, MealCategory } from '../../types/meal';
import { mealApi } from '../../services/mealApi';

interface MealsState {
  searchResults: Meal[];
  randomMeal: Meal | null;
  selectedMeal: Meal | null;
  categories: MealCategory[];
  areas: any[];
  ingredients: any[];
  favorites: Meal[];
  searchQuery: string;
  selectedCategory: string;
  selectedArea: string;
  selectedIngredient: string;
  searchType: 'name' | 'letter' | 'category' | 'area' | 'ingredient';
  loading: {
    search: boolean;
    random: boolean;
    categories: boolean;
    areas: boolean;
    ingredients: boolean;
    details: boolean;
  };
  error: string | null;
}

const initialState: MealsState = {
  searchResults: [],
  randomMeal: null,
  selectedMeal: null,
  categories: [],
  areas: [],
  ingredients: [],
  favorites: JSON.parse(localStorage.getItem('mealFavorites') || '[]'),
  searchQuery: '',
  selectedCategory: '',
  selectedArea: '',
  selectedIngredient: '',
  searchType: 'name',
  loading: {
    search: false,
    random: false,
    categories: false,
    areas: false,
    ingredients: false,
    details: false,
  },
  error: null,
};

// Async thunks
export const searchMeals = createAsyncThunk(
  'meals/searchMeals',
  async (query: string) => {
    const meals = await mealApi.searchMeals(query);
    return meals;
  }
);

export const searchMealsByLetter = createAsyncThunk(
  'meals/searchMealsByLetter',
  async (letter: string) => {
    const meals = await mealApi.searchMealsByLetter(letter);
    return meals;
  }
);

export const fetchRandomMeal = createAsyncThunk(
  'meals/fetchRandomMeal',
  async () => {
    const meal = await mealApi.getRandomMeal();
    return meal;
  }
);

export const fetchMealById = createAsyncThunk(
  'meals/fetchMealById',
  async (id: string) => {
    const meal = await mealApi.getMealById(id);
    return meal;
  }
);

export const fetchCategories = createAsyncThunk(
  'meals/fetchCategories',
  async () => {
    const categories = await mealApi.getCategories();
    return categories;
  }
);

export const fetchMealsByCategory = createAsyncThunk(
  'meals/fetchMealsByCategory',
  async (category: string) => {
    const meals = await mealApi.getMealsByCategory(category);
    return meals;
  }
);

export const fetchAreas = createAsyncThunk(
  'meals/fetchAreas',
  async () => {
    const areas = await mealApi.getAreas();
    return areas;
  }
);

export const fetchMealsByArea = createAsyncThunk(
  'meals/fetchMealsByArea',
  async (area: string) => {
    const meals = await mealApi.getMealsByArea(area);
    return meals;
  }
);

export const fetchIngredients = createAsyncThunk(
  'meals/fetchIngredients',
  async () => {
    const ingredients = await mealApi.getIngredients();
    return ingredients;
  }
);

export const fetchMealsByIngredient = createAsyncThunk(
  'meals/fetchMealsByIngredient',
  async (ingredient: string) => {
    const meals = await mealApi.getMealsByIngredient(ingredient);
    return meals;
  }
);

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.selectedArea = '';
      state.selectedIngredient = '';
    },
    setSelectedArea: (state, action: PayloadAction<string>) => {
      state.selectedArea = action.payload;
      state.selectedCategory = '';
      state.selectedIngredient = '';
    },
    setSelectedIngredient: (state, action: PayloadAction<string>) => {
      state.selectedIngredient = action.payload;
      state.selectedCategory = '';
      state.selectedArea = '';
    },
    setSearchType: (state, action: PayloadAction<'name' | 'letter' | 'category' | 'area' | 'ingredient'>) => {
      state.searchType = action.payload;
    },
    setSelectedMeal: (state, action: PayloadAction<Meal | null>) => {
      state.selectedMeal = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<Meal>) => {
      const meal = action.payload;
      const existingIndex = state.favorites.findIndex(fav => fav.idMeal === meal.idMeal);
      
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(meal);
      }
      
      localStorage.setItem('mealFavorites', JSON.stringify(state.favorites));
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
      state.selectedCategory = '';
      state.selectedArea = '';
      state.selectedIngredient = '';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search meals by name
      .addCase(searchMeals.pending, (state) => {
        state.loading.search = true;
        state.error = null;
      })
      .addCase(searchMeals.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload;
        state.searchType = 'name';
      })
      .addCase(searchMeals.rejected, (state, action) => {
        state.loading.search = false;
        state.error = action.error.message || 'Failed to search meals';
      })
      // Search meals by letter
      .addCase(searchMealsByLetter.pending, (state) => {
        state.loading.search = true;
        state.error = null;
      })
      .addCase(searchMealsByLetter.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload;
        state.searchType = 'letter';
      })
      .addCase(searchMealsByLetter.rejected, (state, action) => {
        state.loading.search = false;
        state.error = action.error.message || 'Failed to search meals by letter';
      })
      // Random meal
      .addCase(fetchRandomMeal.pending, (state) => {
        state.loading.random = true;
        state.error = null;
      })
      .addCase(fetchRandomMeal.fulfilled, (state, action) => {
        state.loading.random = false;
        state.randomMeal = action.payload;
      })
      .addCase(fetchRandomMeal.rejected, (state, action) => {
        state.loading.random = false;
        state.error = action.error.message || 'Failed to fetch random meal';
      })
      // Meal details
      .addCase(fetchMealById.pending, (state) => {
        state.loading.details = true;
        state.error = null;
      })
      .addCase(fetchMealById.fulfilled, (state, action) => {
        state.loading.details = false;
        state.selectedMeal = action.payload;
      })
      .addCase(fetchMealById.rejected, (state, action) => {
        state.loading.details = false;
        state.error = action.error.message || 'Failed to fetch meal details';
      })
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading.categories = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading.categories = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      // Meals by category
      .addCase(fetchMealsByCategory.pending, (state) => {
        state.loading.search = true;
        state.error = null;
      })
      .addCase(fetchMealsByCategory.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload;
        state.searchType = 'category';
      })
      .addCase(fetchMealsByCategory.rejected, (state, action) => {
        state.loading.search = false;
        state.error = action.error.message || 'Failed to fetch meals by category';
      })
      // Areas
      .addCase(fetchAreas.pending, (state) => {
        state.loading.areas = true;
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.loading.areas = false;
        state.areas = action.payload;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.loading.areas = false;
        state.error = action.error.message || 'Failed to fetch areas';
      })
      // Meals by area
      .addCase(fetchMealsByArea.pending, (state) => {
        state.loading.search = true;
        state.error = null;
      })
      .addCase(fetchMealsByArea.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload;
        state.searchType = 'area';
      })
      .addCase(fetchMealsByArea.rejected, (state, action) => {
        state.loading.search = false;
        state.error = action.error.message || 'Failed to fetch meals by area';
      })
      // Ingredients
      .addCase(fetchIngredients.pending, (state) => {
        state.loading.ingredients = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading.ingredients = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading.ingredients = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
      })
      // Meals by ingredient
      .addCase(fetchMealsByIngredient.pending, (state) => {
        state.loading.search = true;
        state.error = null;
      })
      .addCase(fetchMealsByIngredient.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload;
        state.searchType = 'ingredient';
      })
      .addCase(fetchMealsByIngredient.rejected, (state, action) => {
        state.loading.search = false;
        state.error = action.error.message || 'Failed to fetch meals by ingredient';
      });
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedArea,
  setSelectedIngredient,
  setSearchType,
  setSelectedMeal,
  toggleFavorite,
  clearSearchResults,
  clearError,
} = mealsSlice.actions;

export default mealsSlice.reducer;