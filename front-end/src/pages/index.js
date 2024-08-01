import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  let [data, setData] = useState({})

  useEffect(() => {
    axios.get("http://localhost:8000/getUsers").then((res) => {console.log(res.data);setData(...res.data)})
  },[])
  return (
  <div>
    <div>{data.name}</div>
    <div>{data.email}</div>
    <div>{data.password}</div>
    <div>{data.avatar}</div>
    <div>{data.createdAt}</div>
    <div>{data.updatedAt}</div>
    <div>{data.curency_type}</div>
  </div>
  );
}
