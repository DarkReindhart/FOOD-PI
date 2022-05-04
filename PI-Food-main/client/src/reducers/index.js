
const initialState = {
    recipes: [],
    recipeDetail: {},
    diets: [],
    allRecipes: [],
    meFui: false
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                meFui: true
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
            const copyRecipes = state.allRecipes
            const filteredRecipes = action.payload === 'All' ? copyRecipes : copyRecipes.filter(el => el.dietType.includes(action.payload))
            return {
                ...state,
                recipes: [...filteredRecipes]
            }
        case 'ORDER_BY':
            let orderedBy = action.payload === "asc" ? state.recipes.sort((a, b) => a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1) 
            :action.payload === "desc" ? state.recipes.sort((a, b) => a.name.toLowerCase() >= b.name.toLowerCase() ? -1 : 1) 
            :action.payload === "ascScore" ? state.recipes.sort((a, b) =>a.score - b.score ) 
            :state.recipes.sort((a, b) => b.score - a.score)
            return {
                ...state,
                recipes: [...orderedBy]
            }
        case 'GET_BY_NAME':
            return {
                ...state,
                recipes: action.payload
            }
        case 'RESET_DETAIL':
            return {
                ...state,
                recipeDetail: {}
            }
        case 'LOAD_RECIPES':
            return {
                ...state,
                meFui: false
            }
        default:
            return { ...state }
    }
}