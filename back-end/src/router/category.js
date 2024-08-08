import express from 'express'
import { newCategory, putCategoryImage } from '../controller/catagory.js'

let category = express.Router()

category.post('/createCategory', newCategory).put('/changeCategoryImage', putCategoryImage)

export { category }