import { forwardRef } from "react"
import { Logo } from "./icon/LogoIcon"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export let Form = forwardRef((props, ref) => {
    return <form ref={ref} onSubmit={props.onSubmit} className="w-96 flex flex-col items-center gap-4">
        <Logo />
        <div className="flex flex-col items-center">
            <h1 className="font-semibold text-xl">Create Geld Account</h1>
            <p className="text-slate-700">Sign up below to create your wallet</p>
        </div>
        <div className="w-full flex flex-col items-center gap-2">
            <Input placeholder="Name" className="bg-[#F3F4F6]" />
            <Input placeholder="Email" type="email" className="bg-[#F3F4F6]" />
            <Input placeholder="Password" type="password" className="bg-[#F3F4F6]" />
            <Input placeholder="Re-Password" type="password" className="bg-[#F3F4F6]" />
        </div>

        <Button className="w-full" type="submit">Sign Up</Button>
        {props.error && <div>{props.error}</div>}
    </form>
})

Form.displayName = "Form"