import React from 'react';
import UserContext from './components/UserContext';
import UserProfile from './components/UseProfile';

const userData = {
    name: "Jane Doe", 
    email: "jane.doe@example.com" 
};

function App() {
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
