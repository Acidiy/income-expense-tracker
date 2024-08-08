import { db } from "../../database.js"

export let newCategory = async (req,res) => {
    try{
        let {name, description} = req.body
        let newCategory = await db.query(`INSERT INTO category (name, description) VALUES ($1, $2) RETURNING *`,[name,description])
        return res.status(201).json(newCategory.rows[0])
    }
    catch(error){
        return res.status(500).json('Database Error')
    }
}

