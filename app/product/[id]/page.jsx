import ProductDetailsContent from "@/components_shop/ProductDetailsContent";
import ProductDetailsClient from "@/components_shop/ProductDetailsClient";
import { Suspense } from "react";

export default async function ProductDetailsPage({ params }) {
  return (
    <>
      {/* Toast client component wrapped in its own Suspense because useSearchParams triggers dynamic rendering */}
      <Suspense fallback={null}>
        <ProductDetailsClient />
      </Suspense>

      <Suspense
        fallback={
          <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8 animate-pulse">
            <div className="h-4 w-28 bg-zinc-800 rounded" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-96 h-72 md:h-96 rounded-2xl bg-zinc-800" />
              <div className="flex-1 space-y-4">
                <div className="h-8 w-3/4 bg-zinc-800 rounded" />
                <div className="h-10 w-32 bg-zinc-800 rounded" />
                <div className="h-6 w-20 bg-zinc-800 rounded-full" />
                <div className="space-y-2 pt-4 border-t border-zinc-800">
                  <div className="h-5 w-16 bg-zinc-800 rounded" />
                  <div className="h-4 w-full bg-zinc-800 rounded" />
                  <div className="h-4 w-5/6 bg-zinc-800 rounded" />
                  <div className="h-4 w-4/6 bg-zinc-800 rounded" />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ProductDetailsContent paramsProps={params} />
      </Suspense>
    </>
  );
}
