import { Meal, MealSearchResponse, CategoriesResponse } from '../types/meal';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const mealApi = {
  // Search meals by name
  searchMeals: async (query: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search meals');
    }
    const data: MealSearchResponse = await response.json();
    return data.meals || [];
  },

  // Search meals by first letter
  searchMealsByLetter: async (letter: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
    if (!response.ok) {
      throw new Error('Failed to search meals by letter');
    }
    const data: MealSearchResponse = await response.json();
    return data.meals || [];
  },

  // Get a random meal
  getRandomMeal: async (): Promise<Meal | null> => {
    const response = await fetch(`${BASE_URL}/random.php`);
    if (!response.ok) {
      throw new Error('Failed to fetch random meal');
    }
    const data: MealSearchResponse = await response.json();
    return data.meals?.[0] || null;
  },

  // Get meal by ID
  getMealById: async (id: string): Promise<Meal | null> => {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch meal details');
    }
    const data: MealSearchResponse = await response.json();
    return data.meals?.[0] || null;
  },

  // Get all categories
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/categories.php`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data: CategoriesResponse = await response.json();
    return data.categories;
  },

  // Get meals by category
  getMealsByCategory: async (category: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch meals by category');
    }
    const data: MealSearchResponse = await response.json();
    return data.meals || [];
  },

  // Get meals by area/country
  getMealsByArea: async (area: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch meals by area');
    }
    const data: MealSearchResponse = await response.json();
    return data.meals || [];
  },

  // Get meals by main ingredient
  getMealsByIngredient: async (ingredient: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch meals by ingredient');
    }
    const data: MealSearchResponse = await response.json();
    return data.meals || [];
  },

  // Get all areas
  getAreas: async () => {
    const response = await fetch(`${BASE_URL}/list.php?a=list`);
    if (!response.ok) {
      throw new Error('Failed to fetch areas');
    }
    const data = await response.json();
    return data.meals || [];
  },

  // Get all ingredients
  getIngredients: async () => {
    const response = await fetch(`${BASE_URL}/list.php?i=list`);
    if (!response.ok) {
      throw new Error('Failed to fetch ingredients');
    }
    const data = await response.json();
    return data.meals || [];
  }
};