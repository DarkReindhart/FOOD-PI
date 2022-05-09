import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteRecipe, getRecipeDetail } from '../../actions'
import NavBar from '../NavBar/NavBar'
import './RecipeDetail.css'
const regExUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/

export default function RecipeDetail(props) {

  const dispatch = useDispatch()
  let recipeDetail = useSelector(state => state.recipeDetail)
  const [click, setClick] = useState(false)
  const history = useHistory()

  useEffect(() => {
    dispatch(getRecipeDetail(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const handleShow = (e) => {
    e.preventDefault()
    setClick(!click)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    if(window.confirm('Are you sure you want to delete this recipe?')){
      dispatch(deleteRecipe(props.match.params.id))
      history.push("/home")
    }
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
              <div>{regExUUID.test(props.match.params.id) && <button onClick={(e) => handleDelete(e)} className ='centerbtn'>DELETE</button>}</div>
            </div>
             </div> : <div className='message'><b>Loading recipes...</b></div>
      }
    </div>
  )
}
