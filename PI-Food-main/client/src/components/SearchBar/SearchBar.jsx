import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getRecipesByName } from '../../actions'
import './SearchBar.css'

export default function SearchBar() {

  const dispatch = useDispatch()
  const location = useLocation()
  const atHome = location.pathname === "/home"
  const [name, setName] = useState("")

  const handleChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getRecipesByName(name))
    setName("")
  }
  return (
    atHome && <div className='searchBar'>
      <input className='search' value = {name} onChange={(e) => handleChange(e)} type="text" placeholder='Search by dish name...' />
      <button className='button' onClick={(e) => handleSubmit(e)} type='button'>Search</button>
    </div>
  )
}
