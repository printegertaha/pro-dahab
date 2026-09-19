import { productsPerPage } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";

// عدد المنتجات للتصنيف — بنكيشها لوحدها عشان مش بتتغير كتير
async function getCategoryProductsCount(categoryName) {
  "use cache";
  cacheLife("max");
  cacheTag(
    "products",
    `products-${categoryName}`,
    `products-${categoryName}-count`,
  );
  return await prisma.product.count({
    where: { category: { name: categoryName } },
  });
}

// جلب المنتجات حسب رقم الصفحة (offset-based)
async function getProductsCache({ categoryName, page }) {
  "use cache";
  cacheTag(
    "products",
    `${categoryName}-products`,
    `${categoryName}-products-page-${page}`,
  );

  const skip = (page - 1) * productsPerPage;

  const products = await prisma.product.findMany({
    where: {
      category: {
        name: categoryName,
      },
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    skip,
    take: productsPerPage,
  });

  const formattedProducts = products.map((p) => ({
    ...p,
    price: p.price.toNumber(),
  }));

  return { data: formattedProducts, error: null };
}

// تفاصيل التصنيف (الإسم الحركي)
async function getCategoryDetails(categoryName) {
  "use cache";
  cacheLife("max");
  cacheTag("categories", `products-${categoryName}`, categoryName);

  const category = await prisma.category.findFirst({
    where: { name: categoryName },
    select: { id: true, name: true, nickName: true },
  });
  return category;
}

// الدالة الرئيسية — بتجيب المنتجات والعدد والتصنيف مع بعض
export default async function getCategoryProducts({ categoryName, page = 1 }) {
  try {
    const [productsData, productsCount, category] = await Promise.all([
      getProductsCache({
        categoryName,
        page,
      }),
      getCategoryProductsCount(categoryName),
      getCategoryDetails(categoryName),
    ]);
    return { ...productsData, productsCount, category };
  } catch (err) {
    return { data: [], error: err.message };
  }
}
