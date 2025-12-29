import React, { useState, useContext, useMemo, useCallback, memo } from 'react'
import axios from 'axios'
import { Loader, Heart } from 'lucide-react'
import HomeSlider from '../HomeSlider/HomeSlider'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import { toast } from 'react-toastify'

function getQueryProduct({ queryKey }) {
  const [_key, page] = queryKey
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=12`)
}

const ProductCard = memo(function ProductCard({ product, onWishlist, onAddToCart, onView }) {
  return (
    <div className="group relative bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <button
        className="absolute top-2 left-2 p-2 bg-white text-gray-600 hover:text-red-500 rounded-full shadow-md z-10 transition-colors"
        title="Add to wishlist"
        onClick={() => onWishlist(product._id)}
      >
        <Heart className="w-5 h-5" />
      </button>

      <div className="cursor-pointer" onClick={() => onView(product._id)}>
        <div className="aspect-square w-full rounded overflow-hidden">
          <img
            src={product.imageCover}
            alt={product.title}
            width="600"
            height="600"
            loading="lazy"
            decoding="async"
            srcSet={`${product.imageCover} 1x, ${product.imageCover} 2x`}
            sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold mt-2">{product.title}</h3>
        <h2 className="text-sm text-gray-700">{product.category?.name}</h2>
        <div className="flex justify-between items-center mt-2">
          <p>Rating: {product.ratingsAverage}</p>
          <p>Price: {product.price} EGP</p>
        </div>
      </div>

      <button
        className="absolute top-0 right-0 mt-4 mr-4 bg-blue-600 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700"
        onClick={() => onAddToCart(product._id)}
      >
        Add to Cart
      </button>
    </div>
  )
})

function AllOrders() {
  const { addProductToCart, addProductToWhishList } = useContext(cartContext)
  const nav = useNavigate()
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['productDetils', page],
    queryFn: getQueryProduct,
    keepPreviousData: true,
  })

  // Memoize products list unconditionally to satisfy rules-of-hooks
  const productsMemo = useMemo(() => data?.data?.data ?? [], [data])

  // Handlers
  async function handelWishlist(id) {
    const res = await addProductToWhishList(id)
    if (res) {
      toast.success(res.data?.message || 'Added to wishlist', {
        position: 'top-left',
      })
    }
  }

  async function handelProductCart(productId) {
    const res = await addProductToCart(productId)
    if (res) {
      toast.success('product Add to Cart Successfuly', {
        position: 'top-left',
      })
    }
  }

  function handelNext(number) {
    number == 5 ? setPage(1) : setPage((p) => p + 1)
  }

  // Memoize callbacks unconditionally before any early return
  const onWishlist = useCallback((id) => handelWishlist(id), [addProductToWhishList])
  const onAddToCart = useCallback((id) => handelProductCart(id), [addProductToCart])
  const onView = useCallback((id) => nav(`/productDetails/${id}`), [nav])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader width={72} height={72} />
      </div>
    )
  }

  if (isError) {
    return (
      <h2 className="text-red-600 font-bold">error occur {error.message}</h2>
    )
  }

  return (
    <div className="container mx-auto  ">
      <div className="my-2 mb-7">
        <HomeSlider />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-1 gap-1 scroll-smooth ">
        {productsMemo.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onWishlist={onWishlist}
            onAddToCart={onAddToCart}
            onView={onView}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 my-6 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Prev
        </button>

        <span className="font-bold">Page {page}</span>

        <button
          onClick={() => handelNext(page)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AllOrders

// No unload/beforeunload handlers are used here.
