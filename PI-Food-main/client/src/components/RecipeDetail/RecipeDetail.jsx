import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeDetail } from '../../actions'
import NavBar from '../NavBar/NavBar'

export default function RecipeDetail(props) {

  const dispatch = useDispatch()
  let recipeDetail = useSelector(state => state.recipeDetail)

  useEffect(() => {
    dispatch(getRecipeDetail(props.match.params.id))
  }, [dispatch, props.match.params.id])


  return (
    <div>
      <NavBar></NavBar>
      {
        recipeDetail.name ? <div>
          <img src={recipeDetail.image} alt="not found" />
          <p>{recipeDetail.name}</p>
          <p dangerouslySetInnerHTML={{ __html: `Summary: ${recipeDetail.summary}` }} />
          <p>{recipeDetail.dietType}</p>
          <p>{recipeDetail.dishTypes}</p>
          {typeof recipeDetail.steps === 'string' ? <p>Steps: {recipeDetail.steps}</p> :
            recipeDetail.steps?.map(el => <p key={el.number}>{`Step ${el.number}: ${el.step}`}</p>)}
          <p>Score: {recipeDetail.score}</p>
          <p>HealthScore: {recipeDetail.healthScore}</p>
        </div> : <div>Loading recipe...</div>
      }
    </div>
  )
}
