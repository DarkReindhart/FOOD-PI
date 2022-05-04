import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
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