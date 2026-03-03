import getAllBrands from "@/APIs/GetAllBrands";
import getAllCategories from "@/APIs/GetAllcategories";
import getAllProducts from "@/APIs/GetAllProducts";
import PageTitle from "@/components/layout/Common/PageTitle/PageTitle";
import ProductSection from "@/components/layout/Products/ProductSection";
export default async function Product() {
  const [{ data: products }, { data: categories }, { data: brands }] =
    await Promise.all([getAllProducts(), getAllCategories(), getAllBrands()]);

  if (!products || products.length === 0) {
    return (
      <section className="bg-gray-100 min-h-[90vh] p-4 flex justify-center w-full">
        <div className="bg-white rounded-xl shadow-lg w-[40%]  p-6 md:p-8 mt-10">
          <h1 className="text-2xl text-gray-500">
            No products found. Please check back later!
          </h1>
        </div>
      </section>
    );
  }

  return (
    products && (
      <section className="bg-gray-100 min-h-[90vh] p-4 flex flex-col justify-center gap-3 items-center w-full">
        <PageTitle title="Our Products" />
        <ProductSection
          products={products}
          categories={categories}
          brands={brands}
        />
      </section>
    )
  );
}
