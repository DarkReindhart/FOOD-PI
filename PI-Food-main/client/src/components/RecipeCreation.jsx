import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRecipe, getDiets } from '../actions'
const onlyLetters = /^[a-zA-Z\s]*$/

export default function RecipeCreation() {
  const defaultTemplate = {
    name: "",
    summary: "",
    score: 1,
    healthScore: 1,
    steps: "",
    diet: []
  }
  const dispatch = useDispatch()
  const diets = useSelector(state => state.diets)
  const [template, setTemplate] = useState(defaultTemplate)
  const [error, setError] = useState({name:"", summary:""})

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])

  const handleValidateName = (e) => {
    setTemplate({...template, [e.target.name]: e.target.value})
    if (!e.target.value) { setError({ ...error, name: "The name of the dish is required" }) }
    else if (!onlyLetters.test(e.target.value)) { setError({ ...error, name: "Only upper and lower letters are allowed" }) }
    else (setError({ ...error, name: "" }))
    console.log(error)
  }
  

  const handleChange = (e) => {
    setTemplate({
      ...template,
      [e.target.name]: e.target.value
    })
  }

  const handleCheck = (e) => {
    if(e.target.checked){
      setTemplate({
        ...template,
        diet: [...template.diet, e.target.name]
      })
    }
    else{
      setTemplate({
        ...template,
        diet: [...template.diet.filter(el => el !== e.target.name)]
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createRecipe(template))
    setTemplate(defaultTemplate)
  }


  return (
    <div>
      <h1>Create your Recipe</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
        <label>Name*: </label>
        <input onChange={(e) => handleValidateName(e)} type="text" value={template.name} name='name' />
        {error.name && <p className='danger'>{error.name}</p>}
        </div>
        <div>
        <label>Summary*: </label>
        <textarea onChange={(e) => handleChange(e)} value= {template.summary} name="summary" cols="50" rows="6"></textarea>
        </div>
        <div>
        <label>Score: </label>
        <input onChange={(e) => handleChange(e)} value={template.score} type="range" name="score" min="1" max="100"/><label>{template.score}</label>
        </div><div>
        <label>HealthScore: </label>
        <input onChange={(e) => handleChange(e)} value={template.healthScore} type="range" name="healthScore" min="1" max="100"/><label>{template.healthScore}</label>
        </div><div>
        <label>Steps: </label>
        <textarea onChange={(e) => handleChange(e)} value= {template.steps} name="steps" cols="50" rows="6"></textarea>
        </div>
        {diets.map(el => <div key={el.id}><label>{el.name}</label><input checked = {template.diet.includes(el.name)} onChange={(e) => handleCheck(e)} type="checkbox" key={el.name} name={el.name}/></div>)}
        <div>
          <button type='submit'>Create Recipe</button>
        </div>
      </form>
    </div>
  )
}
