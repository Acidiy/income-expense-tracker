import { db } from "../../database.js"

export let getUsers = async (req, res) => {
    let {email} = req.body
    let users = []

    try {
        users = await db.query(`SELECT password FROM users WHERE email = $1`,[email])
    } catch (error) {
        console.error(error);
    }
    finally {return users.rows}
    
}
export let getUser = async (req, res) => {
    let {email,id} = req.body
    let user

    try {
        user = await db.query(`SELECT * FROM users WHERE email=$1 OR id=$2`,[email,id])
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    } finally {
        console.log(user.rows[0]);
        return user.rows[0]
    }
}

export let postUser = async (req, res) => {
    let queryText = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *
    `

    let { name, email, password } = req.body
    let result

    try {
        result = await db.query(queryText, [name, email, password])
    } catch (error) {
        return error
    } finally {
        return result.rows[0]
    }
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