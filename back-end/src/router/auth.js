import express from 'express'
import { signIn, signUp } from '../controller/auth.js'

let auth = express.Router()

auth.post('/signIn',signIn).post('/signUp',signUp)

export {auth}