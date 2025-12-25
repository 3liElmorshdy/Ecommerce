import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader, Heart } from "lucide-react";
import { toast } from "react-toastify";
import { cartContext } from "../context/CartContext";
import useProductsOfCategory from "../customHook/useProductsOfCategory";

function CategoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProductToCart, addProductToWhishList } = useContext(cartContext);
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  const { products, isLoading: productsLoading, isError: productsError, error } = useProductsOfCategory(id);

  useEffect(() => {
    if (!id) return;

    async function fetchCategoryData() {
      try {
        // 1️⃣ Get Category info
        const categoryRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${id}`
        );
        setCategory(categoryRes.data.data);

        // 2️⃣ Get SubCategories of this Category
        const subCatRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
        );
        setSubCategories(subCatRes.data.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryData();
  }, [id]);

  // Handle Add to Cart
  async function handelProductCart(productId) {
    const res = await addProductToCart(productId);
    if (res) {
      toast.success("Product added to cart successfully", {
        position: "top-left",
      });
    } else {
      toast.error("Product already in cart", { position: "top-left" });
    }
  }

  // Handle Add to Wishlist
  async function handelWishlist(productId) {
    const res = await addProductToWhishList(productId);
    if (res) {
      toast.success(res.data?.message || "Added to wishlist");
    } 
  }

  if (loading || productsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold">Error loading products</p>
          <p>{error?.message || "Something went wrong"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      
      {category && (
        <div className="mb-6 text-center">
          <img
            src={category.image}
            alt={category.name}
            className="mx-auto w-40 h-40 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-bold mt-2">{category.name}</h2>
        </div>
      )}

      {/* Products of Category */}
      {products.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => {
                    // e.stopPropagation();
                    handelWishlist(product._id);
                  }}
                  className="absolute top-2 left-2 p-2 bg-white text-gray-600 hover:text-red-500 rounded-full shadow-md z-10 transition-colors"
                  title="Add to wishlist"
                >
                  <Heart className="w-5 h-5" />
                </button>
                
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/productDetails/${product._id}`)}
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h4 className="font-semibold mt-2">{product.title}</h4>
                  <h5 className="text-sm text-gray-700">{product.category?.name}</h5>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm">Rating: {product.ratingsAverage || "N/A"}</p>
                    <p className="text-green-600 font-semibold">{product.price} EGP</p>
                  </div>
                </div>
                <button
                  className="absolute top-0 right-0 mt-4 mr-4 bg-blue-600 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700"
                  onClick={() => {
                    
                    handelProductCart(product._id);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubCategories */}
      {subCategories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">SubCategories</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {subCategories.map((sub) => (
              <Link
                key={sub._id}
                to={`/subCategoryDetails/${sub._id}`} 
                className="border p-3 rounded hover:shadow"
              >
                <p className="mt-2 text-center font-medium">{sub.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryDetails;
