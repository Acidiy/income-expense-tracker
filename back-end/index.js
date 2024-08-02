import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { db } from "./data-base.js"

let app = express()
app.use(bodyParser.json())
app.use(cors())

let port = 8000

app.get("/users", async (req, res) => {

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
    }

    res.send("table created")
})

app.post("/users/create", async (req, res) => {

    let queryText = `
    INSERT INTO users (name, email, password, avatar, currency_type)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `

    let { name, email, password, avatar, currency_type } = req.body

    try {
        await db.query(queryText, [name, email, password, avatar, currency_type])
    } catch (error) {
        console.error(error);
    }


    res.send("user created")
})

app.put("/users/:id", async (req, res) => {
    let { id } = req.params
    let {name, email} = req.body

    try {
        let result = await db.query(`UPDATE users SET name = 'ashido', email = 'ashido@hotmail.com' WHERE id = '709a9f91-1fba-4f74-ae17-5db9299e0a05' RETURNING *`);
        res.status(200).json(result.rows[0])
        if (result.rows[0] === 0) res.status(404).json({error:"User not found"})
            else res.status(200).json(result.rows[0])
    }
    catch (err) {
        console.error(err);
        // res.status(500).json({ error: "Database error" });
    }
});

app.get("/users/get", async (req, res) => {
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