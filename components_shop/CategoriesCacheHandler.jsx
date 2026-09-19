"use client";

import generateDataHash from "@/lib/generateDataHash";
import { useEffect } from "react";

export default function CategoriesCacheHandler({ categories_server }) {
  useEffect(() => {
    // تصنيفات المتصفح والسيرفر بصيغة نصية
    const categories_client_str = localStorage.getItem("categories");
    const categories_server_str = JSON.stringify(categories_server);

    // لو فيه تصنيفات في المتصفح
    if (categories_client_str) {
      const clientHash = generateDataHash(categories_client_str);
      const serverHash = generateDataHash(categories_server_str);

      // لو تصنيفات المتصفح مش نفس تصنيفات السيرفر
      if (clientHash !== serverHash) {
        localStorage.setItem("categories", categories_server_str);
      }
    }

    // لو مفيش تصنيفات في المتصفح
    else {
      localStorage.setItem("categories", categories_server_str);
    }
  }, [categories_server]);
  return null;
}
