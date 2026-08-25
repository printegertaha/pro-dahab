import { threadsPerPage } from "@/lib/constants";
import prisma from "@/lib/prisma";

export default async function getThreads(cursorId) {
  try {
    const threads = await prisma.product.findMany({
      take: threadsPerPage + 1, // بنجيب واحد زيادة عشان نعرف هل فيه صفحات تاني ولا لأ
      ...(cursorId && {
        skip: 1, // بنسيب الكيرسر نفسه اللي ظهر آخر مرة
        cursor: {
          id: cursorId,
        },
      }),
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' }, // Composite sorting عشان لو فيه اتنين نفس الوقت الترتيب يفضل ثابت
      ],
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    // بنطلع الـ Next Cursor للطلب الجاي
    let nextCursor
    if (threads.length > threadsPerPage) {
      const nextItem = threads.pop(); // بنشيل العنصر الزيادة
      nextCursor = nextItem?.id || null;
    }

    return { data: threads, nextCursor, error: null };
  } catch (err) {
    return { data: [], nextCursor: null, error: err };
  }
}