import HomePage from './components/HomePage';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <HomePage />
    </div>
  );
}

export default App;