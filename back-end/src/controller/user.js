import { db } from "../../database.js"

export let getUsers = async (req, res) => {
    let queryText = `
    SELECT * FROM users
    `

    try {
        let users = await db.query(queryText)
        res.send(users.rows)
    } catch (error) {
        console.error(error);
    }
}
export let getUser = async (req, res) => {
    let {id} = req.params

    try {
        if(id.length === 0) res.status(404).send('Not A Valid Id')
            else{let users = await db.query(`SELECT * FROM users WHERE id=$1`,[id]);res.send(users.rows)}
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
}

export let postUser = async (req, res) => {

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
}

export let putUser = async (req, res) => {
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

}

export let deleteUser = async (req, res) => {
    let { id } = req.params
    try {
        let result = await db.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id])
        res.status(200).send('User Deleted')
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
}