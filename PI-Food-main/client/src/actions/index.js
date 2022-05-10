const axios = require('axios');
export const GET_RECIPES = 'GET_RECIPES'
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL'
export const GET_DIETS = 'GET_DIETS'
export const FILTER_DIETS = 'FILTER_DIETS'
export const ORDER_BY = 'ORDER_BY'
export const GET_BY_NAME = 'GET_BY_NAME'
export const LOAD_RECIPES = 'LOAD_RECIPES'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const RESET_STATES = 'RESET_STATES'
export const REMEMBER_SEARCH_FILTER = 'REMEMBER_SEARCH_FILTER'

export function getRecipes() {
    return async function (dispatch) {
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

export function getRecipeDetail(idRecipe) {
    return async function (dispatch) {
        try {
            const recipeDetail = await axios.get(`http://localhost:3001/recipes/${idRecipe}`)
            return dispatch({ type: GET_RECIPE_DETAIL, payload: { ...recipeDetail.data } })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export function getDiets() {
    return async function (dispatch) {
        try {
            const diets = await axios.get(`http://localhost:3001/types`)
            return dispatch({ type: GET_DIETS, payload: diets.data })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export function filterDiets(value) {
    return {
        type: FILTER_DIETS,
        payload: value
    }
}

export function orderBy(value) {
    return {
        type: ORDER_BY,
        payload: value
    }
}

export function getRecipesByName(name) {
    return async function (dispatch) {
        try {
            let recipes = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({ type: GET_BY_NAME, payload: recipes.data })
        } catch (error) {
            if (error.response?.status === 404) {
                alert(error.response.data)
            }
            else {
                alert('Internal error')
            }
        }
    }
}

export function createRecipe(recipe) {
    return async function (dispatch) {
        try {
            const newRecipe = await axios.post(`http://localhost:3001/recipe`, recipe)
            return alert(newRecipe.data)
        } catch (error) {
            if (error.response?.status === 500) {
                alert(error.response.data)
            }
            else if (error.response?.status === 400) {
                alert(error.response.data)
            }
            else if (error.response?.status === 302) {
                alert(error.response.data)
            }
        }

    }
}

export function loadingRecipes() {
    return {type: LOAD_RECIPES}
}

export function rememberSearchFilter() {
    return {type: REMEMBER_SEARCH_FILTER}
}

export function resetStates(){
    return {type: RESET_STATES}
}

export function deleteRecipe(idRecipe){
    return async function(dispatch){
        try {
            const deletedRecipe = await axios.delete(`http://localhost:3001/recipe/${idRecipe}`)
            return alert(deletedRecipe.data)
        } catch (error) {
            if (error.response?.status === 404) {
                alert(error.response.data)
            }
        }
    }
}



