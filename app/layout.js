import "./globals.css";
import Navbar from "@/components_shop/Navbar";
import CustomToastProvider from "@/components_shop/CustomToastProvider";
import Footer from "@/components_shop/Footer";

export const metadata = {
  title: "Shop",
  description:
    "المتجر الإلكتروني. تصفح أحدث المنتجات والعروض، وبيع واشترِ بسهولة وأمان.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body className="min-h-full flex flex-col">
        <CustomToastProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
