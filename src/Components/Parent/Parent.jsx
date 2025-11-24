import { useState } from 'react';
import Child from '../Child/Child'

function Parent() {
  const [data, setData] = useState([
    {name:"ali ", age:34 , id:1 , job:"developer " , married : true , counter:32}, 
    {name:"loai ", age:12 , id:2 , job:"sabbak " , married : false , counter:0}, 
    {name:"saad ", age:2 , id:3, job:"ngaar " , married : true , counter:1}, 
    {name:"asssad ", age:5 , id:4 , job:"car " , married : false , counter:3}, 
    {name:"hassan ", age:8 , id:5 , job:"student " , married : false , counter:2},
  ])


  


function deleteCard(id) {
  const modifiedData = data.filter((item) => item.id !== id);
  setData(modifiedData);
}



function increament (id){
  const newData = structuredClone(data);


  
  
  // newData[id -1 ].counter++
  const index = newData.findIndex(item => item.id === id);
  if(index === -1) return;
    newData[index].counter++;

  setData(newData)


}
 
return (<>
<div className="container">
  <div className="row justify-content-center ">
{
  data.map((item)=>{
    return <Child key={item.id}   {...item} remove ={deleteCard}       increament = {increament} />

  })
}
</div>
</div>

</>)
}

export default Parent