import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import axios from "axios";

export let BaseCurrnecy = ({user, setStep, updateUser}) => {

    console.log(user,'user');
    
    const BASE_URL = "http://localhost:8000"

    let [currency, setCurrency] = useState("USD")

    let onSubmit = async (event) => {
        event.preventDefault()
        await axios.put(BASE_URL + "/api/updateAccountBaseCurrency",{currency_type:currency, id:user.id})
        setStep((prev)=>prev+1)
    }
    return (
        <form onSubmit={onSubmit} className="w-96 flex flex-col gap-5">
            <Select onValueChange={(event) => setCurrency(event)}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Base Currency" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="MNT" >MNT</SelectItem>
                    <SelectItem value="USD" >USD</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit">Confirm</Button>
        </form>
    )
}