import React from 'react';
// Import the UserProfile component.
// Make sure the path to UserProfile.jsx is correct relative to App.jsx
import UserProfile from './components/UserProfile'; 

function App() {
  return (
    <div>
      <h1>User Profiles</h1>
      {/* Use the UserProfile component and pass props (name, age, bio) */}
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      
      {/* You can add more UserProfile components with different data */}
      <UserProfile name="Bob" age="30" bio="Enjoys coding and playing guitar" />
    </div>
  );
}

export default App