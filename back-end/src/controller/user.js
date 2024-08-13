import { db } from "../../database.js"
import bcrypt from "bcrypt"

export const postUser = async (req, res) => {
  let { email, name, password } = req.body

  bcrypt.hash(password, 12, async (err, hash) => {
    try {
      const result = await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, hash])
      return res.status(201).json(result.rows[0])
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: "Database error" })
    }
  })
}

export let signIn = async (req, res) => {
  let { password, email } = req.body
  try {
    let user = await db.query(`SELECT * FROM users WHERE email=$1`, [email])

    bcrypt.compare(password, user.rows[0].password, (err, result) => {
      if (result) {
        return res.send({ success: true, user: user.rows[0] })
      } else {
        return res.send({ success:false, error: "Invalid email or password" })
      }
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Database error" })
  }
}

export let deleteUser = async (req, res) => {
  try {
    let { id, email } = req.body
    await db.query(`DELETE FROM users WHERE id = $1 or email = $2`, [id, email])
    return res.status(200).json('user Deleted')
  }
  catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Database error" })
  }
}

export let putUserGeneral = async (req, res) => {
  let updatedUser
  try {
    let { id, email, name } = req.body
    updatedUser = await db.query(`UPDATE users SET name=$1, email=$2, updatedat=CURRENT_TIMESTAMP WHERE id=$3 RETURNING *`, [name, email, id])
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ error })
  }
  finally {
    return res.status(200).json(updatedUser.rows[0])
  }
}

export let putUserPassword = async (req, res) => {
  let oldUser, updatedUser
  try {
    let { password, id } = req.body
    oldUser = await db.query(`SELECT * FROM users WHERE id=$1`, [id])
    bcrypt.compare(password, oldUser.rows[0].password, (error, result) => {
      if (result) {
        return res.status(200).json('Same Password')
      } else {
        bcrypt.hash(password, 12, async (error, hash) => {
          try {
            let updatedUser = await db.query(`UPDATE users SET updatedat=CURRENT_TIMESTAMP, password=$1 WHERE id=$2 RETURNING *`, [hash, id])
            return res.status(201).json(updatedUser.rows[0])
          } catch (err) {
            console.error(err)
            return res.status(500).json({ error: "Database error" })
          }
        })
      }
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Database Error' })
  }
}

export let putUserAvatar = async (req, res) => {
  let newUserAvatar
  try {
    let { avatar, id } = req.body
    newUserAvatar = await db.query(`UPDATE users SET avatar=$1, updatedat=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *`, [avatar, id])
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ error })
  }
  finally {
    return res.status(200).json(newUserAvatar.rows[0])
  }
}

export let getUserbyFilter = async (req, res) => {
  let body = req.body
  let {query} = body
  delete body.query
  let querytext = `SELECT * FROM users `
  querytext = querytext + query
  try {
    let result = await db.query(querytext,[...Object.values(body)])    
    return res.status(200).json(result.rows)
  }
  catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}