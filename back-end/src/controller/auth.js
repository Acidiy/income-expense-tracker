import { db } from "../../database.js";
import { getUsers } from "./user.js";

export let signIn = async (req, res) => {
    let {password} = req.body
    let users
    try{
        users = await getUsers(req, res)
        fil
        // res.status(201).json({succsess:'true',users:users})
    }catch(error){
        res.status(500).json({error:'Database error'})
    }
}