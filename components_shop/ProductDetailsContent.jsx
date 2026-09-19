import getProductById from "@/actions_shop/getProductById";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailsContent({ paramsProps }) {
  const { id } = await paramsProps;
  const { data: product, error } = await getProductById(id);

  if (!product || error) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* رجوع */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors text-sm"
      >
        <span>→</span>
        <span>العودة للمتجر</span>
      </Link>

      {/* الصورة المصغرة والبيانات الأساسية */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* الصورة المصغرة */}
        <div className="relative w-full md:w-96 h-72 md:h-96 rounded-2xl overflow-hidden border border-zinc-800 shrink-0">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 384px"
            priority
          />
        </div>

        {/* البيانات */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
            {product.title}
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-amber-400">
              {Number(product.price || 0).toLocaleString("en-US")}
            </span>
            <span className="text-xl text-zinc-400">ج.م</span>
          </div>

          {product.category && (
            <Link
              href={`/categories/${product.category.name}`}
              className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm hover:bg-zinc-700 transition-colors"
            >
              {product.category.nickName}
            </Link>
          )}

          {product.ProductDetails?.description && (
            <div className="space-y-2 pt-4 border-t border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-200">الوصف</h2>
              <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
                {product.ProductDetails.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* الصور الإضافية */}
      {product.ProductImage && product.ProductImage.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-200">صور المنتج</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {product.ProductImage.map((img) => (
              <div
                key={img.id}
                className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800"
              >
                <Image
                  src={img.url}
                  alt="صورة المنتج"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
