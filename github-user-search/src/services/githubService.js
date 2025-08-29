// githubService.js
const GITHUB_API_URL = 'https://api.github.com/search/users';

export const searchUsers = async (username, location, minRepos) => {
  let query = username;
  if (location) {
    query += `+location:${location}`;
  }
  if (minRepos) {
    query += `+repos:>=${minRepos}`;
  }

  const response = await fetch(`${GITHUB_API_URL}?q=${query}`);
  const data = await response.json();
  return data.items;
};