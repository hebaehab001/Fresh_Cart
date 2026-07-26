import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@/types/categories.type";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesCard({ category }: { category: Category }) {
  return (
    <Card
      key={category._id}
      className="relative mx-auto w-full max-w-sm p-0 gap-3 hover:border-sky-900 hover:-translate-y-1 cursor-pointer"
    >
      <Link href={`/categories/${category._id}`}>
        <div className="absolute inset-0 z-30 aspect-video " />
        <Image
          className="rounded-t-xl h-70 relative z-20 aspect-video w-full object-cover"
          src={category.image}
          alt="category image"
          width={200}
          height={220}
          unoptimized
          loading="lazy"
        />
        <CardHeader className="gap-0 py-3">
          <CardTitle className="text-md  line-clamp-2 text-center font-semibold tracking-tight text-gray-900 ">
            {category.name}
          </CardTitle>
        </CardHeader>
      </Link>
    </Card>
  );
}
