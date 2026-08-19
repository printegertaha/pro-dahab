import { productsPerPage } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";

export default async function getCategoryProducts(
  pageNumber = 1,
  categoryName,
) {
  "use cache";
  cacheTag(
    "products",
    `${categoryName}-products`,
    `${categoryName}-products-${pageNumber}`,
  );
  cacheLife("max");
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
    const formatedProducts = data.products.map((p) => {
      return { ...p, price: p.price.toNumber() };
    });
    return { data: {...data, products: formatedProducts}, productsCount, error: null };
  } catch (err) {
    return { data: [], error: err, productsCount: 0 };
  }
}
