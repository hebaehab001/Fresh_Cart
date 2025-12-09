'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CartContextProvider from './Context/CartContextProvider'

export default function Providers({children}) {
  return (
    <SessionProvider>
      <CartContextProvider>
        {children}
      </CartContextProvider>
    </SessionProvider>
  );
}
