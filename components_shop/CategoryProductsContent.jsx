import getCategoryProducts from "@/actions_shop/getCategoryProducts";
import PaginationBar from "@/components_shop/PaginationBar";
import ProductCard from "@/components_shop/ProductCard";
import { productsPerPage } from "@/lib/constants";
import Link from "next/link";

export default async function CategoryProductsContent({params, searchParams}) {
   const { name: categoryName } = await params;
  const parematers = await searchParams;
  const pageNumber = Number(parematers.page) || 1;
  const {
    data: category,
    error,
    productsCount,
  } = await getCategoryProducts(pageNumber, categoryName);

  if (error || !category) {
    console.log(error);
    return (
      <div className="flex items-center justify-center h-dvh ">
        <span className="text-red-800 text-4xl">فيه مشكله في نت حضرتك أو في سيرفر حضرتي </span>
        <Link href="/shop" className="text-blue-600 cursor-pointer">
          الصفحة الرئيسية
        </Link>
      </div>
    );
  }

  const products = category.products;

  if (products.length < 1) {
    const { data: category, productsCount } = await getCategoryProducts(
      1,
      categoryName,
    );
    const products = category.products;
    if (products.length > 0) {
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
    } else {
      return <div> مفيش منتجات تتعرض</div>;
    }
  }

  return (
    <div>
      <h3 className=" px-[5%] py-2 text-3xl">{category?.nickName}</h3>
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
