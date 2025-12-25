import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { cartContext } from "../context/CartContext";

function SubCategoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProductToWhishList } = useContext(cartContext);
  const [subCategory, setSubCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handelWhichList(id) {
    const res = await addProductToWhishList(id);
    if (res) {
      toast.success(res.data?.message || "Added to wishlist");
    } else {
      toast.error("Failed to add to wishlist");
    }
  }


  useEffect(() => {
    if (!id) return;

    async function fetchSubCategoryData() {
      try {
        const subCatRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`
        );
        setSubCategory(subCatRes.data.data); 

        const productsRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?subCategory=${id}`
        );
        setProducts(productsRes.data.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubCategoryData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
     
      {subCategory && (
        <div className="mb-6 text-center">
          {subCategory.image && (
            <img
              src={subCategory.image}
              alt={subCategory.name}
              className="mx-auto w-40 h-40 object-cover rounded-lg"
            />
          )}
          <h2 className="text-2xl font-bold mt-2">{subCategory.name}</h2>
        </div>
      )}

      {/* Products of SubCategory */}
      {products.length > 0 ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative border p-3 rounded hover:shadow cursor-pointer bg-white"
                onClick={() => navigate(`/productDetails/${product._id}`)}
              >
                
                <button
                  className="absolute top-2 left-2 p-2 bg-white text-gray-600 hover:text-red-500 rounded-full shadow-md z-10 transition-colors"
                  title="Add to wishlist"
                  onClick={()=>handelWhichList(product._id)}
                >
                  <Heart className="w-5 h-5" />
                </button>
                
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h4 className="mt-2 font-semibold">{product.title}</h4>
                <p className="text-green-600">{product.price} EGP</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center mt-6 text-gray-500">No products found in this SubCategory.</p>
      )}
    </div>
  );
}

export default SubCategoryDetails;
