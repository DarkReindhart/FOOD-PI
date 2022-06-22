import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { rememberSearchFilter, filterDiets, getRecipesByName, orderBy, resetStates, getRecipes } from '../../actions'
import './SearchBar.css'

export default function SearchBar() {

  const dispatch = useDispatch()
  const location = useLocation()
  const atHome = location.pathname === "/home"
  const [name, setName] = useState("")
  const filterAndSearch = useSelector(state => state.rememberSearchFilter)
  const orderingMemo = useSelector(state => state.ordering)
  const filteredMemo = useSelector(state => state.filtered)

  useEffect(()=>{
    if(filterAndSearch){
      dispatch(orderBy(orderingMemo))
      dispatch(filterDiets(filteredMemo))
      dispatch(rememberSearchFilter())
    }
  },[dispatch, filterAndSearch, orderingMemo, filteredMemo])

  const handleChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getRecipesByName(name))
    
  }

  const handleSubmitClear = (e) => {
    e.preventDefault()
    dispatch(resetStates())
    dispatch(getRecipes())
    setName("")
  }

  const handleEnter = (e) => {
    if(e.code === 'Enter') dispatch(getRecipesByName(name))
  }
  return (
    atHome && <div className="bar">
      <input className='search' value = {name} onChange={(e) => handleChange(e)} onKeyPress= {(e) => handleEnter(e)}type="search" placeholder='Search by dish name...' />
      <button className='find' onClick={(e) => handleSubmit(e)} type='button'>Search</button>
      <button className='find' onClick={(e) => handleSubmitClear(e)}>Clear</button>
    </div>
  )
}
