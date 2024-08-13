import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Form } from "@/components/form";
import Link from "next/link";

let SignUpPage = () => {

    const BASE_URL = "http://localhost:8000"

    let [error, setError] = useState("")
    let [step, setStep] = useState(1)

    let router = useRouter()

    let formRef = useRef()

    let onSubmit = async (event) => {
        event.preventDefault()

        let name = formRef.current[0].value
        let email = formRef.current[1].value
        let password = formRef.current[2].value
        let rePassword = formRef.current[3].value

        if (!name || !email || !password) { setError('please put in your details'); return }
        if (password.length < 8) { setError('Password length must be atleast 8'); return }
        if (password != rePassword) { setError('Passwords does not match'); return }


        try {
            await axios.post(BASE_URL + "/api/signup", { name: formRef.current[0].value, email: formRef.current[1].value, password: formRef.current[2].value })
            setStep(step+1)
        }
        catch (error) { setError('User already exists') }
        finally { return }
    }

    return <div className="h-screen w-full p-10 bg-teal-400 flex flex-col items-center justify-center gap-5 relative">
        <div className="size-fit absolute z-10 top-10 right-10 flex flex-col gap-10">
            <div className="size-16 bg-cyan-700 flex items-center justify-center rounded-full"><div>1</div></div>
            <div className="size-16 bg-cyan-700 flex items-center justify-center rounded-full"><div>2</div></div>
            <div className="size-16 bg-cyan-700 flex items-center justify-center rounded-full"><div>3</div></div>
        </div>
        {step === 1 ? <><Form ref={formRef} onSubmit={onSubmit} error={error} /> <div>already have an acc?<Link href={`http://localhost:3000/sign-in`} className="underline">Sign In</Link></div></> : null}
        
    </div>
}

export default SignUpPage