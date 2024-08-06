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
        let allREcordId = await db.query(`SELECT id FROM record`)
        console.log(allREcordId.rows);
    }catch(error){console.error(error)}

    let { id } = req.params
    try{
        if(id.length === 0) res.status(404).send('Not A Valid Id')
            else{
        let result = await db.query(`SELECT * FROM record WHERE id = $1`,[id])
        res.send(result.rows)
            }
    }
    catch (error){
        console.error(error);
    }
}
export let putRecord = async (req, res) => {
    let { id } = req.params
    let { name } = req.body

    try {
        let result = await db.query(`UPDATE record SET name = $1 WHERE id = $2 RETURNING *`, [name, id]);
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