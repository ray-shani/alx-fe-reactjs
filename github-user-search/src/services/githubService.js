API
const GITHUB_API_URL = 'https://api.github.com/search/users';

/**
 * Searches for GitHub users based on username, location, and min repositories.
 * @param {string} username - The main search query (username).
 * @param {string} location - The location to filter by.
 * @param {number} minRepos - The minimum number of public repositories.
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 */
export const searchUsers = async (username, location, minRepos) => {

  let query = username;
  if (location) {
    query += `+location:${location}`;
  }
  if (minRepos) {
    query += `+repos:>=${minRepos}`;
  }


  const response = await fetch(`${GITHUB_API_URL}?q=${query}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const data = await response.json();
  
 
  return data.items;
};