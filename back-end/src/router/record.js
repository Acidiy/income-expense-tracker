import express from "express"
import { deleteRecord, getRecord, getRecords, postRecord, putRecord } from "../controller/transaction.js"

let record = express.Router()

record.get('/getRecords', getRecords).get('/:id/getRecord', getRecord).put('/:id/putRecord', putRecord).post('/postRecord', postRecord).delete('/:id/deleteRecord', deleteRecord)

export {record}