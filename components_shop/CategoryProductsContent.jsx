import getCategoryProducts from "@/actions_shop/getCategoryProducts";
import PaginationBar from "@/components_shop/PaginationBar";
import ProductCard from "@/components_shop/ProductCard";
import Link from "next/link";

export default async function CategoryProductsContent({
  paramsProps,
  searchParamsProps,
}) {
  const { name } = await paramsProps;
  const searchParams = await searchParamsProps;
  const page = Number(searchParams?.page) || 1;

  const {
    data: products,
    category,
    error,
    productsCount,
  } = await getCategoryProducts({ categoryName: name, page });

  if (error || !products) {
    console.log(error);
    return (
      <div className="flex items-center justify-center h-dvh ">
        <span className="text-red-800 text-4xl">فشل جلب المنتجات</span>
        <Link href="/" className="text-blue-600 cursor-pointer">
          الصفحة الرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h3 className=" px-[5%] py-2 text-3xl">
        {category?.nickName || "إسم التصنيف"}
      </h3>
      <div className="flex gap-5 flex-wrap justify-center">
        {products?.map((p) => (
          <ProductCard
            key={p.id}
            title={p.title}
            price={p.price}
            thumbnail={p.thumbnail}
          />
        ))}
      </div>
      <PaginationBar productsCount={productsCount} currentPage={page} />
    </div>
  );
}
