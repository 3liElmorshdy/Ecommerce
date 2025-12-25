// import React, { useEffect,useState } from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Loader } from 'lucide-react';
import useCategories from '../../customHook/useCategories';
import { Link } from "react-router-dom";
function HomeSlider() {

  var settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 6,
    // slidesToScroll: 1,
       dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,




     autoplay: true,       
  autoplaySpeed: 2500,  
 
 

  pauseOnHover: true, 
  

   

  
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  

//   const [allCategories, setAllCategories] = useState(null)
//   const [loading, setLoading] = useState(true);
// const   getAllCategories =
// async ()=>{
//   axios.get("https://ecommerce.routemisr.com/api/v1/categories").then(res => {
//   setAllCategories(res.data.data);
//   setLoading(false);
// })

// .catch(err =>console.error(err)) 
  

// }
// useEffect(() => {

// getAllCategories()


// }, [])
const {data , isFetching ,isLoading,isError ,error}=useCategories()

const allCategories = data?.data.data;

if (isLoading) return <Loader className="animate-spin mx-auto mt-10" />;

if(isError) return <h2 className='text-red-600 flex items-center justify-center h-screen'>Error occurd {error.message}</h2>
if (isFetching)
{
  console.log("Hi ");
  
}



  return (
<Slider {...settings}>
  {allCategories.map((item) => (
    <Link
      key={item._id}
      to={`/categoryDetails/${item._id}`}
      className="overflow-hidden"
    >
      <div className="mx-1.5">  
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover rounded-lg cursor-pointer"
        />
        <p className="text-center mt-2 font-semibold">{item.name}</p>
      </div>
    </Link>
  ))}
</Slider>

  );
}

export default HomeSlider;
