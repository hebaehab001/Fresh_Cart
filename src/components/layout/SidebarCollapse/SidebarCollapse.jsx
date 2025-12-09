"use client";
import React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
export default function SidebarCollapse({data,title}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex  flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 ">
        <h4 className="text-sm font-semibold">
          {title}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
      {
        data&& data.data.map((item)=>
        <div className="rounded-md border px-4 py-2 font-mono text-sm hover:border-sky-900">
          {item.name}
        </div>
        )
      }
      </CollapsibleContent>
    </Collapsible>
  );
}
