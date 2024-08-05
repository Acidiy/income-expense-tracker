import express from "express"
import { deleteCategory, getCategories, getCategory, postCategory, putCategory } from "../controller/catagory.js"

let category = express.Router()

category.post('/postCategory', postCategory).put('/:id/putCategory', putCategory).get('/getCategories', getCategories).get('/getCategory', getCategory).delete('/:id/deleteCategory', deleteCategory)

export {category}