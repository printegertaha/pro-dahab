import getCategories from "@/actions_shop/getCategories";
import CategoriesCacheHandler from "@/components_shop/CategoriesCacheHandler";
import CategoriesContent from "@/components_shop/CategoriesContent";
import SkeletonCategoryCard from "@/skeltons/SkeletonCategoryCard";
import { Suspense } from "react";

// دالة اختيار الأيقونة بناءً على التصنيفات الفعلية

export default async function Shop_categories_page() {
  const { data: categories } = await getCategories();
  return (
    <main className="relative min-h-screen bg-zinc-950 pt-6 pb-12 lg:pt-8 lg:pb-20 px-4 sm:px-6 lg:px-8 dir-rtl overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* الهيدر في أول الصفحة */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
          جميع التصنيفات
        </h1>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 9 }).map((_, idx) => (
                <SkeletonCategoryCard key={idx} />
              ))}
            </div>
          }
        >
          <CategoriesContent categoriesProps={categories} />
          <CategoriesCacheHandler categories_server={categories} />
        </Suspense>
      </div>
    </main>
  );
}
