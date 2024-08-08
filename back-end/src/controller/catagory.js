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

export let putCategoryImage = async (req,res) => {
    try{
        let {category_image,id} = req.body
        let newCategory = await db.query(`UPDATE category SET category_image=$1, updatedat=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *`,[category_image,id])
        return res.status(200).json(newCategory.rows[0])
    }
    catch(error){
        return res.status(500).json('Database Error')
    }
}

