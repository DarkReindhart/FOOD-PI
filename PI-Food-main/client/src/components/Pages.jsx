import React from 'react'
import './Pages.css'

export default function Pages({recipesPerPage, recipes, pages }) {
    const numberOfPages = []

    for(let i = 1; i <= Math.ceil(recipes/recipesPerPage); i++){
        numberOfPages.push(i)
    }
  return (
    <nav>
        <ul className = 'nav'>
            {numberOfPages && numberOfPages.map(el => (
                <li key={el}>
                    <button onClick={() => pages(el)}>{el}</button>
                </li>
            ))}
        </ul>
    </nav>
  )
}
