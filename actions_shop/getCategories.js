import prisma from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

// الداتا الناجحة بس هيا اللي بتتكيش
async function getSafeCategories() {
  "use cache";
  cacheTag("categories");
  cacheLife("max");

  const categories = await prisma.category.findMany({
    select: { id: true, name: true, nickName: true },
  });
  return { data: categories, error: null };
}

// لو ضربت إيرور مش هيتكيش في السيرفر
export default async function getCategories() {
  try {
    return await getSafeCategories();
  } catch (err) {
    return { data: [], error: err.message };
  }
}
