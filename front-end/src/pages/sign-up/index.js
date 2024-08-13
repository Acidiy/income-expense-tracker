import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Form } from "@/components/form";
import Link from "next/link";

let SignUpPage = () => {

    const BASE_URL = "http://localhost:8000"

    let [error, setError] = useState("")

    let router = useRouter()

    let formRef = useRef()

    let onSubmit = async (event) => {
        event.preventDefault()

        const name = formRef.current[0].value
        const password = formRef.current[2].value
        const rePassword = formRef.current[3].value

        if (!name || password != rePassword || !password) {
            setError('Error')
            return
        }

        try{
            await axios.post(BASE_URL + "/api/signup", { name: formRef.current[0].value, email: formRef.current[1].value, password: formRef.current[2].value })
            router.push("/")
        }
        catch(error){setError('User already exists')}
        finally {return}
    }

    return <div className="h-screen w-full bg-teal-400 flex flex-col items-center justify-center gap-5">
        <Form ref={formRef} onSubmit={onSubmit} error={error} />
        <div>already have an acc?  <Link href={`http://localhost:3000/sign-in`} className="underline">Sign In</Link></div>
    </div>
}

export default SignUpPage