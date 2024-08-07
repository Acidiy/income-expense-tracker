import { db } from "../../database.js";

export let postRecord = async (req, res) => {

    let queryText = `
    INSERT INTO record (user_id, name, amount, transaction_type, description, category_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `

    let { user_id, name, amount, transaction_type, description, category_id } = req.body

    try {
        let result = await db.query(queryText, [ user_id, name, amount, transaction_type, description, category_id ])
        res.status(200).json(result.rows)
    } catch (error) {
        console.error(error);
        res.status(404).send('Id or Database Error')
    }
}
export let getRecords = async (req, res) => {
    let queryText = `
    SELECT * FROM record
    `

    try {
        let result = await db.query(queryText)
        res.send(result.rows)
    } catch (error) {
        console.error(error);
    }
}
export let getRecord = async (req, res) => {

    try{
        let {category, user_id } = req.body
        let record = await db.query(`SELECT * FROM record WHERE category=$1 OR user_id=$2`,[category,user_id])
        if (record.length === 0) return res.status(404).json({record:'Does Not Exist'})
            else return res.status(200).json(record.rows[0])
    }catch(error){res.status(500).json({error:'Database Error'})}
}
export let getRecordbyIdandCategory = async (req,res)=>{
    let {user_id,category_id} = req.params

    try{
        let user_category_records = await db.query(`SELECT * FROM record WHERE user_id=$1 AND category_id=$2`,[user_id,category_id])
        if (user_category_records.length === 0) res.status(404).json({error:'No Such Records'})
            else res.status(200).send(user_category_records.rows)
    }catch(error){res.status(500).json({error:'Database Error'})}
}
export let putRecord = async (req, res) => {
    let { id } = req.params
    let { name, description } = req.body

    try {
        let result = await db.query(`UPDATE record SET name = $1, description = $2 WHERE id = $3 RETURNING *`, [name, description, id]);
        if (result.rows[0] === 0) res.status(404).json({ error: "Record not found" })
        else res.status(200).json(result.rows[0])
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }

}
export let deleteRecord = async (req, res) => {
    let { id } = req.params
    try {
        if (id.length === 0) res.status(404).send('Not A Valid Id')
        else{
            await db.query(`DELETE FROM record WHERE id = $1 RETURNING *`, [id])
            res.status(200).send('Record Deleted')
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
}