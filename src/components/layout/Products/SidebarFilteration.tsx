import React from "react";
import { SidebarFilterationProps } from "@/types/categories.type";
import { Button } from "@/components/ui/button";

export default function SidebarFilteration({
  data,
  title,
  selected,
  onSelect,
}: SidebarFilterationProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold capitalize text-transparent bg-clip-text bg-linear-to-b from-sky-800 to-sky-900">
        {title}
      </h3>
      <div className="flex flex-wrap lg:flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelect(null)}
          className={`${!selected ? "border-sky-800 bg-sky-50 text-sky-900" : "hover:border-sky-900"} `}
        >
          All
        </Button>
        {data?.map((item) => {
          const isActive = selected === item.name;
          return (
            <Button
              variant="outline"
              size="sm"
              key={item._id}
              onClick={() => onSelect(item.name)}
              className={`${isActive ? "border-sky-800 bg-sky-50 text-sky-900" : "hover:border-sky-900"} `}
            >
              {item.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
