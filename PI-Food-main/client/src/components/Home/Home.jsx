import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterDiets, getDiets, getRecipes, loadingRecipes, orderBy, resetDetail, resetStates } from '../../actions'
import Card from '../Card/Card'
import Pages from '../Pages/Pages'
import './Home.css'

export default function Home() {

  const dispatch = useDispatch();
  let recipes = useSelector(state => state.recipes)
  let diets = useSelector(state => state.diets)
  let loading = useSelector(state => state.loading)
  let ordering = useSelector(state => state.ordering)
  let filtered = useSelector(state => state.filtered)
  const [actualPage, setActualPage] = useState(1)
  const recipesPerPage = 9
  const lastRecipe = actualPage * recipesPerPage
  const firstRecipe = lastRecipe - recipesPerPage
  const recipesShown = recipes.slice(firstRecipe, lastRecipe)

  const pages = (value) => {
    setActualPage(value)
    window.scrollTo(0,0)
  }

  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getDiets())
    return dispatch(loadingRecipes())
  }, [dispatch])

  useEffect(() => {
    dispatch(resetDetail())
  })

  useEffect(() => {
    setActualPage(1)
  }, [recipes])

  useEffect(() => {
    return dispatch(resetStates())
  }, [dispatch])

  function handleFilterByDiet(e) {
    dispatch(filterDiets(e.target.value))
    dispatch(orderBy(ordering))
  }

  function handleOrderBy(e) {
    dispatch(orderBy(e.target.value))
    
  }

  return (
    <div>
      <div className="align">
        <div className='order_filter'>
          <select value={ordering}className='sizes' onChange={e => handleOrderBy(e)}>
            <option value="" hidden>Order by...</option>
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
            <option value="ascScore">1 to 100</option>
            <option value="descScore">100 to 1</option>
          </select>
        </div>
          <div className='order_filter'>
          <select value={filtered} className='sizes' onChange={e => handleFilterByDiet(e)}>
            <option value="" hidden>Por Dieta...</option>
            {diets.map(el => <option key={el.id} value={el.name}>{el.name}</option>)}
          </select>
        </div>
      </div>
      <div className='align'>
        {
          loading ? recipesShown.length ? recipesShown?.map(el =>
            <Card key={el.id} healthScore = {el.healthScore} id={el.id} name={el.name} score={el.score} image={el.image} dietType={el.dietType} dishType={el.dishType} />)
            : <div className='messages'><b>No recipes found!</b></div>
            : <div className='messages'><b>Loading...</b></div>
        }
      </div>
      <Pages actualPage={actualPage} recipesPerPage={recipesPerPage} recipes={recipes.length} pages={pages} />
    </div>
  )
}
