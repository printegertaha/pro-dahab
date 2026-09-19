"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export default async function createProduct({
  title,
  price,
  categoryId,
  description,
  thumbnail,
  imageUrls,
}) {
  try {
    // Validation
    if (!title || !price || !categoryId || !description || !thumbnail) {
      return { success: false, error: "كل الحقول مطلوبة" };
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return {
        success: false,
        error: "السعر يجب أن يكون رقم صحيح أكبر من صفر",
      };
    }

    if (priceNum > 99999999) {
      return {
        success: false,
        error: "السعر يتجاوز الحد الأقصى المسموح به (8 أرقام)",
      };
    }

    // التأكد إن التصنيف موجود وجلب اسمه عشان الـ revalidation
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { name: true },
    });

    if (!category) {
      return { success: false, error: "التصنيف غير موجود" };
    }

    // إنشاء المنتج مع التفاصيل والصور في transaction واحدة
    const product = await prisma.$transaction(async (tx) => {
      const newProduct = await tx.product.create({
        data: {
          title,
          price: priceNum,
          thumbnail,
          categoryId,
          ProductDetails: {
            create: {
              id: crypto.randomUUID(),
              description,
            },
          },
          ...(imageUrls && imageUrls.length > 0
            ? {
                ProductImage: {
                  create: imageUrls.map((url) => ({ url })),
                },
              }
            : {}),
        },
      });

      return newProduct;
    });

    // Revalidate cache tags
    // الهوم بيج - عشان أحدث منتجات تظهر
    revalidateTag("products");
    revalidateTag("category-products");

    // صفحة التصنيف المحددة
    revalidateTag(`products-${category.name}`);
    revalidateTag(`${category.name}-products`);
    revalidateTag(`products-${category.name}-count`);

    return { success: true, productId: product.id };
  } catch (err) {
    console.error("Error creating product:", err);
    return { success: false, error: "حدث خطأ أثناء إنشاء المنتج" };
  }
}
