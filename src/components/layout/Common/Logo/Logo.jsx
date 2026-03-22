import React from "react";
import Link from "next/link";
import { RiShoppingBag4Fill } from "react-icons/ri";
export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-white text-xl md:text-3xl"
    >
      <RiShoppingBag4Fill className="m-0" />
      <span className="self-center  font-semibold whitespace-nowrap ">
        E-commerce
      </span>
    </Link>
  );
}
