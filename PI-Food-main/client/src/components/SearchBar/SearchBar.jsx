import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { algo, filterDiets, getRecipesByName, orderBy, resetStates } from '../../actions'
import './SearchBar.css'

export default function SearchBar() {

  const dispatch = useDispatch()
  const location = useLocation()
  const atHome = location.pathname === "/home"
  const [name, setName] = useState("")
  const filterAndSearch = useSelector(state => state.algo)
  const orderingMemo = useSelector(state => state.ordering)
  const filteredMemo = useSelector(state => state.filtered)

  useEffect(()=>{
    if(filterAndSearch){
      dispatch(orderBy(orderingMemo))
      dispatch(filterDiets(filteredMemo))
      dispatch(algo())
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
    dispatch(getRecipesByName(""))
    dispatch(filterDiets("All"))
    dispatch(orderBy(""))
    dispatch(resetStates())
    setName("")
  }
  return (
    atHome && <div className="bar">
      <input className='search' value = {name} onChange={(e) => handleChange(e)} type="search" placeholder='Search by dish name...' />
      <button className='find' onClick={(e) => handleSubmit(e)} type='button'>Search</button>
      <button onClick={(e) => handleSubmitClear(e)}>Clear</button>
    </div>
  )
}
