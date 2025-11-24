import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function useCategories() {


  function getAllCategories(){
  return  axios.get("https://ecommerce.routemisr.com/api/v1/categories")
}

const data = useQuery({
  queryKey : ["allCategories"],
  queryFn: getAllCategories
})


return data
}

export default useCategories