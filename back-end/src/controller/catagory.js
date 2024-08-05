import { db } from "../../database.js";
import { category } from "../router/category.js";

export let postCategory = async (req, res) => {
    let { name, description, category_image } = req.body
    try {
        let result = await db.query(`INSERT INTO category (name, description, category_image) VALUES ($1, $2, $3) RETURNING *`, [name, description, category_image])
        res.status(200).json(result.rows)
    }
    catch (error) {
        console.error(error);
    }
}

export let putCategory = async (req, res) => {
    let { id } = req.params
    let { name, description, category_image } = req.body

    try {
        let result = await db.query(`UPDATE category SET name=$1, description=$2, category_image=$3 WHERE id=$4 RETURNING *`, [name, description, category_image, id])
        if (result.rows[0] === 0) res.status(404).json({ error: "Category Not Found" })
        else res.status(200).json(result.rows[0])
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
}

export let getCategories = async (req, res) => {
    try {
        let result = await db.query(`SELECT * FROM category`)
        res.status(200).json(result.rows)
    }
    catch (error) {
        console.error(error);
        res.status(404).send('Not Found')
    }
}

export let getCategory = async (req, res) => {
    let { id } = req.params

    try {
        let result = await db.query(`SELECT * FROM category WHERE id = $1`, [id])
        if (result.rows[0] === 0) res.status(404).json({ error: "Category Not Found" })
        else res.status(200).json(result.rows[0])
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
}

export let deleteCategory = async (req, res) => {
    let {id} = req.params

    try{
        if(id.length === 0) res.status(404).send('Not A Valid Id')
            else {await db.query(`DELETE FROM category WHERE id = $1 RETURNING *`,[id]);res.status(200).send('Category Deleted')}
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
}