"use client";
import { useEffect, useState } from "react";
import CategoryRow from "./CategoryRow";
import generateDataHash from "@/lib/generateDataHash";

export default function AllCategories({ categories_props }) {
  const { data: categories_server, error } = categories_props; // دي الداتا سواء من السيرفر الكاش او من الداتابيز

  // الـ state بس عشان الـ initial render — لو فيه كاش في المتصفح نعرضه فوراً
  const [cachedCategories] = useState(() => {
    if (typeof window === "undefined") return null;

    try {
      const cached = localStorage.getItem("categories_with_some_products");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  });

  // السيرفر دايماً هو المصدر الأساسي — الكاش بس fallback
  const categories =
    !error && categories_server ? categories_server : cachedCategories;

  // الـ effect بس بيعمل sync للـ localStorage — مفيش setState
  useEffect(() => {
    if (!categories_server || error) return;

    const categories_localS_str = localStorage.getItem(
      "categories_with_some_products",
    );
    const categories_server_str = JSON.stringify(categories_server);

    const clientHash = generateDataHash(categories_localS_str);
    const serverHash = generateDataHash(categories_server_str);

    try {
      if (!categories_localS_str || clientHash !== serverHash) {
        localStorage.setItem(
          "categories_with_some_products",
          categories_server_str,
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, [categories_server, error]);

  if (error && !categories) {
    return (
      <div className="border border-red-500  bg-red-900 h-50 w-[80vw] mx-auto rounded-2xl m-5 flex items-center justify-center flex-col gap-10">
        {" "}
        <p className="text-2xl font-black">حدث خطأ في السيرفر!</p>
        <span className="text-xs">{JSON.stringify(error)}</span>
      </div>
    );
  }

  if (!categories || categories.length < 1) {
    return (
      <div className="border-2 h-70 rounded-xl p-5  flex flex-col justify-between text-2xl  border-red-500  bg-red-900 font-mono text-yellow-500 w-[80vw] sm:w-[60vw] mx-auto font-black">
        <p className="">مفيش منتجات حالياََ</p>
        <p className="mx-auto ">فيه مشكلة في نت حضرتك أو في سيرفر حضرتي</p>
        <button
          type="button"
          className="text-xl  p-2 rounded-2xl cursor-pointer mr-auto "
          onClick={() => (window.location.href = "/")}
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className=" p-5 rounded-2xl w-full">
      {categories.map((c) => (
        <CategoryRow key={c.id} category={c} />
      ))}
    </div>
  );
}
