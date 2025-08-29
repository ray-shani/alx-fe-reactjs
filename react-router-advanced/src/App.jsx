import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useParams, Navigate } from 'react-router-dom';

// A simple component to simulate a protected route.
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // If not logged in, redirect the user to the home page.
    return <Navigate to="/" replace />;
  }
  return children;
};

const Home = () => (
  <div className="p-8 text-center bg-gray-100 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome to the Home Page</h2>
    <p className="text-gray-600">Explore our site using the navigation above!</p>
    <p className="mt-4 text-sm text-gray-500">
      Try navigating to "Profile" without logging in to see the protected route in action.
    </p>
  </div>
);

const About = () => (
  <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-4 text-gray-800">About Us</h2>
    <p className="text-gray-600">This is a simple example to showcase React Router's capabilities.</p>
  </div>
);

// Nested Routing: Parent component
const Profile = () => (
  <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-4 text-gray-800">Profile Page</h2>
    <nav className="mb-4">
      <ul className="flex justify-center space-x-4 text-blue-600">
        <li>
          <Link to="details" className="hover:underline">Profile Details</Link>
        </li>
        <li>
          <Link to="settings" className="hover:underline">Profile Settings</Link>
        </li>
      </ul>
    </nav>
    <div className="p-4 border-t border-gray-300">
      {/* The <Outlet> component renders the matched nested route */}
      <Outlet />
    </div>
  </div>
);

const ProfileDetails = () => (
  <div className="p-6 bg-white rounded-lg shadow-md text-center">
    <h3 className="text-xl font-semibold mb-2 text-gray-800">User Details</h3>
    <p className="text-gray-600">This section shows the user's personal information.</p>
  </div>
);

const ProfileSettings = () => (
  <div className="p-6 bg-white rounded-lg shadow-md text-center">
    <h3 className="text-xl font-semibold mb-2 text-gray-800">Account Settings</h3>
    <p className="text-gray-600">Here you can change your password and privacy settings.</p>
  </div>
);

// Dynamic Routing: Blog post component
const BlogPost = () => {
  const { postId } = useParams(); // useParams hook to get the dynamic URL parameter

  const postData = {
    '1': {
      title: 'First Blog Post',
      content: 'This is the content for the first blog post. It demonstrates dynamic routing.'
    },
    '2': {
      title: 'React Hooks Explained',
      content: 'A detailed look into the most common React Hooks, such as useState and useEffect.'
    },
    '3': {
      title: 'CSS-in-JS Libraries',
      content: 'A comparison of different CSS-in-JS libraries and their use cases in modern web development.'
    }
  };

  const post = postData[postId] || {
    title: 'Post Not Found',
    content: 'The blog post you are looking for does not exist.'
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h2>
      <p className="text-gray-600">{post.content}</p>
      <Link to="/blog" className="mt-4 inline-block text-blue-600 hover:underline">
        &larr; Back to Blog
      </Link>
    </div>
  );
};

const Blog = () => (
  <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-4 text-gray-800">Blog Posts</h2>
    <p className="text-gray-600 mb-4">Click on a link below to view a specific blog post.</p>
    <ul className="space-y-2">
      <li className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-50">
        <Link to="/blog/1" className="text-blue-600 hover:underline">First Blog Post</Link>
      </li>
      <li className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-50">
        <Link to="/blog/2" className="text-blue-600 hover:underline">React Hooks Explained</Link>
      </li>
      <li className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-50">
        <Link to="/blog/3" className="text-blue-600 hover:underline">CSS-in-JS Libraries</Link>
      </li>
    </ul>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <BrowserRouter>
      <div className="font-sans antialiased text-gray-900 bg-gray-200 min-h-screen p-8">
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body {
              font-family: 'Inter', sans-serif;
            }
          `}
        </style>
        <header className="mb-8 p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
          <nav className="flex space-x-6 text-xl">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium transition duration-300 ease-in-out">Home</Link>
            <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium transition duration-300 ease-in-out">About</Link>
            <Link to="/profile" className="text-blue-600 hover:text-blue-800 font-medium transition duration-300 ease-in-out">Profile</Link>
            <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-medium transition duration-300 ease-in-out">Blog</Link>
          </nav>
          <button
            onClick={handleAuthClick}
            className={`px-4 py-2 rounded-lg text-white font-medium transition duration-300 ease-in-out ${
              isLoggedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isLoggedIn ? 'Log Out' : 'Log In'}
          </button>
        </header>

        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* The protected route setup. It checks isLoggedIn before rendering child routes. */}
            <Route
              path="/profile/*"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile />
                </ProtectedRoute>
              }
            >
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
              <Route path="*" element={<Navigate to="details" replace />} /> {/* Redirects /profile to /profile/details */}
            </Route>
            {/* Dynamic Route Configuration */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
