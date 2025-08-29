
import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparationSteps, setPreparationSteps] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    // Validation for recipeTitle
    if (!recipeTitle.trim()) {
      newErrors.recipeTitle = 'Recipe title is required.';
      isValid = false;
    }

    // Validation for ingredients
    const ingredientsArray = ingredients.split('\n').filter(item => item.trim() !== '');
    if (ingredientsArray.length < 2) {
      newErrors.ingredients = 'Please list at least two ingredients.';
      isValid = false;
    }

    // Validation for preparationSteps
    if (!preparationSteps.trim()) {
      newErrors.preparationSteps = 'Preparation steps are required.';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log('Form submitted successfully:', { recipeTitle, ingredients, preparationSteps });
      // Reset form
      setRecipeTitle('');
      setIngredients('');
      setPreparationSteps('');
      setErrors({});
    }
  };

  // ... rest of the component from Step 1 ...
};

export default AddRecipeForm;