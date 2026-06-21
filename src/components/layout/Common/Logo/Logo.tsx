import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-white text-2xl md:text-3xl"
    >
      <Image src='/logo.png' width={25} height={25} alt="logo"/>
      <span className="self-center  font-semibold whitespace-nowrap ">
        Fresh Cart
      </span>
    </Link>
  );
}
