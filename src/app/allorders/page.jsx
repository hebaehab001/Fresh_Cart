import { getUserOrdertAction } from "@/Actions/OrderActions/getUserOrderAction";
import NoProducts from "@/components/layout/Common/NoProducts/NoProducts";
import { estimateArrival } from "@/utilities/estimateArrival";
import React from "react";
import { LuShoppingBag } from "react-icons/lu";
export default async function page() {
  const data = await getUserOrdertAction();
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
      <div className="bg-white rounded-xl shadow-lg w-[90%] min-h-[85vh]  p-6 md:p-8 ">
        <div className="flex flex-col gap-5 mb-4">
          {data.length == 0 ? (
            <NoProducts text="There is no orders yet" />
          ) : (
            data.map((order, index) => (
              <div
                key={index}
                className="w-full mx-auto bg-white rounded-xl shadow-lg border border-gray-100 hover:border-sky-900"
              >
                {/* <!-- Card Header Section --> */}
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                    {/* <!-- Order ID --> */}
                    <div className="flex items-center text-gray-700 mb-2 sm:mb-0">
                      <span className="text-xs text-gray-500 mr-2">
                        Order ID
                      </span>
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
                        Estimated arrival: {estimateArrival(order.createdAt, 4)}
                      </span>
                      {/* <!-- Red status dot --> */}
                      {order.isDelivered ? (
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                          <span className="text-sm font-medium text-green-500">
                            Deliverd
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
                          <span className="text-sm font-medium text-red-500">
                            On Deliver
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* <!-- Product List Section --> */}
                <div className="p-4 space-y-2 sm:p-6 bg-gray-50/50">
                  <p className="text-xl mb-2  text-sky-900 font-bold">
                    {order.cartItems.length} item
                  </p>
                  <div className="flex items-stretch flex-wrap gap-2  ">
                    {order.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex flex-2 items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100 transition duration-150 hover:shadow-md"
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
                </div>

                {/* <!-- Card Footer Section --> */}
                <div className="flex justify-between items-center p-4 sm:p-6">
                  {/* <!-- Total --> */}
                  <div className="text-base text-gray-900">
                    <p className="font-bold">
                      Payment Type :
                      <span className="text-md text-gray-500 ml-1">
                        {order.paymentMethodType}
                      </span>
                    </p>
                    <p className="font-bold">
                      Total:
                      <span className="text-md text-sky-800 ml-1">
                        {order.totalOrderPrice} EGP
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
