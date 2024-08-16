import axios from "axios"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useRef, useState } from "react"

export let UserBalance = ({id}) => {
    const BASE_URL = "http://localhost:8000"
    let [error,setError] = useState('')
    let formRef = useRef()


    let onSubmit = async (event) => {
        event.preventDefault()
        let newBalance = formRef.current[0].value

        try{
            let result = await axios.put(BASE_URL + "/api/updateAccountBalance", {balance : newBalance, id:id})
            console.log(result);
            
        }
        catch(error) {setError('smn wrong')}
        finally {return}
    }
    return <div className="size-96 bg-indigo-400 rounded-2xl">
        <form ref={formRef} onSubmit={onSubmit}>
            <Input type="number" />
            <Button type="submit" min="1">SUBMIT</Button>
            {error ? <div>{error}</div> : null}
        </form>
    </div>
}