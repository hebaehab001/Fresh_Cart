"use client";
import React, { useContext } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../../ui/badge";
import { cartContext } from "@/Context/CartContextProvider";
const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/allorders", label: "Brands" },
  { href: "/allorders", label: "Categories" },
];
export default function NavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { numOfCart } = useContext(cartContext);
  function handleSignOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className="sticky h-[10vh] left-0 top-0 w-full z-40 bg-linear-to-b from-sky-800 to-sky-950 text-white flex justify-between items-center px-8 py-3 lg:px-8 ">
      <Link
        href="/"
        className="flex items-center space-x-2 rtl:space-x-reverse"
      >
        <RiShoppingBag4Fill className="text-3xl m-0" />
        <span className="self-center text-3xl font-semibold whitespace-nowrap ">
          E-commerce
        </span>
      </Link>
      <div>
        <ul className="flex gap-6 p-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname == link.href?
                      `center-fill px-4 py-2 font-semibold text-white text-xl `
                    : "center-fill-hover px-4 py-2 font-semibold text-white text-xl"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {status == "authenticated" ? (
        <span className="gap-2 flex">
          <Link href="/cart">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-white group/hoverc hover:cursor-pointer relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-sky-900 group-hover/hoverc:text-sky-700 lucide lucide-shopping-cart-icon lucide-shopping-cart"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-1.5 -right-1 ">
                {numOfCart}
              </Badge>
            </Button>
          </Link>
          <Link href="/Favbook">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-white group/hoverh hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-red-700 group-hover/hoverh:text-red-600 lucide lucide-heart-icon lucide-heart"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-9 ">
                <AvatarFallback className="group/hoverp hover:cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user-round-icon lucide-user-round w-5  h-5 text-sky-900 group-hover/hoverp:text-sky-700"
                  >
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 0 0-16 0" />
                  </svg>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-auto bg-white mt-1 border-0 shadow-2xl me-10 "
              align="start"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className="p-2 m-0 w-full text-black  flex-col items-start hover:bg-white">
                  <p>{session.user.name || "User"}</p>
                  <p>{session.user.email || "Email"}</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 m-0 w-full text-black justify-start hover:bg-white">
                  <Link href='/allorders'>
                  <span>Completed Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#A8BBA3] " />
                <DropdownMenuItem className="m-0 p-0 px-2 w-full text-black justify-start hover:bg-white">
                  <button className="p-0" onClick={handleSignOut}>
                    Log out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      ) : (
        <span className="gap-2 flex">
          <Link href="/register">
            <Button className="bg-transparent text-white border-white">
              register
            </Button>
          </Link>
          <Link href="/login">
            <Button>login</Button>
          </Link>
        </span>
      )}
    </nav>
  );
}
