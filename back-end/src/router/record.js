import express from 'express'
import { getLatestTransactionbyUserId, getTransactionbyUserId, newTransaction } from '../controller/transaction.js'

let transaction = express.Router()

transaction.post('/transaction', newTransaction).post('/getTransactions', getTransactionbyUserId).post('/getLatestTransactions', getLatestTransactionbyUserId)

export { transaction }