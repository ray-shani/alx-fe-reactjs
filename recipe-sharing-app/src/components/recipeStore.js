import { create } from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  // Recipe management actions (already defined)
  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, newRecipe]
  })),
  deleteRecipe: (id) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
  setRecipes: (newRecipes) => set({ recipes: newRecipes }),

  // Search/Filter actions (already defined)
  setSearchTerm: (term) => set({ searchTerm: term }),
  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),

  // New Favorites and Recommendations actions
  addFavorite: (recipeId) => set(state => {
    // Check if recipe is not already a favorite to prevent duplicates
    if (!state.favorites.includes(recipeId)) {
      return { favorites: [...state.favorites, recipeId] };
    }
    return state; // No change if already a favorite
  }),

  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),

  generateRecommendations: () => set(state => {
    // A simple mock recommendation system: finds recipes that are not
    // favorites but share a word with a favorite recipe's title.
    const favoriteTitles = state.favorites.map(id => {
      const recipe = state.recipes.find(r => r.id === id);
      return recipe ? recipe.title.toLowerCase() : '';
    });

    const recommended = state.recipes.filter(recipe => {
      // Exclude recipes that are already favorites
      if (state.favorites.includes(recipe.id)) {
        return false;
      }
      
      // Check for keyword matches with favorite recipe titles
      const recipeWords = recipe.title.toLowerCase().split(' ');
      return favoriteTitles.some(favTitle => 
        recipeWords.some(word => favTitle.includes(word))
      );
    });

    // Limit recommendations for a cleaner UI
    const finalRecommendations = recommended.slice(0, 5);
    
    return { recommendations: finalRecommendations };
  }),
}));

export default useRecipeStore;