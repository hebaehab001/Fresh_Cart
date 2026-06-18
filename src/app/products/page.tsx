import getAllCategories from "@/APIs/Category/getAllcategories";
import getAllProducts from "@/APIs/Product/getAllProducts";
import PageTitle from "@/components/layout/Common/PageTitle/PageTitle";
import ProductSection from "@/components/layout/Products/ProductSection";

export default async function Product() {
  const [{ data: products }, { data: categories }] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
      <section className="min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
        <PageTitle title="Our Products" />
        <ProductSection products={products} categories={categories} />
      </section>
  );
}
