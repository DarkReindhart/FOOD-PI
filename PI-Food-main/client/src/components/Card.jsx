import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({ id, name, image, dietType }) {
    return (
        <div>
            <img src={image} alt="not found" />
            <Link to={`/recipeDetail/${id}`}>
                <p>{name}</p>
            </Link>
            <p> {dietType} </p>
        </div>
    )
}
