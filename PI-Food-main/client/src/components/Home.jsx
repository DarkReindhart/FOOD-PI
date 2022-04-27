import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes } from '../actions'
import Card from './Card'

export default function Home() {
    
    const dispatch = useDispatch();
    //recibo todos los datos, acordarse de que utilizar
    let recipes = useSelector(state => state.recipes)

    React.useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])
    
  return (
    <div>
        <h1>Comidas</h1>
        {
            recipes && recipes.map(el => 
                <Card key = {el.id} id={el.id} name={el.name} image={el.image} dietType={el.dietType}/>)
        }
    </div>
  )
}
