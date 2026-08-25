import getCategories from "@/actions_shop/getCategories";
import CategoriesCacheHandler from "@/components_shop/CategoriesCacheHandler";
import Navbar from "@/components_shop/Navbar";

export default async function shop_layout_page({ children }) {
  const { data: categories } = await getCategories();
  console.log('shop_layout_page rendered>>>>>> ')
  return (
    <>
      <Navbar />
      {/* <CategoriesCacheHandler categories_server={categories} /> */}
      {children}
    </>
  );
}
