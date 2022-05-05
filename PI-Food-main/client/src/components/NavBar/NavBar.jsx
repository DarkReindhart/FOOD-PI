import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { getRecipes } from '../../actions'
import SearchBar from '../SearchBar/SearchBar'
import "./NavBar.css"

export default function NavBar() {

  const dispatch = useDispatch();
  const location = useLocation();
  const atHome = location.pathname === "/home"
  const atRecipeDetail = location.pathname.includes("/recipeDetail")
  const handleRefresh = (e) => {
    dispatch(getRecipes())
  }
  return (
    <div >
      <ul className="nav">
        <li>
          <Link to="/home">
              <img className= {atHome ? 'icon' : 'iconchange'} src="https://cdn-icons-png.flaticon.com/512/1046/1046755.png" alt="not found" />
          </Link>
          </li>
          <li>
        {atHome ? <div className='title' ><h1>Home</h1></div> : <NavLink className={atHome ? 'title' : 'nothome'} to="/home">
          <h1 onClick={(e) => handleRefresh(e)}>Home</h1>
        </NavLink>}
        </li>
        <li>
          <NavLink className= {atHome ? 'create' : atRecipeDetail ? 'create' : 'createchange'} to='/createRecipe'>
            <h2>Create a Recipe</h2>
          </NavLink>
          </li>
      </ul>
      <SearchBar></SearchBar>
    </div>
  )
}
