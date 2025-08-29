import React from 'react';

function UserProfile({ user, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl text-center p-6 bg-white rounded-lg shadow-md mt-6">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl text-center p-6 bg-red-100 rounded-lg shadow-md mt-6">
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full max-w-2xl text-center p-6 bg-white rounded-lg shadow-md mt-6">
        <p className="text-gray-600">Search for a GitHub user to see their profile.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md mt-6 flex flex-col items-center">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="w-32 h-32 rounded-full border-4 border-gray-200 mb-4"
      />
      <h2 className="text-3xl font-bold text-gray-800">{user.name || user.login}</h2>
      <p className="text-gray-500 text-lg mb-2">@{user.login}</p>
      {user.bio && <p className="text-gray-600 text-center max-w-md">{user.bio}</p>}
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-blue-600 hover:underline font-medium"
      >
        View Profile on GitHub
      </a>
      <div className="flex justify-around w-full mt-4 text-center">
        <div className="p-2">
          <p className="font-bold text-xl text-gray-800">{user.public_repos}</p>
          <p className="text-gray-500">Public Repos</p>
        </div>
        <div className="p-2">
          <p className="font-bold text-xl text-gray-800">{user.followers}</p>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="p-2">
          <p className="font-bold text-xl text-gray-800">{user.following}</p>
          <p className="text-gray-500">Following</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
