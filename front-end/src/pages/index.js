import axios from "axios";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let [data, setData] = useState({})

  useEffect(() => {
    axios.get("http://localhost:8000/getUsers").then((res) => {console.log(res);setData(res.data)})
  },[])
  return (
    <div>{}</div>
  );
}
