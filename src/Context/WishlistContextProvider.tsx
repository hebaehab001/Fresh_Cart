"use client";
import { addToWishlistAction } from "@/Actions/WishlistActions/addToWishlistAction";
import { getUserWishlistAction } from "@/Actions/WishlistActions/GetUserWishlistAction";
import { removeWishlistAction } from "@/Actions/WishlistActions/removeWishlistAction";
import { ComponentProps } from "@/types/common.type";
import { WishListContextType } from "@/types/context.type";
import { Product } from "@/types/product.type";
import { createContext, useEffect, useState } from "react";
export const wishlistContext = createContext<WishListContextType | undefined>(undefined);
export default function WishlistContextProvider({ children }: ComponentProps) {
  const [numOfFav, setNumOfFav] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function addProductToFav(id: string) {
    try {
      const data = await addToWishlistAction(id);
      getuserfav();
      return data;
    } catch (error) {
      console.log(error);
      setError("Couldn't load your wishlist. Check your connection.");
    }
  }

  async function removeFavItem(id: string) {
    try {
      const data = await removeWishlistAction(id);
      if (data?.success) {
        setProducts(data.data);
        setNumOfFav(data.data.length);
      }
      return data;
    } catch (error) {
      console.log(error);
      setError("Couldn't load your wishlist. Check your connection.");
    }
  }

  async function getuserfav() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUserWishlistAction();
      setNumOfFav(data.count);
      setProducts(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError("Couldn't load your wishlist. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(function () {
    getuserfav();
  }, []);

  const value: WishListContextType = {
    numOfFav,
    products,
    isLoading,
    error,
    addProductToFav,
    removeFavItem,
  };

  return (
    <wishlistContext.Provider value={value}>
      {children}
    </wishlistContext.Provider>
  );
}
