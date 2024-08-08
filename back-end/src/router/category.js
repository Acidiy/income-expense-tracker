import express from 'express'
import { newCategory } from '../controller/catagory.js'

let category = express.Router()

category.post('/createCategory', newCategory)

export {category}