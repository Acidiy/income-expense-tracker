import axios from "axios"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useRef, useState } from "react"

export let UserBalance = ({balance, id}) => {
    const BASE_URL = "http://localhost:8000"
    let [error,setError] = useState('')
    let formRef = useRef()

    let onSubmit = async (event) => {
        event.preventDefault()
        let newBalance = formRef.current[0].value
        newBalance = Number(newBalance)

        try{
            newBalance = newBalance + balance
            let result = await axios.put(BASE_URL + "/api/updateAccountBalance", {balance : newBalance, id:id})
            localStorage.removeItem('user')
            localStorage.setItem('user',JSON.stringify(result.data))
        }
        catch(error) {setError('Somthing Wrong');return}
    }
    return <div className="h-96 w-[620px] bg-indigo-400 rounded-2xl mx-auto">
        <form ref={formRef} onSubmit={onSubmit}>
            <Input type="number" className="h-10"/>
            <Button type="submit" min="1" >DEPOSIT</Button>
            {error ? <div>{error}</div> : null}
        </form>
    </div>
}