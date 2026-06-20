"use client";
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "./Context/CartContextProvider";
import WishlistContextProvider from "./Context/WishlistContextProvider";

export default function Providers({ children }) {
  return (
    <SessionProvider refetchInterval={15 * 60}>
      <CartContextProvider>
        <WishlistContextProvider>{children}</WishlistContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
