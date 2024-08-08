import express from 'express'
import { newTransaction } from '../controller/transaction.js'

let transaction = express.Router()

transaction.post('/transaction',newTransaction)

export {transaction}