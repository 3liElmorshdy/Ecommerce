import { useContext } from "react";
import { toast } from "react-toastify";
import { cartContext } from "../context/CartContext";

function useCart() {

  // console.log(product , numOfCartItems , totalCartPrice  );
  const { removeAllItem, removeSpacificItem, updateProductQuantity, product, numOfCartItems, totalCartPrice, updatingId, setUpdatingId, setProduct } = useContext(cartContext)

  async function handelRemoveSpacificItem(id) {
    const res = await removeSpacificItem(id)
    if (res) {
      toast.success("Item removed successfully")

    }
    else {
      toast.error("Item removed failed")
    }

  }

  async function handelRemoveAllItem() {
    const res = await removeAllItem()
    if (res) {

      setProduct([])
      toast.success("All items removed successfully")
    }
    else {
      toast.error("All items removed failed")
    }
    return res
  }



  async function handleQuantityChange(id, newCount) {
    // if (newCount >= 1 && newCount <= product.product.quantity) {
    // console.log(id , newCount , "this come from handleQuantityChange");
    console.log(id, "this come from handleQuantityChange");

    const res = await updateProductQuantity(id, newCount);

    res ? toast.success("Quantity updated successfully") : toast.error("Quantity update failed");
    // }
  }
  // console.log(product , "this come from product");

  return {
    handelRemoveSpacificItem,
    handleQuantityChange,
    product,
    numOfCartItems, totalCartPrice, updatingId, setUpdatingId, handelRemoveAllItem
  }
}

export default useCart
