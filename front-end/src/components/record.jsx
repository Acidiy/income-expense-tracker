import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export let AddRecord = () => {
    const BASE_URL = "http://localhost:8000"

    let [categories, setCategories] = useState([])
    let [chosenCategory, setChosenCategory] = useState('')
    let [transaction_type, setTransaction_type] = useState('EXP')
    let [userId, setUserId] = useState({})
    let [error, setError] = useState('ADD RECORD')

    let formRef = useRef()

    let getAllCategories = async () => { let result = await axios.get(BASE_URL + "/api/getAllCategories"); setCategories(result.data) }

    useEffect(() => { getAllCategories(); let localStorageUser = JSON.parse(localStorage.getItem('user')); setUserId(localStorageUser.id) }, [])


    let onSubmit = async (event) => {
        event.preventDefault()
        let localStorageUser = JSON.parse(localStorage.getItem('user'))

        if (chosenCategory === '') return setError('Choose A Category Pls')

        let amount = formRef.current[0].value
        amount = Number(amount)


        try {
            if (transaction_type === 'INC') {
                let newBalance = localStorageUser.balance + amount
                let record = await axios.post(BASE_URL + "/api/transaction", { user_id: userId, name: formRef.current[4].value, amount: amount, description: formRef.current[5].value, transaction_type: transaction_type, category_id: chosenCategory })
                let user_result = await axios.put(BASE_URL + "/api/updateAccountBalance", { balance: newBalance, id: userId })
                localStorage.removeItem('user')
                localStorage.setItem('user',JSON.stringify(user_result.data))
            }
            if (transaction_type === 'EXP') {
                let newBalance = localStorageUser.balance - amount
                let record = await axios.post(BASE_URL + "/api/transaction", { user_id: userId, name: formRef.current[4].value, amount: amount, description: formRef.current[5].value, transaction_type: transaction_type, category_id: chosenCategory })
                let user_result = await axios.put(BASE_URL + "/api/updateAccountBalance", { balance: newBalance, id: userId })
                localStorage.removeItem('user')
                localStorage.setItem('user',JSON.stringify(user_result.data))
            }
        }
        catch (error) {
            console.log(error);
        }
        finally { return }
    }

    return <div className="h-96 w-[620px] bg-indigo-400 rounded-2xl mx-auto">
        <div className="w-full py-1 px-4 bg-indigo-500 rounded-t-2xl">{error}</div>
        <form ref={formRef} onSubmit={onSubmit} className="p-4 grid grid-cols-2 gap-4">
            <div className="size-full flex flex-col gap-4">

                <NavigationMenu>
                    <NavigationMenuList className="flex gap-2">
                        <NavigationMenuItem>
                            <div>
                                <NavigationMenuLink onClick={() => setTransaction_type('EXP')} className={navigationMenuTriggerStyle()}>EXPENSE</NavigationMenuLink>
                                {transaction_type === 'EXP' ? <div className="w-full h-1 bg-slate-500" /> : null}
                            </div>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <div>
                                <NavigationMenuLink onClick={() => setTransaction_type('INC')} className={navigationMenuTriggerStyle()}>INCOME</NavigationMenuLink>
                                {transaction_type === 'INC' ? <div className="w-full h-1 bg-slate-500" /> : null}
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <Input type="number" placeholder="amount" />

                <Select onValueChange={(event) => setChosenCategory(event)}>
                    <SelectTrigger><SelectValue placeholder="category" /></SelectTrigger>
                    <SelectContent>
                        {categories.map((element, index) => <SelectItem value={element.id} key={index}>{element.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Button type="submit" className="font-thin">ADD RECORD</Button>
            </div>
            <div className="size-full flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <p>Payee</p>
                    <Input placeholder="Write here" />
                </div>
                <div className="flex flex-col gap-1">
                    <p>Note</p>
                    <Input className="h-20" placeholder="Write here" />
                </div>
            </div>
        </form>
    </div>
}