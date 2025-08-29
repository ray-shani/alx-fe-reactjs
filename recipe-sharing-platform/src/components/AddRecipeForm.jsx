import React, { useState } from 'react';

const AddRecipeForm = () => {
  // State for form fields
  const [recipeTitle, setRecipeTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparationSteps, setPreparationSteps] = useState('');

  // State for validation errors
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission and page reload

    // **Validation Logic Starts Here**
    const newErrors = {};
    let isValid = true;

    // Validate Recipe Title
    if (!recipeTitle.trim()) {
      newErrors.recipeTitle = 'Recipe title is required.';
      isValid = false;
    }

    // Validate Ingredients (ensure at least two items)
    const ingredientsArray = ingredients.split('\n').filter(item => item.trim() !== '');
    if (ingredientsArray.length < 2) {
      newErrors.ingredients = 'Please list at least two ingredients.';
      isValid = false;
    }

    // Validate Preparation Steps
    if (!preparationSteps.trim()) {
      newErrors.preparationSteps = 'Preparation steps are required.';
      isValid = false;
    }

    setErrors(newErrors);
    // **Validation Logic Ends Here**

    if (isValid) {
      console.log('Form submitted successfully:', { recipeTitle, ingredients, preparationSteps });
     
      setRecipeTitle('');
      setIngredients('');
      setPreparationSteps('');
      setErrors({});
    }
  };

  return (
    <div className="flex justify-center p-4 md:p-8 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl p-6 md:p-8 bg-white rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Share Your Recipe</h2>
        
        {/* Recipe Title Input Field */}
        <div className="mb-5">
          <label htmlFor="recipeTitle" className="block text-gray-700 font-semibold mb-2">Recipe Title</label>
          <input
            type="text"
            id="recipeTitle"
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            placeholder="e.g., Delicious Vegan Chili"
          />
          {errors.recipeTitle && <p className="text-red-500 text-sm mt-1 font-medium">{errors.recipeTitle}</p>}
        </div>

        {/* Ingredients Textarea */}
        <div className="mb-5">
          <label htmlFor="ingredients" className="block text-gray-700 font-semibold mb-2">Ingredients</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            placeholder="List each ingredient on a new line&#10;e.g.,&#10;2 tbsp olive oil&#10;1 large onion, chopped&#10;2 cans (15 oz) diced tomatoes"
          ></textarea>
          {errors.ingredients && <p className="text-red-500 text-sm mt-1 font-medium">{errors.ingredients}</p>}
        </div>

        {/* Preparation Steps Textarea */}
        <div className="mb-6">
          <label htmlFor="preparationSteps" className="block text-gray-700 font-semibold mb-2">Preparation Steps</label>
          <textarea
            id="preparationSteps"
            value={preparationSteps}
            onChange={(e) => setPreparationSteps(e.target.value)}
            rows="10"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            placeholder="Provide step-by-step instructions&#10;e.g.,&#10;Step 1: In a large pot, heat the olive oil over medium heat.&#10;Step 2: Add the chopped onion and cook until soft."
          ></textarea>
          {errors.preparationSteps && <p className="text-red-500 text-sm mt-1 font-medium">{errors.preparationSteps}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;