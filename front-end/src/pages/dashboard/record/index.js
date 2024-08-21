import { Layout } from "@/components/dashboardlayout"
import { AddRecord, ShowRecord } from "@/components/record"

let RecordPage = () => {
    return <Layout currentPage={'Record Page'}>
        <div className="size-full flex flex-col gap-4">
            <AddRecord/>
            <ShowRecord/>
        </div>
    </Layout>
}

export default RecordPage