

function Child({name , counter,  id,age , job , married  ,remove ,increament }) {



// const {name , age , job , married }=data
// console.log(name , age , job , married);


  return (<>
<div className="col-sm-6 col-md-4 col-lg-3 p-3">
  <div className="border rounded shadow-sm p-3 text-center position-relative">
    <h1 className="fs-4 text-primary">Name: {name}</h1>
    <h2 className="fs-5">Age: {age}</h2>
    <h3 className="fs-6">Job: {job}</h3>


        <p>{counter}</p>
        {
            married &&  
            
            <span className={`position-absolute top-0 end-0 px-2 py-1  rounded-start-bottom p-3 bg-success text-white`}>
              married
          
        </span>
        }
        {
            !married &&  
            
            <span className={`position-absolute top-0 end-0 px-2 py-1  rounded-start-bottom p-3 bg-danger text-white`}>
              Not married
          
        </span>


}


<button

onClick={()=>{return remove(id)}}

className='btn btn-info btn-outline-danger w-100 '>
  Delete
</button>






<button

onClick={()=>{return increament(id)}}

className='btn btn-danger btn-outline-info mt-3 w-100 '>
  counter
</button>
  </div>
</div>

  </>

  )
}

export default Child