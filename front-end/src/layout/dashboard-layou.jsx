import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { useState } from "react"

export let DashboardLayout = ({children}) => {
    let [currentPage,setCurrrentPage] = useState('Dashboard')
    return <main className="h-screen w-full p-20 bg-teal-400 relative">
        <NavigationMenu className="absolute z-10 left-10 top-5">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                    <NavigationMenuContent>
                    <Link href={"/record"} onClick={()=>setCurrrentPage('Record')}>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Record</NavigationMenuLink>
                    </Link>
                    <Link href={"/dashboard"} onClick={()=>setCurrrentPage('Dashboard')}>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
                    </Link>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        <div className="size-fit p-2 bg-black rounded-xl absolute z-10 top-5 left-1/2 font-thin text-slate-800">Currently on {currentPage}</div>
        {children}
    </main>
}