import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeDetail } from '../../actions'
import NavBar from '../NavBar/NavBar'
import './RecipeDetail.css'

export default function RecipeDetail(props) {

  const dispatch = useDispatch()
  let recipeDetail = useSelector(state => state.recipeDetail)
  const [click, setClick] = useState(false)

  useEffect(() => {
    dispatch(getRecipeDetail(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const handleShow = (e) => {
    e.preventDefault()
    setClick(!click)
  }


  return (
    <div className='paddiv'>
      <NavBar></NavBar>
      {
        recipeDetail.name ?
          <div>
            <div className='detail'>
              <h3 className = 'name'>{recipeDetail.name}</h3>
              <div className='contentAlign'>
                <img className='imagesize' src={recipeDetail.image} alt="not found" />
              </div>
              <div className='name'>
              <p><b>Score</b>: {recipeDetail.score} </p>
              <p><b>HealthScore</b>: {recipeDetail.healthScore} </p>
              </div>
              <div>
              <p className ='items' dangerouslySetInnerHTML={{ __html: `<b>Summary</b>: ${recipeDetail.summary}` }} />
              </div>
              {recipeDetail.dietType?.length ? <p className ='items'><b>Diet type</b>: {recipeDetail.dietType?.join(", ")} </p> : <p className ='items'><b>Diet type</b>: No diets associated with this dish</p>}
              {recipeDetail.dishTypes?.length ? <p className ='items'><b>Dish type</b>: {recipeDetail.dishTypes?.join(", ")} </p> : <p className ='items'><b>Dish type</b>: No dish type associated with this dish</p>}
              <div><button onClick={(e) => handleShow(e)} className='centerbtn'>STEPS</button></div>
              {!click ? <div></div> :!recipeDetail.steps ? <p className ='items name'>No steps available</p>:typeof recipeDetail.steps === 'string' ? <p className ='items'><b>Steps</b>: {recipeDetail.steps}</p> :
                recipeDetail.steps?.map(el => <p className ='items' key={el.number}><b>Step</b> {`${el.number}: ${el.step}`}</p>)}
            </div> </div> : <div>Loading recipe...</div>
      }
    </div>
  )
}
