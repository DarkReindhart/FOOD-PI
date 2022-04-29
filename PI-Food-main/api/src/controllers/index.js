const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Diet, Recipe } = require('../db.js');

let typesInfo = async () => {
    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const dietType = apiInfo.data.results.map(el => el.diets)
    const uniqueDT = [...new Set(dietType.flat())]
    const allTypes = uniqueDT.concat(["ketogenic", "vegetarian", "lacto vegetarian", "ovo vegetarian", "low fodmap"])
    allTypes.forEach(el => Diet.findOrCreate({
        where: {
            name: el.toLowerCase()
        },
        order: [
            ['id', 'DESC']
        ]
    }))
}

const apiInfo = async () => {
    const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const requiredInfo = info.data.results.map(el => {
        return {
            id: el.id,
            name: el.title,
            image: el.image,
            score: el.spoonacularScore,
            dietType: el.diets.map(el => el),
            dishType: el.dishTypes.map(el => el)
        }
    })
    return requiredInfo
}

const dbInfo = async () => {
    let algo = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return algo.map(el => {
        return {
            ...el.dataValues,
            dietType: el.diets?.map(el => el.name)
        }
    })
}

const allInfo = async () => {
    let api = await apiInfo()
    let db = await dbInfo()
    let allInfo = api.concat(db)
    return allInfo
}

const idSearch = async (id) => {
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
}

module.exports = {
    typesInfo,
    allInfo,
    idSearch
}