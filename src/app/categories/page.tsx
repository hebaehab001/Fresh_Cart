import PageTitle from '@/components/layout/Common/PageTitle/PageTitle';
import { getAllCategories } from "@/APIs/category.api";
import CategoriesCard from "@/components/layout/Common/Card/CategoriesCard";
export default async function Categories() {
    const categories = await getAllCategories();
  return (
    categories && (
      <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
        <PageTitle title="Shop By Categories" />
        <div className="bg-white rounded-xl shadow-lg w-[90%]  p-6 md:p-8 ">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-4">
            {categories.data.map((item, index) => (
              <CategoriesCard category={item} priority={index < 2} key={item._id} />
            ))}
          </div>
        </div>
      </section>
    )
  );
}
