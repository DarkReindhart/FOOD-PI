import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeDetail } from '../actions'

export default function RecipeDetail(props) {

    const dispatch = useDispatch()
    let recipeDetail = useSelector(state => state.recipeDetail)

    useEffect(() => {
      dispatch(getRecipeDetail(props.match.params.id))
    }, [dispatch, props.match.params.id])
    
    
  return (
    <div>
      <img src={recipeDetail.image} alt="not found" />
      <p>{recipeDetail.name}</p>
      <p>{recipeDetail.dietType}</p>
      <p>{recipeDetail.dishTypes}</p>
      <p>{typeof recipeDetail.steps === 'string' ? <p>{recipeDetail.steps}</p> :
      recipeDetail.steps?.map(el => <p>{el.number + el.step}</p>)}</p>
      <p>{recipeDetail.score}</p>
      <p>{recipeDetail.healthScore}</p>
      <p dangerouslySetInnerHTML={{ __html: recipeDetail.summary}}/>
      
    </div>
  )
}
