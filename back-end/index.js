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
      password VARCHAR(255) NOT NULL,
      avatar VARCHAR(255) NOT NULL,
      createdAt VARCHAR(255) NOT NULL,
      updatedAt VARCHAR(255) NOT NULL,
      curency_type VARCHAR(255) NOT NULL
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
    INSERT INTO users (name, email, password, avatar, createdAt, updatedAt, curency_type)
    VALUES ('ashid', 'ashid@gmail.com', 'fdsafds', 'empty', 'NaN', 'NaN', 'MNT');
    `

    try {
        await db.query(queryText)
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