import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useProductsOfCategory(categoryId) {
  function getProductsOfCategory({ queryKey }) {
    const [_key, categoryId] = queryKey;
    
    if (!categoryId) {
      return Promise.resolve({ data: { data: [] } });
    }
    
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
    );
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['productsOfCategory', categoryId],
    queryFn: getProductsOfCategory,
    enabled: !!categoryId, // Only fetch if categoryId exists
  });

  const products = data?.data?.data || [];

  return {
    products,
    isLoading,
    isError,
    error,
  };
}

export default useProductsOfCategory;

