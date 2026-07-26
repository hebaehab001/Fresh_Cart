"use client";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/types/cart.type";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useCartActions } from "@/hooks/useCartActions";
import { useState } from "react";

export default function CartCard({ product }: { product: CartItem }) {
  const { handleRemoveFromCart, updateCartItem } = useCartActions();
  const [inputValue, setInputValue] = useState(String(product.count));

  function commitQuantityChange() {
    const parsed = parseInt(inputValue) || 1;
    if (parsed !== product.count) {
      updateCartItem(product.product.id, parsed);
    }
  }
  return (
    <Card
      key={product.product.id}
      className="relative mx-auto w-full px-4  gap-2 grid grid-cols-3"
    >
      <Image
        className="rounded-xl  h-40  object-cover shrink-0 col-span-1"
        src={product.product.imageCover}
        alt={product.product.title}
        width={200}
        height={216}
        unoptimized
        loading="lazy"
      />
      <div className="col-span-2 flex flex-col justify-between gap-1">
        <h5 className="text-xl md:text-lg line-clamp-1  font-semibold tracking-tight text-gray-900">
          {product.product.title}
        </h5>
        <p className="text-sm text-gray-400 ">{product.product.brand.name}</p>
        <span className="text-xl font-bold text-sky-900 ">
          {product.price * product.count} EGP
        </span>
        <div className="flex justify-between">
          <ButtonGroup className={undefined} orientation="horizontal">
            <Button
              onClick={() => {
                const newCount = product.count - 1;
                updateCartItem(product.product.id, newCount);
                setInputValue(String(newCount));
              }}
              disabled={product.count <= 1}
              variant="outline"
              size="icon-lg"
              className="text-lg"
            >
              -
            </Button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={commitQuantityChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }
              }}
              className="w-10 text-center border border-sky-800 focus:outline-none text-sm text-sky-800"
              min="1"
            />
            <Button
              onClick={() => {
                const newCount = product.count + 1;
                updateCartItem(product.product.id, newCount);
                setInputValue(String(newCount));
              }}
              variant="outline"
              size="icon-lg"
              className="text-lg"
            >
              +
            </Button>
          </ButtonGroup>
          <Button
            onClick={() => handleRemoveFromCart(product.product.id)}
            className="text-gray-400 hover:text-red-500 bg-transparent hover:bg-transparent"
            title="Remove item"
            size="icon-lg"
            variant={undefined}
          >
            <RiDeleteBin6Line className="size-6" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
