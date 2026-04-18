"use client";
import { addToFavAction } from "@/Actions/FavActions/addToFavAction";
import { getUserFavAction } from "@/Actions/FavActions/GetUserFavAction";
import { removeFavAction } from "@/Actions/FavActions/removeFavAction";
import React, { createContext, useEffect, useState } from "react";

export const favContext = createContext({});
export default function FavContextProvider({ children }) {
  const [numOfFav, setnumOfFav] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [products, setproducts] = useState([]);
  async function addProductToFav(id) {
    try {
      const data = await addToFavAction(id);
      getuserfav();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function removeFavItem(id) {
    try {
      const data = await removeFavAction(id);
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
      const data = await getUserFavAction();
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
