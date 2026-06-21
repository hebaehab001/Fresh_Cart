"use client";
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "./Context/CartContextProvider";
import WishlistContextProvider from "./Context/WishlistContextProvider";
import { ComponentProps } from "./types/common.type";

export default function Providers({ children }:ComponentProps) {
  return (
    <SessionProvider refetchInterval={15 * 60}>
      <CartContextProvider>
        <WishlistContextProvider>{children}</WishlistContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
