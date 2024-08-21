import { db } from "../../database.js"

export let newTransaction = async (req,res) => {
    try {
        let { user_id, name, amount, transaction_type, description, category_id } = req.body
        let newTransaction = await db.query(`INSERT INTO record (user_id, name, amount, transaction_type, description, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [user_id, name, amount, transaction_type, description, category_id])
        return res.status(201).json(newTransaction.rows[0])
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Database error" })
    }
}

export let getTransactionbyUserId = async (req,res) => {
    try{
        let {user_id} = req.body
        let userTransactions = await db.query(`SELECT * FROM record WHERE user_id = $1`,[user_id])
        return res.status(200).json(userTransactions)
    }
    catch(error){
        console.error(error)
        return res.status(500).json(error)
    }
}