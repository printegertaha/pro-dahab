export default function SkeletonProductCard() {
  return (
    <div className="w-72 h-72 mx-auto bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 font-sans">
      {/* منطقة الصورة والعلامات المائية والشعار */}
      <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center p-4">
        {/* العلامات المائية النصية */}
        <div className="absolute inset-0 flex flex-col bg-gray-500 animate-pulse items-center justify-center pointer-events-none space-y-2"></div>
      </div>

      {/* منطقة معلومات المنتج (العنوان والسعر) */}
      <div className="p-4 bg-white flex flex-col space-y-3" dir="rtl">
        {/* عنوان المنتج */}
        <div className="w-full h-6 bg-gray-300 rounded-xl animate-pulse"></div>

        {/* السعر */}
        <div className="flex items-center justify-start gap-2">
          <span className="block bg-gray-300 w-20 h-6 animate-pulse rounded-xl "></span>
          <span className="block w-10 h-6 rounded-xl bg-gray-300 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
