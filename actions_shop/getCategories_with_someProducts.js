import prisma from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

// لازم نسيبها كدا بحيث لو ضربت إيرور متحفظش الإيرور في الكاش سيرفر
// لازم الريترن الوحيد يكود الداتا الناجحه بحيث مفيش غيرها يتعمل له كاش
async function getSafeData() {
  "use cache";
  cacheTag("products", "categories", "category-products");
  cacheLife("hours");

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
  return {
    data: JSON.parse(JSON.stringify(categoriesWith_someProducts)),
    error: null,
  };
}

// هنستدعي الدالة ونشغلها هنا ولو ضربت إيرور هنرجعه للمستخدم ولكن بدون ما يتكيش في السيرفر
// ولو الداله رجعت داتا بنجاح هنرجعها بردو للمستخدم , ولكن كدا إتكيشت في السيرفر
export default async function getCategories_with_someProducts() {
  try {
    const data = await getSafeData();
    return data;
  } catch (err) {
    return { data: [], error: err };
  }
}

{
  /**
  ليه بنجيب الداتا ونرجعها على دالتين؟ 
  الأول كان الإيرور بيتعمله كاش في السيرفر , يعني لو النت فصل عند المستخدم اللي هيطلب الداتا من الداتابيز عشان تتكيش
  النت عنده فصل , كدا كأن النت فصل عن مستخدمين الموقع كله , هيتخزن في السيرفر إن مفيش داتا , 
  فكدا بنسب الدالة تضرب إيرور وبنستقبله في دالة تانيه وهيا دي اللي بنستدعيها , 
  لأن الأول كان كاتش بيتخزن في السيرفر فلازم التراي وكاتش مش في دالة كاش السيرفر
 */
}
