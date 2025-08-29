import useRecipeStore from '../store/recipeStore';
import { useParams, Link } from 'react-router-dom';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const recipe = useRecipeStore(state => state.recipes.find(recipe => recipe.id.toString() === recipeId));
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  const isFavorite = favorites.includes(recipe?.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <button onClick={handleFavoriteClick}>
        {isFavorite ? 'Remove from Favorites ❤️' : 'Add to Favorites 🤍'}
      </button>
      <Link to={`/edit/${recipe.id}`}>
        <button>Edit Recipe</button>
      </Link>
    </div>
  );
};

export default RecipeDetails;