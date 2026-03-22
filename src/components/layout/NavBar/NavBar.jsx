"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../../ui/badge";
import { cartContext } from "@/Context/CartContextProvider";
import { favContext } from "@/Context/FavContextProvider";
import { IoMenu, IoClose } from "react-icons/io5";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Logo from "../Common/Logo/Logo";
import { MdLogout } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { LuPackageCheck } from "react-icons/lu";
import { MdOutlineAccountCircle } from "react-icons/md";
const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/brands", label: "Brands" },
  { href: "/categories", label: "Categories" },
];
export default function NavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { numOfCart } = useContext(cartContext);
  const { numOfFav } = useContext(favContext);
  async function handleSignOut() {
    await signOut({ callbackUrl: "/login" });
  }
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed z-40 w-[90%] left-[5%] mx-auto top-2 rounded-2xl bg-linear-to-b from-sky-800 to-sky-950 text-white">
      <div className="px-8 py-3 h-[10vh]">
        {/* small screen */}
        <div className="flex justify-between h-full items-center lg:hidden">
          <Drawer direction={"left"} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <IoMenu className="text-2xl md:text-4xl m-0 cursor-pointer" />
            </DrawerTrigger>
            <DrawerContent className="bg-linear-to-b from-sky-800 to-sky-950 text-white data-[vaul-drawer-direction=left]:border-0 rounded-r-2xl data-[vaul-drawer-direction=left]:max-w-2/4 data-[vaul-drawer-direction=left]:md:max-w-2/6">
              <DrawerHeader className="text-left flex-row items-center justify-between">
                <DrawerTitle>
                  <Logo />
                </DrawerTitle>
                <DrawerClose asChild>
                  <IoClose className="text-xl md:text-2xl m-0 cursor-pointer" />
                </DrawerClose>
              </DrawerHeader>
              <ul className="flex flex-col gap-10 md:gap-14  justify-center h-full p-4 text-center">
                {links.map((link, index) => (
                  <li
                    key={index}
                    className={
                      pathname == link.href
                        ? `center-fill px-10 py-3 font-semibold text-white text-lg md:text-2xl cursor-pointer`
                        : "center-fill-hover px-10 py-3 font-semibold text-white text-lg md:text-2xl cursor-pointer"
                    }
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
              <DrawerFooter className="pt-2">
                {status == "authenticated" ? (
                  <span className="gap-2 flex flex-col">
                    <Link href="/favourite">
                      <Button
                        variant="outline"
                        className="rounded-full w-full hover:bg-white group/hoverh hover:cursor-pointer relative"
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
                        <span className="text-red-700 group-hover/hoverh:text-red-600">
                          Favourite
                        </span>
                        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-1 border-none bg-white bg-linear-to-b from-sky-800/40 to-sky-950/30 text-white">
                          {numOfFav}
                        </Badge>
                      </Button>
                    </Link>
                    <Link href="/cart">
                      <Button
                        variant="outline"
                        className="rounded-full w-full hover:bg-white group/hoverc hover:cursor-pointer relative"
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
                        <span className="text-sky-900 group-hover/hoverc:text-sky-700">
                          {" "}
                          Cart{" "}
                        </span>
                        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-1 border-none bg-white bg-linear-to-b from-sky-800/40 to-sky-950/30 text-white">
                          {numOfCart}
                        </Badge>
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="size-9 w-full ">
                          <AvatarFallback className="group/hoverp hover:cursor-pointer gap-2">
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
                            <span className="text-sky-900 group-hover/hoverp:text-sky-700">
                              {session.user.name || "User"}
                            </span>
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-auto bg-white  border-0 shadow-2xl  "
                        align="end"
                        side="right"
                      >
                        <DropdownMenuGroup>
                          <DropdownMenuItem className="p-2 m-0 w-full flex text-gray-800 hover:bg-white  items-center">
                            <MdOutlineAccountCircle className="text-gray-800" />
                            <div className="flex flex-col">
                              <span>{session.user.name || "User"}</span>
                              <span>{session.user.email || "Email"}</span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-[#A8BBA3] " />
                          <Link href="/allorders">
                            <DropdownMenuItem className="p-2 m-0 w-full justify-start hover:bg-gray-100 cursor-pointer">
                              <LuPackageCheck className="text-sky-900" />
                              <span className="text-sky-900 hover:text-sky-900">
                                Completed Orders
                              </span>
                            </DropdownMenuItem>
                          </Link>
                          <Link href="/profile">
                            <DropdownMenuItem className="p-2 m-0 w-full  justify-start hover:bg-gray-100 cursor-pointer">
                              <MdOutlineManageAccounts className="text-sky-900" />
                              <span className="text-sky-900 hover:text-sky-900">
                                Profile
                              </span>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator className="bg-[#A8BBA3] " />
                          <button
                            className="p-0 cursor-pointer w-full"
                            onClick={handleSignOut}
                          >
                            <DropdownMenuItem className="m-0  p-2 w-full  justify-start hover:bg-gray-100 cursor-pointer">
                              <MdLogout className="text-red-700" />
                              <span className="text-red-700 hover:text-red-700">
                                Log out
                              </span>
                            </DropdownMenuItem>
                          </button>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </span>
                ) : (
                  <span className="gap-2 flex flex-col">
                    <Link href="/register">
                      <Button
                        variant="outline"
                        className="bg-transparent text-white  w-full  cursor-pointer hover:text-sky-900  md:text-lg md:py-5 "
                      >
                        register
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full text-sky-900 cursor-pointer md:text-lg md:py-5 hover:bg-transparent hover:text-white"
                      >
                        login
                      </Button>
                    </Link>
                  </span>
                )}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <Logo />
          <Link href={status == "authenticated" ? "/profile" : "/login"}>
            <Avatar className="size-10 ">
              <AvatarFallback className="group/hoverp bg-transparent hover:bg-white hover:cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user-round-icon lucide-user-round w-5 h-5 md:w-6 md:h-6 text-white group-hover/hoverp:text-sky-900"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
        {/* large screen */}
        <div className="hidden lg:flex justify-between h-full items-center w-full">
          {/* left side */}
          <Logo />
          {/*list middle side */}
          <ul className="flex gap-6 p-4">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={
                    pathname == link.href
                      ? `center-fill px-4 py-2 font-semibold text-white text-xl `
                      : "center-fill-hover px-4 py-2 font-semibold text-white text-xl"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* right side */}
          {status == "authenticated" ? (
            <span className="gap-2 flex">
              <Link href="/favourite">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-white group/hoverh hover:cursor-pointer relative"
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
                  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-1 border-none bg-white bg-linear-to-b from-sky-800/40 to-sky-950/30 text-white">
                    {numOfFav}
                  </Badge>
                </Button>
              </Link>
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
                  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-1 border-none bg-white bg-linear-to-b from-sky-800/40 to-sky-950/30 text-white">
                    {numOfCart}
                  </Badge>
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
                    <DropdownMenuItem className="p-2 m-0 w-full flex text-gray-800 hover:bg-white  items-center">
                      <MdOutlineAccountCircle className="text-gray-800" />
                      <div className="flex flex-col">
                        <span>{session.user.name || "User"}</span>
                        <span>{session.user.email || "Email"}</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#A8BBA3] " />
                    <Link href="/allorders">
                      <DropdownMenuItem className="p-2 m-0 w-full justify-start hover:bg-gray-100 cursor-pointer">
                        <LuPackageCheck className="text-sky-900" />
                        <span className="text-sky-900 hover:text-sky-900">
                          Completed Orders
                        </span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/profile">
                      <DropdownMenuItem className="p-2 m-0 w-full  justify-start hover:bg-gray-100 cursor-pointer">
                        <MdOutlineManageAccounts className="text-sky-900" />
                        <span className="text-sky-900 hover:text-sky-900">
                          Profile
                        </span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator className="bg-[#A8BBA3] " />
                    <button
                      className="p-0 cursor-pointer w-full"
                      onClick={handleSignOut}
                    >
                      <DropdownMenuItem className="m-0  p-2 w-full  justify-start hover:bg-gray-100 cursor-pointer">
                        <MdLogout className="text-red-700" />
                        <span className="text-red-700 hover:text-red-700">
                          Log out
                        </span>
                      </DropdownMenuItem>
                    </button>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          ) : (
            <span className="gap-2 flex">
              <Link href="/register">
                <Button
                  variant="outline"
                  className="bg-transparent text-white  w-full border-0 cursor-pointer hover:text-sky-900  md:text-lg md:py-5 "
                >
                  register
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="w-full text-sky-900 cursor-pointer md:text-lg md:py-5 hover:bg-transparent hover:text-white"
                >
                  login
                </Button>
              </Link>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
