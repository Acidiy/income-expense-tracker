import { Logo } from "@/components/icon/LogoIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

let SignInPage = () => {
    const BASE_URL = "http://localhost:8000"

    let formRef = useRef()

    let router = useRouter()

    let [inCompleteForum, setInCompleteForum] = useState(false)

    let [wrongForum, setWrongForum] = useState('')

    let onSubmit = async (event) => {
        event.preventDefault()

        const email = formRef.current[0].value
        const password = formRef.current[1].value

        if (!email || !password) {
            setInCompleteForum(true)
            return
        }

        try {
            let result = await axios.post(BASE_URL + "/api/signin", { email: formRef.current[0].value, password: formRef.current[1].value })
            if (result.data.success) router.push(`${result.data.user.id}/dashboard`)
                else setWrongForum(result.data.error)
        }
        catch (error) { setWrongForum('Invalid email or password') }
    }

    return <div className="h-screen w-full bg-teal-400 flex flex-col items-center justify-center gap-5">
        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col items-center gap-4">
            <Logo />
            <div className="flex flex-col items-center">
                <div className="font-semibold text-xl">Welcome Back</div>
                <div className="text-slate-700">Welcome Back, Please enter your details</div>
            </div>
            <div className="w-full flex flex-col items-center gap-2">
                <Input placeholder="Email" type="email" className="bg-[#F3F4F6]" />
                <Input placeholder="Password" type="password" className="bg-[#F3F4F6]" />
            </div>
            <Button className="w-full" type="submit">Sign In</Button>
            {inCompleteForum ? <div>Please enter your email or password</div> : null}
            <div>{wrongForum}</div>
        </form>
        <div>Don't have an acc? <Link href={`http://localhost:3000/sign-up`} className="underline">Create one</Link></div>
    </div>
}

export default SignInPage