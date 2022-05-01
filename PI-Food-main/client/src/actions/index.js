const axios = require('axios');
const GET_RECIPES = 'GET_RECIPES'
const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL'
const GET_DIETS = 'GET_DIETS'
const FILTER_DIETS = 'FILTER_DIETS' 
const ORDER_BY = 'ORDER_BY'
const GET_BY_NAME = 'GET_BY_NAME'


export function getRecipes(){
    return async function(dispatch){
        try {
            let recipes = await axios.get(`http://localhost:3001/recipes`)
            return dispatch({
                type: GET_RECIPES,
                payload: recipes.data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export function getRecipeDetail(idRecipe){
    return async function(dispatch){
        try {
            const recipeDetail = await axios.get(`http://localhost:3001/recipes/${idRecipe}`)
            return dispatch({ type: GET_RECIPE_DETAIL, payload: {...recipeDetail.data}})
        } catch (error) {
           console.log(error.message) 
        }
    }
}

export function getDiets(){
    return async function(dispatch){
        try {
            const diets = await axios.get(`http://localhost:3001/types`)
            return dispatch({type: GET_DIETS, payload: diets.data})
        } catch (error) {
            console.log(error.message)
        }
    }
}

export function filterDiets(value){
    return {
        type: FILTER_DIETS,
        payload: value
    }
}

export function orderBy(value){
    return {
        type:ORDER_BY,
        payload: value
    }
}

export function getRecipesByName(name){
    return async function(dispatch){
        try {
            let recipes = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({type: GET_BY_NAME, payload: recipes.data})
        } catch (error) {
            console.log(error)
        }
    }
}

export function createRecipe(recipe){
    return async function(dispatch){
        try {
            const newRecipe = await axios.post(`http://localhost:3001/recipe`, recipe)
        return newRecipe
        } catch (error) {
           console.log(error) 
        }
        
    }
}