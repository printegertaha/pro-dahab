import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "pro-dahab",
  description: "منصتكم الأولى لتسوق أفضل المنتجات",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={` h-full`}>
      <body className="min-h-full flex flex-col">
        <Navbar /> {children}
      </body>
    </html>
  );
}
