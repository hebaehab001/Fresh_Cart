"use client";
import {addToWishlistAction } from "@/Actions/WishlistActions/addToWishlistAction";
import { getUserWishlistAction } from "@/Actions/WishlistActions/GetUserWishlistAction";
import { removeWishlistAction } from "@/Actions/WishlistActions/removeWishlistAction";
import { createContext, useEffect, useState } from "react";

export const favContext = createContext({});
export default function FavContextProvider({ children }) {
  const [numOfFav, setnumOfFav] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [products, setproducts] = useState([]);
  async function addProductToFav(id:string) {
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
  return (
    <favContext.Provider
      value={{
        numOfFav,
        products,
        isLoading,
        addProductToFav,
        removeFavItem,
      }}
    >
      {children}
    </favContext.Provider>
  );
}
