import { UserBalance } from "@/components/balance"
import { Layout } from "@/components/dashboardlayout"
import { useEffect, useState } from "react"

let Balance = () => {

    let [userId, setUserId] = useState({})

    useEffect(() => {
        let localStorageUser = JSON.parse(localStorage.getItem('user'))
        if (!localStorageUser) router.push('/sign-in')
        else setUserId(localStorageUser.id)
    }, [])

    return <Layout currentPage={'Balance'}>
        <UserBalance id={userId}/>
    </Layout>
}

export default Balance