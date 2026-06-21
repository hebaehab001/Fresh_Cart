"use client";
import { addToWishlistAction } from "@/Actions/WishlistActions/addToWishlistAction";
import { getUserWishlistAction } from "@/Actions/WishlistActions/GetUserWishlistAction";
import { removeWishlistAction } from "@/Actions/WishlistActions/removeWishlistAction";
import { ComponentProps } from "@/types/common.type";
import { WishListContextType } from "@/types/context.type";
import { createContext, useEffect, useState } from "react";
export const wishlistContext = createContext<WishListContextType | undefined>(
  undefined,
);
export default function WishlistContextProvider({ children }:ComponentProps) {
  const [numOfFav, setnumOfFav] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [products, setproducts] = useState([]);
  async function addProductToFav(id: string) {
    try {
      const data = await addToWishlistAction(id);
      getuserfav();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function removeFavItem(id: string) {
    try {
      const data = await removeWishlistAction(id);
      if (data?.success) {
        setproducts(data.data);
        setnumOfFav(data.data.length);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getuserfav() {
    setisLoading(true);
    try {
      const data = await getUserWishlistAction();
      setnumOfFav(data.count);
      setproducts(data.data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  }

  useEffect(function () {
    getuserfav();
  }, []);

  const value: WishListContextType = {
    numOfFav,
    products,
    isLoading,
    addProductToFav,
    removeFavItem,
  };

  return (
    <wishlistContext.Provider value={value}>
      {children}
    </wishlistContext.Provider>
  );
}
