import { db } from "../../database.js";
import { getUser, postUser } from "./user.js";

export let signIn = async (req, res) => {
    let {password} = req.body
    let user
    try{
        user = await getUser(req, res)
        if (password === user.password) res.status(200).json({succsess:true,user:user}) 
    }catch(error){
        res.status(500).json({error:'Database error'})
    }
}

export let signUp = async (req, res) => {
    let newUser
    try{
        newUser = await postUser(req,res)
    }catch(error){
        res.status(300).json({error:'Database auth error'})
    }finally{
        res.status(201).json(newUser)
    }
}