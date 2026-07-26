import CartProductsSection from "@/components/layout/cart/CartProductsSection";
import PageTitle from "@/components/layout/Common/PageTitle/PageTitle";
export default function Cart() {
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col  gap-3 items-center w-full">
      <PageTitle title="Cart" />
      <CartProductsSection/>
    </section>
  );
}