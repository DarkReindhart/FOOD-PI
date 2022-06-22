import React from 'react'
import { NavLink } from 'react-router-dom'
import './Card.css'

export default function Card({ id, name, image, dietType, dishType, healthScore }) {
    return (
        <NavLink className='link' to={`/recipeDetail/${id}`}>
        <div className='card'>
                <img src={image} alt="not found" className="img" />
                <h4 className='wrap_word'>{name}</h4>
                <div>
                {
                    dietType?.length ? <p className='wrap_word'>Diets: {dietType?.join(", ")}</p> :
                    <p>No diets associated with this dish</p>
                }
                {
                    dishType?  <p className='wrap_word'>Dish Type: {dishType}</p> :
                    <p>No Dish type associated with this dish</p>
                }
                <p>HealthScore: {healthScore}</p>
            </div>
        </div>
        </NavLink>
    )
}
