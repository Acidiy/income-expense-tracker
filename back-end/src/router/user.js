import express from 'express'
import { deleteUser, postUser, signIn } from '../controller/user.js'

let user = express.Router()

user.post('/signup', postUser).post('/signin', signIn).delete('/deleteAccount', deleteUser)

export {user}