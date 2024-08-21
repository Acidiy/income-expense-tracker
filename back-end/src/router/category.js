import express from 'express'
import { getCategory, getLatestCategory, newCategory, putCategoryImage } from '../controller/catagory.js'

let category = express.Router()

category.post('/createCategory', newCategory).put('/changeCategoryImage', putCategoryImage).get('/getAllCategories', getCategory).post('/getLatestCategory',getLatestCategory)

export { category }