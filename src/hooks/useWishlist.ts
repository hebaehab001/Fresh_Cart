"use client";

import { useContext } from "react";
import {  WishListContextType } from "@/types/context.type";
import { wishlistContext } from '@/Context/WishlistContextProvider';

export function useWishlist(): WishListContextType {
  const context = useContext(wishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistContextProvider");
  }

  return context;
}
