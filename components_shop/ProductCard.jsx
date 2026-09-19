"use client";

import Image from "next/image";
import { useState } from "react";

const NO_IMAGE_FALLBACK =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23fafafa'/%3E%3Cpath d='M200 150a50 50 0 100 100 50 50 0 000-100zM120 180l40-40 40 40M280 220l-40 40-40-40' stroke='%23d4d4d8' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3Ctext x='50%25' y='65%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' font-weight='500' fill='%23a1a1aa'%3ENo Image%3C/text%3E%3C/svg%3E";

export default function ProductCard({
  thumbnail,
  title,
  price,
  originalPrice,
  badge,
}) {
  const [imgSrc, setImgSrc] = useState(thumbnail || NO_IMAGE_FALLBACK);
  const [imgLoaded, setImgLoaded] = useState(false);

  const formattedPrice = Number(price || 0).toLocaleString("ar-EG");
  const formattedOriginalPrice = originalPrice
    ? Number(originalPrice).toLocaleString("ar-EG")
    : null;

  return (
    <div className="group  shrink-0 bg-white border border-zinc-100/80 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-500 flex flex-col w-72 max-[425px]:w-[68vw] h-full">
      {/* منطقة الصورة */}
      <div
        className={`relative aspect-square overflow-hidden bg-zinc-100 flex items-center justify-center p-3 ${!imgLoaded ? "animate-pulse" : ""}`}
      >
        <Image
          src={imgSrc}
          alt={title || "صورة المنتج"}
          className={`w-full h-full object-cover rounded-2xl mix-blend-darken group-hover:scale-105 transition-all duration-700 ease-out ${imgLoaded ? "blur-0 scale-100 opacity-100" : "blur-lg scale-95 opacity-0"}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgSrc(NO_IMAGE_FALLBACK);
            setImgLoaded(true);
          }}
        />
        {badge && (
          <span className="absolute top-4 right-4 bg-amber-400 text-amber-950 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm tracking-wide">
            {badge}
          </span>
        )}
      </div>

      {/* منطقة المحتوى */}
      <div className="p-4 flex flex-col flex-1">
        {/* العنوان */}
        <h3
          className="text-sm font-semibold text-zinc-800 line-clamp-2 leading-5 h-10 mb-3 text-ellipsis group-hover:text-amber-600 transition-colors duration-300"
          title={title}
        >
          {title}
        </h3>

        {/* السعر */}
        <div className="flex flex-col mb-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-zinc-900 tracking-tight">
              {formattedPrice}
            </span>
            <span className="text-xs font-semibold text-zinc-500">ج.م</span>
          </div>
          {formattedOriginalPrice && (
            <span className="text-xs text-zinc-400 line-through font-medium mt-0.5">
              {formattedOriginalPrice} ج.م
            </span>
          )}
        </div>

        {/* الأزرار */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          {/* إضافة للسلة */}
          <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-blue-800 text-white py-2.5 rounded-[12px] text-xs sm:text-sm font-bold transition-colors duration-300 shadow-sm hover:shadow">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"></path>
            </svg>
            <span>أضف للسلة</span>
          </button>

          {/* المفضلة */}
          <button
            className="w-10 h-10 shrink-0 flex items-center justify-center rounded-[12px] bg-zinc-50 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-300"
            title="إضافة للمفضلة"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
            </svg>
          </button>

          {/* المقارنة */}
          <button
            className="w-10 h-10 shrink-0 flex items-center justify-center rounded-[12px] bg-zinc-50 text-zinc-400 hover:text-amber-500 hover:bg-amber-50 transition-colors duration-300"
            title="مقارنة المنتج"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
