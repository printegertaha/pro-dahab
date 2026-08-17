import getCategories_with_someProducts from "@/actions/getCategories_with_someProducts";
import AllCategories from "@/components/AllCategories";
import HeroSection from '@/components/HeroSection'
import { Suspense } from "react";

export default async function Home() {
  const categories = await getCategories_with_someProducts();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <HeroSection />

      <Suspense fallback={<div>loading</div>}>
        <AllCategories categoriesData={categories} />
      </Suspense>
    </div>
  );
}
