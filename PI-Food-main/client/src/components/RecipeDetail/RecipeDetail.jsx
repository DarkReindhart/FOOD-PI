import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeDetail } from '../../actions'
import NavBar from '../NavBar/NavBar'
import './RecipeDetail.css'

export default function RecipeDetail(props) {

  const dispatch = useDispatch()
  let recipeDetail = useSelector(state => state.recipeDetail)

  useEffect(() => {
    dispatch(getRecipeDetail(props.match.params.id))
  }, [dispatch, props.match.params.id])


  return (
    <div className='paddiv'>
      <NavBar></NavBar>
      {
        recipeDetail.name ? <div className='detail'>
          <div className='alignimage'>
          <img className='imagesize'src={recipeDetail.image} alt="not found" />
          </div>
          <p><b>{recipeDetail.name}</b></p>
          <p dangerouslySetInnerHTML={{ __html: `Summary: ${recipeDetail.summary}` }} />
          <p><b>Diet type</b>: {recipeDetail.dietType.join(", ")} </p>
          <p><b>Dish type</b>: {recipeDetail.dishTypes.join(", ")} </p>
          {typeof recipeDetail.steps === 'string' ? <p><b>Steps</b>: {recipeDetail.steps}</p> :
            recipeDetail.steps?.map(el => <p key={el.number}>{`Step ${el.number}: ${el.step}`}</p>)}
          <p><b>Score</b>: {recipeDetail.score}</p>
          <p><b>HealthScore</b>: {recipeDetail.healthScore}</p>
        </div> : <div>Loading recipe...</div>
      }
    </div>
  )
}
