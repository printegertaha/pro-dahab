import SkeletonProductCard from "@/skeltons/SkeltonProductCard";

export default function CategoryProductsSkeleton({ count = 8 }) {
  return (
    <div>
      {/* عنوان التصنيف */}
      <div className="px-[5%] py-2">
        <div className="h-9 w-48 max-[425px]:w-36 bg-gray-200 rounded-xl animate-pulse" />
      </div>

      {/* توزيعة شبكة كروت المنتجات */}
      <div className="flex gap-5 flex-wrap justify-center">
        {Array.from({ length: count }).map((_, idx) => (
          <SkeletonProductCard key={idx} />
        ))}
      </div>

      {/* شريط الترقيم (Pagination Bar Skeleton) */}
      <div className="flex items-center justify-center gap-2 py-8 select-none">
        <div className="h-9 w-16 bg-zinc-800/20 rounded-xl animate-pulse" />
        <div className="h-9 w-9 bg-zinc-800/20 rounded-xl animate-pulse" />
        <div className="h-9 w-9 bg-zinc-800/20 rounded-xl animate-pulse" />
        <div className="h-9 w-9 bg-zinc-800/20 rounded-xl animate-pulse" />
        <div className="h-9 w-16 bg-zinc-800/20 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
