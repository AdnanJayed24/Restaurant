Restaurant App

A responsive React + TypeScript web application that lets users discover, search, filter, and save meal recipes using the [MealDB API](https://www.themealdb.com/). This project leverages Redux Toolkit for state management and follows best practices for async data fetching, caching favorites in localStorage, and modular component architecture.

⭐ Features

* Search by Name: Find meals by full or partial name.
* Alphabet Filter: Browse meals by first letter.
* Category, Area & Ingredient Filters: Explore meals organized by category, cuisine (area), or main ingredient.
* Random Meal: Get inspired with a randomly selected meal.
* Favorites: Mark or unmark recipes as favorites and persist them in `localStorage`.
* Meal Details Modal: View full recipe details, ingredients, and instructions in a modal.
* Error Handling & Loading States: Graceful user feedback for API errors and loading indicators.
* Back Navigation: Return from filtered/search view to the default browsing state.


🛠️ Tech Stack

* React
* TypeScript
* Redux Toolkit
* Tailwind CSS for styling
* MealDB API as the data source

🚀 Getting Started

1. Clone the repository


git clone https://github.com/AdnanJayed24/Restaurant.git
cd restaurant

2. Install dependencies

npm install


3. Run in development mode

npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production

npm run build


🗂️ Project Structure

src/
├─ components/      # Header, Hero, filters, modals, grids, etc.
├─ hooks/           # useAppSelector, useAppDispatch
├─ services/        # mealApi (Axios instance & API methods)
├─ store/
│  ├─ slices/       # mealsSlice.ts (state, reducers, thunks)
│  └─ store.ts      # Redux store configuration
├─ types/           # TypeScript interfaces for Meal, Category, etc.
├─ App.tsx          # Application entry & layout
└─ index.css        # Styling
└─ main.tsx        


🧩 Key Implementation Details

* Redux Slice (`mealsSlice.ts`): Defines async thunks for all MealDB endpoints and reducers for filtering, selecting, and favorites management.
* LocalStorage Persistence: Favorites are loaded from and saved to `localStorage` on toggle.
* Conditional Rendering: The app toggles between default browsing (Hero + filters + random meal) and a results view with a Back button that clears filters.


🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "feat: Add YourFeature"`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

Please ensure TypeScript types and linting rules pass.


📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
