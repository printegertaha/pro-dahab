import SkeletonCategoryCard from "@/skeltons/SkeletonCategoryCard";

export default function CategoriesLoading() {
  return (
    <main className="relative min-h-screen bg-zinc-950 pt-6 pb-12 lg:pt-8 lg:pb-20 px-4 sm:px-6 lg:px-8 dir-rtl overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* عنوان الصفحة أثناء التحميل */}
        <div className="h-9 sm:h-10 w-44 bg-zinc-800/80 rounded-xl animate-pulse" />

        {/* شبكة كروت السكيلتون */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <SkeletonCategoryCard key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
