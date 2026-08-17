import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function CategoryRow({ category }) {
  return (
    <section className="mb-16 max-w-7xl mx-auto px-4 md:px-6 dir-rtl">
      {/* رأس القسم: اسم التصنيف وزر مشاهدة الكل */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-zinc-800">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-wide">
          {category.nickName}
        </h2>
        
        <Link 
          href={`/category/${category.name}`}
          className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 group"
        >
          <span>مشاهدة الكل</span>
          <span className="transition-transform group-hover:-translate-x-1">←</span>
        </Link>
      </div> 

      {/* المنتجات (سكرول أفقي) */}
      <div className="flex items-center gap-5 overflow-x-auto  pb-4 scrollbar-none snap-x snap-mandatory">
        {category?.products?.length > 0 ? (
          category.products.map((p) => (
            <div key={p.id} className="min-w-[240px] sm:min-w-[280px] shrink-0 snap-start">
              <ProductCard
                title={p.title}
                price={p.price ? Number(p.price) : 0}
                thumbnail={p.thumbnail}
              />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-12 bg-zinc-900/40 rounded-2xl border border-zinc-800/60 text-zinc-500 text-sm">
            لا توجد منتجات متوفرة حالياً في هذا التصنيف.
          </div>
        )}
      </div>
    </section>
  );
}