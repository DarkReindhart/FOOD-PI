import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
        <h1>Foods of the World</h1>
        <Link to = '/home'>
            <button>
                ¡ A Comer !
            </button>
        </Link>
    </div>
  )
}

export default LandingPage