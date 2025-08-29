import React, { useState } from 'react';

const AddRecipeForm = () => {
  // State for form fields
  const [recipeTitle, setRecipeTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparationSteps, setPreparationSteps] = useState('');

  // State for validation errors
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation will be added here in Step 2
    console.log('Form submitted:', { recipeTitle, ingredients, preparationSteps });
    // Clear form fields after submission
    setRecipeTitle('');
    setIngredients('');
    setPreparationSteps('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Recipe</h2>

      {/* Recipe Title Input */}
      <div className="mb-4">
        <label htmlFor="recipeTitle" className="block text-gray-700 font-medium mb-2">Recipe Title</label>
        <input
          type="text"
          id="recipeTitle"
          value={recipeTitle}
          onChange={(e) => setRecipeTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Spicy Chicken Curry"
        />
        {errors.recipeTitle && <p className="text-red-500 text-sm mt-1">{errors.recipeTitle}</p>}
      </div>

      {/* Ingredients Textarea */}
      <div className="mb-4">
        <label htmlFor="ingredients" className="block text-gray-700 font-medium mb-2">Ingredients</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows="5"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="List each ingredient on a new line"
        ></textarea>
        {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
      </div>

      {/* Preparation Steps Textarea */}
      <div className="mb-6">
        <label htmlFor="preparationSteps" className="block text-gray-700 font-medium mb-2">Preparation Steps</label>
        <textarea
          id="preparationSteps"
          value={preparationSteps}
          onChange={(e) => setPreparationSteps(e.target.value)}
          rows="8"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Step 1: ...&#10;Step 2: ..."
        ></textarea>
        {errors.preparationSteps && <p className="text-red-500 text-sm mt-1">{errors.preparationSteps}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Submit Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;