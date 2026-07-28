"use client";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { useMemo } from "react";
import { toast } from "sonner";
import { useWishlist } from "@/hooks/useWishlist";
export default function WishlistBtn({
  id,
  productdetails,
}: {
  id: string;
  productdetails: boolean;
}) {
  const { addProductToFav, products, removeFavItem } = useWishlist();
  const isInFav = useMemo(
    () =>
      products?.some((item) =>
        typeof item === "string" ? item === id : item._id === id,
      ),
    [products, id],
  );

  async function handleToggleFav() {
    const data = isInFav ? await removeFavItem(id) : await addProductToFav(id);
    if (data?.success) {
      toast.success(data.message, {
        position: "bottom-right",
        duration: 2000,
      });
    } else {
      toast.error(data.message, {
        position: "bottom-right",
        duration: 2000,
      });
    }
  }
  return (
    <Button
      onClick={handleToggleFav}
      className={`cursor-pointer absolute ${
        productdetails
          ? "top-8 right-8 bg-transparent hover:bg-transparent"
          : "top-3 right-3 bg-white/70 hover:bg-white/90"
      } z-30 rounded-full
      ${isInFav ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
      size="icon"
    >
      <span className={productdetails ? "w-8 h-8" : "w-6 h-6"}>
        <FaHeart className={productdetails ? "size-8" : "size-6"} />
      </span>
    </Button>
  );
}
