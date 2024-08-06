import express from "express"
import { deleteRecord, getRecord, getRecordbyIdandCategory, getRecords, postRecord, putRecord } from "../controller/transaction.js"

let record = express.Router()

record.get('/getRecords', getRecords).get('/:user_id/getRecord', getRecord).get('/:user_id/:category_id/getRecord', getRecordbyIdandCategory).put('/:id/putRecord', putRecord).post('/postRecord', postRecord).delete('/:id/deleteRecord', deleteRecord)

export {record}