import { Layout } from "@/components/dashboardlayout"
import { AddRecord } from "@/components/record"

let RecordPage = () => {
    return <Layout currentPage={'Record Page'}>
        <div className="size-full flex flex-col justify-between gap-4">
            <div className="w-72 h-full rounded-xl"></div>
            <AddRecord/>
        </div>
    </Layout>
}

export default RecordPage