"use client";

import { useContext } from "react";
import { cartContext } from "@/Context/CartContextProvider";
import { CartContextType } from "@/types/context.type";

export function useCart(): CartContextType {
  const context = useContext(cartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartContextProvider");
  }

  return context;
}
