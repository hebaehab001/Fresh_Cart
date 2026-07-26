import ProductsCard from "@/components/layout/Common/Card/ProductsCard";
import { getAllProducts } from "@/APIs/product.api";
import { getAllCategories } from "@/APIs/category.api";
import HeroSection from "@/components/layout/Home/HeroSection";
import CarouselSection from "@/components/layout/Home/CarouselSection";
import CategoriesCard from "@/components/layout/Common/Card/CategoriesCard";

export default async function Home() {
  const [{ data: products }, { data: categories }] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <div className="min-h-[90vh] py-4 w-[90%] mx-auto flex flex-col gap-5 items-center">
      <HeroSection />
      <CarouselSection
        title="Categories"
        items={categories}
        loop
        getKey={(item) => item._id}
        renderItem={(item) => <CategoriesCard category={item} />}
      />
      <CarouselSection
        title="Trending Now"
        items={products.slice(0, 10)}
        getKey={(product) => product._id}
        renderItem={(product) => <ProductsCard product={product} />}
      />
    </div>
  );
}
