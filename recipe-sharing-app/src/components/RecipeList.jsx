import useRecipeStore from '../store/recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  // Use filteredRecipes instead of the full recipes list
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);

  return (
    <div>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No recipes found matching your search.</p>
      )}
    </div>
  );
};

export default RecipeList;