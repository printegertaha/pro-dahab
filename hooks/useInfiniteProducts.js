import { useInfiniteQuery } from "@tanstack/react-query";

// 2. دالة الـ Fetch
const fetchProducts = async ({ pageParam = 1 }) => {
  const res = await fetch(`/api/threads?page=${pageParam}&limit=20`);
  if (!res.ok) {
    throw new Error("فشل جلب التغريدات من السيرفر");
  }
  return res.json();
};

// 3. الـ Hook الأساسي
export function useInfiniteProducts() {
  return useInfiniteQuery({
    queryKey: ["threads"],
    queryFn: fetchProducts,
    initialPageParam: 1, // البداية من الصفحة الأولى

    // التريكة: تحديد رقم الصفحة التالية بناءً على استجابة السيرفر
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
  });
}
