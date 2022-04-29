
const initialState = {
    recipes: [],
    recipeDetail: {},
    diets: [],
    allRecipes: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'GET_RECIPE_DETAIL':
            return {
                ...state,
                recipeDetail: action.payload
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'FILTER_DIETS':
            const allRecipes = state.allRecipes
            const filteredRecipes = action.payload === 'All' ? allRecipes : allRecipes.filter(el => el.dietType.includes(action.payload))
            return {
                ...state,
                recipes: filteredRecipes
            }
        case 'ORDER_BY':
            let orderedBy = action.payload === "asc" ? state.recipes.sort((a, b) => a.name >= b.name ? 1 : -1) 
            :action.payload === "desc" ? state.recipes.sort((a, b) => a.name >= b.name ? -1 : 1) 
            :action.payload === "ascScore" ? state.recipes.sort((a, b) =>a.score >= b.score ? 1 : -1) 
            :state.recipes.sort((a, b) =>a.score >= b.score ? -1 : 1)
            return {
                ...state,
                recipes: orderedBy
            }
        default:
            return { ...state }
    }
}