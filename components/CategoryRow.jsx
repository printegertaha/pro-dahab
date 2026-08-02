import getSome_CategoryProducts from "@/actions/getSome_CategoryProducts";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function CategoryRow({ category }) {

  const { products } = await getSome_CategoryProducts(category.id);

  return (
    <section className="mb-20 ">
      {/* إسم التصنيف */}
      <div className=" p-2 mb-4">
        <div className="flex justify-between">
          <span>{category.nickName }</span>
          <Link href={`/category/${category.name}`}>مشاهدة الكل</Link>
        </div>
      </div> 

      {/* منتجات التصنيف */}
      <div className="flex items-center overflow-auto gap-4 scrollbar-none">
        {products?.length > 0 ? (
          products.map((p) => (
            <ProductCard
              key={p.id}
              title={p.title}
              price={p.price.toString() }
              thumbnail={p.thumbnail}
              
            />
          ))
        ) : (
          <p>لا توجد منتجات لهذا التصنيف</p>
        )}
      </div>
    </section>
  );
}