"use client";
import NoProducts from "@/components/layout/Common/NoProducts/NoProducts";
import ProductsCard from "@/components/layout/Common/Card/ProductsCard";
import ProductsCardSkeleton from "@/components/layout/Common/CardSkeleton/ProductsCardSkeleton";
import { useWishlist } from "@/hooks/useWishlist";
export default function WishlistProductsSection() {
  const { products, numOfFav, isLoading, error } = useWishlist();
  return (
    <div className="bg-white flex flex-col gap-4 rounded-xl shadow-lg w-[90%] p-6 md:p-8 ">
      <h3
        className="text-lg md:text-2xl
                font-bold capitalize
                text-transparent
                bg-clip-text
                bg-linear-to-b
                from-sky-800
                to-sky-900"
      >
        Shopping Favourite ({numOfFav} items)
      </h3>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductsCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <NoProducts text={error} />
      ) : products.length === 0 ? (
        <NoProducts text="No products available, add some to your wishlist" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-4">
          {products.map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
