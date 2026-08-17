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
        }),
      ]);
      return { data, productsCount, error: null };
    } catch (err) {
      console.log(err)
      return { data: [], error: "حصل خطأ" };
    }
  },
  ["products", `${"categoryName"}-products`],
  { revalidate: false, tags: ["products", `${"categoryName"}-products`] },
);

export default getCategoryProducts;
