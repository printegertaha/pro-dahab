import getCategories from "@/actions_shop/getCategories";
import AddProductForm from "@/components_shop/AddProductForm";

export default async function AddProductPage() {
  const { data: categories } = await getCategories();

  return <AddProductForm categories={categories} />;
}
