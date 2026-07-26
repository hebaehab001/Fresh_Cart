"use client";
import { Button } from "@/components/ui/button";
import { useCartActions } from "@/hooks/useCartActions";
import { FaBasketShopping } from "react-icons/fa6";

export default function CartBtn({
  id,
  productdetails,
}: {
  id: string;
  productdetails: boolean;
}) {
  const { handleAddToCart } = useCartActions();

  return (
    <Button
      variant="primary"
      size={productdetails ? "lg" : "default"}
      onClick={() => handleAddToCart(id)}
      className={`${productdetails ? "text-lg h-11" : ""} w-full`}
    >
      <FaBasketShopping /> Add To Cart
    </Button>
  );
}
