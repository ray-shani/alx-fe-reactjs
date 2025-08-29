import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import { searchUser } from './services/githubApi';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setIsLoading(true);
    setError(null);
    setUser(null);

    try {
      const userData = await searchUser(username);
      setUser(userData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8 font-sans">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8">
        GitHub User Search
      </h1>
      <SearchBar onSearch={handleSearch} />
      <UserProfile user={user} isLoading={isLoading} error={error} />
    </div>
  );
}

export default App;