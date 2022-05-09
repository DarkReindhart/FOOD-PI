import { GET_RECIPES, GET_RECIPE_DETAIL, GET_DIETS, FILTER_DIETS, 
    ORDER_BY, GET_BY_NAME, LOAD_RECIPES, RESET_STATES } from "../actions" 
const initialState = {
    recipes: [],
    recipeDetail: {},
    diets: [],
    allRecipes: [],
    loading: false,
    algo: false,
    filtered: "All",
    ordering: ""
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                loading: true
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case FILTER_DIETS:
            const copyRecipes = state.allRecipes
            const filteredRecipes = action.payload === 'All' ? copyRecipes :copyRecipes.filter(el => el.dietType.includes(action.payload))
            return {
                ...state,
                recipes: [...filteredRecipes],
                filtered: action.payload
            }
        case ORDER_BY:
            let orderedBy = action.payload === "asc" ? state.recipes.sort((a, b) => a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1) 
            :action.payload === "desc" ? state.recipes.sort((a, b) => a.name.toLowerCase() >= b.name.toLowerCase() ? -1 : 1) 
            :action.payload === "ascScore" ? state.recipes.sort((a, b) =>a.score - b.score ) 
            :state.recipes.sort((a, b) => b.score - a.score)
            return {
                ...state,
                recipes: [...orderedBy],
                ordering: action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                algo: true
            }
        case LOAD_RECIPES:
            return {
                ...state,
                loading: false
            }
        case 'ALGO':
            return{
                ...state,
                algo:false
            }
        case RESET_STATES:
            return {
                ...state,
                filtered: 'All',
                ordering: ""
            }
        default:
            return { ...state }
    }
}