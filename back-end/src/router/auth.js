import express from 'express'
import { signIn } from '../controller/auth.js'

let auth = express.Router()

auth.post('/signIn',signIn)

export {auth}