import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterDiets, getDiets, getRecipes, orderBy } from '../actions'
import { Link } from 'react-router-dom'
import Card from './Card'
import SearchBar from './SearchBar'
import Pages from './Pages'
import NavBar from './NavBar/NavBar'

export default function Home() {

  const dispatch = useDispatch();
  //recibo todos los datos, acordarse de que utilizar
  let recipes = useSelector(state => state.recipes)
  let diets = useSelector(state => state.diets)
  const [actualPage, setActualPage] = useState(1)
  const [recipesPerPage, setRecipesPerPage] = useState(9)
  const [ordered, setOrdered] = useState("")
  const lastRecipe = actualPage * recipesPerPage
  const firstRecipe = lastRecipe - recipesPerPage
  const recipesShown = recipes.slice(firstRecipe, lastRecipe)

  const pages = (value) => {
    setActualPage(value)
  }

  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getDiets())
  }, [dispatch])

  function handleFilterByDiet(e) {
    dispatch(filterDiets(e.target.value))
    dispatch(orderBy(ordered))
    setActualPage(1)
  }

  function handleOrderBy(e) {
    dispatch(orderBy(e.target.value))
    setOrdered(`${e.target.value}`)
    setActualPage(1)
  }

  return (
    <div>
      <h1>Comidas</h1>
      <NavBar></NavBar>
      <SearchBar></SearchBar>
      <Link to='/createRecipe'>
        <p>Crear Receta</p>
      </Link>
      <div>
        <select onChange={e => handleOrderBy(e)}>
          <option value="" hidden>Ordenar por...</option>
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
          <option value="ascScore">1 to 100</option>
          <option value="descScore">100 to 1</option>
        </select>
        <select onChange={e => handleFilterByDiet(e)}>
          <option value="" hidden>Por Dieta...</option>
          <option value="All">Sin Filtrar</option>
          {diets.map(el => <option value={el.name}>{el.name}</option>)}
        </select>
      </div>
      {
        recipesShown && recipesShown.map(el =>
          <Card key={el.id} id={el.id} name={el.name} score={el.score} image={el.image} dietType={el.dietType} dishType={el.dishType} />)
      }
      <Pages recipesPerPage={recipesPerPage} recipes={recipes.length} pages={pages} />
    </div>
  )
}
