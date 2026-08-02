import getCategories from "@/actions/getCategories";
import CategoryRow from "@/components/CategoryRow";
import SkeletonProductCard from "@/skeltons/SkeltonProductCard";
import { Suspense } from "react";

export default async function AllCategories() {
  const { categories, error: categoriesError } = await getCategories();
  console.log(categories);

  if (categoriesError) {
    return <div>حصل مشكله في النت عند حضرتك</div>;
  }

  if (!categories || categories.length < 1) {
    return <div>مفيش تصنيفات تتعرض</div>;
  }

  return (
    <div className="border p-5 rounded-2xl w-full">
      {categories.map((c) => (
        // بنغلف كل صف بـ Suspense لوحده عشان الـ Streaming يشتغل باحترافية
        <Suspense
          key={c.id}
          fallback={
            <div className="flex items-center flex-wrap gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonProductCard key={idx} />
              ))}
            </div>
          }
        >
          <CategoryRow category={c} />
        </Suspense>
      ))}
    </div>
  );
}
