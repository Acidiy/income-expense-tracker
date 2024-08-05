import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { db } from "./database.js"
import { user } from "./src/router/user.js"
import { record } from "./src/router/record.js"
import { category } from "./src/router/category.js"

let app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/users',user)
app.use('/record', record)
app.use('/category', category)

let port = 8000

app.post("/users/", async (req, res) => {

    let tableQueryText = `
    CREATE TABLE IF NOT EXISTS "users" (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255) NOT NULL,
      avatar TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      currency_type TEXT DEFAULT 'USD' NOT NULL
    )`

    try {
        await db.query(tableQueryText)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }

    res.send("Users Table Created")
})
app.post("/record", async (req, res) => {

    let {id} = req.body

    let tableQueryText = `
    CREATE TABLE IF NOT EXISTS "record" (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id TEXT,
      name TEXT,
      amount REAL NOT NULL,
      transaction_type TEXT DEFAULT 'INC' NOT NULL,
      description TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      category_id TEXT
    )`

    try {
        let result = await db.query(tableQueryText)
        res.status(200).send('Record Created')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
})



app.listen(port, () => {
    console.log(`listening on port ${port}`);
})