import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PageTitle from "@/components/layout/Common/PageTitle/PageTitle";
export default function loading() {
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
      <PageTitle title="Our Products" />
      <div className="grid grid-cols-12 w-[90%] gap-3 ">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col gap-2 col-span-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="bg-white rounded-xl shadow-lg   p-6 md:p-8  col-span-10">
          <div className=" flex justify-between mb-6 items-center">
            <Skeleton className="h-4 w-[25%]" />
            <Skeleton className="h-4 w-[30%]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="col-span-1 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-50 w-full rounded-xl" />
                  <div className="space-y-4 p-5 py-8">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[30%]" />
                    <Skeleton className="h-4 w-[40%]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
