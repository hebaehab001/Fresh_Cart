import PageTitle from "@/components/layout/Common/PageTitle/PageTitle";
import WishlistProductsSection from "@/components/layout/Wishlist/WishlistProductsSection";

export default function wishlist() {
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col gap-3 items-center w-full">
      <PageTitle title="Wishlist" />
      <WishlistProductsSection/>
    </section>
  );
}
