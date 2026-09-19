export default function SkeletonProductCard() {
  return (
    <div className="bg-white shrink-0 rounded-2xl shadow-md overflow-hidden border border-gray-100 w-72 max-[425px]:w-[68vw] animate-pulse">
      {/* الصورة المصغرة */}
      <div className="relative w-full h-48 max-[425px]:h-[42vw] bg-gray-200" />

      {/* تفاصيل المنتج */}
      <div className="p-4 max-[425px]:p-3 space-y-3 max-[425px]:space-y-1.5">
        {/* العنوان */}
        <div className="h-5 max-[425px]:h-4 w-3/4 bg-gray-200 rounded-md" />

        {/* السعر */}
        <div className="flex items-center gap-1">
          <div className="h-6 max-[425px]:h-5 w-16 bg-gray-200 rounded-md" />
          <div className="h-6 max-[425px]:h-5 w-7 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}
