import useRecipeStore from '../store/recipeStore';
import { useParams, Link } from 'react-router-dom';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id.toString() === recipeId)
  );

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <Link to={`/edit/${recipe.id}`}>
        <button>Edit Recipe</button>
      </Link>
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetails;