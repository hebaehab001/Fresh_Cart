import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[90vh] w-full flex flex-col gap-4  items-center">
      <Image src="/notFound.png" width={400} height={300} alt="notFound" />
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-stone-800">Page Not Found</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>
        <Link href="/">
          <Button className="py-6 cursor-pointer px-8 bg-linear-to-b from-sky-800 to-sky-950 rounded-xl text-lg hover:shadow-lg transition-all">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
