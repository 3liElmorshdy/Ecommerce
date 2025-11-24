import axios from 'axios'
import { LoaderCircle } from 'lucide-react';
import React,{ useState } from 'react'
import { useEffect } from 'react'



function Home() {
const [data, setData] = useState([])



 async function getData(){

 const container =await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
 setData(container.data.data);
//  console.log(container.data.data)
 console.log(data)

}

useEffect(()=>{


  getData();
},[])



return (<>


  {data.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
    {data.map((item) => (
      <div key={item._id} className="border p-3 rounded shadow">
        <h1 className="font-bold text-lg mb-2 text-center">{item.name}</h1>
        <img src={item.image} alt={item.name} className="w-full rounded" />
      </div>
    ))}
  </div> 
) : (
  <div className="flex justify-center items-center h-screen w-full">
    <LoaderCircle size={50} className="animate-spin text-gray-500" />
  </div>
)}
    </>
  )

}

export default Home