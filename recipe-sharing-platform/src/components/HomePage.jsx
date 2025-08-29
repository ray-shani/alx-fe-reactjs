import React, { useState, useEffect } from 'react';
import recipesData from '../data.json';
import { Link } from 'react-router-dom';

// Import Link at the top
import { Link } from 'react-router-dom';
import recipesData from '../data.json'; // Ensure this path is correct

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Recipe Sharing Platform</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipesData.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            
            {/* Wrap the recipe card content with the Link component */}
            <Link to={`/recipe/${recipe.id}`}>
              <img 
                src={recipe.image} 
                alt={recipe.name} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
                <p className="text-gray-600">Serves: {recipe.servings}</p>
              </div>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;