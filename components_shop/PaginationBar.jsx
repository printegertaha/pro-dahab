"use client";

import { productsPerPage } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function PaginationBar({ productsCount, currentPage = 1 }) {
  const current = Number(currentPage) || 1;
  const pagesCount = Math.ceil(productsCount / productsPerPage);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // دالة عمل رابط لصفحة معينة
  function createPageLink(pageNum) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNum.toString());
    return `${pathname}?${params.toString()}`;
  }

  if (!pagesCount || pagesCount <= 1) return null;

  // حساب الصفحات المطلوب عرضها (الأولى، الأخيرة، الحالية، 2 قبلها، 2 بعدها)
  const pageSet = new Set();
  pageSet.add(1);
  pageSet.add(pagesCount);

  for (let i = current - 2; i <= current + 2; i++) {
    if (i >= 1 && i <= pagesCount) {
      pageSet.add(i);
    }
  }

  const sortedPages = Array.from(pageSet).sort((a, b) => a - b);

  const paginationItems = [];
  for (let i = 0; i < sortedPages.length; i++) {
    const pageNum = sortedPages[i];
    if (i > 0) {
      const prevPage = sortedPages[i - 1];
      if (pageNum - prevPage > 1) {
        paginationItems.push({
          type: "ellipsis",
          key: `ellipsis-${prevPage}-${pageNum}`,
        });
      }
    }
    paginationItems.push({
      type: "page",
      page: pageNum,
      key: `page-${pageNum}`,
    });
  }

  return (
    <div
      className="flex items-center justify-center gap-1.5 sm:gap-2 py-8 flex-wrap select-none"
      dir="rtl"
    >
      {/* زر السابق */}
      {current > 1 ? (
        <Link
          prefetch={false}
          href={createPageLink(current - 1)}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all duration-200 text-sm font-medium shadow-sm active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
          <span>السابق</span>
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-900/60 text-zinc-600 cursor-not-allowed text-sm font-medium border border-zinc-800/40">
          <ChevronRight className="w-4 h-4" />
          <span>السابق</span>
        </span>
      )}

      {/* أرقام الصفحات */}
      <ul className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
        {paginationItems.map((item) => {
          if (item.type === "ellipsis") {
            return (
              <li
                key={item.key}
                className="w-8 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-zinc-500 font-bold tracking-widest text-sm select-none"
              >
                ...
              </li>
            );
          }

          const pageNum = item.page;
          const isActive = pageNum === current;

          return (
            <li key={item.key}>
              <Link
                prefetch={false}
                href={createPageLink(pageNum)}
                className={`min-w-9 h-9 sm:min-w-10 sm:h-10 px-2.5 sm:px-3 rounded-xl text-sm font-semibold flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 scale-105"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {pageNum}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* زر التالي */}
      {current < pagesCount ? (
        <Link
          prefetch={false}
          href={createPageLink(current + 1)}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all duration-200 text-sm font-medium shadow-sm active:scale-95"
        >
          <span>التالي</span>
          <ChevronLeft className="w-4 h-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-900/60 text-zinc-600 cursor-not-allowed text-sm font-medium border border-zinc-800/40">
          <span>التالي</span>
          <ChevronLeft className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}
