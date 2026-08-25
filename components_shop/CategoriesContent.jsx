"use client";

import Link from "next/link";
import { useState } from "react";

function getCategoryIcon(name = "") {
  switch (name) {
    case "all_products":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      );
    case "karasi_tebbeyah":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      );
    case "elctro_kahrabah":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      );
    case "3akarat_w_wazaef":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v3"
          />
        </svg>
      );
    case "al3ab_atfal":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10.5h.008v.008H9V10.5zm6 0h.008v.008H15V10.5z"
          />
        </svg>
      );
    case "coins":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-6h6m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "lawazem_cars":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3.75 12l1.35-4.05A2.25 2.25 0 017.23 6.5h9.54a2.25 2.25 0 012.13 1.45L20.25 12m-16.5 0h16.5m-16.5 0v5.25c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V15m10.5 2.25h1.5c.414 0 .75-.336.75-.75V12"
          />
        </svg>
      );
    case "مستلزمات_منزليه":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      );
    case "soon":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    default:
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
          />
        </svg>
      );
  }
}

export default function CategoriesContent({ categoriesProps }) {
  const [categories, setCategories] = useState(() => {
    if (!categoriesProps) return [];
    if (typeof window === "undefined") return categoriesProps;
    try {
      const categoriesCacheStr = localStorage.getItem("categories");
      const parsed = JSON.parse(categoriesCacheStr);
      return parsed ?? categoriesProps ?? [];
    } catch (err) {
      console.log("حصل مشكلة في رندرة كاش كلاينت التصنيفات");
      console.log(err);
    }
    return categoriesProps;
  });
  return (
    <>
      {categories && categories.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          suppressHydrationWarning
        >
          {categories.map((cat) => {
            const displayName = cat.nickName || cat.name;

            return (
              <Link
                key={cat.id || cat.name}
                href={`/shop/categories/${cat.name}`}
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-zinc-900/90 hover:shadow-[0_0_25px_rgba(245,158,11,0.12)] active:scale-98"
              >
                {/* الأيقونة والاسم */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-all duration-300 shadow-sm">
                    {getCategoryIcon(cat.name)}
                  </div>

                  <div className="space-y-1" suppressHydrationWarning>
                    <h2 className="text-lg sm:text-xl font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {displayName}
                    </h2>
                    {cat.products?.length !== undefined && (
                      <p className="text-xs text-zinc-500">
                        {cat.products.length} منتج متوفر
                      </p>
                    )}
                  </div>
                </div>

                {/* السهم الموجه للـ RTL */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 group-hover:text-amber-400 transition-all duration-300">
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="w-full text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800/80 text-zinc-400 space-y-3">
          <p className="text-base font-semibold">
            لا توجد تصنيفات متاحة حالياً
          </p>
        </div>
      )}
    </>
  );
}
