import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// Initialize the QueryClient outside the component tree to avoid re-creation on every render.
const queryClient = new QueryClient();

// This component is now named PostsComponent as requested.
function PostsComponent() {
  // --- Step 2: Create a Component to Fetch Data ---
  // The `useQuery` hook is the core of this component, handling the data fetching.
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    // The query key uniquely identifies this data in the cache.
    queryKey: ['posts'],
    // The query function fetches the data from the API.
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
    // --- Step 3: Implement Features for Caching and Updating Data ---
    // Caching is demonstrated here with a staleTime of 5 minutes.
    // React Query will serve cached data if it's less than 5 minutes old.
    staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime controls how long unused data stays in the cache.
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

  // Handle loading state from Step 2
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 animate-pulse">Loading...</h1>
      </div>
    );
  }

  // Handle error state from Step 2
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Error!</h1>
        <p className="text-lg text-red-500">{error.message}</p>
      </div>
    );
  }

  // --- Step 3: Implementing Refetch and Caching Demo ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
          React Query Posts
        </h1>
        <p className="text-center text-gray-600 mb-8">
          This application demonstrates data fetching and caching using React Query.
          Navigate away and return to see caching in action, and click the button
          to manually refetch data.
        </p>

        {/* This button triggers a manual refetch to update the data. */}
        <div className="text-center mb-8">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className={`
              py-3 px-6 rounded-full font-bold transition-all duration-300
              ${isFetching
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'}
            `}
          >
            {isFetching ? 'Refetching...' : 'Refetch Posts'}
          </button>
        </div>

        {/* The fetched data is mapped to a list here. */}
        <ul className="space-y-6">
          {data.map((post) => (
            <li key={post.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// The root component, which provides the QueryClient context to all child components.
export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsComponent />
    </QueryClientProvider>
  );
}
