import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import SearchBar from './components/SearchBar';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Recipe App</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/add">Add Recipe</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={
            <>
              <SearchBar />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <RecipeList />
                </div>
                <div>
                  <RecommendationsList />
                  <FavoritesList />
                </div>
              </div>
            </>
          } />
          <Route path="/add" element={<AddRecipeForm />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
          <Route path="/edit/:recipeId" element={<EditRecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;