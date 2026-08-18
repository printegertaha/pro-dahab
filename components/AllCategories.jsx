import SkeletonProductCard from "@/skeltons/SkeltonProductCard";
import { Suspense } from "react";
import CategoryRow from "./CategoryRow";

export default function AllCategories({ categoriesData }) {
  const { data: categories, error } = categoriesData;

  if (error) {
    console.log(error);

    return <div>err: {JSON.stringify(err)}</div>; // رجّع نص الـ Error عشان تشوفه
  }

  if (!categories || categories.length < 1) {
    return <div>مفيش تصنيفات تتعرض</div>;
  }

  return (
    <div className=" p-5 rounded-2xl w-full">
      {categories.map((c) => (
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
