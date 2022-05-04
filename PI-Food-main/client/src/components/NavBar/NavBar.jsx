import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { getRecipes } from '../../actions'
import SearchBar from '../SearchBar/SearchBar'
import "./NavBar.css"

export default function NavBar() {

  const dispatch = useDispatch();

  const handleRefresh = (e) => {
    dispatch(getRecipes())
  }
  return (
    <nav className = "Nav">
      <Link to="/home">
        <div className = "icon">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046755.png" alt="not found" />
        </div>
      </Link>
      <NavLink className='title' to="/home">
        <h1 onClick={(e) => handleRefresh(e)}>Home</h1>
      </NavLink>
      <NavLink className='create' to='/createRecipe'>
        <div>Create a Recipe</div>
      </NavLink>
      <SearchBar></SearchBar>
    </nav>
  )
}
