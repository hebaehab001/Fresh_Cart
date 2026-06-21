"use client";
import { addToCartAction } from "@/Actions/CartActions/addToCartAction";
import { clearAllCartsAction } from "@/Actions/CartActions/clearAllCartsAction";
import { getUserCartAction } from "@/Actions/CartActions/getUserCartAction";
import { removeCartAction } from "@/Actions/CartActions/removeCartAction";
import { updateCartAction } from "@/Actions/CartActions/updateCartAction";
import { ComponentProps } from "@/types/common.type";
import { CartContextType } from "@/types/context.type";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext<CartContextType | undefined>(
  undefined,
);

export default function CartContextProvider({ children }: ComponentProps) {
  const [numOfCart, setnumOfCart] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [cardId, setcardId] = useState("");

  async function addProductToCart(id: string) {
    try {
      const data = await addToCartAction(id);
      getusercart();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeCartItem(id: string) {
    try {
      const data = await removeCartAction(id);
      setnumOfCart(data.numOfCartItems);
      setproducts(data.data.products);
      settotalPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeAllCartItem() {
    try {
      const data = await clearAllCartsAction();
      setnumOfCart(0);
      setproducts([]);
      settotalPrice(0);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCartItem(id: string, count: number) {
    try {
      const data = await updateCartAction(id, count);
      setnumOfCart(data.numOfCartItems);
      setproducts(data.data.products);
      settotalPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getusercart() {
    setisLoading(true);
    try {
      const data = await getUserCartAction();
      setnumOfCart(data.numOfCartItems);
      setproducts(data.data.products);
      settotalPrice(data.data.totalCartPrice);
      setisLoading(false);
      setcardId(data.cartId);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  }

  function afterPayment() {
    setnumOfCart(0);
    setproducts([]);
    settotalPrice(0);
    setcardId("");
  }

  useEffect(function () {
    getusercart();
  }, []);

  const value: CartContextType = {
    numOfCart,
    products,
    totalPrice,
    isLoading,
    cardId,
    addProductToCart,
    removeCartItem,
    updateCartItem,
    removeAllCartItem,
    afterPayment,
  };

  return (
    <cartContext.Provider value={value}>
      {children}
    </cartContext.Provider>
  );
}
