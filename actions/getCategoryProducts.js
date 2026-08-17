import { productsPerPage } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getCategoryProducts = unstable_cache(
  async (pageNumber = 1, categoryName) => {
    try {
      const [data, productsCount] = await Promise.all([
        prisma.category.findUnique({
          where: {
            name: categoryName,
          },
          include: {
            products: {
              take: productsPerPage,
              skip: productsPerPage * (pageNumber - 1),
            },
          },
        }),
        prisma.product.count({
          where: { category: { name: categoryName } },
        }), // دي إنت مش فاهمها مسروقه
      ]);
      return { data, productsCount, error: null };
    } catch (err) {
      return { data: [], error: "حصل خطأ", productsCount: 0 };
    }
  },
  ["products", `${"categoryName"}-products`],
  { revalidate: false, tags: ["products", `${"categoryName"}-products`] },
);

export default getCategoryProducts;
