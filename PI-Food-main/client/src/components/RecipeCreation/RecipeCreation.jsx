import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRecipe, getDiets } from '../../actions'
import './RecipeCreation.css'
const onlyLetters = /^[a-zA-Z\s]*$/
const imgRegEX = /^http[^]*.(jpg|jpeg|gif|png|tiff|bmp)((.*))?$/gmi;


export default function RecipeCreation() {
  const defaultTemplate = {
    name: "",
    summary: "",
    image: "",
    score: 1,
    healthScore: 1,
    steps: "",
    diet: []
  }
  const dispatch = useDispatch()
  const diets = useSelector(state => state.diets)
  const [template, setTemplate] = useState(defaultTemplate)
  const [error, setError] = useState({ name: "", summary: "", image: "" })

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])

  const handleValidateName = (e) => {
    setTemplate({ ...template, name: e.target.value })
    if (!e.target.value) { setError({ ...error, name: "The name of the dish is required" }) }
    else if (!onlyLetters.test(e.target.value)) { setError({ ...error, name: "Only upper and lower letters are allowed" }) }
    else (setError({ ...error, name: "" }))
  }

  const handleValidateSummary = (e) => {
    setTemplate({ ...template, summary: e.target.value })
    if (!e.target.value) { setError({ ...error, summary: "The summary of the dish is required" }) }
    else (setError({ ...error, summary: "" }))
  }

  const handleValidateImage = (e) => {
    setTemplate({ ...template, image: e.target.value })
    if (e.target.value !== "" && e.target.value.match(imgRegEX) === null) {
      setError({ ...error, image: 'Invalid image format!' })
    }
    else (setError({ ...error, image: "" }))
  }

  const handleChange = (e) => {
    setTemplate({
      ...template,
      [e.target.name]: e.target.value
    })
  }

  const handleCheck = (e) => {
    if (e.target.checked) {
      setTemplate({
        ...template,
        diet: [...template.diet, e.target.name]
      })
    }
    else {
      setTemplate({
        ...template,
        diet: [...template.diet.filter(el => el !== e.target.name)]
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createRecipe({ ...template, image: template.image || undefined }))
    setTemplate(defaultTemplate)
  }

  return (
    <div className='big_container'>
      <div>
      </div>
      <div className='bg'>
        <h1>Create your Recipe</h1>
        <p>(* means required field)</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='elements'>
            <p><b>Name* </b></p>
            <input className='areas' maxLength="100" onChange={(e) => handleValidateName(e)} type="text" value={template.name} name='name' />
            {error.name && <p className='danger'><b>{error.name}</b></p>}
          </div>
          <div className='elements'>
            <p><b>Summary* </b></p>
            <textarea className='areas' onChange={(e) => handleValidateSummary(e)} value={template.summary} name="summary" cols="50" rows="6"></textarea>
            {error.summary && <p className='danger'><b>{error.summary}</b></p>}
          </div>
          <div className='elements'>
            <p><b>Steps </b></p>
            <textarea className='areas' onChange={(e) => handleChange(e)} value={template.steps} name="steps" cols="50" rows="6"></textarea>
          </div>
          <div className='elements'>
            <p><b>Image (URL)</b></p>
            <input className='areas' title="valid image extension on URL" type="text" placeholder="https://yourImageLink.jpg" value={template.image} onChange={(e) => handleValidateImage(e)} name="image" />
          </div>
          <div>
            {template.image && !error.image && <img className='image' src={template.image} alt="not found" width="120" height="120" />}
            {error.image && <p className='danger'><b>{error.image}</b></p>}
          </div>
          <div className='elements'>
            <label><b>Score </b></label>
            <input onChange={(e) => handleChange(e)} value={template.score} type="range" name="score" min="1" max="100" /><label>{template.score}</label>
          </div>
          <div className='elements'>
            <label><b>HealthScore </b></label>
            <input onChange={(e) => handleChange(e)} value={template.healthScore} type="range" name="healthScore" min="1" max="100" /><label>{template.healthScore}</label>
          </div>
          <label><b>Choose one or more Diets</b></label>
          <div className='justify'>
            {diets.map(el => <label key={el.id} className='align_diet'><input checked={template.diet.includes(el.name)} onChange={(e) => handleCheck(e)} type="checkbox" key={el.name} name={el.name} />{el.name}</label>)}
          </div>
          <div>
            <button className='specificButton' disabled={Object.values(error).filter(el => el !== "").length || !template.name || !template.summary} type='submit'>Create Recipe</button>
          </div>
        </form>
      </div>
    </div>
  )
}
