import React from 'react'
import { NavLink } from 'react-router-dom'
import './Card.css'

export default function Card({ id, name, image, dietType, dishType }) {
    return (
        <NavLink className='link' to={`/recipeDetail/${id}`}>
        <div className='card'>
                <img src={image} alt="not found" className="img" />
                <h4 >{name}</h4>
                <div>
                {
                    dietType?.length ? <p>Diets: {dietType?.join(", ")}</p> :
                    <p>No diets associated with this dish</p>
                }
                {
                    dishType?.length ? <p>Dish Type: {dishType?.join(", ")}</p> :
                    <p>No Dish type associated with this dish</p>
                }
            </div>
        </div>
        </NavLink>
    )
}
