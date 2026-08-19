import Link from "next/link";
import Image from "next/image";

export default function ShopHero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-10 lg:py-10 mb-10 dir-rtl sm:[30vh] lg:h-[65vh]">
      {/* خلفية الإضاءة (Ambient Glows) */}
      <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* النص والـ Calls to Action */}
          <div className="lg:col-span-7 text-center lg:text-right space-y-6">
            {/* Badge علوي شيك */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs sm:text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              أحدث المنتجات والعروض الحصرية
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="text-3xl max-w-[80%] sm:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight leading-tight sm:leading-tight text-start">
              <span>كل اللي محتاجه لحياتك في </span>
              <span className="bg-gradient-to-l from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent inline-block">
                مكان واحد.
              </span>
            </h1>

            {/* الوصف */}
            <p className="hidden sm:block text-zinc-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              إشتري وبيع أفضل الأجهزة والمنتجات بأعلى جودة وأفضل سعر في مصر مع
              توصيل سريع لجميع المحافظات وضمان الجودة.
            </p>

            {/* الأزرار */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop/categories"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-400 hover:bg-amber-300 text-zinc-950 font-bold transition-all duration-200 shadow-lg shadow-amber-500/10 text-center active:scale-95"
              >
                تصفح الاقسام
              </Link>
              <Link
                href="/shop/categories/all_products"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold transition-all duration-200 shadow-lg shadow-amber-500/10 text-center active:scale-95"
              >
                تصفح المنتجات
              </Link>
            </div>
          </div>

          {/* البانر / الصورة البصرية */}
          <div className="hidden lg:block lg:col-span-5 relative ">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/3]  rounded-3xl overflow-hidden border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-3 shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop"
                  alt="متجر دهب للتسويق"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
