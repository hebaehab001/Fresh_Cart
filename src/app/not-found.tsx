import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[90vh] w-full flex flex-col gap-4  items-center">
      <Image src="/notFound.png" width={300} height={250} alt="notFound" />
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-stone-800">Page Not Found</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>
        <Link
          href="/"
          className={`${buttonVariants({ variant: "primary", size: "lg" })} w-full `}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
