import Link from "next/link";
import Image from "next/image";
import AddBtnCart from "../../Buttons/CartBtn";
import AddBtnFav from "../../Buttons/WishlistBtn";
import { Product } from "@/types/product.type";
import { Card } from "@/components/ui/card";
import StarRating from "../../reviews/StarRating";

export default function ProductsCard({ product, priority = false }: { product: Product, priority?: boolean  }) {
  return (
    <Card
      className="relative mx-auto w-full max-w-sm p-0 gap-2 hover:border-sky-900 hover:-translate-y-1 cursor-pointer"
    >
      <AddBtnFav id={product.id} productdetails={false} />
      <Link href={`/products/${product._id}`}>
        <Image
          className=" md:rounded-t-xl w-[70%] mx-auto md:w-full h-50  object-center  lg:object-cover"
          src={product.imageCover}
          alt={product.title}
          loading={priority ? "eager" : "lazy"}
          width={200}
          height={216}
        />
        <div className="px-3 pt-3 flex flex-col gap-1">
          <h5 className="text-xl md:text-lg line-clamp-1  font-semibold tracking-tight text-gray-900">
            {product.title}
          </h5>
          <div className="flex items-center ">
            <StarRating
              rating={product.ratingsAverage}
              iconClass="w-4 h-4"
              maxStars={5}
            />
            <span className="ml-1.5 text-gray-500  font-semibold">
              ({product.ratingsAverage})
            </span>
          </div>
            <span className="text-xl font-bold text-sky-900 ">
              {product.price} EGP
            </span>
        </div>
      </Link>
      <div className="flex items-center justify-center pb-3 px-3">
            <AddBtnCart id={product.id} productdetails={false} />
          </div>
    </Card>
  );
}
