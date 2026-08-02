import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

const getSome_CategoryProducts = (categoryId) => {
  return unstable_cache(
    async () => {
      try {
        const products = await prisma.product.findMany({
          where: { categoryId },
          take: 4,
        });
        return { products, error: null };
      } catch (err) {
        return {
          products: [],
          error: "حصل خطأ في تحضيز جزء من منتجات التصنيفات",
        };
      }
    },
    [`category-${categoryId}-products`],
    {
      revalidate: false,
      tags: [`category-${categoryId}-products`],
    },
  )();
};

export default getSome_CategoryProducts;
