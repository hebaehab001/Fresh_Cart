"use client";
import { cartContext } from "@/Context/CartContextProvider";
import React, { useContext } from "react";
import { FaBasketShopping  } from "react-icons/fa6";
import { toast } from "sonner";

export default function AddBtnCart({ id, productdetails }) {
  const { addProductToCart } = useContext(cartContext);
  async function handleAddCart() {
    const data = await addProductToCart(id);
    if (data.status === "success") {
      toast.success(data.message, {
        position: "bottom-right",
        duration: 1000,
      });
    } else {
      toast.error("faild to add this in cart", {
        position: "bottom-right",
        duration: 1000,
      });
    }
  }
  return productdetails ? (
    <button
      onClick={handleAddCart}
      className="w-full  bg-linear-to-b from-sky-800 to-sky-950 text-white py-3 rounded-lg hover:from-sky-700 transition duration-150 font-semibold shadow-md"
    >
      Add To Cart
    </button>
  ) : (
    <button
      onClick={handleAddCart}
      className=" bg-white border border-sky-800 text-sky-800 font-bold text-lg  rounded-lg p-2 hover:border-sky-800 hover:text-white hover:bg-sky-800"
    >
      <FaBasketShopping />
    </button>
  );
}
