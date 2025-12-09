"use client";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/Context/CartContextProvider";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "sonner";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

export default function page() {
  const {
    products,
    totalPrice,
    isLoading,
    removeCartItem,
    updateCartItem,
    removeAllCartItem,
  } = useContext(cartContext);
  console.log(products);

  async function removeCart(id) {
    const data = await removeCartItem(id);
    if (data.status === "success") {
      toast.success("success to remove this from cart", {
        duration: 1000,
        position: "bottom-right",
      });
    } else {
      toast.error("faild to remove this from cart", {
        duration: 1000,
        position: "bottom-right",
      });
    }
  }
  if (isLoading) {
    return <p>loading</p>;
  }
  if (products.length == 0) {
    return <h1>no data</h1>;
  }

  return (
    <section className="bg-gray-100 min-h-[90vh] p-4 flex justify-center w-full">
      <div className="bg-white rounded-xl shadow-lg w-[60%] flex flex-col h-full  p-6 md:p-8 mt-10">
        <div className="flex justify-between py-5">
          <h1 className="text-2xl font-bold text-gray-800 ">
            Shopping Cart ({products.length} items)
          </h1>
          <button
            onClick={() => removeAllCartItem()}
            className=" bg-white text-sky-800 border border-sky-800 hover:bg-linear-to-b hover:from-sky-700 hover:to-sky-950 hover:text-white rounded-lg py-1 px-4  transition duration-150 font-semibold shadow-md"
          >
            Clear All
          </button>
        </div>

        {/* Table Header (Desktop/Tablet) */}
        <div className="hidden sm:grid grid-cols-12 text-lg font-medium text-gray-500 border-b border-gray-200 pb-3 gap-4">
          <div className="col-span-5">Products</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-2 text-right">Subtotal</div>
        </div>

        {/* Cart Rows */}
        <div className="divide-y divide-gray-100">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-12 items-center py-4 border-b border-gray-100 last:border-b-0 gap-4"
              >
                {/* Product Column (Image, Name, Delete) - Spans 5 columns */}

                <div className="col-span-12 sm:col-span-5 flex items-center space-x-4">
                  {/* Delete Button (X) */}
                  <button
                    onClick={() => removeCart(product.product.id)}
                    className="text-gray-400 hover:text-red-500 transition duration-150 p-1 -ml-2"
                    title="Remove item"
                  >
                    &times;
                  </button>
                  {/* Product Image */}
                  <img
                    src={product.product.imageCover}
                    alt={product.product.title}
                    className="w-16 h-16 rounded object-cover shrink-0"
                    // Fallback in case placeholder fails
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/60x60/94A3B8/ffffff?text=Err";
                    }}
                  />
                  {/* Product Name */}
                  <div className="grow min-w-0">
                    <p className="font-medium text-gray-700 text-lg truncate">
                      {product.product.title}
                    </p>
                    <p className="text-sm text-gray-400 hidden sm:block">
                      {product.product.brand.name}
                    </p>
                  </div>
                </div>
                {/* Price Column - Spans 3 columns on mobile, 2 on tablet/desktop */}
                <div className="col-span-4 sm:col-span-2 text-right text-gray-700 order-2 sm:order-none">
                  {product.price}
                </div>

                {/* Quantity Controls - Spans 5 columns on mobile, 3 on tablet/desktop */}
                <div className="col-span-5 sm:col-span-3 flex justify-center order-3 sm:order-none">
                  <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateCartItem(product.product.id, product.count - 1)
                      }
                      disabled={product.product.quantity <= 1}
                      className="p-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={product.count}
                      onChange={(e) =>
                        updateCartItem(
                          product.product.id,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-10 text-center border-l border-r border-gray-300 focus:outline-none text-sm text-gray-800"
                      min="1"
                    />
                    <button
                      onClick={() =>
                        updateCartItem(product.product.id, product.count + 1)
                      }
                      className="p-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition duration-150"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal Column - Spans 3 columns on mobile, 2 on tablet/desktop */}
                <div className="col-span-3 sm:col-span-2 text-right font-semibold text-gray-900 order-4 sm:order-none">
                  {product.price * product.count}
                </div>
              </div>
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
          <Link href="/payment">
            <Button className="w-full  bg-linear-to-b from-sky-800 to-sky-950 text-white py-4 rounded-lg hover:from-sky-700 transition duration-150 font-semibold shadow-md">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
