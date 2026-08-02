import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getCategories = unstable_cache(
  async () => {
    try {
      const categories = await prisma.category.findMany();
      return { categories, error: null };
    } catch (error) {
      return { categories: [], error: "حصل خطأ" };
    }
  },
  ["categories"],
  { revalidate: false, tags: ["categories"] },
);
export default getCategories
