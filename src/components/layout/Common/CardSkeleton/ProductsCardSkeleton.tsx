import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsCardSkeleton() {
  return (
    <Card className="col-span-1 relative mx-auto w-full max-w-sm p-0 gap-2">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-50 w-full md:rounded-t-xl" />
        <div className="p-3 flex flex-col gap-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[50%]" />
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </Card>
  );
}
