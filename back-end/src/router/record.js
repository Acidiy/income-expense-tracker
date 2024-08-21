import express from 'express'
import { getTransactionbyUserId, newTransaction } from '../controller/transaction.js'

let transaction = express.Router()

transaction.post('/transaction', newTransaction).post('/getTransactions', getTransactionbyUserId)

export { transaction }