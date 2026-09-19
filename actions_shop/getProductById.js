import prisma from "@/lib/prisma";

export default async function getProductById(productId) {
  try {
    if (!productId) {
      return { data: null, error: "معرّف المنتج مطلوب" };
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: {
          select: { id: true, name: true, nickName: true },
        },
        ProductDetails: true,
        ProductImage: true,
      },
    });

    if (!product) {
      return { data: null, error: "المنتج غير موجود" };
    }

    // تحويل الـ Decimal للسعر لرقم عادي
    const formattedProduct = {
      ...product,
      price: product.price.toNumber(),
    };

    return { data: JSON.parse(JSON.stringify(formattedProduct)), error: null };
  } catch (err) {
    console.error("Error fetching product:", err);
    return { data: null, error: "حدث خطأ أثناء جلب المنتج" };
  }
}
