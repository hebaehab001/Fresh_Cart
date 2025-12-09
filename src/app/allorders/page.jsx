import { getUserOrdertAction } from "@/Actions/OrderActions/getUserOrderAction";
import { Item } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { LuShoppingBag } from "react-icons/lu";

export default async function page() {
  const data = await getUserOrdertAction();
  console.log(data);

  return (
    <section className="bg-gray-100 min-h-[90vh] p-4 flex justify-center w-full">
      <div className="bg-white rounded-xl shadow-lg w-[60%] flex flex-col gap-10 h-full  p-6 md:p-8 mt-10">
        {data.map((order, index) => (
          // <div key={index}>
          //   <div>
          //     {order.cartItems.map((item) => (
          //       <h1 key={item._id}>{item._id}</h1>
          //     ))}
          //   </div>
          // </div>
          <div
            key={index}
            className="w-full mx-auto bg-white rounded-xl shadow-lg border border-gray-100 hover:border-sky-900"
          >
            {/* <!-- Card Header Section --> */}
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                {/* <!-- Order ID --> */}
                <div className="flex items-center text-gray-700 mb-2 sm:mb-0">
                  <span className="text-xs text-gray-500 mr-2">Order ID</span>
                  {/* <!-- Shopping bag icon (lucide-react equivalent SVG) --> */}

                  <LuShoppingBag className="mx-1" />
                  <span className="font-semibold text-lg text-gray-900">
                    {" "}
                    {order.id}
                  </span>
                </div>

                {/* <!-- Status and Arrival --> */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                    Estimated arrival: 28 May 2024
                  </span>
                  <div className="flex items-center">
                    {/* <!-- Red status dot --> */}
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
                    <span className="text-sm font-medium text-red-500">
                      On Deliver
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Shipping Tracker Section --> */}
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                {/* <!-- Origin --> */}
                <div className="flex items-center text-gray-600 w-1/3">
                  {/* <!-- Location Pin Icon --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-4 h-4 mr-1 text-gray-500 shrink-0"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="truncate">Illinois, United States</span>
                </div>

                {/* <!-- Dotted Line & Arrow --> */}
                <div className="shipping-line"></div>

                {/* <!-- Destination --> */}
                <div className="flex items-center text-right justify-end text-gray-600 w-1/3">
                  <span className="truncate">George's House, Indonesia</span>
                  {/* <!-- Location Pin Icon --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-4 h-4 ml-1 text-gray-500 shrink-0"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* <!-- Product List Section --> */}
            <div className="space-y-4 p-4 sm:p-6 bg-gray-50/50">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100 transition duration-150 hover:shadow-md"
                >
                  {/* <!-- Product Image --> */}
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-20 h-20 rounded-lg object-cover mr-4 shrink-0"
                  />

                  {/* <!-- Product Details --> */}
                  <div className="grow">
                    <p className="font-semibold text-gray-900 truncate">
                      {item.product.title}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm font-bold text-gray-800">
                        EGP {item.price}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      x{item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* <!-- Card Footer Section --> */}
            <div className="flex justify-between items-center p-4 sm:p-6">
              {/* <!-- Total --> */}
              <div className="text-base text-gray-900">
                <span className="font-bold">
                  Total: EGP {order.totalOrderPrice}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  ({order.cartItems.length} item)
                </span>
              </div>

              {/* <!-- Details Button --> */}
              <button className="px-6 py-2 bg-gray-900 text-white font-medium rounded-xl shadow-lg hover:bg-gray-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
