import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    // Immediately filter the recipes after the search term is updated
    get().filterRecipes();
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    if (searchTerm === '') {
      set({ filteredRecipes: recipes });
    } else {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      set({ filteredRecipes: filtered });
    }
  },

  // Initializing with the full list
  setRecipes: (newRecipes) => {
    set({ recipes: newRecipes });
    get().filterRecipes();
  },

  // Other actions (addRecipe, deleteRecipe, updateRecipe)
  addRecipe: (newRecipe) => set(state => {
    const newRecipes = [...state.recipes, newRecipe];
    const newFiltered = newRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return { recipes: newRecipes, filteredRecipes: newFiltered };
  }),
  deleteRecipe: (id) => set(state => {
    const newRecipes = state.recipes.filter(recipe => recipe.id !== id);
    const newFiltered = newRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return { recipes: newRecipes, filteredRecipes: newFiltered };
  }),
  updateRecipe: (updatedRecipe) => set(state => {
    const newRecipes = state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    const newFiltered = newRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return { recipes: newRecipes, filteredRecipes: newFiltered };
  })
}));

export default useRecipeStore;