import React from 'react'
import './Pages.css'

export default function Pages({recipesPerPage, recipes, pages, actualPage }) {
    const numberOfPages = []

    for(let i = 1; i <= Math.ceil(recipes/recipesPerPage); i++){
        numberOfPages.push(i)
    }
  return (
    <nav>
        <ul className = 'nav'>
            <li >
                <button disabled = {actualPage === 1} onClick = {(e) => pages(actualPage-1)}>{"<"}</button>
            </li>
            {numberOfPages && numberOfPages.map(el => (
                <li key={el}>
                    <button className={el === actualPage? 'coloredButton' : ''} onClick={() => pages(el)}>{el}</button>
                </li>
            ))}
            <li >
                <button disabled = {actualPage === numberOfPages.length} onClick = {(e) => pages(actualPage+1)}>{">"}</button>
            </li>
        </ul>
    </nav>
  )
}
