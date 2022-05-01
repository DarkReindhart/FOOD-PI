import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipesByName } from '../actions'

export default function SearchBar() {
  
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  const handleChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getRecipesByName(name))
  }
  return (
    <div>
      <input onChange= {(e) => handleChange(e)} type="text" placeholder='Search by dish name...' />
      <button onClick={(e) => handleSubmit(e)}type='button'>Search</button>
    </div>
  )
}
