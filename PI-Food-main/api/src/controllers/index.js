const axios = require('axios');
require('dotenv').config();
const { API_KEY_1 } = process.env;
const { Diet, Recipe } = require('../db.js');

let typesInfo = async (apikey) => {
    try {
        const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&addRecipeInformation=true&number=100`)
        const dietType = apiInfo.data.results.map(el => el.diets)
        const uniqueDT = [...new Set(dietType.flat())]
        const allTypes = uniqueDT.concat(["ketogenic", "vegetarian", "low fodmap"])
        await Promise.all(allTypes.map(el => Diet.findOrCreate({
            where: {
                name: el.toLowerCase()
            },
            order: [
                ['id', 'DESC']
            ]
        })))
        return allTypes
    } catch (error) {
        throw new Error(error)
    }
}

const preloadApiInfo = async (apiKey) => {
    try {
        const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
        let requiredInfo = info.data.results.map(el => {
            let diets = el.diets.map(el => el)
            if (el.vegan && !diets.includes('vegan')) diets.push('vegan')
            if (el.vegetarian && !diets.includes('vegetarian')) diets.push('vegetarian')
            if (el.glutenFree && !diets.includes('gluten free')) diets.push('gluten free')
            if (el.dairyFree && !diets.includes('dairy free')) diets.push('dairy free')
            if (el.lowFodmap && !diets.includes('low fodmap')) diets.push('low fodmap')
            return {
                id: el.id.toString(),
                name: el.title,
                image: el.image,
                // score: el.spoonacularScore,
                healthScore: parseInt(el.healthScore),
                dietType: diets,
                dishType: el.dishTypes?.join(", "),
            }
        })
        await Promise.all(requiredInfo.map(async el => {
            const [createRecipe, created] = await Recipe.findOrCreate({
                where: {
                    id: el.id,
                    name: el.name,
                    image: el.image,
                    // score: el.score,
                    healthScore: el.healthScore,
                    dishType: el.dishType
                }
            })
            if (created) {
                if (el.dietType) {
                    let dietType = await Diet.findAll({
                        where: {
                            name: el.dietType
                        }
                    })
                    createRecipe.addDiets(dietType)
                }
            }
            
        }
        ))
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
                id: el.id,
                name: el.name,
                summary: el.summary,
                // score: el.score,
                healthScore: el.healthScore,
                steps: el.steps,
                image: el.image,
                dietType: el.diets?.map(el => el.name.toLowerCase()),
                dishType: el.dishType
            }
            // return {
            //     ...el.dataValues,
            //     dietType: el.diets?.map(el => el.name)
            // }
        })
    } catch (error) {
        throw new Error(error)
    }
}

const allInfo = async () => {
    try {
        // let api = await apiInfo()
        let db = await dbInfo()
        // let allInfo = api.concat(db)
        // return allInfo
        return db
    } catch (error) {
        throw new Error(error)
    }
}

// const allInfo = () => {
//   return apiInfo()
//   .then((response) => response.concat(dbInfo().then((response) => response)))
// }
const newFunction = async (id, apiKey = API_KEY_1, i = 1) => {
    try {
       return await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
    } catch (error) {
        if (error.message.includes("402")) {
            console.log("API_KEYs vencidas: " + i)
            i++
            if (i > 22) { i = 1 }
            return newFunction(id, process.env[`API_KEY_${i}`], i)
        }
    }
}

const idSearch = async (id) => {
    try {
        let recipe = await newFunction(id)
        const recipeInfo = {
            id: recipe.data.id,
            name: recipe.data.title,
            image: recipe.data.image,
            dishTypes: recipe.data.dishTypes.map(el => el),
            dietType: recipe.data.diets.map(el => el),
            summary: recipe.data.summary,
            // score: recipe.data.spoonacularScore,
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

//  const apiInfo = async () => {
//     try {
//         const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
//         let requiredInfo = info.data.results.map(el => {
//             let diets = el.diets.map(el => el)
//             if (el.vegan && !diets.includes('vegan')) diets.push('vegan')
//             if (el.vegetarian && !diets.includes('vegetarian')) diets.push('vegetarian')
//             if (el.glutenFree && !diets.includes('gluten free')) diets.push('gluten free')
//             if (el.dairyFree && !diets.includes('dairy free')) diets.push('dairy free')
//             if (el.lowFodmap && !diets.includes('low fodmap')) diets.push('low fodmap')
//             return {
//                 id: el.id,
//                 name: el.title,
//                 image: el.image,
//                 score: el.spoonacularScore,
//                 healthScore: el.healthScore,
//                 dietType: diets,
//                 dishType: el.dishTypes.map(el => el),
//             }
//         })
//         return requiredInfo
//     } catch (error) {
//         throw new Error(error)
//     }
// }


module.exports = {
    typesInfo,
    allInfo,
    idSearch,
    preloadApiInfo
}

