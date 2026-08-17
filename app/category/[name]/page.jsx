import getCategoryProducts from "@/actions/getCategoryProducts";
import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { productsPerPage } from "@/lib/constants";
import Link from "next/link";

export default async function CategoryProducts({ params, searchParams }) {
  const { name: categoryName } = await params;
  const parematers = (await searchParams) || 1;
  const pageNumber = Number(parematers.page) || 1;
  const {
    data: category,
    error,
    productsCount,
  } = await getCategoryProducts(pageNumber, categoryName);

  if (error || !category) {
    console.log(error)
    return (
      <div className="flex items-center justify-center h-dvh ">
        <span className="text-red-800 text-4xl">حصل حاجة غلط </span>
        <Link href="/" className="text-blue-600 cursor-pointer">
          الصفحة الرئيسية
        </Link>
      </div>
    );
  }

  const products = category.products;

  if (products.length < 1) {
    return (
      <div className="flex items-center justify-center h-dvh ">
        <span className="text-red-800 text-4xl">مفيش منتجات يا حلاوة</span>
        <Link href="/" className="text-blue-600 cursor-pointer">
          الصفحة الرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h3>{category?.nickName}</h3>
      <div className="flex gap-5 flex-wrap justify-center">
        {products?.map((p) => (
          <ProductCard
            key={p.id}
            title={p.title}
            price={p.price ? Number(p.price) : 0}
            thumbnail={p.thumbnail}
          />
        ))}
      </div>
      <PaginationBar
        totalPages={Math.ceil(productsCount / productsPerPage)}
        currentPage={pageNumber}
      />
    </div>
  );
}
