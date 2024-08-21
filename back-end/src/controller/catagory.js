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

export let getCategory = async (req, res) => {
    try{
        let categories = await db.query(`SELECT * FROM category`)
        if (categories.length === 0) throw new Error("No Category")
            else return res.status(200).json(categories.rows)
    }
    catch(error){
        console.log(error);
        return res.status(404).json(error)
    }
}

export let getLatestCategory = async (req, res) => {
    try{
        let {user_id} = req.body
        let categories = await db.query(`SELECT category.name FROM record INNER JOIN category ON record.category_id = category.id WHERE user_id=$1 ORDER BY record.createdat DESC LIMIT 3`,[user_id])
        return res.status(200).json(categories.rows)
    }
    catch(error){
        console.error(error);
        return res.status(500).json(error)
    }
}

