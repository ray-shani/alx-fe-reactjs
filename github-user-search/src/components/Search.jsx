// src/components/Search.jsx

import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

/**
 * A component that handles user input for searching GitHub users and displays the results.
 */
const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError(null);
      setUser(null);
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const userData = await fetchUserData(username);
      setUser(userData);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError(new Error('Looks like we can\'t find the user.'));
      } else {
        setError(new Error('An error occurred while fetching data. Please try again.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">GitHub User Search</h1>
      
      <form onSubmit={handleSearch} className="w-full max-w-md flex space-x-2 mb-8">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Conditional rendering for loading, error, and user profile */}
      {loading && (
        <div className="text-gray-600 font-medium">Loading...</div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
          {error.message}
        </div>
      )}

      {user && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-24 h-24 rounded-full border-4 border-gray-200 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">{user.name || user.login}</h2>
          <p className="text-gray-500 mb-2">@{user.login}</p>
          <p className="text-gray-600 text-center mb-4">{user.bio}</p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Profile on GitHub
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;