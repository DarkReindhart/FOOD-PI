const { Router } = require('express');
const { Diet, Recipe } = require('../db.js');
const regExUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
const { typesInfo, allInfo, idSearch } = require('../controllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
typesInfo();


router.get('/recipes/:idRecipe', async (req, res, next) => {
    const { idRecipe } = req.params
    try {
        if (regExUUID.test(idRecipe)) {
            let recipe = await Recipe.findByPk(idRecipe, { include: Diet })
            recipe = {
                id: recipe.id,
                name: recipe.name,
                summary: recipe.summary,
                score: recipe.score,
                healthScore: recipe.healthScore,
                steps: recipe.steps,
                image: recipe.image,
                dietType: recipe.diets?.map(el => el.name.toLowerCase())
            }
            res.send(recipe)
        }
        else {
            res.send(await idSearch(idRecipe))
        }
    } catch (error) {
        next(error)
    }
})

// router.get('/recipes', async (req, res, next) => {
//     const { name } = req.query

//     try {
//         let searchData = await allInfo()
//         if (name) {
//             let filteredData = searchData.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
//             if (filteredData.length) {
//                 return res.send(filteredData)
//             }
//             else {
//                 return res.status(404).send('No recipes found')
//             }
//         }
//         else {
//             return res.send(searchData)
//         }
//     } catch (error) {
//         next(error)
//     }
// })

router.get('/recipes', (req, res, next) => {
    const { name } = req.query

    allInfo()
        .then(searchData => {
            if (name) {
                let filteredData = searchData.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
                if (filteredData.length) return res.send(filteredData)
                else return res.status(404).send('No recipes found')
            }
            else return res.send(searchData)
        })
        .catch(error => next(error))
})

router.get('/types', async (req, res, next) => {
    try {
        const allDiets = await Diet.findAll()
        return res.json(allDiets)
    } catch (error) {
        next(error)
    }
})

// router.post('/recipe', async (req, res, next) => {
//     let { name, summary, score, healthScore, steps, diet, image } = req.body

//     try {
//         if (!name || !summary) {
//             return res.status(400).send('Name or Summary are missing')
//         }
//         else {
//             const [createRecipe, created] = await Recipe.findOrCreate({
//                 where: { name },
//                 defaults: {
//                     name,
//                     summary,
//                     score,
//                     healthScore,
//                     steps,
//                     image
//                 }
//             })
//             if (created) {
//                 let dietType = await Diet.findAll({
//                     where: {
//                         name: diet
//                     }
//                 })
//                 createRecipe.addDiets(dietType)
//                 return res.status(201).send('Recipe created')
//             }
//             else {
//                 return res.status(302).send('Recipe already exists in the database')
//             }
//         }
//     } catch (error) {
//         next(error)
//     }
// })

router.post('/recipe', (req, res, next) => {
    let { name, summary, score, healthScore, steps, diet, image } = req.body

    if (!name || !summary) {
        return res.status(400).send('Name or Summary are missing')
    }
    else {
        Recipe.findOrCreate({ where: { name }, defaults: { name, summary, score, healthScore, steps, image } })
            .then(recipe => {
                const [createRecipe, created] = recipe
                if (created) {
                    return Diet.findAll({ where: { name: diet } })
                        .then(dietType => createRecipe.addDiets(dietType))
                        .then(() => res.status(201).send('Recipe created'))
                }
                else return res.status(302).send('Recipe already exists in the database')
            })
            .catch(error => next(error))
    }
})

router.delete('/recipe/:idRecipe', async (req, res, next) => {
    try {
        const { idRecipe } = req.params
        const deletedRecipe = await Recipe.destroy({ where: { id: idRecipe } })
        if (!deletedRecipe) return res.status(404).send('No recipe with the provided ID to delete')
        else return res.send('Recipe deleted succesfully')
    } catch (error) {
        next(error)
    }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;


