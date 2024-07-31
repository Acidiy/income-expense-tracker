import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { db } from "./data-base.js"

let app = express()
app.use(bodyParser.json())
app.use(cors())

let port = 8000

app.get("/", async (req, res) => {
    let tableQueryText = `
    CREATE TABLE IF NOT EXISTS "users" (
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255) NOT NULL
    )`

    try {
        await db.query(tableQueryText)
    } catch (error) {
        console.error(error);
    }
    res.send("table created")
})

app.get("/createUser", async (req, res) => {
    let queryText = `
    INSERT INTO users (name, email, password)
    VALUES ('ashido', 'llvm@gmail.com', 'fdsafds');
    `

    try {
        await db.query(queryText)
    } catch (error) {
        console.error(error);
    }

    
    res.send("user created")
})

app.get("/getUsers", async (req, res) => {
    let queryText = `
    SELECT * FROM users
    `

    try {
        let users = await db.query(queryText)
        res.send(users.rows)
    } catch (error) {
        console.error(error);
    }

})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})