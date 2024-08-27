"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import axios from "axios"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

export let IE_PieChart = () => {
  const BASE_URL = "http://localhost:8000"
  let chartConfig = {
    amount: {
      label: "amount",
    },
    EXP: {
      label: "EXP",
      color: "hsl(var(--chart-2))",
    },
    INC: {
      label: "INC",
      color: "hsl(var(--chart-3))",
    }
  }
  let [records,setRecords] = useState({})
  useEffect(()=>{
    let localStorageUser = JSON.parse(localStorage.getItem('user'))
    if (!localStorageUser) return router.push('/sign-in')
    axios.post(BASE_URL + "/api/getTransactions", { user_id: localStorageUser.id }).then((response) => {setRecords(response.data.rows.map((element)=>({...element, fill:`var(--color-${element.transaction_type})`})));return console.log(response.data.rows)})
  },[])
  return (
    <Card className="flex">
      <CardHeader className="items-center">
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={records}
              dataKey="amount"
              nameKey="transaction_type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
