"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { FiEdit } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProfileTab from "./EditProfileTab";
import AdressesTab from "./AdressesTab";
import EditPasswordTab from "./EditPasswordTab";
const tabs = [
  {
    name: "Edit Profile",
    value: "EditProfile",
    icon: FiEdit,
  },
  {
    name: "Addresses",
    value: "Addresses",
    icon: GrMapLocation,
  },
  {
    name: "Password & Security",
    value: "Password & Security",
    icon: MdOutlinePassword,
  },
];
export default function ProfileSection() {
  const { data: session } = useSession();

  return (
    <Tabs
      defaultValue={tabs[0].value}
      className="grid grid-cols-12 w-[90%] gap-3 "
    >
      <div className="bg-white rounded-xl shadow-lg  h-fit col-span-12 lg:col-span-3">
        <div className="relative w-full md:h-[40vh] h-[60vh] lg:h-[65vh] flex flex-col items-center bg-white rounded-2xl">
          <div className="h-[40%] w-full bg-linear-to-b from-sky-800 to-sky-950 rounded-t-2xl">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%">
              <rect fill="#ffffff" width={540} height={450} />
              <defs>
                <linearGradient
                  id="a"
                  gradientUnits="userSpaceOnUse"
                  x1={0}
                  x2={0}
                  y1={0}
                  y2="100%"
                  gradientTransform="rotate(222,648,379)"
                >
                  <stop offset={0} stopColor="#ffffff" />
                  <stop offset={1} stopColor="#FC726E" />
                </linearGradient>
                <pattern
                  patternUnits="userSpaceOnUse"
                  id="b"
                  width={300}
                  height={250}
                  x={0}
                  y={0}
                  viewBox="0 0 1080 900"
                >
                  <g fillOpacity="0.5">
                    
                  </g>
                </pattern>
              </defs>
              <rect x={0} y={0} fill="url(#a)" width="100%" height="100%" />
              <rect x={0} y={0} fill="url(#b)" width="100%" height="100%" />
            </svg> */}
          </div>

          <div className="absolute w-28 h-28 bg-white rounded-full flex justify-center items-center top-[40%] transform -translate-y-1/2">
            <div className="bg-linear-to-b from-sky-800 to-sky-950 px-10 py-8 rounded-full text-white text-4xl">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="px-6 md:px-8 mt-18 text-center flex flex-col items-center w-full">
            <div className=" font-bold text-2xl text-black ">
              {session?.user?.name}
            </div>
            <div className="mt-2 font-normal text-sm text-gray-600">
              {session?.user?.email}
            </div>

            <div className="mt-4 flex flex-col w-full gap-2">
              <TabsList className="lg:grid flex flex-wrap  shrink-0 lg:grid-cols-1 gap-1 bg-background lg:p-0  w-full">
                {tabs.map((tab) => (
                  <TabsTrigger
                    className="lg:justify-start justify-center shrink-0 px-3 py-1.5 data-[state=active]:bg-linear-to-b cursor-pointer from-sky-800 to-sky-950 data-[state=active]:text-primary-foreground"
                    key={tab.value}
                    value={tab.value}
                  >
                    <tab.icon className="me-2 h-5 w-5" /> {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl flex flex-col gap-4 shadow-lg p-6 md:p-8 col-span-12 lg:col-span-9">
        <EditProfileTab />
        <AdressesTab/>
        <EditPasswordTab/>
      </div>
    </Tabs>
  );
}
