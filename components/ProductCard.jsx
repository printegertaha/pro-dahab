import Image from "next/image";

export default function ({ thumbnail, title, price }) {
  return (
    <div className="bg-white shrink-0 rounded-2xl shadow-md overflow-hidden border w-72 h-72 transition-all hover:shadow-lg">
      {/* الصورة المصغرة */}
      <div className="relative w-full h-48">
        <Image
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover bg-gray-200 "
          fill
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-4 space-y-3">
        {/* العنوان */}
        <h3
          className="text-base font-medium text-gray-800 truncate leading-snug"
          title={title}
        >
          {title}
        </h3>

        {/* السعر */}
        <div className="flex items-center gap-1">
          <span className="text-xl font-semibold text-black">{price}</span>
          <span className="text-gray-800 text-xl">ج.م</span>
        </div>
      </div>
    </div>
  );
}
