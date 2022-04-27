import './App.css';
import { Route } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (
    <div className="App">
      <Route exact path = '/' component = {LandingPage}/>
      <Route path = '/home' component = {Home}/>
      <Route exact path="/recipeDetail/:id" component={RecipeDetail}/>
    </div>
  );
}

export default App;
