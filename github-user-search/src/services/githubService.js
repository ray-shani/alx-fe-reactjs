import axios from 'axios';

/**
 * Fetches user data from the GitHub API.
 * @param {string} username The GitHub username to search for.
 * @returns {Promise<object>} A promise that resolves with the user data.
 */
export const searchUsers = async (username, location, minRepos, page = 1) => {
  let query = username.trim();
  if (location.trim()) {
    query += `+location:${location.trim()}`;
  }
  if (minRepos !== null && minRepos > 0) {
    query += `+repos:>=${minRepos}`;
  }

  try {
    const response = await api.get('/search/users', {
      params: {
        q: query,
        page,
        per_page: 10,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Looks like we can\'t find any users matching that criteria.');
    }
    throw new Error('An error occurred while fetching data. Please try again.');
  }
};
