import React from 'react'
import { GiFluffyWing } from "react-icons/gi";

export default function PageTitle({title}) {
  return (
    <div className="bg-linear-to-b from-white/10 from-30% to-white rounded-xl shadow-b-lg w-[90%]  p-4  flex items-center gap-3 justify-center">
      <GiFluffyWing className="size-12 text-sky-900" />
      <h1 className="text-3xl md:text-4xl py-2 text-center capitalize font-extrabold text-transparent bg-clip-text bg-linear-to-b from-sky-800 from-40% to-stone-800">
        {title}
      </h1>
      <GiFluffyWing className="size-12 text-sky-900 -scale-x-100" />
    </div>
  );
}
