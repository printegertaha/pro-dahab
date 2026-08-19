import prisma from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

export default async function getCategories() {
  "use cache";
  cacheTag("categories");
  cacheLife("max");
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true, nickName: true },
    });
    return { data: categories, error: null };
  } catch (err) {
    return { data: [], error: err, productsCount: 0 };
  }
}
