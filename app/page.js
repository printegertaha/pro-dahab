import getCategories_with_someProducts from "@/actions/getCategories_with_someProducts";
import AllCategories from "@/components/AllCategories";


export default async function Home() {
  const categories = await getCategories_with_someProducts();
  console.log('---- categories from page.js ----')
  console.log(categories)
  console.log('----------------------------------')
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <AllCategories categoriesData={categories} />
    </div>
  );
}
