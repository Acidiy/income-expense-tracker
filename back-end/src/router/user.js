import express from "express"
import { createUser, deleteUser, getUser, getUsers, putUser } from "../controller/user.js"

let user = express.Router()

user.get('/getUsers', getUsers).get('/:id/getUser', getUser).post('/createUser', createUser).put('/:id/changeName', putUser).delete('/:id/Delete', deleteUser)

export { user }