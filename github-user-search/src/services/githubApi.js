
import axios from 'axios';

// Get the GitHub API token from environment variables.
// In a production app, you would handle this more securely.
const GITHUB_API_TOKEN = import.meta.env.VITE_APP_GITHUB_API_TOKEN;

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Authorization': GITHUB_API_TOKEN ? `token ${GITHUB_API_TOKEN}` : '',
    'Content-Type': 'application/json',
  },
});

/**
 * Searches for a GitHub user by username.
 * @param {string} username The username to search for.
 * @returns {Promise<object>} A promise that resolves to the user data.
 */
export const searchUser = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching user:', error);
    // Return a structured error object or rethrow
    throw new Error('User not found or an API error occurred.');
  }
};