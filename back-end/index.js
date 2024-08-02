import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { db } from "./data-base.js"

let app = express()
app.use(bodyParser.json())
app.use(cors())

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

app.post("/users/createUser", async (req, res) => {

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

app.put("/users/:id/changeName", async (req, res) => {
    let { id } = req.params
    let { name } = req.body

    try {
        let result = await db.query(`UPDATE users SET name = $1 WHERE id = $2 RETURNING *`, [name, id]);
        if (result.rows[0] === 0) res.status(404).json({ error: "User not found" })
        else res.status(200).json(result.rows[0])
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }

})
app.put("/users/:id/changeEmail", async (req, res) => {
    let { id } = req.params
    let { email } = req.body

    try {
        let result = await db.query(`UPDATE users SET email = $1 WHERE id = $2 RETURNING *`, [email, id]);
        if (result.rows[0] === 0) res.status(404).json({ error: "User not found" })
        else res.status(200).json(result.rows[0])
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }

})
app.put("/users/:id/changePassword", async (req, res) => {
    let { id } = req.params
    let { password } = req.body
    let oldpassword

    try {
        let result = await db.query(`SELECT password FROM users WHERE id = '${id}'`)
        if (result.rows[0] === 0) res.status(404).json({ error: "User not found" })
        else res.status(200).json(result.rows[0])
        oldpassword = result.rows[0]
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }

    let checker = (newpassword) => {
        if (newpassword === oldpassword) {
            res.status(200).send('Same Password')
        }
        else return newpassword
    }

    try {
        let result = await db.query(`UPDATE users SET password = $1 WHERE id = $2 RETURNING *`, [checker(password), id]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }

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

app.delete("/users/:id/Delete", async (req, res) => {
    let { id } = req.params
    try {
        let result = await db.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id])
        res.status(200).send('User Delited')
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})