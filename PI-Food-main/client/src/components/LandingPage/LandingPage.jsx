import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDiets, getRecipes, loadingRecipes } from '../../actions'
import './LandingPage.css'

function LandingPage() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getDiets())
    return dispatch(loadingRecipes())
  }, [dispatch])

  return (
    <div className="landing">
      <h1>Foods of the World</h1>
      <div>
        <Link to='/home'>
        <button className="btn-hover color-1">
          Let's find some Recipes
        </button>
      </Link>
      </div>
    </div>
  )
}

export default LandingPage