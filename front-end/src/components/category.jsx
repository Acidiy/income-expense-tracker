import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"


export let AddCategory = ({ setShowAddCategory }) => {
    const BASE_URL = "http://localhost:8000"

    let formRef = useRef()

    let onsubmit = async (event) => {
        event.preventDefault()

        if(formRef.current[0].value.length === 0) return setShowAddCategory((prev) => !prev)
            else await axios.post(BASE_URL+"/api/createCategory",{name:formRef.current[0].value,description:formRef.current[1].value})

        return setShowAddCategory((prev) => !prev)
    }

    return <div className="min-w-96 h-56 bg-gradient-to-br from-rose-400 to-pink-800 rounded-2xl relative p-8">
        <form ref={formRef} onSubmit={onsubmit} className="size-full relative">
            <div className="flex gap-4">
                <Input placeholder="name" />
                <Input placeholder="description"/>
            </div>
            <Button type="submit" className="absolute bottom-8 right-8 bg-orange-300">Done</Button>
        </form>
    </div>
}

export let HotCategory = ({ setShowAddCategory }) => {
    const BASE_URL = "http://localhost:8000"

    let router = useRouter()

    let localStorageUser

    let [categories, setCategories] = useState([])

    useEffect(() => {
        localStorageUser = JSON.parse(localStorage.getItem('user'))
        if (!localStorageUser) return router.push('/sign-in')
        axios.post(BASE_URL + "/api/getLatestCategory", { user_id: localStorageUser.id }).then((response) => setCategories(response.data))
    },[])

    return <div className="min-w-96 h-56 bg-gradient-to-br from-rose-600 to-yellow-500 rounded-2xl relative p-8">
        <div className="text-2xl font-thin text-border">Latest Used Category</div>
        <div className="flex flex-col gap-1 size-fit">{categories.map((element, index) => <div key={index} className="max-w-24 h-3 ">{element.name}</div>)}</div>
        <Button onClick={() => setShowAddCategory((prev) => !prev)} className="absolute bottom-8 right-8 bg-orange-300">Add Category</Button>
    </div>
}