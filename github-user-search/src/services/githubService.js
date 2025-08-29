import axios from 'axios';

/**
 * Fetches user data from the GitHub API.
 * @param {string} username The GitHub username to search for.
 * @returns {Promise<object>} A promise that resolves with the user data.
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Looks like we can\'t find the user.');
    }
    throw new Error('An error occurred while fetching data. Please try again.');
  }
};