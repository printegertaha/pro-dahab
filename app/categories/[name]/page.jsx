import CategoryProductsContent from "@/components_shop/CategoryProductsContent";
import CategoryProductsSkeleton from "@/skeltons/CategoryProductsSkeleton";
import { Suspense } from "react";

export default async function CategoryProducts({ params, searchParams }) {
  return (
    <>
      <Suspense fallback={<CategoryProductsSkeleton count={8} />}>
        <CategoryProductsContent
          paramsProps={params}
          searchParamsProps={searchParams}
        />
      </Suspense>
    </>
  );
}
