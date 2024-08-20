import express from 'express'
import { getCategory, newCategory, putCategoryImage } from '../controller/catagory.js'

let category = express.Router()

category.post('/createCategory', newCategory).put('/changeCategoryImage', putCategoryImage).get('/getAllCategories', getCategory)

export { category }