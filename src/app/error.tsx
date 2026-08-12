"use client";

import { Button} from "@/components/ui/button";
import { useEffect } from "react";
import { MdOutlineWifiTetheringError } from "react-icons/md";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2 bg-gray-100">
      <MdOutlineWifiTetheringError className="size-20 text-sky-900" />
      <h2 className="text-3xl md:text-4xl py-2 text-center capitalize font-extrabold text-transparent bg-clip-text bg-linear-to-b from-sky-800 from-40% to-stone-800">
        Something went wrong
      </h2>
      <p className="text-muted-foreground text-center max-w-md">
        We hit an unexpected error. Please try again, or head back home.
      </p>
      <Button
        onClick={() => reset()}
        variant="primary"
        size="lg"
        className="w-full md:w-auto"
      >
        Try again
      </Button>
    </div>
  );
}
