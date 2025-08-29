import useRecipeStore from '../store/recipeStore';

const FavoritesList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);

  // Filter the full recipe list to get only the favorite recipes
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  if (favoriteRecipes.length === 0) {
    return <div><p>You haven't added any favorites yet!</p></div>;
  }

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.map(recipe => (
        <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;