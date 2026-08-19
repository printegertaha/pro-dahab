"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

export default function PaginationBar({ currentPage, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // State لتخزين الرقم اللي المستخدم بيكتبه في خانة البحث السريع
  const [goPage, setGoPage] = useState("");

  // لو إجمالي الصفحات صفحة واحدة مش محتاجين نعرض البار
  if (totalPages <= 1) return null;

  // دالة لتغيير الـ page في الـ URL مع الحفاظ على أي فلاتر تانية
  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    router.push(createPageURL(page));
  };                                                                              

  // دالة البحث السريع برقم الصفحة
  const handleGoToPageSubmit = (e) => {
    e.preventDefault(); // منع الصفحة من الـ Reload
    const targetPage = Number(goPage);

    // التأكد إن الرقم المدخل صالح وموجود ضمن نطاق الصفحات
    if (targetPage >= 1 && targetPage <= totalPages) {
      handlePageChange(targetPage);
      setGoPage(""); // تصفير الـ input بعد البحث
    } else {
      alert(`برجاء إدخال رقم صفحة صحيح بين 1 و ${totalPages}`);
    }
  };

  // 🧠 دالة المنطق الذكي لتوليد أرقام الصفحات والنقط
  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } 
    else if (currentPage >= totalPages - 3) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } 
    else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6 select-none">
      
      {/* البار الرئيسي للأرقام */}
      <ul className="flex items-center gap-1 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
        {/* زرار الصفحة السابقة */}
        <li
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100 cursor-pointer"
          }`}
        >
          السابق
        </li>

        {/* عرض أرقام الصفحات والنقط ديناميكياً */}
        {visiblePages.map((page, idx) => {
          if (page === "...") {
            return (
              <li
                key={`ellipsis-${idx}`}
                className="px-2 py-1.5 text-gray-400 text-sm font-semibold cursor-default"
              >
                ...
              </li>
            );
          }

          return (
            <li
              key={`page-${page}`}
              onClick={() => handlePageChange(Number(page))}
              className={`px-3.5 py-1.5 rounded-md text-sm font-semibold transition-all cursor-pointer ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </li>
          );
        })}

        {/* زرار الصفحة التالية */}
        <li
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100 cursor-pointer"
          }`}
        >
          التالي
        </li>
      </ul>

      {/* 🚀 فورم الانتقال السريع برقم الصفحة */}
      <form 
        onSubmit={handleGoToPageSubmit}
        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100"
      >
        <label htmlFor="jump-to-page" className="text-xs text-gray-500 font-medium">
          ذهاب إلى:
        </label>
        <input
          id="jump-to-page"
          type="number"
          min="1"
          max={totalPages}
          value={goPage}
          onChange={(e) => setGoPage(e.target.value)}
          className="w-14 text-center border border-gray-200 rounded p-1 text-sm text-black outline-none focus:border-blue-500 transition-all font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-blue-600 transition-all shadow-sm"
        >
          انتقال
        </button>
      </form>

    </div>
  );
}