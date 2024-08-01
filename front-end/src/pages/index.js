import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  let [data, setData] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/users/get").then((res) => {console.log(res.data,'res');setData(res.data)})
  },[])

  console.log(data,'data');
  return (
  <main>
    {data.map((element, index) => <div key={index} className="flex gap-4"><img src={element.avatar} className="size-10 rounded-full"/><div className="font-thin text-xl my-auto">{element.name}</div></div>)}
  </main>
  );
}
