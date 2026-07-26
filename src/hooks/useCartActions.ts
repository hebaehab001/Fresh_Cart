"use client";
import { useCart } from "@/hooks/useCart";
import { toastSuccess, toastError } from "@/lib/toast";

export function useCartActions() {
  const { addProductToCart, removeCartItem, updateCartItem } = useCart();

  async function handleAddToCart(id: string) {
    const data = await addProductToCart(id);
    if (data?.success) toastSuccess(data.message);
    else toastError(data?.message);
    return data;
  }

  async function handleRemoveFromCart(id: string) {
    const data = await removeCartItem(id);
    if (data?.success) toastSuccess(data.message);
    else toastError(data?.message);
    return data;
  }

  return { handleAddToCart, handleRemoveFromCart, updateCartItem };
}