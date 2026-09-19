"use client";

import Image from "next/image";
import { useState } from "react";

const NO_IMAGE_FALLBACK =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8fafc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='600' fill='%2394a3b8'%3ENo Image%3C/text%3E%3C/svg%3E";

export default function ProductCard({
  thumbnail,
  title,
  price,
  originalPrice,
  badge,
}) {
  const [imgSrc, setImgSrc] = useState(thumbnail || NO_IMAGE_FALLBACK);

  const formattedPrice = Number(price || 0).toLocaleString("ar-EG");
  const formattedOriginalPrice = originalPrice
    ? Number(originalPrice).toLocaleString("ar-EG")
    : null;

  return (
    <div className="group shrink-0 bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:border-slate-200/80 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between w-72 max-[425px]:w-[68vw] h-full">
      <div>
        <div className="relative aspect-square overflow-hidden bg-slate-50/50 flex items-center justify-center p-2">
          <Image
            src={imgSrc}
            alt={title || "صورة المنتج"}
            className="w-full h-full object-cover rounded-[16px] group-hover:scale-105 transition-transform duration-700 ease-out"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgSrc(NO_IMAGE_FALLBACK)}
          />
          {badge && (
            <span className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full z-10 shadow-md shadow-red-600/20 tracking-wide">
              {badge}
            </span>
          )}
        </div>
        <div className="p-5 space-y-3 text-right">
          <h3 className="text-xs sm:text-sm font-bold text-slate-700 line-clamp-2 min-h-[40px] leading-relaxed group-hover:text-red-600 transition-colors duration-300">
            {title}
          </h3>
          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {formattedPrice}
              </span>
              <span className="text-xs font-bold text-slate-500">ج.م</span>
            </div>
            {formattedOriginalPrice && (
              <span className="text-xs text-slate-400 line-through font-semibold decoration-slate-300">
                {formattedOriginalPrice} ج.م
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-stretch border-t border-slate-100 bg-slate-50/30 mt-auto h-12">
        <button className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors duration-300 group/btn">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"></path>
          </svg>
          <span>إضافة للسلة</span>
        </button>
        <button className="w-12 flex items-center justify-center cursor-pointer bg-white text-slate-400 hover:text-red-500 hover:bg-red-50/80 transition-colors duration-300 border-r border-slate-100">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="w-4 h-4 hover:scale-110 transition-transform"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
          </svg>
        </button>
        <button className="w-12 flex items-center justify-center cursor-pointer bg-white text-slate-400 hover:text-blue-600 hover:bg-blue-50/80 transition-colors duration-300 border-r border-slate-100">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="w-4 h-4 hover:scale-110 transition-transform"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
