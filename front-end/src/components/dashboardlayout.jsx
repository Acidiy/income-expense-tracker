import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, navigationMenuTriggerStyle } from "./ui/navigation-menu";

export let Layout = ({children, currentPage}) => {
    let router = useRouter()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(!user) router.push('/sign-in')
    },[])

    return(
        <main className="h-screen w-screen px-5 sm:px-10 md:px-14 lg:px-20 relative bg-teal-400 ">
            <div className="h-16 w-full absolute z-10 top-0 left-0 bg-teal-600 flex items-center justify-between px-5 sm:px-10 md:px-14 lg:px-20">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Main</NavigationMenuLink>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Record</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="text-xl font-thin min-w-fit text-nowrap">{currentPage}</div>
            </div>
            {children}
        </main>
    )
}