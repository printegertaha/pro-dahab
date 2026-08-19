import Image from "next/image";

export default function ProductCard({ thumbnail, title, price }) {
  return (
    <div className="bg-white shrink-0 rounded-2xl shadow-md overflow-hidden border transition-all hover:shadow-lg w-72 max-[425px]:w-[68vw]">
      {/* الصورة المصغرة */}
      <div className="relative w-full h-48 max-[425px]:h-[42vw]">
        <Image
          src={
            thumbnail ||
            "https://imgs.search.brave.com/xmLdmtGA_sX0i46j7xSuQLy41MFAvKpSRXjYfkeqoXg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS12/ZWN0b3Ivbm8taW1h/Z2UtcGljdHVyZS1h/dmFpbGFibGUtb24t/NjAwbnctMjQ1MDg5/MTA0OS5qcGc"
          }
          alt={title || "صورة المنتج"}
          className="w-full h-full object-cover bg-gray-200"
          fill
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          sizes="(max-width: 425px) 68vw, 288px"
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-4 max-[425px]:p-3 space-y-3 max-[425px]:space-y-1.5">
        {/* العنوان */}
        <h3
          className="text-base max-[425px]:text-sm font-medium text-gray-800 truncate leading-snug"
          title={title}
        >
          {title}
        </h3>

        {/* السعر */}
        <div className="flex items-center gap-1">
          <span className="text-xl max-[425px]:text-lg font-semibold text-black">
            {price}
          </span>
          <span className="text-gray-800 text-xl max-[425px]:text-base">
            ج.م
          </span>
        </div>
      </div>
    </div>
  );
}