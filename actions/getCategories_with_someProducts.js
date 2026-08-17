import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getCategories_with_someProducts = unstable_cache(
  async () => {
    try {
      const categoriesWithProducts = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          nickName: true,
          products: {
            take: 4,
          },
        },
      });
      return { data: categoriesWithProducts, error: null };
    } catch (err) {
      console.log(err);
      return { data: [], error: "حصل خطأ في تحضير التصنيفات بالمنتجات" };
    }
  },
  ["categories", "products", "categories-first-products"],
  {
    revalidate: false,
    tags: ["categories", "products", "categories-first-products"],
  },
);

export default getCategories_with_someProducts;
