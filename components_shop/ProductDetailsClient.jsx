"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

// كومبوننت عشان يظهر رسالة toast لما المنتج يترفع بنجاح ويتوجه لصفحة التفاصيل
export default function ProductDetailsClient() {
  const hasShownToast = useRef(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("new") === "true" && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.success("تم رفع المنتج بنجاح ✅", { duration: 4000 });

      // شيل الـ query param من الـ URL من غير reload
      const url = new URL(window.location.href);
      url.searchParams.delete("new");
      window.history.replaceState({}, "", url.pathname);
    }
  }, [searchParams]);

  return null;
}
