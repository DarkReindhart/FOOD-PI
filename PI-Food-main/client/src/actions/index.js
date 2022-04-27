const axios = require('axios');
const GET_RECIPES = 'GET_RECIPES'

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