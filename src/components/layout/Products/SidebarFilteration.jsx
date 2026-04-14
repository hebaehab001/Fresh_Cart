import React from "react";

export default function SidebarFilteration({
  data,
  title,
  selected,
  onSelect,
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold capitalize text-transparent bg-clip-text bg-linear-to-b from-sky-800 to-sky-900">
        {title}
      </h3>
      <div className="flex flex-wrap lg:flex-col gap-2">
        <button
          onClick={() => onSelect(null)}
          className={`rounded-md border px-2 md:px-4 py-2 text-xs md:text-sm text-left transition cursor-pointer
            ${!selected ? "border-sky-800 bg-sky-50 text-sky-900" : "hover:border-sky-900"}
          `}
        >
          All
        </button>
        {data?.map((item) => {
          const isActive = selected === item.name;
          return (
            <button
              key={item._id}
              onClick={() => onSelect(item.name)}
              className={`rounded-md border px-4 py-2 text-sm text-left transition cursor-pointer
                ${
                  isActive
                    ? "border-sky-800 bg-sky-50 text-sky-900"
                    : "hover:border-sky-900"
                }
              `}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
