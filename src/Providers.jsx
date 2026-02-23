"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import CartContextProvider from "./Context/CartContextProvider";
import FavContextProvider from "./Context/FavContextProvider";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <FavContextProvider>{children}</FavContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
