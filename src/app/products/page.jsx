import getAllBrands from "@/APIs/GetAllBrands";
import getAllCategories from "@/APIs/GetAllcategories";
import getAllProducts from "@/APIs/GetAllProducts";
import ProductsCard from "@/components/layout/ProductsCard/ProductsCard";
import SidebarCollapse from "@/components/layout/SidebarCollapse/SidebarCollapse";
import {
  SearchIcon,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
export default async function Product() {
  const { data } = await getAllProducts();
 const categories= await getAllCategories();
 const brands = await getAllBrands();
 
  if (!data || data.length === 0) {
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
    data && (
      <section className="bg-gray-100 min-h-[90vh] p-4 flex flex-col justify-center gap-3 items-center w-full">
        <div className="bg-white rounded-xl shadow-lg w-[90%]  p-6 md:p-8 ">
          <h1 className="text-5xl text-center font-extrabold text-transparent bg-clip-text bg-linear-to-b from-sky-700 to-stone-800">
            Our Products
          </h1>
        </div>
        <div className="grid grid-cols-6 w-[90%] gap-3 ">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8  col-span-1">
            <SidebarCollapse data={categories} title={"Categories"} />
            <SidebarCollapse data={brands} title={"Brands"} />
          </div>
          <div className="bg-white rounded-xl shadow-lg   p-6 md:p-8  col-span-5">
            <div className=" flex justify-between mb-6 items-center">
              <h3
                className="text-3xl
                font-bold
                text-transparent
                bg-clip-text
                bg-linear-to-b
                from-sky-800
                to-sky-900"
              >
                All Products
              </h3>
              <InputGroup className="w-[30%]">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="grid grid-cols-5 gap-5 mb-4">
              {data.map((product) => (
                <ProductsCard key={product._id} product={product} />
              ))}
            </div>
            <nav
              aria-label="Page navigation example"
              className="flex justify-center mt-5"
            >
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    )
  );
}
