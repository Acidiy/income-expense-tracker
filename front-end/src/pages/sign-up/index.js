import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Form } from "@/components/form";
import Link from "next/link";
import { BaseCurrnecy } from "@/components/basecurrency";
import { Button } from "@/components/ui/button";

let SignUpPage = () => {

    const BASE_URL = "http://localhost:8000"

    let [error, setError] = useState("")
    let [step, setStep] = useState(1)
    let [newUser, setNewUser] = useState({})

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
            let user = await axios.post(BASE_URL + "/api/signup", { name: formRef.current[0].value, email: formRef.current[1].value, password: formRef.current[2].value })
            setNewUser(user)
            setStep(step + 1)
        }
        catch (error) { setError('User already exists') }
        finally { return }
    }

    return <div className="h-screen w-full p-10 bg-teal-400 flex flex-col items-center justify-center gap-5 relative">
        {step === 1 ? <><Form ref={formRef} onSubmit={onSubmit} error={error} /> <div>already have an acc?<Link href={`http://localhost:3000/sign-in`} className="underline">Sign In</Link></div></> : null}
        {step === 2 ? <BaseCurrnecy user={newUser.data} setStep={setStep} /> : null}
        {step === 3 ? <div className="w-96 flex flex-col gap-5 items-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="24" fill="#0166FF" />
                <path d="M36.7076 17.7076L20.7076 33.7076C20.6147 33.8005 20.5044 33.8743 20.383 33.9246C20.2616 33.975 20.1315 34.0009 20.0001 34.0009C19.8687 34.0009 19.7385 33.975 19.6171 33.9246C19.4957 33.8743 19.3854 33.8005 19.2926 33.7076L12.2926 26.7076C12.1049 26.5199 11.9995 26.2654 11.9995 26.0001C11.9995 25.7347 12.1049 25.4802 12.2926 25.2926C12.4802 25.1049 12.7347 24.9995 13.0001 24.9995C13.2654 24.9995 13.5199 25.1049 13.7076 25.2926L20.0001 31.5863L35.2926 16.2926C35.4802 16.1049 35.7347 15.9995 36.0001 15.9995C36.2654 15.9995 36.5199 16.1049 36.7076 16.2926C36.8952 16.4802 37.0006 16.7347 37.0006 17.0001C37.0006 17.2654 36.8952 17.5199 36.7076 17.7076Z" fill="white" />
            </svg>
            <div className="flex flex-col items-center gap-2">
                <div className="font-semibold text-2xl">Good Job!</div>
                <div className="text-center">Your very first account has been created. Now continue to dashboard and start tracking</div>
            </div>
            <Button onClick={() => {localStorage.setItem('user',newUser.data);router.push(`/dashboard`)}}>Go to Dashboard</Button>
        </div> : null}
    </div>
}

export default SignUpPage