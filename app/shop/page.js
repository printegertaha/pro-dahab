import getCategories_with_someProducts from "@/actions_shop/getCategories_with_someProducts";
import AllCategories from "@/components_shop/AllCategories";
import ShopHero from "@/components_shop/HeroSection";

export default async function Shop_home_page() {
  const categories = await getCategories_with_someProducts();
  return (
    <>
      <ShopHero />
      <AllCategories categories_props={categories} />
    </>
  );
}
