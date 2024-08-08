import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { db } from "./database.js"
import { user } from "./src/router/user.js"
import { category } from "./src/router/category.js"
import { transaction } from "./src/router/record.js"

let app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api',user)
app.use('/api',category)
app.use('/api',transaction)


let port = 8000



app.listen(port, () => {
    console.log(`listening on port ${port}`);
})