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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import axios from "axios"

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
  let [records, setRecords] = useState({})
  useEffect(() => { 
    let localStorageUser = JSON.parse(localStorage.getItem('user'))
    if (!localStorageUser) return router.push('/sign-in')
    let inc = { transaction_type: 'INC', amount: 0 }, exp = { transaction_type: 'EXP', amount: 0 }, data = [inc, exp]
    axios.post(BASE_URL + "/api/getTransactions", { user_id: localStorageUser.id }).then((response) => {response.data.rows.map((element)=>{if(element.transaction_type === 'EXP') data[1].amount=data[1].amount+element.amount; else{data[0].amount=data[0].amount+element.amount}}); return setRecords(data.map((element) => ({ ...element, fill: `var(--color-${element.transaction_type})` })))})
  }, [])
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
