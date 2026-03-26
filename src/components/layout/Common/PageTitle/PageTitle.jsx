import React from 'react'

export default function PageTitle({title}) {
  return (
    <div className="bg-white rounded-xl shadow-lg w-[90%]  p-4 md:p-6 ">
      <h1 className="text-3xl md:text-5xl py-2 text-center capitalize font-extrabold text-transparent bg-clip-text bg-linear-to-b from-sky-700 to-stone-800">
        {title}
      </h1>
    </div>
  );
}
