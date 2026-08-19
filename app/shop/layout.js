import Navbar from "@/components_shop/Navbar";

export default function shop_layout_page({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
