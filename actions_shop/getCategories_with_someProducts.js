import prisma from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

export default async function getCategories_with_someProducts() {
  "use cache";
  cacheTag("products");
  cacheLife("max");
  try {
    const categoriesWith_someProducts = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        nickName: true,
        products: {
          take: 4,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            thumbnail: true,
            price: true,
          },
        },
      },
    });
    return { data: JSON.parse(JSON.stringify( categoriesWith_someProducts)), error: null };
  } catch (err) {
    return { data: [], error: err };
  }
}
