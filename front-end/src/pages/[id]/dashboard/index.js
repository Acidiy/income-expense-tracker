import { DashboardLayout } from "@/layout/dashboard-layou";
import { useParams } from "next/navigation";

let Dashboard = ({params}) => {
    const id = params.id

    return <DashboardLayout>
        <div>{id}</div>
    </DashboardLayout>
}

export default Dashboard