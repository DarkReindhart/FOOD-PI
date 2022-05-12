import './App.css';
import { Route } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import RecipeCreation from './components/RecipeCreation/RecipeCreation';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Route exact path = '/' component = {LandingPage}/>
      <Route exact path = {['/home', '/recipeDetail/:id', '/createRecipe']} component = {NavBar}/>
      <Route path = '/home' component = {Home}/>
      <Route exact path='/recipeDetail/:id' component={RecipeDetail}/>
      <Route exact path= '/createRecipe' component={RecipeCreation}/>
    </div>
  );
}

export default App;
