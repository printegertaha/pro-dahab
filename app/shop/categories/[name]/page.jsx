import CategoryProductsContent from "@/components_shop/CategoryProductsContent";
import SkeletonProductCard from "@/skeltons/SkeltonProductCard";
import { Suspense } from "react";

export default function CategoryProducts({ params, searchParams }) {
  return (
    <>
      <h3>صفحة مننتجات تصنيف دي خد بالك</h3>
      <Suspense
        fallback={
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 10 }).map((_, idx) => (
              <SkeletonProductCard key={idx} />
            ))}
          </div>
        }
      >
        <CategoryProductsContent params={params} searchParams={searchParams} />
      </Suspense>
    </>
  );
}
