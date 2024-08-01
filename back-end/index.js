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

// VALUES ('khulan', 'khulan@gmail.com', 'fdsafds', 'empty', 'NaN', 'NaN', 'MNT'),
// VALUES ('shijir', 'shijir@gmail.com', 'fdsafds', 'empty', 'NaN', 'NaN', 'MNT'),
// VALUES ('soyol', 'soyol@gmail.com', 'fdsafds', 'empty', 'NaN', 'NaN', 'MNT'),
// VALUES ('tamir', 'tamir@gmail.com', 'fdsafds', 'empty', 'NaN', 'NaN', 'MNT'),
// VALUES ('sukhe', 'sukhe@gmail.com', 'fdsafds', 'empty', 'NaN', 'NaN', 'MNT'),
// VALUES ('degii', 'degii@gmail.com', 'fdsafds', 'empty', 'NaN', 'NaN', 'MNT'),
// VALUES ('bayara', 'bayara@gmail.com', 'fdsafds', 'empty', 'NaN', 'NaN', 'MNT'),
// VALUES ('tuul', 'tuul@gmail.com', 'fdsafds', 'empty', 'NaN', 'NaN', 'MNT'),
// VALUES ('orgil', 'orgil@gmail.com', 'fdsafds', 'empty', 'NaN', 'NaN', 'MNT');

app.put("/users/:id", async (req, res) => {
    let { id } = req.params
    let { name, email, password } = req.body



    try {
        let result = await db.query(`UPDATE users SET name=$1`, [name]);
        if (result.rows.length === 0) res.status(400).json({ error: "Item not found" })
        else res.status(200).json(result.rows[0])
    }
    catch (error) { console.error(error); }
})

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