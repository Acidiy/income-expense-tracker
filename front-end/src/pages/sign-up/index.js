import React from "react";
import { Logo } from "@/components/icon/LogoIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

let SignUpPage = () => {

    const BASE_URL = "http://localhost:8000"

    let [samePass,setSamePass] = useState(false)

    let formRef = useRef()

    let onSubmit = async (event) => {
        event.preventDefault()
        let response = {data:null}

        if (formRef.current[2].value !== formRef.current[3].value) setSamePass(true)
            else{response = await axios.post(BASE_URL+"/api/signup",{
                name:formRef.current[0].value,
                email:formRef.current[1].value,
                password:formRef.current[2].value,
            })}
        
        if (response.data != null){
            console.log('there is data');
        }
    }

    return <div className="h-screen w-full bg-teal-400 flex items-center justify-center">
        <form ref={formRef} onSubmit={onSubmit} className="w-96 flex flex-col items-center gap-4">
            <Logo/>
            <div className="flex flex-col items-center">
            <h1 className="font-semibold text-xl">Create Geld Account</h1>
            <p className="text-slate-700">Sign up below to create your wallet</p>
            </div>
            <Input placeholder="Name" className="bg-[#F3F4F6]"/>
            <Input placeholder="Email" type="email" className="bg-[#F3F4F6]"/>
            <Input placeholder="Password" type="password" className="bg-[#F3F4F6]"/>
            <Input placeholder="Re-Password" type="password" className="bg-[#F3F4F6]"/>
            <Button type="submit" className="w-full rounded-xl">Sign Up</Button>
            {samePass ? <div>Password does not match!</div> : null}
        </form>
    </div>
}

export default SignUpPage