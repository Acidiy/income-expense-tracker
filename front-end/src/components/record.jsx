import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";

export let AddRecord = () => {
    let [transaction_type, setTransaction_type] = useState('EXP')

    return <div className="h-96 w-[620px] bg-indigo-400 rounded-2xl mx-auto">
        <form>
            <div className="w-32 h-fit flex gap-4">
            <div><Button onClick={()=>setTransaction_type('EXP')}>EXPENSE</Button>{transaction_type === 'EXP' ? <div className="w-full h-1 bg-black"/> : null}</div>
            <div><Button onClick={()=>setTransaction_type('INC')}>INCOME</Button>{transaction_type === 'INC' ? <div className="w-full h-1 bg-black"/> : null}</div>
            </div>
        </form>
    </div>
}