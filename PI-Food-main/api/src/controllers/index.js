const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Diet, Recipe } = require('../db.js');

let typesInfo = async () => {
    try {
        const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const dietType = apiInfo.data.results.map(el => el.diets)
        const uniqueDT = [...new Set(dietType.flat())]
        const allTypes = uniqueDT.concat(["ketogenic", "vegetarian", "low fodmap"])
        allTypes.forEach(el => Diet.findOrCreate({
            where: {
                name: el.toLowerCase()
            },
            order: [
                ['id', 'DESC']
            ]
        }))
        return allTypes
    } catch (error) {
        throw new Error(error)
    }
}

const apiInfo = async () => {
    try {
        const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        let requiredInfo = info.data.results.map(el => {
            let diets = el.diets.map(el => el)
            if (el.vegan && !diets.includes('vegan')) diets.push('vegan')
            if (el.vegetarian && !diets.includes('vegetarian')) diets.push('vegetarian')
            if (el.glutenFree && !diets.includes('gluten free')) diets.push('gluten free')
            if (el.dairyFree && !diets.includes('dairy free')) diets.push('dairy free')
            if (el.lowFodmap && !diets.includes('low fodmap')) diets.push('low fodmap')
            return {
                id: el.id,
                name: el.title,
                image: el.image,
                score: el.spoonacularScore,
                dietType: diets,
                dishType: el.dishTypes.map(el => el),
            }
        })
        return requiredInfo
    } catch (error) {
        throw new Error(error)
    }
}

// const apiInfo = () => {

//     return axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
//         .then(info => {
//             let requiredInfo = info.data.results.map(el => {
//                 let diets = el.diets.map(el => el)
//                 if (el.vegan && !diets.includes('vegan')) diets.push('vegan')
//                 if (el.vegetarian && !diets.includes('vegetarian')) diets.push('vegetarian')
//                 if (el.glutenFree && !diets.includes('gluten free')) diets.push('gluten free')
//                 if (el.dairyFree && !diets.includes('dairy free')) diets.push('dairy free')
//                 if (el.lowFodmap && !diets.includes('low fodmap')) diets.push('low fodmap')
//                 return {
//                     id: el.id,
//                     name: el.title,
//                     image: el.image,
//                     score: el.spoonacularScore,
//                     dietType: diets,
//                     dishType: el.dishTypes.map(el => el),
//                 }
//             })
//             return requiredInfo
//         })
//         .catch(error => Promise.reject(error))
        
// }

const dbInfo = async () => {
    try {
        let created = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return created.map(el => {
            return {
                ...el.dataValues,
                dietType: el.diets?.map(el => el.name)
            }
        })
    } catch (error) {
        throw new Error(error)
    }
}

const allInfo = async () => {
    try {
        let api = await apiInfo()
        let db = await dbInfo()
        let allInfo = api.concat(db)
        return allInfo
    } catch (error) {
        throw new Error(error)
    }
}

const idSearch = async (id) => {
    try {
        let recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        const recipeInfo = {
            id: recipe.data.id,
            name: recipe.data.title,
            image: recipe.data.image,
            dishTypes: recipe.data.dishTypes.map(el => el),
            dietType: recipe.data.diets.map(el => el),
            summary: recipe.data.summary,
            score: recipe.data.spoonacularScore,
            healthScore: recipe.data.healthScore,
            steps: recipe.data.analyzedInstructions[0]?.steps.map(el => {
                return {
                    number: el.number,
                    step: el.step,
                    ingredients: el.ingredients.map(el => {
                        return { name: el.name }
                    }),
                    equipment: el.equipment.map(el => {
                        return { name: el.name }
                    })
                }
            })
        }
        return recipeInfo
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    typesInfo,
    allInfo,
    idSearch
}

