const Swal = require('sweetalert2')
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
export const RESET_DETAIL = 'RESET_DETAIL'

const  URL  = process.env.REACT_APP_URL



export function resetDetail(){
    return {type: RESET_DETAIL}
}

export function getRecipes() {
    return async function (dispatch) {
        try {
            let recipes = await axios.get(`${URL}recipes`)
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
            const recipeDetail = await axios.get(`${URL}recipes/${idRecipe}`)
            return dispatch({ type: GET_RECIPE_DETAIL, payload: { ...recipeDetail.data } })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export function getDiets() {
    return async function (dispatch) {
        try {
            const diets = await axios.get(`${URL}types`)
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
            let recipes = await axios.get(`${URL}recipes?name=${name}`)
            return dispatch({ type: GET_BY_NAME, payload: recipes.data })
        } catch (error) {
            if (error.response?.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data,
                    confirmButtonColor: '#00A300'
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Internal error',
                    confirmButtonColor: '#00A300'
                })
            }
        }
    }
}

export function createRecipe(recipe) {
    return async function (dispatch) {
        try {
            const newRecipe = await axios.post(`${URL}recipe`, recipe)
            return Swal.fire({
                icon: 'success',
                title: newRecipe.data,
                confirmButtonColor: '#00A300' 
            })
        } catch (error) {
            if (error.response?.status) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data,
                    confirmButtonColor: '#00A300' 
                })
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
            const deletedRecipe = await axios.delete(`${URL}recipe/${idRecipe}`)
            return Swal.fire({
                icon: 'success',
                title: deletedRecipe.data,
                confirmButtonColor: '#00A300'
            })
        } catch (error) {
            if (error.response?.status) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data,
                    confirmButtonColor: '#00A300'
                })
            }
        }
    }
}



