// app/api/products/route.ts
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request) {
  try {
    // 1. قراءة رقم الصفحة والـ Limit من الـ URL (الافتراضي: صفحة 1 و 20 منتج)
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    // 2. معادلة الـ Offset (تخطي المنتجات بتاعة الصفحات القديمة)
    const skip = (page - 1) * limit;

    // 3. جلب الداتا من الداتابيز بالتخطي المظبوط
    const threads = await prisma.product.findMany({
      skip: skip,
      take: limit,

      orderBy: { createdAt: "desc" },
      select: {
        id: true, // مهم جداً عشان الـ key في الـ React
        title: true,
      },
    });

    // 4. معرفة العدد الكلي للمنتجات عشان نعرف الصفحات خلصت ولا لأ
    const totalProducts = await prisma.product.count();
    const hasMore = skip + threads.length < totalProducts;

    // 5. الرد بالشكل الاحترافي المكتمل
    return NextResponse.json(
      {
        data: threads,
        nextPage: hasMore ? page + 1 : null, // لو فيه تاني رجع رقم الصفحة الجاية، لو مفيش رجع null
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { data: [], nextPage: null, error: err.message },
      { status: 500 },
    );
  }
}
