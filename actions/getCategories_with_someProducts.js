import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getCategories_with_someProducts = unstable_cache(
  async () => {
    try {
      const categoriesWith_someProducts = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          nickName: true,
          products: {
            take: 4,
            orderBy: {createdAt: 'desc'}
          },
        },
      });
      return { data: categoriesWith_someProducts, error: null };
    } catch (err) {
      return { data: [], error: err };
    }
  },
  ["categories", "products", "categories-firstProducts"],
  {
    revalidate: false,
    tags: ["categories", "products", "categories-firstProducts"],
  },
);

export default getCategories_with_someProducts;
