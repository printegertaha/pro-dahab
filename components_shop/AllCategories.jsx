"use client";
import SkeletonProductCard from "@/skeltons/SkeltonProductCard";
import { Suspense, useEffect, useState } from "react";
import CategoryRow from "./CategoryRow";
import generateDataHash from "@/lib/generateDataHash";

export default function AllCategories({ categories_props }) {
  console.log(categories_props)
  const { data: categories_server, error } = categories_props; // دي الداتا سواء من السيرفر الكاش او من الداتابيز
  const [categories, setCategories] = useState(() => {
    if (typeof window === "undefined") return categories_server;

    try {
      const cached = localStorage.getItem("categories_with_some_products");
      if (cached) {
        const parsed = JSON.parse(cached);
        // لو الكاش فيه داتا وسليمة نعرضها فوراً
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // لو حصل أي خطأ في القراءة ارجع لداتا السيرفر فوراً
      console.log("categories isn't a valid JSON! 😂😂❌");
      console.log(e);
    }
    return categories_server;
  });

  useEffect(() => {
    // لو فيه مشكله في الداتا اللي راجعه من السيرفر
    if (!categories_server || error) return;

    const categories_localS_str = localStorage.getItem(
      "categories_with_some_products",
    );
    const categories_server_str = JSON.stringify(categories_server);

    const clientHash = generateDataHash(categories_localS_str);
    const serverHash = generateDataHash(categories_server_str);

    try {
      if (categories_localS_str) {
        // لو تصنيفات المتصفح مش نفس تصنيفات السيرفر
        if (clientHash !== serverHash) {
          setCategories(categories_server);
          localStorage.setItem(
            "categories_with_some_products",
            categories_server_str,
          );
          console.log("إطمن مسحنا العك وضيفنا الصح✅");
        }
      } else {
        localStorage.setItem(
          "categories_with_some_products",
          categories_server_str,
        );
        console.log("cats added to localStorage✅");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (error && !categories) {
    console.log(error);

    return (
      <div className="border border-red-500  bg-red-900 h-50 w-[80vw] mx-auto rounded-2xl m-5 flex items-center justify-center flex-col gap-10">
        {" "}
        <p className="text-2xl font-black">حدث خطأ في السيرفر!</p>
        <span className="text-xs">{JSON.stringify(error)}</span>
      </div>
    );
  }

  if (categories.length < 1) {
    console.log(categories)
    return (
      <div className="border-2 h-70 rounded-xl p-5  flex flex-col justify-between text-2xl  border-red-500  bg-red-900 font-mono text-yellow-500 w-[80vw] sm:w-[60vw] mx-auto font-black">
        <p className="">مفيش منتجات حالياََ</p>
        <p className="mx-auto ">فيه مشكلة في نت حضرتك أو في سيرفر حضرتي</p>
        <button
          type="button"
          className="text-xl  p-2 rounded-2xl cursor-pointer mr-auto "
          onClick={() => (window.location.href = "/shop")}
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className=" p-5 rounded-2xl w-full">
      {categories.map((c) => (
        <Suspense
          key={c.id}
          fallback={
            <div className="flex items-center flex-wrap gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonProductCard key={idx} />
              ))}
            </div>
          }
        >
          <CategoryRow category={c} />
        </Suspense>
      ))}
    </div>
  );
}
