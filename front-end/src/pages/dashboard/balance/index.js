import { UserBalance } from "@/components/balance"
import { Layout } from "@/components/dashboardlayout"
import { useEffect, useState } from "react"

let Balance = () => {

    let [userBalance, setUserBalance] = useState(0)
    let [userId, setUserId] = useState('')

    useEffect(() => {
        let localStorageUser = JSON.parse(localStorage.getItem('user'))
        
        if (!localStorageUser) router.push('/sign-in')
        else setUserBalance(localStorageUser.balance);setUserId(localStorageUser.id)
    }, [])

    return <Layout currentPage={'Balance'}>
        <UserBalance balance={userBalance} id={userId}/>
    </Layout>
}

export default Balance