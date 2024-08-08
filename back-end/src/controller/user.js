import { db } from "../../database.js"
import bcrypt from "bcrypt"

export const postUser = async (req, res) => {
    let { email, name, password } = req.body
  
    bcrypt.hash(password, 12, async (err, hash) => {
      try {
        const result = await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name,email,hash])
        return res.status(201).json(result.rows[0])
      } catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Database error" })
      }
    })
}

export let signIn = async (req, res) => {
    const { password, email } = req.body
    try {
      let user = await db.query(`SELECT * FROM users WHERE email=$1`,[email])
      
      bcrypt.compare(password, user.rows[0].password, (err, result) => {
        if (result) {
          return res.send({ success: true, user: user.rows[0] })
        } else {
          return res.send({ error: "Invalid email or password" })
        }
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: "Database error" })
    }
}

export let deleteUser = async (req,res) => {
    try{
        let {id, email} = req.body
        await db.query(`DELETE FROM users WHERE id = $1 or email = $2`,[id,email])
        return res.status(200).json('user Deleted')
    }
    catch(error){
        console.error(error)
        return res.status(500).json({ error: "Database error" })
    }
}