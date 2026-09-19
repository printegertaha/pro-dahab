export default function SkeletonCategoryCard() {
  return (
    <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 sm:p-6 backdrop-blur-md animate-pulse">
      {/* الأيقونة والاسم */}
      <div className="flex items-center gap-4">
        {/* صندوق الأيقونة */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20" />
        </div>

        {/* نصوص العنوان وعدد المنتجات */}
        <div className="space-y-2">
          <div className="h-5 w-28 sm:w-36 bg-zinc-800 rounded-md" />
          <div className="h-3.5 w-20 bg-zinc-800/60 rounded-md" />
        </div>
      </div>

      {/* الدائرة الجانبية للسهم */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800/80 border border-zinc-700/50">
        <div className="w-4 h-4 rounded-full bg-zinc-700/60" />
      </div>
    </div>
  );
}
