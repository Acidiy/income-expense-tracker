import express from "express"
import { deleteUser, getUser, getUsers, postUser, putUser } from "../controller/user.js"

let user = express.Router()

user.get('/getUsers', getUsers).get('/:id/getUser', getUser).post('/postUser', postUser).put('/:id/putUser', putUser).delete('/:id/deleteUser', deleteUser)

export { user }