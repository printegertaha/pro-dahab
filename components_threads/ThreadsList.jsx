// components/ProductList.tsx
"use client";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";

export default function ProductList() {
  // مراقب الـ Intersection
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteProducts();

  // أول ما المنتج رقم 15 يلمس الشاشة -> هات الصفحة الجاية فورا في الخلفية
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // التعامل مع حالة التحميل الأولى
  if (status === "pending") {
    return <div className="p-4 text-center">جاري تحميل أول دفعة...</div>;
  }

  // التعامل مع الأخطاء
  if (status === "error") {
    return <div className="p-4 text-red-500">حدث خطأ: {error.message}</div>;
  }

  console.log(data);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.pages?.map((page, pageIndex) =>
          page?.data?.map((product, productIndex) => {
            // التريكة: بنعلم المنتج الـ 15 (أو آخر منتج موجود لو الدفعة أقل من 15)
            const isTargetProduct =
              productIndex === 14 || productIndex === page.data.length - 1;

            return (
              <div
                key={product._id || product.id || productIndex}
                ref={isTargetProduct ? ref : null}
                className="p-4 border rounded my-2"
              >
                <h3>{product.title}</h3>
              </div>
            );
          }),
        )}
      </div>

      {/* مؤشر التحميل في الأسفل عند البطء */}
      {isFetchingNextPage && (
        <div className="p-4 text-center text-blue-600">
          جاري تحضير باقي المنتجات...
        </div>
      )}
    </div>
  );
}
