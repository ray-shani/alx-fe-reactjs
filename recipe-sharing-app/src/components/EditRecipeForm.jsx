import { useState, useEffect } from 'react';
import useRecipeStore from '../store/recipeStore';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecipeForm = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const recipeToEdit = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id.toString() === recipeId)
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title);
      setDescription(recipeToEdit.description);
    }
  }, [recipeToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      updateRecipe({ id: recipeToEdit.id, title, description });
      navigate(`/recipes/${recipeToEdit.id}`);
    }
  };

  if (!recipeToEdit) {
    return <div>Recipe not found!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipeForm;