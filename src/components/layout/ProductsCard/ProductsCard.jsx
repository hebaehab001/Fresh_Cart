"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import AddBtnCart from "../AddBtnCart/AddBtnCart";
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa6";
import AddBtnFav from "../AddBtnFav/AddBtnFav";
export default function ProductsCard({ product }) {
  return (
    <div className="w-full relative max-w-sm hover:scale-[1.01] bg-white border border-gray-200 rounded-lg shadow-sm hover:border-sky-900">
      <Image
        className=" rounded-t-lg h-[150px] object-cover  "
        src={product.imageCover}
        alt="product image"
        width={200}
        height={150}
      ></Image>
      <AddBtnFav id={product.id} productdetails={false} />

      <div className="px-5 pb-5 pt-3">
        <h5 className="text-xl line-clamp-1 font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.title}
        </h5>
        <div className="flex items-center mt-2 mb-4">
          <span className="bg-yellow-100 text-black flex items-center text-sm font-medium px-3 py-1 rounded-xl shadow-md">
            <span className="mr-1.5 ">{product.ratingsAverage}</span>
            <FaStar className="w-4 h-4 text-yellow-400" />
          </span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {product.price} EGP
          </span>
          <AddBtnCart id={product.id} productdetails={false} />
        </div>
        <Link href={`/products/${product._id}`}>
          <Button
            type="submit"
            className="w-full border bg-white border-sky-900 text-sky-900 py-3 rounded-md hover:bg-sky-800 hover:text-white transition duration-150 font-semibold shadow-md"
          >
            See Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
