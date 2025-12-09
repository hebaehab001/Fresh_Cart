import { Button } from "@/components/ui/button";
import React from "react";
import { FaHeart } from "react-icons/fa";

export default function AddBtnFav({ id, productdetails }) {
  return productdetails ? (
    <Button className="absolute top-8 right-8 bg-white/70 p-2 py-3 rounded-full  text-gray-500 hover:text-red-500 hover:bg-white/70 transition-colors duration-150">
      <span className="w-8 h-8">
        <FaHeart className=" size-8 " />
      </span>
    </Button>
  ) : (
    <Button className="absolute top-3 right-3 bg-white/70 p-2 py-3 rounded-full  text-gray-500 hover:text-red-500 hover:bg-white/70 transition-colors duration-150">
      <span className="w-6 h-6">
        <FaHeart className=" size-6 " />
      </span>
    </Button>
  );
}
