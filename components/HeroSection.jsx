import Link from "next/link";
import Image from "next/image";

export default function () {
  return (
    <section className="relative min-h-[calc(100vh-75px)]  bg-zinc-950 text-white overflow-hidden dir-rtl">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1  gap-12 items-center">
        {/* Right Side: Copy & CTA */}
        <div className="space-y-6 text-right z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-amber-400 bg-amber-400/10 rounded-full border border-amber-400/20">
            جودة وأمان في مكان واحد 
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            عالمك من <span className="text-amber-400">التسوق</span> والترفيه.
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-lg">
            استكشف مجموعتنا المختارة من المنتجات بعناية لتانسب عملائنا بأعلى
            معايير الجودة.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/category/all_products"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              إستكشف المنتجات
            </Link>
          </div>
        </div>

        {/* Left Side: Showcase Media */}
        <div className="hidden relative md:flex justify-center items-center">
          <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-3xl -z-10" />

          <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 shadow-2xl">
            <Image
              src="https://i.pinimg.com/736x/ae/3e/8f/ae3e8f3059c6dae5f9cee3685e87ae5c.jpg"
              alt="منتجات الترفيه والأجهزة الطبية"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
