"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import NoProducts from "@/components/layout/Common/NoProducts/NoProducts";
import { useCart } from "@/hooks/useCart";
import CartCard from "../Common/Card/CartCard";
export default function CartProductsSection() {
  const {
    products,
    totalPrice,
    removeAllCartItem,
  } = useCart();

  return (
    <div className="bg-white flex flex-col gap-4 rounded-xl shadow-lg w-[90%] p-6 md:p-8 ">
      <div className="flex justify-between py-5">
        <h3
          className="text-lg md:text-2xl
            font-bold capitalize
            text-transparent
            bg-clip-text
            bg-linear-to-b
            from-sky-800
            to-sky-900"
        >
          Shopping Cart ({products.length} items)
        </h3>
        {products.length > 0 && (
          <Button
            onClick={() => removeAllCartItem()}
            variant="outline"
            size="sm"
            className=""
          >
            Clear All
          </Button>
        )}
      </div>
      {products.length == 0 ? (
        <NoProducts text="No products available , Add some products to Cart" />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
            {products.length > 0 ? (
              products.map((product,index) => (
                <CartCard key={product._id} product={product} priority={index < 2} />
              ))
            ) : (
              <p className="text-center py-8 text-gray-500">
                Your cart is empty.
              </p>
            )}
          </div>

          {/* Cart Summary */}

          <div className="w-full self-end  pt-6">
            <div className="flex justify-between font-medium text-gray-700 text-lg mb-3 pt-4 border-t border-gray-200">
              <span>Grand Total:</span>
              <span className="text-gray-900 font-bold">
                {totalPrice.toFixed(2)}
              </span>
            </div>
            <Link
              href="/payment"
              className={buttonVariants({
                className: "w-full  text-lg",
                variant: "primary",
                size: "lg",
              })}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
